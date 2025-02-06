import React, { useEffect } from 'react'
import { useSearch, useRequest } from '@/hooks'
import TaskService from '@/services/task'
import { SearchCondition, TaskDashboard as Dashboard } from './components'
import type { ITaskDashboardItem } from './components/type'
import type { IChartItem } from '@/components/EChart/type'
import lodash from 'lodash'
import { Row } from '@/components'


const TaskDashboard: React.FC = () => {

  const {
    searchParams,
    setSearchParams,
    list,
    setList
  } = useSearch({})

  const getTaskRequest = useRequest(
    TaskService.dashboard,
    {
      onSuccess: (data: ITaskDashboardItem[]) => {
        let series: IChartItem[] = []
        for (const { date, list } of data) {
          if (!list?.length) {
            series.push({
              name: date,
              serie: '',
              value: 0
            })
          }
          const seriesMap = lodash.groupBy(list, 'tag.name')
          for (const [serie, data] of Object.entries(seriesMap)) {
            series.push({
              name: date,
              serie,
              value: data?.length || 0
            })
          }
        }
        setList(series)
      },
    },
  );

  useEffect(() => {
    console.log(searchParams)
    if (Object?.keys(searchParams)?.length) {
      getTaskRequest.run(searchParams)
    }
  }, [searchParams])

  return (
    <Row>
      <SearchCondition
        setSearchParams={setSearchParams}
      />
      <Dashboard
        data={list as IChartItem[]}
      />
    </Row>
  );
}

export default TaskDashboard
