import { history } from '@umijs/max';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { message } from '@/components'
interface IResponse {
  data: IData;
  status: number;
}

interface IData {
  code: number;
  message: string;
  result: any;
}

const request: AxiosInstance = axios.create({
  baseURL: '/api', // 设置基础请求路径，根据实际情况修改
  timeout: 20000, // 设置请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config: any) => {
    // 在发送请求之前做一些处理，例如添加 token
    const authorization = localStorage.getItem('authorization');
    const formatConfig = {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: authorization,
      },
    };
    return formatConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    if ([200, 201]?.includes(response?.status)) {
      const code = response?.data?.code;
      const responseMap: Record<number, () => void> = {
        200: () => {
          return response?.data?.result
        },
        1: () => {
          message.warning(response?.data?.message)
          return Promise.reject(response?.data) as any;
        }
      }
      if (responseMap?.[code]) {
        return responseMap?.[code]()
      } else {
        return Promise.reject(response?.data) as any;
      }
    }
    return response?.data
  },
  (error) => {
    const status = error?.response?.status;
    const handleMap: Record<number, () => void> = {
      401: () => {
        history.push('/login')
      },
      400: () => {
        const msg = error?.response?.data?.message?.join(',')
        message.error(msg)
        return error?.response?.data
      },
      500: () => {
        message.error(error?.response?.data?.message)
        return error?.response?.data
      }
    }
    if (handleMap?.[status]) {
      handleMap?.[status]()
    }
    return Promise.reject(error);
  },
);

type PromiseReturn<T> = AxiosResponse<T>;

export { IResponse, PromiseReturn, request };
