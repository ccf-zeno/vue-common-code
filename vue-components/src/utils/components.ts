import type { PropType } from 'vue';

type Emits = string[] | Record<string, any> | undefined;
type Emit = (event: string, ...args: any[]) => void;

/**
 * 这里是处理二次封装组件的2种解法
 * 1是直接遍历原组件事件，然后把原组件的事件全都手动写一个函数去调用现在的emit
 * 2是直接遍历原组件的事件，把所有事件都变成props，利用vue会自动把onXxx的props转换成 @xxx 的特性来传递事件
 */

export function handleEmits(rawEmits: Emits, emit: Emit) {
  const events: Record<string, any> = {};

  if (!rawEmits) {
    return events;
  }

  const keyList = Array.isArray(rawEmits) ? rawEmits : Object.keys(rawEmits);

  for (const key of keyList) {
    events[key] = (...args: any[]) => {
      emit(key, ...args);
    };
  }

  return events;
}

export function extractEmits(rawEmits: Emits) {
  const events: Record<string, any> = {};

  for (const key of Object.keys(rawEmits)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const emit = rawEmits[key];

    events[`on${capitalizeFirstLetter(key)}`] = {
      type: Function as PropType<typeof emit>,
    };
  }

  return events;
}

export function capitalizeFirstLetter(str) {
  if (!str) return str; // 如果字符串为空，返回原值
  return str.charAt(0).toUpperCase() + str.slice(1);
}
