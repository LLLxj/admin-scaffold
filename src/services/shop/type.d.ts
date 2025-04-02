export interface IShop {
  id: number;
  name: string;
  mobile?: string;
  enabled: boolean;
  bossName?: string;
  contactName?: string;
  description?: string;
}

export interface ISearchShop {
  name?: string;
  mobile?: string;
}

export type ICreateShop = Omit<IShop, 'id' | 'enabled'>
export type IUpdateShop = Omit<IShop, 'enabled'>
