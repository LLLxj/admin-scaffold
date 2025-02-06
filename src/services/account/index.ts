import { request } from '@/utils/request';
import type { IUpdateUserRole } from './type'

class Account {
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

  static detail(userId: number): Promise<any> {
    return request(
      `/user/${userId}`,
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
}

export default Account;
