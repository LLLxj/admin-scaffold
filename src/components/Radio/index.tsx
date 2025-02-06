import React from 'react'
import { Radio as AntdRadio } from 'antd';
import type { RadioProps } from 'antd'

export const Radio: React.FC<RadioProps> = ({
  ...props
}) => {
  return (
    <AntdRadio
      { ...props }
    />
  );
}
