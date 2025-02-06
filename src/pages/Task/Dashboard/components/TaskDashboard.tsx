import React from 'react'
import { BarChart } from '@/components'
import type { ITaskDashboardProps } from './type'

export const TaskDashboard: React.FC<ITaskDashboardProps> = ({
  data = [],
}) => {
  
  return (
    <BarChart
      data={data}
      style={{
        width: '100%',
        height: '400px'
      }}
      titleText='任务看板'
    />
  );
}
