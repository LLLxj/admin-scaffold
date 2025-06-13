import { request } from '@/utils/request';
import type {
  ICreateProject,
  IUpdateProject,
  ISearchProject,
} from './type'

export class Project {

  static create(data: ICreateProject): Promise<any> {
    return request(
      '/project/create',
      {
        method: 'post',
        data
      }
    );
  }

  static update(data: IUpdateProject): Promise<any> {
    return request(
      '/project/update',
      {
        method: 'post',
        data
      }
    );
  }

  static search(data: ISearchProject): Promise<any> {
    return request(
      '/project/search',
      {
        method: 'post',
        data,
      }
    );
  }

  static info(id: number): Promise<any> {
    return request(
      `/project/${id}`,
      {
        method: 'get',
      }
    );
  }

  static getAllUser(): Promise<any> {
    return request(
      '/project/all',
      {
        method: 'get',
      }
    );
  }

  static enabled(id: number) {
    return request(
      `/project/enable/${id}`,
      {
        method: 'get',
      }
    )
  }

  static disable(id: number) {
    return request(
      `/project/disable/${id}`,
      {
        method: 'get',
      }
    )
  }

  static remove(id: number) {
    return request(
      `/project/${id}`,
      {
        method: 'delete',
      }
    )
  }
}

