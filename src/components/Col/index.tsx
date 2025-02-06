import React from 'react'
import { Col as AntdCol } from 'antd'
import type { ColProps } from 'antd'

export const Col: React.FC<ColProps> = ({ ...props }) => {
  return (
    <AntdCol
      { ...props }
    />
  );
}
