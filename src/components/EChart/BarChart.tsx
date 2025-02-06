import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  MarkLineComponent,
} from 'echarts/components';
import { BarChart as _BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { IChartItem } from './type.d';
// import colorConfig from './colorConfig';
import { NoData } from '@/components';
import { useSeries } from '@/components/EChart/util'

echarts.use([
  GridComponent,
  TooltipComponent,
  _BarChart,
  CanvasRenderer,
  DataZoomComponent,
  MarkLineComponent,
]);


export interface BarChartProps {
  data?: IChartItem[];
  titleText: string;
  horizontal?: boolean;
  onlyPercent?: boolean;
  showValueAndPercent?: string;
  toolTipFormatter?: (item: any) => string;
  nameKey?: string;
  valueKey?: string;
  valueType?: 'date' | 'time';
  autoSort?: boolean;
  limit?: number;
  dataZoom?: boolean;
  customColor?: [string, string];
  markLine?: Record<string, any>;
  style?: Record<string, any>;
  isCustomerOption?: boolean;
  customerOption?: Record<string, any>;

  onEvents?: {
    click?: (e: any) => void;
    legendselectchanged?: (e: any) => void;
    selectchanged?: (e: any) => void;
  };
}

export const BarChart = ({
  data: oriData = [],
  titleText,
  // horizontal,
  dataZoom = false,
  style,
  // customColor,
  isCustomerOption = false,
  customerOption,
  onEvents,
}: BarChartProps) => {

  const { series, legend, xAxis } = useSeries({
    series: oriData,
    chartType: 'bar',
  })
  

  // let color: any = horizontal ? '#FDC16E' : colorConfig[0];
  // if (customColor) {
  //   color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  //     {
  //       offset: 0,
  //       color: customColor[0],
  //     },
  //     {
  //       offset: 1,
  //       color: customColor[1],
  //     },
  //   ]);
  // }

  const option = {
    title: {
      text: titleText
    },
    tooltip : {
      trigger: 'axis'
    },
    legend: {
      data: legend,
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type : 'category',
        boundaryGap : false,
        data : xAxis,
      }
    ],
    yAxis: [
      {
        type : 'value'
      }
    ],
    // color: [color],
    series,
    ...(dataZoom
      ? {
          dataZoom: [
            {
              type: 'slider',
              show: true,
              start: 0,
              end: 100,
              bottom: 16,
            },
            {
              type: 'inside',
              show: true,
            },
          ],
        }
      : {}),
  };
  
  if (isCustomerOption) {
    
    if (customerOption?.series?.length === 0) {
      return <NoData />;
    }
    return (
      <ReactECharts
        option={option}
        style={style}
        onEvents={onEvents}
        theme={"theme_name"}
      />
    );
  }

  if (!oriData?.length) {
    return <NoData />;
  }

  return (
    <ReactECharts
      option={option}
      style={style}
      onEvents={onEvents}
      lazyUpdate={true}
      notMerge={true}
      echarts={echarts}
    />
  );
};
