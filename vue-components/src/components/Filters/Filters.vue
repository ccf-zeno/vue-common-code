<script setup lang="tsx">
import { computed, ref, useTemplateRef } from 'vue';
import { Input, RangePicker, Select } from '@arco-design/web-vue';
import { IconDown, IconUp } from '@arco-design/web-vue/es/icon';
import { useResizeObserver } from '@vueuse/core';

import type { FilterData, FiltersProps } from './types';

const props = defineProps<FiltersProps>();

const formRef = useTemplateRef('formContent');
const firstRowHeight = ref<number>(32); // 默认第一行高度
const expand = ref<boolean>(false);

const commonWidth = '200px';

// 监控表单容器，计算第一行高度
useResizeObserver(formRef, (entries) => {
  const entry = entries[0];
  const formElement = entry.target as HTMLElement;
  const items = formElement.querySelectorAll('.arco-form-item');
  if (items.length === 0) return;

  // 找出第一行的 top 值
  const firstRowTop = Array.from(items)
    .map((item) => (item as HTMLElement).offsetTop)
    .reduce((min, curr) => Math.min(min, curr), Infinity);

  // 找出第一行高度（第一行元素高度最大值）
  let maxHeight = 0;
  items.forEach((item) => {
    const el = item as HTMLElement;
    if (el.offsetTop === firstRowTop) {
      if (el.offsetHeight > maxHeight) maxHeight = el.offsetHeight;
    }
  });

  firstRowHeight.value = maxHeight;
});

// 监控整个表单高度（展开时使用）
const totalFormHeight = ref<number>(32);
useResizeObserver(formRef, (entries) => {
  const entry = entries[0];
  totalFormHeight.value = entry.contentRect.height;
});

// 计算表单显示高度
const formShowHeight = computed(() => {
  if (!expand.value) {
    return `${firstRowHeight.value}px`;
  }
  return `${totalFormHeight.value}px`;
});

function Filter(_props: { filter: FilterData }) {
  const { filterForm } = props;
  const { filter } = _props;

  const { key, componentProps = {}, width, render, component } = filter;

  const commonProps = {
    modelValue: filterForm[key],
    'onUpdate:modelValue': (v: any) => {
      filterForm[key] = v;
    },
    style: {
      width: width ? `${width}px` : commonWidth,
    },
    allowClear: true,
    ...componentProps,
  };

  if (!render && !component) {
    throw new Error('Filters render or component is required!!!');
  }

  if (render) {
    return render({
      ...commonProps,
      allowSearch: true,
    });
  }

  switch (component) {
    case 'Input': {
      return <Input {...commonProps} />;
    }
    case 'Select': {
      return <Select allowSearch {...commonProps} />;
    }
    case 'RangePicker': {
      return <RangePicker {...commonProps} />;
    }
  }
}

function onExpand() {
  expand.value = true;
}

function onCollapse() {
  expand.value = false;
}
</script>

<template>
  <div class="mi-filters">
    <div class="mi-filters-form" :style="{ maxHeight: formShowHeight }">
      <div ref="formContent" class="mi-filters-form-content">
        <a-form :model="{}" layout="inline">
          <a-form-item
            v-for="filter of filters"
            :key="filter.key"
            :label="filter.title"
          >
            <Filter :filter="filter" />
          </a-form-item>
        </a-form>
      </div>
    </div>

    <div class="mi-filters-tool">
      <slot name="tools" />

      <template v-if="totalFormHeight > firstRowHeight">
        <a-link v-if="!expand" @click="onExpand">
          展开
          <template #icon>
            <IconDown />
          </template>
        </a-link>
        <a-link v-else @click="onCollapse">
          收起
          <template #icon>
            <IconUp />
          </template>
        </a-link>
      </template>
    </div>
  </div>
</template>

<style lang="less">
.mi-filters {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.mi-filters-form {
  flex: 1;
  overflow: hidden;
  transition: max-height 0.3s ease; /* 平滑高度过渡 */
}

.mi-filters-form-content {
  .arco-form {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .arco-form-item-layout-inline {
    margin: 0;
  }

  .arco-form-layout-inline .arco-form-item {
    margin-bottom: 0;
  }
}

.mi-filters-tool {
  display: flex;
  gap: 6px;
  height: 32px;
  align-items: center;
}
</style>
