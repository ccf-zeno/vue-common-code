import type { AppContext } from 'vue';
import { Modal as ArcoModal } from '@arco-design/web-vue';
import type { ModalConfig } from '@arco-design/web-vue';

import MiModal from './Modal.vue';

// 包装器函数
const createModalMethod = (method: keyof typeof ArcoModal) => {
  return (config: ModalConfig, appContext?: AppContext) => {
    return ArcoModal[method](
      {
        maskClosable: false,
        ...config,
        onBeforeOk: async (done: (v: boolean) => void) => {
          try {
            return (await config.onBeforeOk?.(done)) ?? true;
          } catch {
            return false;
          }
        },
      },
      appContext,
    );
  };
};

export const Modal = Object.assign(MiModal, {
  install: ArcoModal.install,
  _context: ArcoModal._context,
  open: createModalMethod('open'),
  confirm: createModalMethod('confirm'),
  info: createModalMethod('info'),
  success: createModalMethod('success'),
  warning: createModalMethod('warning'),
  error: createModalMethod('error'),
});
