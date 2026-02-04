<script setup lang="ts">
import { useClass } from '../../hooks';

interface Props {
  title?: string;
  desc?: string;
  bodyClass?: string;
}

defineProps<Props>();
const { cls } = useClass('block');
</script>

<template>
  <div :class="cls()">
    <div :class="cls('header')">
      <div :class="cls('title')">
        <div :class="cls('title-line')" />
        <template v-if="$slots.title">
          <slot name="title" />
        </template>
        <template v-else>
          {{ title }}
        </template>

        <span :class="cls('title-desc')">
          <template v-if="$slots.desc">
            <slot name="desc" />
          </template>
          <template v-else>
            {{ desc }}
          </template>
        </span>
      </div>
    </div>

    <div ref="body" :class="bodyClass">
      <slot />
    </div>
  </div>
</template>

<style lang="less">
@import '../../token.less';

@cls: ~'@{prefix}-block';

.@{cls} {
  &-header {
    display: flex;
    margin-bottom: 16px;
  }

  &-title {
    font-size: 15px;
    font-weight: 500;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &-title-line {
    background-color: var(--color-primary-5);
    border-radius: 0 4px 4px 0;
    height: 14px;
    width: 3px;
  }

  &-title-desc {
    font-size: 13px;
    color: var(--color-text-2);
    font-weight: 400;
  }
}
</style>
