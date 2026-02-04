import { nanoid } from 'nanoid';

interface CallbackRes {
  result: any; // 返回结果
  callbackId: string; // 回调 ID
}
declare const global: any;
const _window: any = typeof window !== 'undefined' ? window : global;

export class WebViewBridge {
  private callbacks: Map<string, (result: any) => void> = new Map();

  constructor() {
    _window.handleWebViewCallback = this.handleWebViewCallback.bind(this);
  }

  private checkWebView() {
    if (
      !_window.WebViewJavascriptBridge ||
      !_window.WebViewJavascriptBridge.callWebView
    ) {
      console.error('WebView没有正确初始化调用通道');
      return false;
    }

    return true;
  }

  private handleWebViewCallback(response: string): void {
    try {
      const { result, callbackId }: CallbackRes = JSON.parse(response);
      const callback = this.callbacks.get(callbackId);
      if (callback) {
        callback(result);
        this.callbacks.delete(callbackId);
      }
    } catch (err) {
      console.error('回调错误', err);
    }
  }

  public callWebView<T>(method: string, params: any = {}): T | undefined {
    const payload = JSON.stringify({
      method,
      params,
    });

    if (!this.checkWebView()) {
      return undefined;
    }

    const result = _window.WebViewJavascriptBridge?.callWebView?.(payload);

    try {
      return JSON.parse(result);
    } catch (err) {
      console.error('回调错误', err);
      return undefined;
    }
  }

  public callWebViewAsync<T>(method: string, params: any = {}): Promise<T> {
    return new Promise((resolve) => {
      if (!this.checkWebView()) {
        return;
      }

      const callbackId = nanoid();
      const payload = JSON.stringify({ method, params, callbackId });

      this.callbacks.set(callbackId, resolve);

      _window.WebViewJavascriptBridge.callWebViewAsync(payload);
    });
  }
}

export const webViewBridge = new WebViewBridge();
