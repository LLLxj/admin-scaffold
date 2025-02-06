import React from 'react'
import { Input as AntdInput } from 'antd';
import type { ICommonInput } from './type'

export const Input: React.FC<ICommonInput> = ({
  allowClear = true,
  ...props
}) => {
  return (
    <AntdInput
      allowClear={allowClear}
      { ...props }
    />
  );
}