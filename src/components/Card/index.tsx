import React from 'react'
import { Card as AntdCard } from 'antd';
import type { CardProps } from 'antd'

export const Card: React.FC<CardProps> = ({ ...props }) => {
  return (
    <AntdCard
      { ...props }
    />
  );
}
