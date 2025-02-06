export interface ISetRefreshDeps {
  setLeft: () => void;
  setRight: () => void;
  toggle: () => void;
}

export interface IModalRef {
  init: (data?: any) => void;
}

export type IHandleType = 'enabled' | 'disabled' | 'delete';

export interface ISearchProps {
  searchHandle: () => void;
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

