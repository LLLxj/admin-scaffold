export interface ISearchResourceTreeItem {
  id: number;
  parentId: number;
  name: string;
  code: string;
  sortOrder: number;
  children: ISearchResourceTreeItem[];
}

export type PropertyType =
  | 'e'
  | 'h'
  | 'c'
  | 'd'
export interface ISearchPermissionRelationItem {
  id: number;
  name: string;
  code: string;
  selected: boolean;
  sortOrder: number;
}

export interface ISearchPropertyRelationItem extends ISearchPermissionRelationItem {
  type: PropertyType;
}

export interface ISearchPropertyRelation {
  tableHeaders: ISearchPropertyRelationItem[];
  exportFields: ISearchPropertyRelationItem[];
  conditions: ISearchPropertyRelationItem[];
  tableHeaders: ISearchPropertyRelationItem[];
}

export interface ISearchResourceCondition {
  name?: string
}
export interface IResource {
  id: number;
  name: string;
  code: string;
  enabled: boolean;
  createTime: string;
}

export interface IResourceChangeEnabled {
  id: number;
  enabled: boolean;
}

export interface IResourceCreate {
  name: string;
  parentId: number;
  sortOrder?: number;
}

export interface ISearchResourcePermission {
  resource: ResourceType;
}

export type ResourceType =
  '任务管理列表'
