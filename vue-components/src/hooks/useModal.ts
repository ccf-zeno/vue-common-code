import {
  computed,
  createVNode,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  provide,
  ref,
  shallowRef,
  render as vueRender,
  watch,
} from 'vue';
import type { AppContext, Component, InjectionKey, Ref, VNode } from 'vue';

import { useForm } from './useForm';
import type { UseFormOption } from './useForm';

interface Options<T> {
  render?: () => VNode;
  component?: Component;
  container?: HTMLElement | string;
  /**
   * visible为false的时候就调用，不会等待modal完全卸载
   */
  onBeforeClose?: (context: ModalResponse<T>) => void;
}

interface ModalResult<T = any> {
  type: 'cancel' | 'ok';
  data?: T;
}

interface ModalContext<T = any> {
  visible: Ref<boolean>;
  setResult: (result: ModalResult<T>) => void;
  container: HTMLElement;
}

interface ModalResponse<T = any> {
  result: ModalResult<T>;
}

export const useModal = () => {
  const context = inject<ModalContext>(ModalInjectionKey);

  if (!context) {
    throw new Error('useModal must be used inside ModalWrap');
  }

  return context;
};

export const useFormModal = (options?: UseFormOption) => {
  const context = useModal();
  const form = useForm(options);

  return {
    ...context,
    ...form,
  };
};

/**
 * 函数式打开Modal的hook
 * 用hook是因为这样才能拿到调用组件的上下文
 */
export const useModalOpen = () => {
  const instance = getCurrentInstance();

  const openModal = <T = any>(
    options: Options<T>,
  ): Promise<ModalResponse<T>> => {
    if (!options.render && !options.component) {
      throw new Error('openPopup render or component is required!!!');
    }

    return createModalPromise<T>(options, instance?.appContext);
  };
  return openModal;
};

export const ModalInjectionKey: InjectionKey<ModalContext> =
  Symbol('ModalContext');

const ModalWrap = defineComponent({
  name: 'ModalWrap',
  props: ['render', 'context'],
  setup(props) {
    provide(ModalInjectionKey, props.context);
    return () => {
      return props.render();
    };
  },
});

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.setAttribute('class', 'mi-modal-overlay');
  return overlay;
}

function createModalPromise<T = any>(
  options: Options<T>,
  appContext?: AppContext,
): Promise<ModalResponse<T>> {
  return new Promise((resolve) => {
    const { render, component, onBeforeClose } = options;

    const visible = ref<boolean>(false);
    const result = shallowRef<ModalResult<T>>({ type: 'cancel' });

    const overlay: HTMLDivElement = createOverlay();
    const renderFunction = render || (() => createVNode(component!));

    const context: ModalContext<T> = {
      visible,
      setResult: (res: ModalResult<T>) => {
        result.value = res;
      },
      container: overlay,
    };

    const container = computed(() => {
      const { container } = options;

      if (!container) {
        return document.body;
      }

      if (typeof container === 'string') {
        return document.querySelector(container) ?? document.body;
      }

      return container;
    });

    let vNode: VNode;

    function renderModal() {
      document.body.style.overflow = 'hidden';

      vNode = createVNode(ModalWrap, {
        context,
        render: renderFunction,
      });
      if (appContext) {
        vNode.appContext = appContext;
      }

      vueRender(vNode, overlay);
      const containerValue = container.value;
      if (containerValue && !containerValue.contains(overlay)) {
        containerValue.appendChild(overlay);
      }
    }

    function open() {
      visible.value = true;
      renderModal();
    }

    watch(visible, async () => {
      if (!visible.value) {
        await nextTick();

        onBeforeClose?.({
          result: result.value,
        });

        // 防止动画还没做完就被卸载了
        setTimeout(() => {
          vueRender(null, overlay);
          container.value.removeChild(overlay);
          document.body.style.overflow = '';

          resolve({
            result: result.value,
          });
        }, 500);
      }
    });

    open();
  });
}
