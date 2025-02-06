import type { IPages } from '@/components/Table/type';
import type { ISetRefreshDeps } from '@/pages/type';

export interface ITagSearchRef {
  getFormValue: () => void;
}

export interface ITagListProps {
  list: ITag[];
  loading: boolean;
  pages?: IPages;
  setRefreshDeps: ISetRefreshDeps;
  height?: number;
}
export interface ITag {
  id: string;
  name: string;
  resource: string;
  enabled: boolean;
  enabledLabel: string;
  deleted: boolean;
}

