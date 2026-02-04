<script setup lang="tsx">
import { Tag } from '@arco-design/web-vue';

import { formatDate } from '../../utils';
import { Ellipsis } from '../Ellipsis';
import type { EllipsisProps } from '../Ellipsis';
import { EMPTY_VALUE } from './constants';
import type { Emits, TypeFormatProps } from './types';

const props = withDefaults(defineProps<TypeFormatProps>(), {
  options: () => [],
  copy: false,
  ellipsis: false,
  link: false,
  type: 'string',
});

const emit = defineEmits<Emits>();

function onClick() {
  emit('click');
}

function getEllipsis() {
  let ellipsis: EllipsisProps = {
    disabled: true,
    expandable: false,
    rows: 1,
    popup: {
      type: 'tooltip',
      props: {
        contentClass: 'mi-typeFormat-tooltip',
      },
    },
  };

  if (props.ellipsis) {
    ellipsis.disabled = false;

    if (typeof props.ellipsis !== 'boolean') {
      ellipsis = Object.assign({}, ellipsis, props.ellipsis);
    }
  }

  return ellipsis;
}

function Render() {
  let showValue = EMPTY_VALUE;

  switch (props.type) {
    case 'tag':
    case 'option': {
      if (Array.isArray(props.value)) {
        const values = [];
        props.value.forEach((v) => {
          const matched = props.options?.find((opt) => opt.value === v);
          if (matched) {
            values.push(matched.label);
          } else {
            values.push(v);
          }
        });

        showValue = values.join(',') || EMPTY_VALUE;
      } else {
        const matched = props.options?.find((opt) => opt.value === props.value);
        showValue = matched?.label ?? props.value ?? EMPTY_VALUE;
      }

      break;
    }
    case 'time': {
      if (props.value) {
        showValue = formatDate(props.value, props.timeFormat);
      }
      break;
    }
    case 'string': {
      showValue = props.value || EMPTY_VALUE;

      if (Array.isArray(props.value) && props.value.length) {
        showValue = props.value.join(',');
      }

      break;
    }
    case 'number': {
      // 0需要展示
      showValue = props.value ?? EMPTY_VALUE;
      break;
    }
  }

  const dom = (
    <Ellipsis
      class={{
        'mi-typeFormat': true,
        'mi-typeFormat-link': props.link,
      }}
      {...getEllipsis()}
      copyable={showValue !== EMPTY_VALUE && props.copy}
      onClick={onClick}
      copyText={props.copyText || showValue}
      content={`${showValue}${props.unit ?? ''}`}
    />
  );

  if (props.type === 'tag') {
    const matched = props.options?.find((opt) => opt.value === props.value);
    return <Tag color={matched?.color}>{showValue}</Tag>;
  }

  return dom;
}
</script>

<template>
  <Render />
</template>

<style lang="less">
.mi-typeFormat.mi-typeFormat-link {
  color: rgb(var(--link-6));
  cursor: pointer;
}

.mi-typeFormat-tooltip {
  max-width: 40vw;
  max-height: 40vh;
  overflow: auto;

  @media (max-width: 768px) {
    max-width: calc(100vw - 36px);
  }
}
</style>
