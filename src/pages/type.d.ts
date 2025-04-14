import type { FormInstance } from "antd";
export interface ISetRefreshDeps {
  setLeft: () => void;
  setRight: () => void;
  toggle: () => void;
}

export type ISuccessCallback = () => void;

export interface IModalRef {
  init: (data?: any) => void;
}

export type IHandleType = 'enabled' | 'disabled' | 'delete';

export interface ISearchProps {
  searchHandle: () => void;
  form: FormInstance;
}
export interface ISearchRefProps {
  getFormValue: () => void;
}

export interface DataComponentProps {
  initData: () => void;
  setData: (data: any) => void;
  resetData: () => void;
}

export interface EditProps {
  id?: number;
  inTable?: boolean;
  type?: 'primary' | 'link';
  successCallback?: () => void;
}

export interface ISearchRef {
  getFormValue: () => void;
}

export interface ISearchProps {
  searchHandle: () => void;
  form: FormInstance;
}

