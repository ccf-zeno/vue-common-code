<script setup lang="tsx">
import { computed, onMounted, useSlots, watch } from 'vue';
import { PaginationProps } from '@arco-design/web-vue';
import { IconRefresh, IconSettings } from '@arco-design/web-vue/es/icon';
import { useStorage } from '@vueuse/core';
import { isEqual, omit } from 'lodash-es';
import { nanoid } from 'nanoid';

import { useClass, useModalOpen } from '../../hooks';
import { Filters } from '../Filters';
import { Table } from '../Table';
import Button from './Button.vue';
import Setting from './Setting.vue';
import type { TablePageProps } from './types';

const props = defineProps<TablePageProps>();

const { queryContext, filterForm, onSorterChange, selectedKeys, tableTools } =
  props.context;

const { total, current, pageSize, data, loading } = queryContext;

const rawColumns = computed(() => {
  return props.columns.map((item) => ({
    ...item,
    dataIndex: item.dataIndex ?? item.title,
  }));
});

const tableColumnMap = computed(() => {
  const map = new Map();
  rawColumns.value.forEach((item) => {
    map.set(item.dataIndex, item);
  });
  return map;
});

const defaultColumns = computed(() => {
  const list = [];
  rawColumns.value.forEach((item) => {
    if (item.defaultShow) {
      list.push(item.dataIndex);
    }
  });

  if (list.length) {
    return list;
  }

  return rawColumns.value.map((item) => item.dataIndex);
});

const tableSettings = useStorage(
  `mi-tableSettings_${props.context.tableKey ?? nanoid()}`,
  {
    showColumns: defaultColumns.value,
    defaultColumns: defaultColumns.value,
  },
);

const tableSlots: Record<string, any> = omit(useSlots(), [
  'toolSection',
  'filterTool',
]);

const { cls } = useClass('tablePage');
const openModal = useModalOpen();

const pagination = computed(() => {
  if (props.tableProps?.pagination === false) {
    return false;
  }

  const paginationProps = {
    total: total.value,
    current: current.value,
    pageSize: pageSize.value,
    showPageSize: true,
    showTotal: true,
    pageSizeOptions: [10, 20, 30, 50, 100, 200],
    onChange: (page: number) => {
      current.value = page;
    },
    onPageSizeChange: (size: number) => {
      pageSize.value = size;
    },
  } as PaginationProps;

  if (
    props.tableProps?.pagination &&
    typeof props.tableProps?.pagination !== 'boolean'
  ) {
    return {
      ...paginationProps,
      ...props.tableProps?.pagination,
    };
  }

  return paginationProps;
});

const columns = computed(() => {
  const list = [];
  tableSettings.value.showColumns.forEach((item) => {
    const column = tableColumnMap.value.get(item);
    if (column) {
      list.push(column);
    }
  });
  return list;
});

function onRefresh() {
  queryContext.refresh();
}

async function onSettings() {
  const { result } = await openModal({
    render: () => {
      return (
        <Setting
          columns={rawColumns.value}
          showColumns={tableSettings.value.showColumns}
          columnMap={tableColumnMap.value}
        />
      );
    },
  });

  if (result.type === 'ok') {
    tableSettings.value.showColumns = result.data;
  }
}

function updateDefaultColumns() {
  // 默认列和已保存的发生改变则更新默认列
  if (!isEqual(tableSettings.value.defaultColumns, defaultColumns.value)) {
    const oldDefaultColumns = tableSettings.value.defaultColumns;

    tableSettings.value.defaultColumns = defaultColumns.value;

    // 如果自己本身没有设置过展示列，那么就用新的默认列来更新展示列
    if (isEqual(tableSettings.value.showColumns, oldDefaultColumns)) {
      tableSettings.value.showColumns = defaultColumns.value;
    }
  }
}

onMounted(() => {
  updateDefaultColumns();
});

watch(
  () => props.columns,
  () => {
    updateDefaultColumns();
  },
);
</script>

<template>
  <div :class="cls()">
    <Filters
      v-if="props.filters?.length"
      :filters="props.filters"
      :filterForm="filterForm"
    >
      <template #tools>
        <slot name="filterTool" />
      </template>
    </Filters>

    <div :class="cls('toolSection')">
      <div :class="cls('toolSection-left')">
        <slot name="toolSection" />
      </div>
      <div v-if="tableTools.length" :class="cls('toolSection-tableTools')">
        <Button v-if="tableTools.includes('refresh')" @click="onRefresh">
          <IconRefresh />
        </Button>
        <Button v-if="tableTools.includes('setting')" @click="onSettings">
          <IconSettings />
        </Button>
      </div>
    </div>

    <Table
      v-model:selectedKeys="selectedKeys"
      :data="data?.records"
      :columns="columns"
      :loading="loading"
      :scroll="{
        x: '100%',
        y: '100%',
      }"
      v-bind="(props.tableProps as any)"
      :pagination="pagination"
      @sorterChange="onSorterChange"
    >
      <template
        v-for="slotName of Object.keys(tableSlots)"
        #[slotName]="slotProps"
      >
        <slot :name="slotName" v-bind="slotProps" />
      </template>
    </Table>
  </div>
</template>

<style lang="less">
@import '../../token.less';

@cls: ~'@{prefix}-tablePage';

.@{cls} {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .arco-table {
    overflow: hidden;
  }

  &-paginationLeft {
    width: 100%;
  }

  &-toolSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    &-left {
      flex: 1;
      display: flex;
      gap: 8px;
    }

    &-tableTools {
      display: flex;
      gap: 8px;
    }
  }
}
</style>
