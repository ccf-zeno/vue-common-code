<!-- eslint-disable vue/no-dupe-keys -->
<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import { Modal } from '@arco-design/web-vue';
import { omit } from 'lodash-es';

import { handleEmits } from '../../utils';

export default defineComponent({
  name: 'MiModal',
  components: {
    ArcoModal: Modal,
  },
  extends: Modal,
  inheritAttrs: false,
  props: {
    onBeforeOk: {
      type: Function as PropType<
        () => void | boolean | Promise<void | boolean>
      >,
    },
    width: {
      type: [Number, String],
      default: 500,
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, { emit, slots }) => {
    const aProps = computed(() => {
      return omit(props, ['onBeforeOk', 'width']) as any;
    });
    const aSlots = slots as any;
    const aEmits = handleEmits(Modal.emits, emit);

    async function onBeforeOk() {
      try {
        return await props.onBeforeOk?.();
      } catch {
        return false;
      }
    }

    return {
      aProps,
      aSlots,
      aEmits,
      onBeforeOk,
    };
  },
});
</script>

<template>
  <ArcoModal
    v-bind="{ ...aProps, ...$attrs }"
    :onBeforeOk="onBeforeOk"
    :style="{
      '--mi-modal-width':
        typeof $props.width === 'number' ? `${$props.width}px` : $props.width,
    }"
    :class="['mi-modal', $attrs.class]"
    v-on="aEmits"
  >
    <template v-for="(item, key) in aSlots" #[key]>
      <slot :name="key"></slot>
    </template>
  </ArcoModal>
</template>

<style lang="less">
.mi-modal {
  .arco-modal {
    width: var(--mi-modal-width);
  }
}
</style>
