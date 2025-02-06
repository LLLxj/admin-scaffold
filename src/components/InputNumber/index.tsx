import React from 'react'
import { InputNumber as AntdInputNumber } from 'antd';
import type { ICommonInputNumberProps } from './type'

export const InputNumber: React.FC<ICommonInputNumberProps> = ({
  ...props
}) => {
  return (
    <AntdInputNumber
      { ...props }
    />
  );
}