import React from 'react'
import { Tabs as AntdTabs } from 'antd'
import type { TabsProps } from 'antd'

export const Tabs: React.FC<TabsProps> = ({
  ...props
}) => {
  return (
    <AntdTabs
      { ...props }
    />
  );
}
