export interface ICurrentUser {
  id: number;
  mobile: string;
  username: string;
  resources: IResource[];
  permissions: string[];
}

export interface IResource {
  resourceName: string;
  resourceCode: string;
  permissions: IPermission[]
}

export interface IPermission {
  name: string;
  code: string;
}