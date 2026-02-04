import type { formatDateType } from '../../utils/date';
import type { EllipsisProps } from '../Ellipsis';

export interface TypeFormatProps {
  type?: 'option' | 'string' | 'number' | 'tag' | 'time';
  value: any;
  options?: { label: string; value: any; [x: string]: any }[];
  timeFormat?: formatDateType;
  copy?: boolean;
  copyText?: string;
  ellipsis?: boolean | EllipsisProps;
  link?: boolean;
  unit?: string;
}

export interface Emits {
  (e: 'click'): void;
}
