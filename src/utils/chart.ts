/* eslint-disable @typescript-eslint/no-unused-expressions */
// @ts-nocheck
import { useMemo } from 'react';
import { ChartDataType } from './type.d';

export const useSeries = (
  data: ChartDataType[],
  chartType,
  { horizontal, onlyPercent, showValueAndPercent, markLine } = {},
) => {
  const series = useMemo(() => {
    const seriesMap = {};
    for (const { serie, name, value } of data) {
      const serieTitle = serie || '';
      const matchedSerie =
        seriesMap[serieTitle] || (seriesMap[serieTitle] = []);
      matchedSerie.push({ name, value });
    }

    const series = [];
    const multiSeries = Object.keys(seriesMap).length > 1;
    const label = multiSeries
      ? { fontSize: 10 }
      : {
          show: true,
          position: horizontal ? 'right' : 'top',
          fontSize: 14,
          ...(onlyPercent
            ? { formatter: f => `${f.data}%` }
            : {
                formatter: f =>
                  !isNaN(f.data) ? beautifyNumber(f.data) : f.data,
              }),
        };

    let total;
    if (showValueAndPercent) {
      total = data.reduce((o, n) => {
        return o + n.value;
      }, 0);
    }

    for (const [serieTitle, data] of Object.entries(seriesMap)) {
      series.push({
        name: serieTitle,
        data: data.map(d => d.value),
        type: chartType,
        label: label,
        markLine,
        barWidth: 10,
        itemStyle: {
          borderRadius: 0,
          ...(showValueAndPercent
            ? {
                normal: {
                  label: {
                    show: true,
                    formatter: v => {
                      return horizontal
                        ? `${v.data}${showValueAndPercent}, ${(
                            (v.data / total) *
                            100
                          ).toFixed(2)}%`
                        : v.data;
                    },
                    position: horizontal ? 'right' : 'top',
                    textStyle: {
                      color: '#000000',
                    },
                  },
                },
              }
            : {}),
        },
      });
    }

    return series;
  }, [data, chartType]);

  return [series];
};