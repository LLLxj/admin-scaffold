export type IChartDataType = {
  name?: string | number;
  value?: number | string;
  markPoint?: string | number;
  serie?: string;
  [prop: string]: string | number;
};

export interface IChartItem {
  name: string;
  serie?: string;
  value: number;
}

export type IChartType = 'bar';

export type IDataType = number | undefined;

export interface ISerie {
  name: string;
  type: IBarType,
  stack?: string;
  barWidth: number;
  data: IDataType[];
}

export interface IUseSeriesProps {
  series: IChartItem[];
  chartType: IChartType;
}