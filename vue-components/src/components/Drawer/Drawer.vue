<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Drawer } from '@arco-design/web-vue';
import { omit } from 'lodash-es';

import { useClass } from '../../hooks';
import { handleEmits } from '../../utils';

export default defineComponent({
  name: 'MiDrawer',
  components: {
    ArcoModal: Drawer,
  },
  extends: Drawer,
  inheritAttrs: false,
  props: {},
  setup: (props, { emit, slots }) => {
    const aProps = computed(() => {
      return omit(props, []) as any;
    });
    const aSlots = computed(() => {
      return omit(slots, ['title']) as any;
    }) as any;
    const aEmits = handleEmits(Drawer.emits, emit);

    const { cls } = useClass('drawer');

    return {
      aProps,
      aSlots,
      aEmits,
      cls,
    };
  },
});
</script>

<template>
  <ArcoModal
    v-bind="{ ...aProps, ...$attrs }"
    :class="['mi-drawer', $attrs.class]"
    v-on="aEmits"
  >
    <template v-for="(item, key) in aSlots" #[key]>
      <slot :name="key"></slot>
    </template>

    <template #title>
      <div :class="cls('title')">
        <slot v-if="$slots.title" name="title"></slot>
        <template v-else>
          {{ title }}
        </template>
      </div>

      <div :class="cls('tools')">
        <slot name="tools"></slot>
      </div>
    </template>
  </ArcoModal>
</template>

<style lang="less">
@import '../../token.less';

@cls: ~'@{prefix}-drawer';

.@{cls} {
  .arco-drawer-header .arco-drawer-title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-right: 16px;
  }

  .@{cls}-title {
    font-weight: 500;
    font-size: 16px;
    text-align: left;
  }

  .@{cls}-tools {
    display: flex;
    gap: 8px;
    align-items: center;
  }
}
</style>
