export interface IAccount {
  id: number;
  username: string;
  mobile: string;
  roles: IRole[];
  enabled: boolean;
  enabledLabel: string;
}

export interface IRole {
  id: number;
  name: string;
}

export interface IUpdateUserRole {
  userId: number;
  roleIds: number;
}