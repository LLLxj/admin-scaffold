import { request } from "@/utils/request"
import type {
  ISearchTreeCondition,
  ICreateDepartment,
  IEditDepartmentUser,
  ISearchDepartmentUser,
  ISearchCondition,
} from './type'

class Department {

  static search(data: ISearchCondition) {
    return request(
      '/department/search',
      {
        method: 'post',
        data,
      }
    )
  }

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
      '/department/create',
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

  static updateUser(data: IEditDepartmentUser) {
    return request(
      `/department-user/update`,
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

  static updateDepartmentManager(data: IEditDepartmentUser) {
    return request(
      `/department-user/manager/update`,
      {
        method: 'post',
        data
      }
    )
  }

  static searchDepartmentManager(data: ISearchDepartmentUser) {
    return request(
      `/department-user/manager/search`,
      {
        method: 'post',
        data
      }
    )
  }
}

export default Department