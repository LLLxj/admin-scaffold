import React from 'react'
import { TimePicker as AntdTimePicker } from 'antd';
import type { ICommonTimePicker } from './type'

export const TimePicker: React.FC<ICommonTimePicker> = ({
  ...props
}) => {
  return (
    <AntdTimePicker
      { ...props }
    />
  );
}