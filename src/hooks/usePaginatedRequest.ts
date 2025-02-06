import { useRequest as ahooksUseRequest } from '@umijs/max';
// import { Service, Options } from "ahooks/lib/useRequest/src/types";

// function UseRequest<TData, TParams extends any[]>(
//   service: Service<TData, TParams>,
//   options: Options<TData, TParams>,
// ) {
export function usePaginatedRequest(
  service: Parameters<typeof ahooksUseRequest>[0],
  options: Parameters<typeof ahooksUseRequest>[1],
) {
  const mergeOptions = {
    debounceInterval: 500,
    defaultPageSize: 20,
    formatResult: (data: any) => {
      return data;
    },
    ...options,
  };
  const response = ahooksUseRequest(service, mergeOptions);
  return response;
}

