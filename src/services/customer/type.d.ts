import type { ISearchPagation, ICommonItem } from '../type'

export interface ICustomer {
  id: number;
  name: string;
  mobile: string;
  birthDate: string;
  gender: string;
  department: ICommonItem;
  shop: ICommonItem;
  user: ICommonItem;
  enabled: boolean;
}

export interface IUpdateCustomer {
  userId: number;
  roleIds: number;
}

export interface ICreateCustomer {
  name: string;
  mobile: string;
  roleIds: number;
}

export interface ISearchCustomer extends ISearchPagation {
  name: string;
}