import React from 'react'
import { Dropdown as AntdDropdown } from 'antd'
import type { ICommonDropDownProps } from './type';

export const Dropdown: React.FC<ICommonDropDownProps> = ({
  children,
  ...props
}) => {
  return (
    <AntdDropdown
      { ...props }
    >
      { children }
    </AntdDropdown>
  );
}