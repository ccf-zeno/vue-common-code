import type { Reactive, VNode } from 'vue';

export interface FiltersProps {
  filters: FilterData[];
  filterForm: Reactive<any>;
}

export interface FilterData {
  title: string;
  key: string;
  component?: 'Input' | 'Select' | 'RangePicker';
  componentProps?: Record<string, any>;
  width?: number;
  render?: (params: {
    modelValue: any;
    'onUpdate:modelValue': (a: any) => void;
    style: any;
    allowClear: boolean;
    allowSearch: boolean;
  }) => VNode;
}
