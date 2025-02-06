export interface ICommonColumn {
  enabled: boolean;
  enabledLabel: string;
  deleted: boolean;
  updateTime?: string;
}

export interface ISearchPagation {
  current: number;
  pageSize: number;
}

export interface ISearchCommonResponse {
  id: number;
  name: string;
  code: string;
  enabled: boolean;
  createTime: string;
}

export type ButtonType =
  | "default"
  | "link"
  | "text"
  | "primary"
  | "dashed"
  | undefined