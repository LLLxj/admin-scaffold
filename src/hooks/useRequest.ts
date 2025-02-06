import { useRequest as ahooksUseRequest } from 'ahooks';
import { Options, Service } from 'ahooks/lib/useRequest/src/types';

export function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams> | any,
  options: Options<TData, TParams>,
) {
  const mergeOptions = {
    manual: true,
    debounceInterval: 500,
    ...options,
  };
  const response = ahooksUseRequest(service, mergeOptions);
  return response;
}