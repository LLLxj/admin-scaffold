import type { IPages } from '@/components/Table/type';

interface ICommonListProps {
  searchContainer: React.ReactNode;
  tableConfig: {
    dataSource: any[];
    columns: any[];
    loading: boolean;
    pagination?: IPages;
    rowKey: string;
  }
}

export { ICommonListProps };
