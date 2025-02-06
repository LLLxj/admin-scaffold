import type { ISearchPagation } from '@/pages/type'
export type GetPermissionType = 'tree' | 'flat'
import type {
  IResourceChangeEnabled,
  IResource
} from '../resource'

export interface IGetPermission {
  type: GetPermissionType;
}

export interface IPermission {
  permissionId: number | string;
  permissionName: string;
}

export interface IPermissionTree {
  resourceId: number | string;
  resourceName: string;
  permissions: IPermission[]
}
export interface ISearchPermssionRequest extends ISearchPagation {
  name: string;
}

export interface IPermissionChangeEnabled {
  permissionId: number;
  enabled: boolean;
};
export type ISearchPermissionItem = IResource;