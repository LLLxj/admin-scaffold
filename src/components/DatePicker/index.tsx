import React from 'react'
import { DatePicker as AntdDatePicker } from 'antd';
import type { ICommonDatePickerProps } from './type'

export const DatePicker: React.FC<ICommonDatePickerProps> = ({
  ...props
}) => {
  return (
    <AntdDatePicker
      { ...props }
    />
  );
}