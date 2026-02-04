<script setup lang="ts">
import { IconPlus } from '@arco-design/web-vue/es/icon';

import { useClass } from '../../hooks';

interface Props {
  tips?: string;
}

defineProps<Props>();

const { cls } = useClass('add-btn');
</script>

<template>
  <div :class="cls()">
    <div :class="cls('icon')">
      <IconPlus :strokeWidth="8" />
    </div>

    <div :class="cls('text')">
      <slot />
    </div>

    <div v-if="tips" :class="cls('tips')">{{ tips }}</div>
  </div>
</template>

<style lang="less">
@import '../../token.less';

@cls: ~'@{prefix}-add-btn';

.@{cls} {
  display: flex;
  gap: 8px;
  align-items: center;
  color: rgb(22, 100, 255);
  cursor: pointer;

  &-icon {
    border-radius: 50%;
    background-color: rgba(162, 193, 255, 0.2);
    color: #1664ff;
    height: 20px;
    width: 20px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-text {
    font-weight: 500;
    font-size: 13px;
    line-height: 1;
  }

  &-tips {
    color: #86909c;
    font-size: 12px;
    cursor: default;
    line-height: 1;
  }
}
</style>
