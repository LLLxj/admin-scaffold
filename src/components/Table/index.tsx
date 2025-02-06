import React, { useMemo } from 'react';
import { countTableCellWidth } from '@/utils';
import { Table as AntdTable } from 'antd';
import type { ICommonPaginationProps } from './type';
import lodash from 'lodash'
import './index.less'

export const Table: React.FC<ICommonPaginationProps> = ({
  showPagination = true,
  pagination,
  columns,
  scroll = {},
  ...props
}) => {
  const defaultPagination = {
    pageSize: 20,
    showSizeChanger: true,
  };

  const {
    memoColumns,
    tableWidth
  } = useMemo(() => {
    const _columns = columns?.map((item: any) => {
      return {
        ...item,
        width:
          item?.width ||
          countTableCellWidth({
            title: item?.title,
            titleCol: item?.titleCol,
          }),
        ellipsis: true,
      };
    });
    const tableWidth = lodash.sumBy(_columns, 'width')
    return {
      memoColumns: _columns,
      tableWidth,
    };
  }, [columns]);

  return (
    <>
      <AntdTable
        columns={memoColumns}
        sticky
        bordered
        pagination={
          showPagination
            ? {
                ...defaultPagination,
                ...pagination,
              }
            : false
        }
        {...props}
        scroll={{
          ...scroll,
          x: tableWidth
        }}
      />
    </>
  );
};

