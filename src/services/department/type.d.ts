export interface ISearchTreeCondition {
  departmentId: number;
}

export interface ICreateDepartment {
  name: string;
  parentId: number;
  sortOrder: number;
}

export interface ICreateDepartmentUser {
  departmentId: number;
  userIds: number[];
}

export interface ISearchDepartmentUser {
  departmentId: number;
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

