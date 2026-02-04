import type {
  TableColumnData as ArcoTableColumnData,
  TableProps as ArcoTableProps,
  TableData,
} from '@arco-design/web-vue/es/table/interface';

import type { TypeFormatProps } from '../TypeFormat';

export interface TableProps extends Omit<ArcoTableProps, 'columns'> {
  columns: TableColumnData[];
}

export interface TableColumnData
  extends Omit<ArcoTableColumnData, 'sortable'>,
    Omit<TypeFormatProps, 'value' | 'copyText' | 'ellipsis'> {
  copyText?: (data: tableColumnParams) => string;
  onLinkClick?: (ata: tableColumnParams) => void;
  sortable?: boolean;
  unit?: string;
  formatValue?: (data: {
    record: TableData;
    column: TableColumnData;
    rowIndex: number;
  }) => string | number | undefined | null | boolean;
  defaultShow?: boolean;
}

export interface tableColumnParams {
  record: TableData;
  column: ArcoTableColumnData;
  rowIndex: number;
}
