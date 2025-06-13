import { request } from '@/utils/request';
import type {
  ICreateConsumer,
  IUpdateConsumer,
  ISearchConsumer,
} from './type'

export class Consumer {

  static create(data: ICreateConsumer): Promise<any> {
    return request(
      '/consumer/create',
      {
        method: 'post',
        data
      }
    );
  }

  static update(data: IUpdateConsumer): Promise<any> {
    return request(
      '/consumer/update',
      {
        method: 'post',
        data
      }
    );
  }

  static search(data: ISearchConsumer): Promise<any> {
    return request(
      '/consumer/search',
      {
        method: 'post',
        data,
      }
    );
  }

  static info(id: number): Promise<any> {
    return request(
      `/consumer/${id}`,
      {
        method: 'get',
      }
    );
  }

  static getAllUser(): Promise<any> {
    return request(
      '/consumer/all',
      {
        method: 'get',
      }
    );
  }

  static enabled(id: number) {
    return request(
      `/consumer/enable/${id}`,
      {
        method: 'post',
      }
    )
  }

  static disable(id: number) {
    return request(
      `/consumer/disable/${id}`,
      {
        method: 'post',
      }
    )
  }

  static remove(id: number) {
    return request(
      `/consumer/${id}`,
      {
        method: 'delete',
      }
    )
  }
}

