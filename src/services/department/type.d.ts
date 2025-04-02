export interface ISearchTreeCondition {
  departmentId: number;
}

export interface ISearchCondition {
  name?: string;
}

export interface ICreateDepartment {
  name: string;
  parentId: number;
  sortOrder: number;
}

export interface IEditDepartmentUser {
  departmentId: number;
  userIds: number[];
}

export interface ISearchDepartmentUser {
  departmentId: number;
}

export interface IDepartment {
  id: number;
  name: string;
  parent: ICommonItem,
  enabled: true,
  createTime: string;
  updateTime: string;
}

export interface IDepartmentUser {
  userId: number;
  userName: string;
}

export interface ISearchTreeItem {
  id: number;
  parentId: number;
  sortOrder: number;
  name: string;
  enabled: boolean;
  children: ISearchTreeItem[]
}

