export {};

declare module 'vue' {
  export interface GlobalComponents {
    MiAddBtn: (typeof import('@toolmatrix/core'))['AddBtn'];
    MiAutoFontSize: (typeof import('@toolmatrix/core'))['AutoFontSize'];
    MiBlock: (typeof import('@toolmatrix/core'))['Block'];
    MiCard: (typeof import('@toolmatrix/core'))['Card'];
    MiDrawer: (typeof import('@toolmatrix/core'))['Drawer'];
    MiEllipsis: (typeof import('@toolmatrix/core'))['Ellipsis'];
    MiFilters: (typeof import('@toolmatrix/core'))['Filters'];
    MiModal: (typeof import('@toolmatrix/core'))['Modal'];
    MiPageLayout: (typeof import('@toolmatrix/core'))['PageLayout'];
    MiPermission: (typeof import('@toolmatrix/core'))['Permission'];
    MiPullRefresh: (typeof import('@toolmatrix/core'))['PullRefresh'];
    MiSelect: (typeof import('@toolmatrix/core'))['Select'];
    MiSpin: (typeof import('@toolmatrix/core'))['Spin'];
    MiTable: (typeof import('@toolmatrix/core'))['Table'];
    MiTablePage: (typeof import('@toolmatrix/core'))['TablePage'];
    MiTypeFormat: (typeof import('@toolmatrix/core'))['TypeFormat'];
  }
}
