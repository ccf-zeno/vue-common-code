<script setup lang="ts">
import { computed } from 'vue';

import { PermissionProps } from './types';

const props = withDefaults(defineProps<PermissionProps>(), {});

const disabled = computed<boolean>(() => {
  if (props.permissionKeyList && props.pKey) {
    return !props.permissionKeyList.includes(props.pKey);
  }

  return false;
});
</script>

<template>
  <a-popover :disabled="!disabled" title="无权限">
    <slot :disabled="disabled" />

    <template #content>
      <div>您没有权限执行该操作</div>
    </template>
  </a-popover>
</template>

<style module lang="less"></style>
