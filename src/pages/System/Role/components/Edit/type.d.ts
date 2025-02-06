import { DataNode } from 'antd/es/tree';
export interface EditRoleProps {
  roleId?: number;
  type?: 'primary' | 'link';
  successCallback: () => void;
}

export interface ICreateRole {
  name: string;
}

export interface IRoleSetPermission {
  roleId: number;
  permissions: string[];
}

export interface IForm extends ICreateRole, IRoleSetPermission {
  id?: number;
}

export interface Property {
  asyncHandle: any;
  asyncParams?: any;
  formatResult: (data?: any) => DataNode[];
  getCheckedKeys?: (data: any) => Key[];
}
export interface PropertyMap {
  property: Property;
  option: Property;
}
