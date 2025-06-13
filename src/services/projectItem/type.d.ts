import type { ISearchPagation } from '../type'
import type { ICategory } from '@/type'

export interface IProjectItem {
  id: number;
  name: string;
  price: number;
  description?: string;
  enabled: boolean;
  category: ICategory;
}

export interface IUpdateProjectItem {
  userId: number;
  roleIds: number;
}

export interface ICreateProjectItem {
  name: string;
  mobile: string;
  roleIds: number;
}

export interface ISearchProjectItem extends ISearchPagation {
  name: string;
}