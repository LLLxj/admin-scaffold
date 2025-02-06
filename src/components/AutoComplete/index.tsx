import React, { useState, useEffect } from 'react'
import type { CommonAutoCompleteProps } from './type';
import { useDebounce } from 'ahooks' 
import { useRequest } from '@/hooks'
import type { ISelectOption } from '@/components/Select/type'
import { Select } from 'antd';
import { Spin } from '@/components';

export const AutoComplete: React.FC<CommonAutoCompleteProps> = ({
  debounceWait = 500,
  asyncHandle,
  asyncParams = {},
  selectKey,
  selectLabel,
  searchKeyword,
  ...props
}) => {

  const [keyword, setKeyword] = useState<string>('')
  const [options, setOptions] = useState<ISelectOption[]>([]);
  const debouncedKeyword = useDebounce(keyword, { wait: debounceWait });

  const getResultRequest = useRequest(
    asyncHandle,
    {
      debounceWait,
      manual: true,
      onSuccess: (data: any) => {
        const _options = data?.map((item: any) => {
          return {
            label: item?.[selectLabel],
            value: item?.[selectKey],
          };
        });
        console.log(_options)
        setOptions(_options)
      },
    }
  );

  useEffect(() => {
    if (debouncedKeyword) {
      getResultRequest.run({
        ...asyncParams,
        [searchKeyword]: debouncedKeyword
      })
    }
  }, [debouncedKeyword])

  const onSearch = (value: string) => {
    setKeyword(value)  
  }

  const renderNotContent = () =>  {
    if (!debouncedKeyword) {
      return null
    } else {
      if (getResultRequest?.loading) {
        return <Spin />
      }
    }
  }

  console.log('Rendered with options:', options);

  return (
    <Select
      { ...props }
      showSearch
      filterOption={false}
      onSearch={(text) => onSearch(text)}
      notFoundContent={renderNotContent()}
      options={options}
      loading={getResultRequest?.loading}
    />
  );
}
