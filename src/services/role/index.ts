import { request } from "@/utils/request"
import type {
  ISearchRoleCondition,
  IRoleChangeEnabled,
  IUpdateRoleRelation,
  ISearchRoleRelation,
  IUpdateRoleRuleRelation,
} from './type'

class Role {
  static list(data: ISearchRoleCondition) {
    return request(
      '/role/search',
      {
        method: 'post',
        data,
      }
    )
  }

  static create(data: ISearchRoleCondition) {
    return request(
      '/role/create',
      {
        method: 'post',
        data,
      }
    )
  }

  static info(roleId: number) {
    return request(
      `/role/${roleId}`,
      {
        method: 'get',
      }
    )
  }

  static changeEnabled(data: IRoleChangeEnabled) {
    return request(
      '/role/change-enabled',
      {
        method: 'post',
        data,
      }
    )
  }

  static updateRolePermission(data: IUpdateRoleRelation) {
    return request(
      '/role/relation/permission/update',
      {
        method: 'post',
        data,
      }
    )
  }

  static updateRolePeroperty(data: IUpdateRoleRelation) {
    return request(
      '/role/relation/property/update',
      {
        method: 'post',
        data,
      }
    )
  }

  static updateRoleRule(data: IUpdateRoleRuleRelation) {
    return request(
      '/role/relation/rule/update',
      {
        method: 'post',
        data,
      }
    )
  }

  static removeRole(roleId: number) {
    return request(
      `/role/${roleId}`,
      {
        method: 'delete',
      }
    )
  }

  static all() {
    return request(
      '/role/all',
      {
        method: 'post',
      }
    )
  }

  static getPermissionRelation(data: ISearchRoleRelation) {
    return request(
      `/role/relation/permission`,
      {
        method: 'post',
        data
      }
    )
  }

  static getPropertyRelation(data: ISearchRoleRelation) {
    return request(
      `/role/relation/property`,
      {
        method: 'post',
        data
      }
    )
  }

  static getRuleRelation(data: ISearchRoleRelation) {
    return request(
      `/role/relation/rule`,
      {
        method: 'post',
        data
      }
    )
  }
}

export default Role