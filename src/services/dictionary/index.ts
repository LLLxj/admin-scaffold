import { request } from '@/utils/request';
import type {
  ICreateDictionary,
  ISearchDictionary,
} from './type'

export class Dictionary {

  static create(data: ICreateDictionary): Promise<any> {
    return request(
      '/dictionary/create',
      {
        method: 'post',
        data
      }
    );
  }

  static search(data: ISearchDictionary): Promise<any> {
    return request(
      '/dictionary/search',
      {
        method: 'post',
        data
      }
    );
  }

  static update(data: ICreateDictionary): Promise<any> {
    return request(
      '/dictionary/update',
      {
        method: 'post',
        data
      }
    );
  }

  static info(id: number): Promise<any> {
    return request(
      `/dictionary/${id}`,
      {
        method: 'get',
      }
    );
  }
}

export default Dictionary