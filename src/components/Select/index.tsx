import { useRequest } from '@/hooks';
import { Select as AntdSelect } from 'antd';
import React, { useEffect, useState } from 'react';
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
  }, [refreshDeps]);

  useEffect(() => {
    if (initOptions?.length) {
      setOptions(initOptions)
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
      }
      setOptions(_options);
    },
  });

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
