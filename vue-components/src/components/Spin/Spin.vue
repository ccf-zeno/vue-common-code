<script setup lang="ts">
interface Props {
  block?: boolean;
}

withDefaults(defineProps<Props>(), {
  block: true,
});
</script>

<template>
  <a-spin
    :class="{
      'mi-spin': block,
    }"
  >
    <slot />
  </a-spin>
</template>

<style lang="less">
.arco-spin.mi-spin {
  display: block;
}
</style>
