<script setup lang="ts">
import { PageHeader } from '@arco-design/web-vue';

interface Props {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
}

interface Emits {
  (e: 'back'): void;
}

withDefaults(defineProps<Props>(), {});

defineEmits<Emits>();
</script>

<template>
  <PageHeader
    class="mi-page"
    :title="title"
    :subtitle="subtitle"
    :showBack="showBack"
    @back="$emit('back')"
  >
    <template v-for="slotName of Object.keys($slots)" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </PageHeader>
</template>

<style lang="less">
.mi-page {
  height: 100%;
  background-color: white;
  border-radius: 4px;

  &.arco-page-header {
    padding: 16px 0 0 0;
  }

  .arco-page-header-content {
    height: calc(100% - 42px);
    padding: 16px;
    position: relative;
  }
}
</style>
