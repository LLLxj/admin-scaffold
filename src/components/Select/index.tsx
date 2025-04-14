import React, { useEffect, useState } from 'react';
import { Select as AntdSelect } from 'antd';
import { useRequest } from '@/hooks';
import lodash from 'lodash'
import type { ICommonSelectProps, ISelectOption } from './type';

export const Select: React.FC<ICommonSelectProps> = ({
  debounceWait = 500,
  asyncHandle,
  asyncParams,
  selectKey = 'value',
  selectLabel = 'label',
  refreshDeps,
  options: initOptions,
  ...props
}) => {
  const [options, setOptions] = useState<ISelectOption[]>([]);

  useEffect(() => {
    if (asyncHandle) {
      getListRequest.run(asyncParams);
    }
  }, [refreshDeps, asyncHandle, asyncParams]);

  useEffect(() => {
    if (initOptions?.length) {
      const _options = mergeOptions([
        ...options,
        ...initOptions
      ])
      setOptions(_options)
    }
  }, [initOptions])

  const getListRequest = useRequest(asyncHandle, {
    debounceWait,
    manual: true,
    onSuccess: (data: any) => {
      let _options = data?.map((item: any) => {
        return {
          label: item?.[selectLabel],
          value: item?.[selectKey],
        };
      });
      if (initOptions?.length) {
        _options = [
          ...initOptions,
          ..._options,
        ]
        _options = mergeOptions(_options)
      }
      setOptions(_options);
    },
  });

  const mergeOptions = (list: ISelectOption[]) => {
    return lodash.unionBy(list, 'selectKey')
  }

  return (
    <div className="select-container">
      <AntdSelect
        allowClear
        {...props}
        options={options}
      />
    </div>
  );
};
