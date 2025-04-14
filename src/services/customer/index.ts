import { request } from '@/utils/request';
import type {
  ICreateCustomer,
  IUpdateCustomer,
  ISearchCustomer,
} from './type'

export class Customer {

  static create(data: ICreateCustomer): Promise<any> {
    return request(
      '/customer/create',
      {
        method: 'post',
        data
      }
    );
  }

  static update(data: IUpdateCustomer): Promise<any> {
    return request(
      '/customer/update',
      {
        method: 'post',
        data
      }
    );
  }

  static search(data: ISearchCustomer): Promise<any> {
    return request(
      '/customer/search',
      {
        method: 'post',
        data,
      }
    );
  }

  static info(id: number): Promise<any> {
    return request(
      `/customer/${id}`,
      {
        method: 'get',
      }
    );
  }

  static getAllUser(): Promise<any> {
    return request(
      '/customer/all',
      {
        method: 'get',
      }
    );
  }

  static enabled(id: number) {
    return request(
      `/customer/enable/${id}`,
      {
        method: 'post',
      }
    )
  }

  static disable(id: number) {
    return request(
      `/customer/disable/${id}`,
      {
        method: 'post',
      }
    )
  }

  static remove(id: number) {
    return request(
      `/customer/${id}`,
      {
        method: 'delete',
      }
    )
  }
}

