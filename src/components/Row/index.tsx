import React from 'react'
import { Row as AntdRow } from 'antd'
import type { RowProps } from 'antd'

export const Row: React.FC<RowProps> = ({ ...props }) => {
  return (
    <AntdRow
      { ...props }
    />
  );
}

export default Row