import React from 'react'
import { Popconfirm as AntdPopconfirm } from 'antd';
import type { PopconfirmProps } from 'antd'

export const Popconfirm: React.FC<PopconfirmProps> = ({
  ...props
}) => {
  return (
    <AntdPopconfirm
      { ...props }
    />
  );
}
