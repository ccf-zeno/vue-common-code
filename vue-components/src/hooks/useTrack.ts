import { useIntersectionObserver } from '@vueuse/core';

interface Options {
  defaultData?: any;
}

export const useTrack = (options: Options = {}) => {
  const { defaultData } = options;

  function track(action: string, data: any = {}) {
    try {
      window?.ath_send?.(
        action,
        {
          ...data,
          ...defaultData,
        },
        'beacon',
      );
    } catch {}
  }

  function trackClick(data: any) {
    try {
      track('tl_common_click', {
        operateType: 'singleClick',
        ...defaultData,
        ...data,
      });
    } catch {}
  }

  function trackShow(data: any) {
    try {
      track('tl_common_exposure', {
        ...defaultData,
        ...data,
      });
    } catch {}
  }

  function trackTime(data: any) {
    try {
      track('tl_common_duration', {
        ...defaultData,
        ...data,
      });
    } catch {}
  }

  function trackCount(data: any) {
    try {
      track('tl_common_count', {
        ...defaultData,
        ...data,
      });
    } catch {}
  }

  return {
    track,
    trackClick,
    trackShow,
    trackTime,
    trackCount,
    useIntersectionObserver,
  };
};
