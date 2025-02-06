import React from 'react'
import { Steps as AntdSteps } from 'antd'
import type { StepsProps } from 'antd'

export const Steps: React.FC<StepsProps> = ({
  ...props
}) => {
  return (
    <AntdSteps
      { ...props }
    />
  );
}