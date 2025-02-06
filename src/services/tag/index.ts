import { request } from '@/utils/request';

class Tag {
  static getAll(): Promise<any> {
    return request('/tag', {
      method: 'get',
    });
  }

  static search(data: any): Promise<any> {
    return request('/tag/search', {
      method: 'post',
      data,
    });
  }

  static info(taskId: number): Promise<any> {
    return request(`/tag/${taskId}`, {
      method: 'get',
    });
  }

  static create(data: any): Promise<any> {
    return request(`/tag`, {
      method: 'post',
      data
    });
  }

  static update(taskId: number, data: any): Promise<any> {
    return request(`/tag/${taskId}`, {
      method: 'patch',
      data
    });
  }

  static enable(id: number): Promise<any> {
    return request(`/tag/enable/${id}`, {
      method: 'post',
    });
  }

  static disable(id: number): Promise<any> {
    return request(`/tag/disable/${id}`, {
      method: 'post',
    });
  }

  static delete(id: number): Promise<any> {
    return request(`/tag/${id}`, {
      method: 'delete',
    });
  }
}

export default Tag;
