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

export interface ICreateUser {
  name: string;
  mobile: string;
  roleIds: number;
}

export interface IUpdateUser extends ICreateUser {
  userId: number;
}