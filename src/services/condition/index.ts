import { request } from "@/utils/request"
import type { ISearchConditionUser } from './type'

class Condition {
  static user(data: ISearchConditionUser) {
    return request(
      '/condition/user',
      {
        method: 'post',
        data,
      }
    )
  }
}

export default Condition