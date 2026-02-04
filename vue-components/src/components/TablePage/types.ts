import type { Reactive, Ref } from 'vue';
import type { TableProps } from '@arco-design/web-vue/es/table/interface';
import type { PaginationOptions, PaginationQueryResult } from 'vue-request';

import type { FilterData } from '../Filters';
import { TableColumnData } from '../Table/types';

export interface TablePageProps {
  context: useTablePageContext;
  columns: TableColumnData[];
  filters?: FilterData[];
  /**
   * arco表格的props，arco的类型定义有问题，请参照官网API
   */
  tableProps?: Partial<TableProps> & Record<string, any>;
}

type TableTool = 'setting' | 'refresh';

export interface useTablePageOptions extends PaginationOptions<any, any> {
  filter?: {
    default?: Record<string, any>;
    rangeKeys?: string[];
    timeFormat?: 'unix' | 'valueOf';
  };
  tableKey?: string; // 每个table一个独立的key，用户存放该table的设置
  tableTools?: TableTool[];
}

export interface useTablePageContext {
  queryContext: PaginationQueryResult<QueryResult<any>, any>;
  filterForm: Reactive<any>;
  refresh: () => void;
  loading: Ref<boolean, boolean>;
  onSorterChange: (a: string, b: string) => void;
  selectedKeys: Ref<any[]>;
  tableKey?: string;
  tableTools: TableTool[];
}

export interface QueryParams {
  current: number;
  size: number;
  [x: string]: any;
}

export interface QueryResult<T = any> {
  records: T[];
  total?: number;
  size?: number;
  current?: number;
  pages?: number;
}

export type QueryFunction<T = any> = (
  params: QueryParams,
) => Promise<QueryResult<T>>;

export interface SettingProps {
  columns: TableColumnData[];
  showColumns: string[];
  columnMap: Map<string, TableColumnData>;
}
