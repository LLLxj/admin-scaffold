import { request } from "@/utils/request"
import type {
  ISearchResourceCondition,
  IResourceChangeEnabled,
  IResourceCreate,
  ISearchResourcePermission,
} from './type'

class Resource {
  static getResourceTree() {
    return request(
      '/resource/tree',
      {
        method: 'get',
      }
    )
  }

  static getPropertyTree() {
    return request(
      '/resource/property/tree',
      {
        method: 'get',
      }
    )
  }

  static search(data: ISearchResourceCondition) {
    return request(
      '/resource/search',
      {
        method: 'post',
        data
      }
    )
  }

  static changeEnabled(data: IResourceChangeEnabled) {
    return request(
      '/resource/change-enabled',
      {
        method: 'post',
        data
      }
    )
  }

  static remove(data: number) {
    return request(
      `/resource/${data}`,
      {
        method: 'delete',
      }
    )
  }

  static create(data: IResourceCreate) {
    return request(
      `/resource`,
      {
        method: 'post',
        data
      }
    )
  }

  static getResourceProperty() {
    return request(
      `/resource/property`,
      {
        method: 'get',
      }
    )
  }

  static getResourcePermission(data: ISearchResourcePermission) {
    return request(
      `/resource/permission`,
      {
        method: 'post',
        data
      }
    )
  }
}

export default Resource