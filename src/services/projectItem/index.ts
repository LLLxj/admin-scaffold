import { request } from '@/utils/request';
import type {
  ICreateProjectItem,
  IUpdateProjectItem,
  ISearchProjectItem,
} from './type'

export class ProjectItem {

  static create(data: ICreateProjectItem): Promise<any> {
    return request(
      '/project-item/create',
      {
        method: 'post',
        data
      }
    );
  }

  static update(data: IUpdateProjectItem): Promise<any> {
    return request(
      '/project-item/update',
      {
        method: 'post',
        data
      }
    );
  }

  static search(data: ISearchProjectItem): Promise<any> {
    return request(
      '/project-item/search',
      {
        method: 'post',
        data,
      }
    );
  }

  static info(id: number): Promise<any> {
    return request(
      `/project-item/${id}`,
      {
        method: 'get',
      }
    );
  }

  static getAllUser(): Promise<any> {
    return request(
      '/project-item/all',
      {
        method: 'get',
      }
    );
  }

  static enabled(id: number) {
    return request(
      `/project-item/enable/${id}`,
      {
        method: 'get',
      }
    )
  }

  static disable(id: number) {
    return request(
      `/project-item/disable/${id}`,
      {
        method: 'get',
      }
    )
  }

  static remove(id: number) {
    return request(
      `/project-item/${id}`,
      {
        method: 'delete',
      }
    )
  }
}

