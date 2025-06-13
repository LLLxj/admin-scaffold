import type { ISearchPagation } from '../type'

export interface IConsumer {
  id: number;
  name: string;
  price: number;
  stock: number;
  description?: string;
  enabled: boolean;
}

export interface IUpdateConsumer {
  userId: number;
  roleIds: number;
}

export interface ICreateConsumer {
  name: string;
  mobile: string;
  roleIds: number;
}

export interface ISearchConsumer extends ISearchPagation {
  name: string;
}