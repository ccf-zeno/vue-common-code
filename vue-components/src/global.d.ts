declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare global {
  interface Window {
    /**
     * 广告
     */
    tmc_ads_send: (p: {
      'data-tmc-application': string;
      'data-tmc-seat': string;
    }) => void;

    WebViewJavascriptBridge?: {
      callHandler: (
        a: string,
        b?: {
          method: string;
          params?: any;
        },
        c?: (p: string) => void,
      ) => void;
    };

    // 埋点
    ath_send: (a: string, b: any, c: string) => void;
  }
}

export {};
