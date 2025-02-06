import type { PaginationProps, TableProps } from 'antd';

type ITableProps = TableProps & PaginationProps;

interface ICommonPaginationProps extends ITableProps {
  height?: number;
  showPagination?: boolean;
}

interface IPages {
  current: number;
  pageSize: number;
  total: number;
  totalPage: number;
}

export { ICommonPaginationProps, IPages };
