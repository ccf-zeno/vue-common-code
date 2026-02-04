export function getUrlParam(key: string, type?: 'string'): string | undefined;
export function getUrlParam(key: string, type?: 'array'): string[] | undefined;
export function getUrlParam(key: string, type: 'string' | 'array' = 'string') {
  // 使用 URLSearchParams 解析当前 URL
  const params = new URLSearchParams(window.location.search);

  // 处理数组类型参数
  if (type === 'array') {
    const values = params.getAll(key);
    return values.length > 0 ? values : undefined;
  }

  // 处理字符串类型参数（兼容多值参数取第一个）
  const value = params.get(key);
  return value ?? undefined;
}

export const getLanguage = () => {
  const language = getUrlParam('lang') || navigator.language;
  const lang = language.toLowerCase();

  const i18nLang = lang.split('-')[0];
  return i18nLang || 'en';
};

export const sleep = (ms: number) => {
  return new Promise<void>((resolve) => {
    if (ms > 0) {
      setTimeout(() => {
        resolve();
      }, ms);
    } else {
      resolve();
    }
  });
};

/**
 * 将秒数转换为时分秒字符串
 */
export function separateTimeDigits(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  // 使用padStart确保每个数字是两位数
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  const secsStr = String(secs).padStart(2, '0');

  // 将每个字符分开放入数组
  const digitsArray = [...hoursStr, ...minutesStr, ...secsStr];

  return digitsArray;
}

export const callWebView = async (method: string, p?: any) => {
  return new Promise<any>((resolve) => {
    try {
      if (window?.WebViewJavascriptBridge?.callHandler) {
        window.WebViewJavascriptBridge.callHandler?.(
          'callAndroidNative',
          {
            method,
            params: p,
          },
          (res) => {
            if (res) {
              const result = JSON.parse(res);

              // 拿到的结构里面的data还会有可能被string化
              if (typeof result.data === 'string') {
                result.data = JSON.parse(result.data);
              }

              resolve(result);
            } else {
              resolve(true);
            }
          },
        );
      } else {
        resolve(false);
      }
    } catch {
      resolve(false);
    }
  });
};

export function getEnv() {
  const hostname = window.location.hostname;

  if (hostname.includes('localhost')) {
    return 'dev';
  } else if (hostname.includes('test') || hostname.includes('qa')) {
    return 'qa';
  } else {
    return 'prod';
  }
}

export async function copy(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      // 仅在执行成功时返回
      return;
    } catch (err) {
      console.error(
        err ??
          new DOMException('The request is not allowed', 'NotAllowedError'),
      );
    }
  }

  const span = document.createElement('span');
  span.textContent = text;

  span.style.whiteSpace = 'pre';

  document.body.appendChild(span);

  const selection = window.getSelection();
  const range = window.document.createRange();
  selection.removeAllRanges();
  range.selectNode(span);
  selection.addRange(range);

  let success = false;
  try {
    success = window.document.execCommand('copy');
  } catch (err) {
    console.error(err);
  }

  selection.removeAllRanges();
  window.document.body.removeChild(span);

  return success
    ? Promise.resolve()
    : Promise.reject(
        new DOMException('The request is not allowed', 'NotAllowedError'),
      );
}
