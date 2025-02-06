import { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { useAntdConfig } from '@umijs/max';

type EChartsOption = echarts.EChartsOption;

export const UseEchartOptions = () => {

  const antdConfig = useAntdConfig();

  const [options, setOptions] = useState<EChartsOption>({
    animation: true,
    animationDuration: 1000,
    animationDurationUpdate: 500,
    animationEasing: 'cubicInOut',
    animationEasingUpdate: 'cubicInOut',
    animationThreshold: 2000,
    progressiveThreshold: 3000,
    progressive: 400,
    hoverLayerThreshold: 3000,
  });

  const darkOptions: EChartsOption = {
    darkMode: 'auto',
    color: [
      '#5470c6',
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc',
    ],
    gradientColor: [
      '#f6efa6',
      '#d88273',
      '#bf444c',
    ]
  }

  useEffect(() => {
    if (Object?.keys(antdConfig)?.length) {
      const theme = Object?.keys(antdConfig.theme || {})?.find((item, index) => index === 0)
      if (theme === 'algorithm') {
        setOptions((prev) => {
          return {
            ...prev,
            ...darkOptions
          }
        })
      }
    }
  }, [antdConfig])

  return {
   options: options
  }
}