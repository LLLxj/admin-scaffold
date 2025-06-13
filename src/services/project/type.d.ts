import type { ISearchPagation } from '../type'

export interface IProject {
  id: number;
  name: string;
  price: number;
  description?: string;
  enabled: boolean;
}

export interface IUpdateProject {
  userId: number;
  roleIds: number;
}

export interface ICreateProject {
  name: string;
  mobile: string;
  roleIds: number;
}

export interface ISearchProject extends ISearchPagation {
  name: string;
}