import React from 'react'
import { DatePicker as AntdDatePicker } from 'antd';
import { Row } from '@/components'
import type { ICommonRangePickerProps } from './type'

export const RangePicker: React.FC<ICommonRangePickerProps> = ({
  ...props
}) => {

  const { RangePicker } = AntdDatePicker;

  return (
    <Row
      className='form-item-children-wrapper'
    >
      <RangePicker
        { ...props }
      />
    </Row>
    
  );
}
