import { reactive, ref } from 'vue';
import { watchDebounced } from '@vueuse/core';
import dayjs from 'dayjs';
import { omit } from 'lodash-es';
import { usePagination } from 'vue-request';

import type {
  QueryFunction,
  useTablePageContext,
  useTablePageOptions,
} from './types';

export const useTablePage = (
  query: QueryFunction,
  options: useTablePageOptions,
) => {
  const {
    pagination,
    filter,
    tableKey,
    tableTools = ['refresh', 'setting'],
    ...otherRequestOptions
  } = options || {};
  const {
    default: defaultFilter,
    rangeKeys: filterRangeKeys = [],
    timeFormat = 'unix',
  } = filter || {};

  const filterForm = reactive<Record<string, any>>({ ...defaultFilter });
  const sorterForm = reactive<{
    sortBy?: string | undefined;
    sortWay?: 'ascend' | 'descend' | undefined;
  }>({
    sortBy: '',
    sortWay: undefined,
  });

  const selectedKeys = ref<any[]>([]);

  const pageSizeKey = pagination?.pageSizeKey || 'size';

  const queryContext = usePagination(
    (params) => {
      const payload: any = {
        ...params,
        ...omit(filterForm, filterRangeKeys),
        ...sorterForm,
      };

      filterRangeKeys.forEach((key) => {
        if (filterForm[key]) {
          payload[`${key}Start`] = dayjs(filterForm[key][0])
            .startOf('d')
            [timeFormat]();
          payload[`${key}End`] = dayjs(filterForm[key][1])
            .endOf('d')
            [timeFormat]();
        }
      });

      return query(payload);
    },
    {
      defaultParams: [
        {
          current: 1,
          [pageSizeKey]: 20,
        },
      ],
      pagination: {
        pageSizeKey,
        ...pagination,
      },
      ...otherRequestOptions,
    },
  );

  const { loading, refresh, current } = queryContext;

  function onSorterChange(dataIndex: string, direction: string) {
    if (direction === 'ascend' || direction === 'descend') {
      sorterForm.sortBy = dataIndex;
      sorterForm.sortWay = direction;
    } else {
      sorterForm.sortBy = undefined;
      sorterForm.sortWay = undefined;
    }
    current.value = 1;
  }

  watchDebounced(
    filterForm,
    () => {
      current.value = 1;
    },
    {
      debounce: 300,
    },
  );

  const context: useTablePageContext = {
    queryContext,
    filterForm,
    refresh,
    loading,
    onSorterChange,
    selectedKeys,
    tableKey,
    tableTools,
  };

  return context;
};
