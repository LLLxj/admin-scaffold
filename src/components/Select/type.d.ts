import type { SelectProps, DefaultOptionType } from 'antd';

export interface ICommonSelectProps extends SelectProps {
  debounceWait?: number; // 延迟时间
  asyncHandle?: (data: any) => Promise<any>; // request api
  asyncParams?: any; // request data
  refreshDeps?: boolean;
  selectKey?: string; // value 的key
  selectLabel?: string; // label 的key
}

export type ISelectOption = DefaultOptionType

export interface ISelectOptGroupOption {
  label: React.ReactNode;
  title: string;
  options: ISelectOption[]
}
