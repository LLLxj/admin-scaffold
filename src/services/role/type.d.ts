import type { ICommonColumn } from '../type'

export interface ISearchRoleCondition {
  name: string;
}

export interface ISearchRoleVO extends ICommonColumn {
  id: number;
  name: string;
}

export interface IRoleChangeEnabled {
  id: number;
  enabled: boolean;
}

export interface IUpdateRolePermissionItem {
  resourceId: number;
  permissionIds: number[]
}

export interface IUpdateRoleRelation {
  roleId: number;
  resourceId: number;
  permissions: number[];
}

export interface IRoleInfoPermissionResponse {
  permissionId: string;
  permissionName: string;
}

export interface IResource {
  resourceId: string;
  resourceName: string;
  permissionName: string;
  permissions: IRoleInfoPermissionResponse[]
}

export interface IRoleInfoResponse {
  id: number;
  name: string;
  code: string;
  permissions: IResource[]
}

export interface ISearchRoleRelation {
  resourceId: number;
  role: number;
}

export type IRole = ICommonColumn