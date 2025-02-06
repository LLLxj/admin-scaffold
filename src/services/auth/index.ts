import { request } from '@/utils/request';
import type { IAuthLogin } from './type';

class Auth {
  static login(data: IAuthLogin): Promise<any> {
    return request('/auth/login', {
      method: 'post',
      data,
    });
  }

  static getUserInfo(): Promise<any> {
    return request('/user/me', {
      method: 'get',
    });
  }

  static logout(): Promise<any> {
    return request('/auth/logout', {
      method: 'post',
    });
  }
}

export default Auth;
