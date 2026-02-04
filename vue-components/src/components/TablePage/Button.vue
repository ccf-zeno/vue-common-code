<script setup lang="ts">
import { useClass } from '../../hooks';

const { cls } = useClass('tablePage-button');
</script>

<template>
  <div :class="cls()">
    <slot />
  </div>
</template>

<style lang="less">
@import '../../token.less';

@cls: ~'@{prefix}-tablePage-button';

.@{cls} {
  box-shadow: 0 1px 1px #00000014;
  background-color: #fff;
  height: 32px;
  padding: 0;
  width: 32px;
  border: 1px solid #dde2e9;
  color: #42464e;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.1s linear;

  .arco-icon {
    font-size: 16px;
  }

  &:hover {
    box-shadow: 0 2px 3px #00000026;
    background-color: #fafbfc;
    border-color: var(--color-primary-6);
    color: #42464e;
  }
}
</style>
