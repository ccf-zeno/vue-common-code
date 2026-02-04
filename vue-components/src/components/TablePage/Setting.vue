<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import { IconDragDotVertical } from '@arco-design/web-vue/es/icon';
import { VueDraggable } from 'vue-draggable-plus';

import { useClass, useModal } from '../../hooks';
import type { SettingProps } from './types';

const props = defineProps<SettingProps>();

const { visible, container, setResult } = useModal();

const { cls } = useClass('tablePage-setting');

const checkedColumns = ref([...props.showColumns]);
const centerColumns = ref(
  checkedColumns.value.filter(
    (dataIndex) => !props.columnMap.get(dataIndex)?.fixed,
  ),
);

const fixedColumns = computed(() => {
  return checkedColumns.value.filter(
    (dataIndex) => props.columnMap.get(dataIndex)?.fixed,
  );
});

async function onSubmit() {
  const fixedLeft = checkedColumns.value.filter(
    (dataIndex) => props.columnMap.get(dataIndex)?.fixed === 'left',
  );

  const fixedRight = checkedColumns.value.filter(
    (dataIndex) => props.columnMap.get(dataIndex)?.fixed === 'right',
  );

  const finalOrder = [];

  [...fixedLeft, ...centerColumns.value, ...fixedRight].forEach((item) => {
    if (props.columnMap.get(item)) {
      finalOrder.push(item);
    }
  });

  Message.success('操作成功');
  setResult({
    type: 'ok',
    data: finalOrder,
  });
}

watch(checkedColumns, (val) => {
  const currentCenter = val.filter(
    (dataIndex) => !props.columnMap.get(dataIndex)?.fixed,
  );

  // 保留已有顺序 + 补充新增
  const newCenter = [
    ...centerColumns.value.filter((i) => currentCenter.includes(i)),
    ...currentCenter.filter((i) => !centerColumns.value.includes(i)),
  ];

  centerColumns.value = newCenter;
});
</script>

<template>
  <a-drawer
    v-model:visible="visible"
    width="600px"
    :popup-container="container"
    title="表格设置"
    :on-before-ok="onSubmit"
  >
    <div :class="cls('columnSetting')">
      <div :class="[cls('columnSetting-hidden'), cls('columnSetting-section')]">
        <div :class="cls('columnSetting-section-title')">可展示列</div>
        <div :class="cls('columnSetting-section-content')">
          <a-checkbox-group v-model="checkedColumns" direction="vertical">
            <a-checkbox
              v-for="item in props.columns"
              :key="item.dataIndex"
              :value="item.dataIndex"
            >
              {{ item.title }}
            </a-checkbox>
          </a-checkbox-group>
        </div>
      </div>

      <div :class="[cls('columnSetting-show'), cls('columnSetting-section')]">
        <div :class="cls('columnSetting-section-title')">已展示列</div>
        <div :class="cls('columnSetting-section-content')">
          <VueDraggable v-model="centerColumns">
            <template v-for="dataIndex in centerColumns" :key="dataIndex">
              <div
                v-if="props.columnMap.get(dataIndex)"
                :class="cls('columnSetting-section-item')"
              >
                <IconDragDotVertical />
                {{ props.columnMap.get(dataIndex)?.title }}
              </div>
            </template>
          </VueDraggable>

          <template v-if="fixedColumns.length">
            <a-divider />
            <div :class="cls('columnSetting-section-subTitle')">
              以下固定列无法调整顺序
            </div>
            <div
              v-for="dataIndex in fixedColumns"
              :key="dataIndex"
              :class="[cls('columnSetting-section-item'), 'fixed']"
            >
              {{ props.columnMap.get(dataIndex)?.title }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<style lang="less">
@import '../../token.less';

@cls: ~'@{prefix}-tablePage-setting';

.@{cls} {
  &-columnSetting {
    display: flex;
    height: 100%;
  }

  &-columnSetting-section {
    width: 50%;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;

    &-title {
      font-size: 16px;
      font-weight: 500;
    }

    &-subTitle {
      font-size: 14px;
      font-weight: 500;
    }

    &-content {
      flex: 1;
      height: 1px;
      overflow-y: auto;
    }

    &-item {
      height: 32px;
      display: flex;
      gap: 12px;
      align-items: center;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: var(--color-fill-3);
      }
    }
  }

  &-columnSetting-hidden {
    border-right: 1px solid var(--color-border-3);
    padding-right: 4px;
  }

  &-columnSetting-show {
    padding-left: 12px;
  }
}
</style>
