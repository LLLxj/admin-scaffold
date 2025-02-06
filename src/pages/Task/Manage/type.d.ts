import type { IPages } from '@/components/Table/type';
import type { ISetRefreshDeps } from '@/pages/type';

export interface ITaskSearchRef {
  getFormValue: () => void;
}

export interface ITaskListProps {
  list: ITask[];
  loading: boolean;
  pages?: IPages;
  setRefreshDeps: ISetRefreshDeps;
}

export interface ITask {
  id: number;
  content: string;
  deleted: boolean;
  enabled: boolean;
  enabledLabel: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  tag: {
    id: number,
    name: string,
  },
  tag: ITag;
}

export interface ITag {
  id: string;
  name: string;
  resource: string;
  enabled: boolean;
  deleted: boolean;
}

export interface ITaskActionProps {
  record: ITask;
  setRefreshDepsFn: ISetRefreshDeps;
  currentId?: number;
}

export interface IUseHandleRequestProps {
  setRefreshDepsFn: ISetRefreshDeps;
}

