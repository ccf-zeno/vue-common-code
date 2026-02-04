<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Select } from '@arco-design/web-vue';
import { omit } from 'lodash-es';

import { useClass } from '../../hooks';
import { handleEmits } from '../../utils';

export default defineComponent({
  name: 'MiSelect',
  components: {
    ArcoSelect: Select,
  },
  extends: Select,
  inheritAttrs: true,
  props: {},
  setup: (props, { slots, emit }) => {
    const aProps = computed(() => {
      return omit(props, []) as any;
    });
    const aSlots = slots as any;
    const aEmits = handleEmits(Select.emits, emit);

    const { cls } = useClass('select');

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
  <div
    :class="{
      [cls()]: true,
      [cls('has-prepend')]: $slots.prepend,
      [cls('has-append')]: $slots.append,
    }"
  >
    <div v-if="$slots.prepend" :class="cls('prepend')">
      <slot name="prepend" />
    </div>

    <ArcoSelect v-bind="aProps" v-on="aEmits">
      <template v-for="(item, key) in aSlots" #[key]>
        <slot :name="key"></slot>
      </template>
    </ArcoSelect>

    <div v-if="$slots.append" :class="cls('append')">
      <slot name="append" />
    </div>
  </div>
</template>

<style lang="less">
@import '../../token.less';

@cls: ~'@{prefix}-select';

.@{cls} {
  display: flex;

  @borderColor: #eaedf1;

  &-prepend {
    border-left: 1px solid @borderColor;
    border-top: 1px solid @borderColor;
    border-bottom: 1px solid @borderColor;
    padding: 0 8px;
    border-radius: 4px 0 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-append {
    border-right: 1px solid @borderColor;
    border-top: 1px solid @borderColor;
    border-bottom: 1px solid @borderColor;
    padding: 0 6px;
    border-radius: 0px 4px 4px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-has-prepend {
    .arco-select-view-multiple {
      border-radius: 0 4px 4px 0;
    }
  }

  &-has-append {
    .arco-select-view-multiple {
      border-radius: 4px 0 0 4px;
    }
  }
  &-has-prepend&-has-append {
    .arco-select-view-multiple {
      border-radius: 0;
    }
  }
}
</style>
