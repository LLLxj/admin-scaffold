import { Button as AntdButton } from 'antd';
import React from 'react';
import type { ICommonButtonProps } from './type';
import './index.less'

export const Button: React.FC<ICommonButtonProps> = ({
  children,
  inTable = false,
  ...props
}) => {
  return (
    <AntdButton
      {...props}
      className={inTable ? 'table_button_link' : ''}
    >
      {children}
    </AntdButton>
  );
};
