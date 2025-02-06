import { request } from "@/utils/request"
import type {
  IGetPermission,
  ISearchPermssionRequest,
  IPermissionChangeEnabled,
} from './type'

class Permission {
  static all(data: IGetPermission) {
    return request(
      '/permission/all',
      {
        method: 'post',
        data
      }
    )
  }

  static search(data: ISearchPermssionRequest) {
    return request(
      '/permission/search',
      {
        method: 'post',
        data
      }
    )
  }

  static changeEnabled(data: IPermissionChangeEnabled) {
    return request(
      '/permission/change-enabled',
      {
        method: 'post',
        data
      }
    )
  }

  static create(data: any) {
    return request(
      `/permission`,
      {
        method: 'post',
        data
      }
    )
  }

  static update(permissionId: number, data: any) {
    return request(
      `/permission/${permissionId}`,
      {
        method: 'patch',
        data
      }
    )
  }

  static detail(data: number) {
    return request(
      `/permission/${data}`,
      {
        method: 'get',
      }
    )
  }

  static remove(data: number) {
    return request(
      `/permission/${data}`,
      {
        method: 'delete',
      }
    )
  }
}

export default Permission