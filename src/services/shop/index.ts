import { request } from "@/utils/request"
import type {
  ISearchShop,
  ICreateShop,
  IUpdateShop,
  // IRoleChangeEnabled,
  // IUpdateRoleRelation,
  // ISearchRoleRelation,
} from './type'

class Shop {
  static list(data: ISearchShop) {
    return request(
      '/shop/search',
      {
        method: 'post',
        data,
      }
    )
  }

  static create(data: ICreateShop) {
    return request(
      '/shop/create',
      {
        method: 'post',
        data,
      }
    )
  }

  static info(id: number) {
    return request(
      `/shop/${id}`,
      {
        method: 'get',
      }
    )
  }

  static enabled(id: number) {
    return request(
      `/shop/enable/${id}`,
      {
        method: 'post',
      }
    )
  }

  static disable(id: number) {
    return request(
      `/shop/disable/${id}`,
      {
        method: 'post',
      }
    )
  }

  static remove(id: number) {
    return request(
      `/shop/${id}`,
      {
        method: 'delete',
      }
    )
  }

  static update(data: IUpdateShop) {
    return request(
      '/shop/update',
      {
        method: 'post',
        data,
      }
    )
  }
}

export default Shop