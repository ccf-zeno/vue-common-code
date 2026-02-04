export interface EllipsisProps {
  /**
   * 显示多少行，默认1行
   */
  rows?: number;
  /**
   * 展开收起功能
   */
  expandable?: boolean;

  /**
   * 复制功能
   */
  copyable?: boolean;
  /**
   * 复制文案
   */
  copyText?: string;
  /**
   * 可以修改弹出层
   */
  popup?: {
    type: 'tooltip';
    props?: Record<string, any>;
  };
  disabled?: boolean;
  content?: string;
}
