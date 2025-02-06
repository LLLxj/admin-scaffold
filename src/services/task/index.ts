import { request } from '@/utils/request';
import type { IDashboardSearch } from './type'
class Task {
  static search(data: any): Promise<any> {
    return request('/task/search', {
      method: 'post',
      data,
    });
  }

  static info(taskId: number): Promise<any> {
    return request(`/task/${taskId}`, {
      method: 'get',
    });
  }

  static create(data: any): Promise<any> {
    return request(`/task`, {
      method: 'post',
      data
    });
  }

  static update(taskId: number, data: any): Promise<any> {
    return request(`/task/${taskId}`, {
      method: 'patch',
      data
    });
  }

  static enable(id: number): Promise<any> {
    return request(`/task/enable/${id}`, {
      method: 'post',
    });
  }

  static disable(id: number): Promise<any> {
    return request(`/task/disable/${id}`, {
      method: 'post',
    });
  }

  static delete(id: number): Promise<any> {
    return request(`/task/${id}`, {
      method: 'delete',
    });
  }

  static dashboard(data: IDashboardSearch): Promise<any> {
    return request(`/task/dashboard`, {
      method: 'post',
      data
    });
  }
}

export default Task;
