import React from 'react';
import { Space as AntdSpace } from 'antd';
import type { ICommonSpaceProps } from './type';

export const Space: React.FC<ICommonSpaceProps> = ({
  children,
  direction = 'vertical',
  size = 'middle',
}) => {
  return (
    <AntdSpace
      direction={direction}
      size={size}
      style={{
        width: '100%'
      }}
    >
      {children}
    </AntdSpace>
  );
};

