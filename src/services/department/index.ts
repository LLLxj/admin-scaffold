import { request } from "@/utils/request"
import type {
  ISearchTreeCondition,
  ICreateDepartment,
  ICreateDepartmentUser,
  ISearchDepartmentUser,
} from './type'

class Department {
  static getTree(data: ISearchTreeCondition) {
    return request(
      '/department/tree',
      {
        method: 'post',
        data,
      }
    )
  }

  static create(data: ICreateDepartment) {
    return request(
      '/department',
      {
        method: 'post',
        data,
      }
    )
  }

  static remove(nodeId: number) {
    return request(
      `/department/${nodeId}`,
      {
        method: 'delete',
      }
    )
  }

  static addUser(data: ICreateDepartmentUser) {
    return request(
      `/department-user/create`,
      {
        method: 'post',
        data
      }
    )
  }

  static searchUser(data: ISearchDepartmentUser) {
    return request(
      `/department-user/search`,
      {
        method: 'post',
        data
      }
    )
  }
}

export default Department