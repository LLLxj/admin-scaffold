import React from 'react';
import { Tag as AntdTag } from 'antd';
import type { ICommonTagProps } from './type';

export const Tag: React.FC<ICommonTagProps> = ({ children, ...props }) => {
  return <AntdTag {...props}>{children}</AntdTag>;
};
