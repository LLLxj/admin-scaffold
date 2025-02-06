import React from 'react'
import { Spin as AntdSpin } from 'antd';
import type { SpinProps } from 'antd';

export const Spin: React.FC<SpinProps> = ({
  ...props
}) => {
  return (
    <AntdSpin
      { ...props }
    />
  );
}
