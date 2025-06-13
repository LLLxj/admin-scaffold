export type TableCellType = 'string' | 'number' | 'status';
export type TableCellValue = string | number | boolean;

export interface TableCellProps {
  type: TableCellType;
  value?: TableCellValue;
  format?: string;
}

export type TableCellMap = Record<TableCellType, () => React.ReactNode>