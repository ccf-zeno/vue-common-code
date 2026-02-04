<script setup lang="tsx">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { Message, Tooltip } from '@arco-design/web-vue';
import { IconCopy } from '@arco-design/web-vue/es/icon';
import { useResizeObserver } from '@vueuse/core';

import { useClass } from '../../hooks';
import { copy } from '../../utils';
import type { EllipsisProps } from './types';

/**
 * 组件思路：
 *  1. 复制一个真实渲染的dom到一个隐藏的容器中
 *  2. 通过内外部容器高度对比是否超出了高度
 * 细节点：
 *  1. tooltip不能包裹全部，否则action也会出来提示，这样效果很差，但是不包裹全部的话，向下展示则高度定位有问题，因此手动计算了需要偏移多少
 *  2. 复制按钮需要在复制的dom中也渲染一次
 *  3. 为了更好的展示复制按钮，需要把overflow和expanded进行关联
 */

const props = withDefaults(defineProps<EllipsisProps>(), {
  rows: 1,
  expandable: false,
  copyable: false,
  disabled: false,
});

const copyRef = ref<HTMLElement | null>(null);
const copyTextRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);

const overflow = ref<boolean>(false);
const expanded = ref<boolean>(false);
const textLineHeight = ref<number>(0);
const hideHeight = ref<number>(0);

const { cls } = useClass('ellipsis');

useResizeObserver(copyRef, checkOverflow);

const positionOffset = computed(() => {
  return [0, hideHeight.value];
});

const text = computed(() => {
  return props.content?.trim() || '';
});

function onCopy() {
  copy(props.copyText || text.value);
  Message.success('已复制');
}

/**
 * 因为复制按钮也需要参数计算宽度，所以复制按钮需要再备份的dom里面也参数渲染
 */
function copyBtn() {
  if (props.copyable) {
    return (
      <span class={cls('action-copy')} onClick={onCopy}>
        <IconCopy />
      </span>
    );
  }

  return null;
}

function action() {
  return (
    <div
      class={{
        [cls('action')]: true,
        [cls('action-collapsed')]: !expanded.value && overflow.value,
      }}
    >
      <copyBtn />

      {props.expandable && overflow.value ? (
        <span
          class={cls('action-text')}
          onClick={() => {
            expanded.value = !expanded.value;
          }}
        >
          {expanded.value ? '收起' : '展开'}
        </span>
      ) : null}
    </div>
  );
}

function checkOverflow() {
  if (!copyRef.value || !copyTextRef.value) {
    return;
  }

  overflow.value = copyRef.value.offsetHeight < copyTextRef.value.offsetHeight;
  // 超出后 默认收，没超出的话默认是展开状态
  // 这样操作方便action的显示和隐藏
  if (overflow.value) {
    expanded.value = false;
  } else {
    expanded.value = true;
  }
  hideHeight.value =
    copyRef.value.offsetHeight - copyTextRef.value.offsetHeight;
}

onMounted(() => {
  if (textRef.value) {
    textLineHeight.value = parseFloat(
      window.getComputedStyle(textRef.value).lineHeight,
    );
  }
});

watch(
  () => [props.content],
  async () => {
    await nextTick();
    checkOverflow();
  },
);
</script>

<template>
  <div :class="cls()">
    <div
      ref="copyRef"
      :class="[cls('copy'), cls('collapsed')]"
      :style="{
        WebkitBoxOrient: 'vertical',
        MozBoxOrient: 'vertical',
        WebkitLineClamp: rows,
      }"
    >
      <span ref="copyTextRef" :class="cls('copy-text')">
        {{ text }}<copyBtn />
      </span>
    </div>

    <div v-if="disabled" :class="cls('copy-content')">
      <span ref="textRef" :class="cls('text')"> {{ text }}<copyBtn /> </span>
    </div>

    <div
      v-else
      :class="{
        [cls('content')]: true,
        [cls('multiple')]: rows > 1,
        [cls('collapsed')]: !expanded,
      }"
      :style="{
        WebkitBoxOrient: 'vertical',
        MozBoxOrient: 'vertical',
        WebkitLineClamp: rows,
        '--ellipsis-line-height': textLineHeight + 'px',
      }"
    >
      <action v-if="!expanded" />

      <Tooltip
        :disabled="!overflow"
        :content="text"
        :popup-translate="{
          bottom: positionOffset,
          bl: positionOffset,
          br: positionOffset,
          lb: positionOffset,
          rb: positionOffset,
        }"
      >
        <span ref="textRef" :class="cls('text')">
          {{ text }}
        </span>
      </Tooltip>
      <action v-if="expanded" />
    </div>
  </div>
</template>

<style lang="less">
@import '../../token.less';

@cls: ~'@{prefix}-ellipsis';

.@{cls} {
  display: flex;
  position: relative;
  line-height: 1.5; // 这个很重要 一定要大于一行的字体高度

  &-copy {
    position: absolute;
    width: 100%;
    visibility: hidden;
    word-break: break-all;
    overflow: hidden;
  }

  &-content {
    word-break: break-all;
  }

  &-multiple {
    display: block;

    &::before {
      content: ' ';
      float: right;
      height: 100%;
      margin-bottom: calc(0px - var(--ellipsis-line-height));
    }
  }

  &-action {
    display: inline-block;

    &-collapsed {
      float: right;
      clear: both;
    }

    &-text {
      color: var(--color-primary-6);
      margin: 0 4px;
      cursor: pointer;

      &:hover {
        color: var(--color-primary-5);
      }
    }

    &-copy {
      cursor: pointer;
      margin-left: 2px;
    }
  }

  &-collapsed {
    display: -webkit-box;
    display: -moz-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
  }
}
</style>
