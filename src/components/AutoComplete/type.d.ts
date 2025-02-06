import type { SelectProps } from "antd";

export interface CommonAutoCompleteProps extends SelectProps {
  debounceWait?: number; // 延迟时间
  asyncHandle?: (data: any) => Promise<any>; // request api
  asyncParams?: any; // request data
  refreshDeps?: boolean;
  selectKey: string; // value 的key
  selectLabel: string; // label 的key
  searchKeyword: string; // 查询关键字
}