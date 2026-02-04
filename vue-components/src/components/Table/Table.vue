<script lang="tsx">
import { computed, defineComponent } from 'vue';
import type { DefineComponent, PropType } from 'vue';
import { Table } from '@arco-design/web-vue';
import type { TableColumnData as ArcoTableColumnData } from '@arco-design/web-vue/es/table/interface';
import { omit } from 'lodash-es';

import { handleEmits } from '../../utils/components';
import { TypeFormat } from '../TypeFormat';
import { EMPTY_VALUE } from '../TypeFormat/constants';
import type { TableColumnData } from './types';

const MiTableImpl = defineComponent({
  name: 'MiTable',
  components: {
    ArcoTable: Table,
  },
  extends: Table,
  props: {
    columns: {
      type: Array as PropType<TableColumnData[]>,
      default: () => [],
    },
  },
  setup: (props, { slots, emit }) => {
    const arcoProps = computed(() => {
      return omit(props, ['columns']) as any;
    });
    const arcoSlots: Record<string, any> = slots;

    const arcoEmits = handleEmits(Table.emits, emit);

    const dealColumns = computed(() => {
      return props.columns.map((column) => {
        const {
          title,
          dataIndex,
          width,
          ellipsis,
          render,
          type,
          copy,
          options,
          timeFormat,
          copyText,
          link,
          slotName,
          sortable,
          onLinkClick,
          unit,
          formatValue,
          ...rawColumnConfig
        } = column;

        const columnConfig: ArcoTableColumnData = {
          title,
          dataIndex,
          width,
          render,
          ellipsis: ellipsis,
          tooltip: ellipsis ? true : false,
          slotName,
          sortable: sortable
            ? {
                sortDirections: ['ascend', 'descend'],
                sorter: true,
              }
            : undefined,
          ...rawColumnConfig,
        };

        if (!render && !slotName) {
          columnConfig.ellipsis = false;
          columnConfig.tooltip = false;
          columnConfig.render = (columnOptions) => {
            const { record } = columnOptions;

            if (!dataIndex) {
              return EMPTY_VALUE;
            }

            const _copyText =
              copyText?.(columnOptions) ?? String(record[dataIndex]);

            const _value =
              formatValue?.({
                record,
                column,
                rowIndex: columnOptions.rowIndex,
              }) ?? record[dataIndex];

            return (
              <TypeFormat
                type={type}
                value={_value}
                unit={unit}
                copy={copy}
                options={options}
                ellipsis={ellipsis}
                timeFormat={timeFormat}
                copyText={_copyText}
                link={link}
                onClick={() => {
                  onLinkClick?.(columnOptions);
                }}
              />
            );
          };
        }

        return columnConfig;
      });
    });

    return {
      arcoProps,
      arcoSlots,
      arcoEmits,
      dealColumns,
    };
  },
});

// extends对于相同的props的类型无法覆盖，是&操作，因此这里需要强行覆盖props的类型
type ArcoTableInstance = InstanceType<typeof Table>;
type ArcoTableProps = ArcoTableInstance['$props'];
// 构建自己的props
type MiTableProps = Omit<ArcoTableProps, 'columns'> & {
  columns: TableColumnData[];
};
// 导出完整的类型
export default MiTableImpl as unknown as DefineComponent<
  MiTableProps,
  Omit<ArcoTableInstance, '$props'>
>;
</script>

<template>
  <ArcoTable
    class="mi-table"
    :columns="dealColumns"
    v-bind="arcoProps"
    v-on="arcoEmits"
  >
    <template
      v-for="slotName of Object.keys(arcoSlots)"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>

    <template v-if="arcoProps.rowSelection" #pagination-left>
      <div class="mi-tablePage-paginationLeft">
        已选 {{ arcoProps.selectedKeys.length }} 条
      </div>
    </template>
  </ArcoTable>
</template>

<style lang="less">
.mi-table-paginationLeft {
  width: 100%;
}
</style>
