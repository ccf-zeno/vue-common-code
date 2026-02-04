<script setup lang="ts">
import { CardProps } from './types';

withDefaults(defineProps<CardProps>(), {
  fullHeight: false,
  header: false,
});
</script>

<template>
  <a-spin
    :class="{
      'mi-card': true,
      'mi-card-full': fullHeight,
    }"
    :loading="loading"
  >
    <div
      v-if="header"
      :class="{
        'mi-card-header': true,
        'mi-card-header-shadow': false,
      }"
    >
      <div class="mi-card-title">
        <div class="mi-card-title-line" />
        <template v-if="$slots.title">
          <slot name="title" />
        </template>
        <template v-else>
          {{ title }}
        </template>

        <span class="mi-card-title-desc">
          <template v-if="$slots.desc">
            <slot name="desc" />
          </template>
          <template v-else>
            {{ desc }}
          </template>
        </span>
      </div>

      <a-space class="mi-card-tools">
        <slot name="tools" />
      </a-space>
    </div>

    <div ref="body" :class="['mi-card-body', bodyClass]">
      <slot />
    </div>
  </a-spin>
</template>

<style lang="less">
.mi-card.arco-spin {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border-radius: var(--border-radius);
  position: relative;
}

.mi-card-full {
  height: 100%;

  .mi-card-body {
    height: 100%;
    overflow: auto;
  }
}

.mi-card-header {
  display: flex;
  padding: 16px 16px 0 16px;

  .mi-card-title {
    font-size: 16px;
    font-weight: bold;
    flex: 1;
    display: flex;
    align-items: center;

    .mi-card-title-line {
      width: 4px;
      height: 16px;
      background-color: var(--color-primary-5);
      margin-right: 8px;
    }

    .mi-card-title-desc {
      font-size: 14px;
      color: var(--color-text-2);
      font-weight: 400;
      margin-left: 8px;
    }
  }

  .mi-card-tools {
    display: flex;
  }
}

.mi-card-header-shadow {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.mi-card-body {
  padding: 16px;
}
</style>
