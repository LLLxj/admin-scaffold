import type { ITask } from '@/pages/Task/Manage/type'
import type { IChartItem } from '@/components/EChart/type'

export interface ISearchCondition {
  setSearchParams: (data: any) => void;
}

export interface ITaskChartItem {
  name: string;
  serie: string;
  value: number;
}

export interface ITaskDashboardItem {
  date: string;
  list: ITask[];
}

export interface ITaskDashboardProps {
  data?: IChartItem[];
}