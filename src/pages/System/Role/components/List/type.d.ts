import type { ISearchRoleVO } from '@/services/role/type'

export interface ISearchRef {
  getFormValue: () => void;
}

export interface IRole extends ISearchRoleVO{
  enabledLabel: string;
}
