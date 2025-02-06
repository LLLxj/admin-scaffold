import { useMemo } from 'react'
import type { ISerie, IUseSeriesProps, IChartItem } from './type'
import lodash from 'lodash'

export const useSeries = ({
  series: initSeries,
  chartType,
}: IUseSeriesProps) => {
  const { xAxis, series, legend } = useMemo(() => {
    const nameMap = lodash.groupBy(initSeries, 'name')
    const xAxis: string[] = Object?.keys(nameMap)?.map((item) => item);
    const serieMap: Record<string, IChartItem[]> = lodash.groupBy(initSeries, 'serie');
    let legend: string[] = [];
    const series = Object?.keys(serieMap)?.reduce(
      (prev: ISerie[], cur: string) => {
        if (cur) {
          legend = [ ...legend, cur]
          const data = xAxis?.map((item: string) => {
            const value: number | undefined = serieMap?.[cur]?.find(
              (p: IChartItem) => p?.name === item
            )?.value
            return value;
          })
          return [
            ...prev,
            {
              name: cur,
              type: chartType,
              stack: '总量',
              barWidth: 10,
              data: data,
            }
          ]
        }
        return prev;
    }, [] as ISerie[])
    return {
      xAxis,
      series,
      legend,
    }
  }, [initSeries])

  return {
    xAxis,
    series,
    legend,
  }
}