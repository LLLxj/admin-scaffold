import { request } from '@/utils/request';
import type {
  ICreateUser,
  IUpdateUserRole
} from './type'

class Account {

  static create(data: ICreateUser): Promise<any> {
    return request(
      '/user/create',
      {
        method: 'post',
        data
      }
    );
  }

  static update(data: IUpdateUserRole): Promise<any> {
    return request(
      '/user/update',
      {
        method: 'post',
        data
      }
    );
  }

  static search(data: any): Promise<any> {
    return request(
      '/user/search',
      {
        method: 'post',
        data,
      }
    );
  }

  static getUserInfo(): Promise<any> {
    return request('/user/me', {
      method: 'get',
    });
  }

  static detail(id: number): Promise<any> {
    return request(
      `/user/${id}`,
      {
        method: 'get',
      }
    );
  }

  static logout(): Promise<any> {
    return request('/auth/logout', {
      method: 'post',
    });
  }

  static updateUserRole(data: IUpdateUserRole): Promise<any> {
    return request(
      '/role/relation/user/update',
      {
        method: 'post',
        data
      }
    );
  }

  static getAllUser(): Promise<any> {
    return request(
      '/user/all',
      {
        method: 'get',
      }
    );
  }
}

export default Account;
