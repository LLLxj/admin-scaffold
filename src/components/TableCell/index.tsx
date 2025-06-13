import React from "react";
import { Row } from "antd";
import numeral from 'numeral'
import { Tag } from "@/components";
import { useLocale } from "@/hooks";
import type { TableCellProps, TableCellMap } from './type'


export const TableCell: React.FC<TableCellProps> = ({
  type,
  value,
  format = '0, 0.00'
}) => {

  const { t } = useLocale()
  const tableCellMap: TableCellMap = {
    string: () => {
      return <span>value</span>
    },
    number: () => {
      return (
        <Row
          justify='end'
        >
          { numeral(value).format(format) }
        </Row>
      )
    },
    status: () => {
      return (
        <Tag
          color={
            value ? 'success' : 'warning'
          }
        >
          { value ? t('enabled') : t('disabled')}
        </Tag>
      )
    }
  }
  if (!value) {
    return undefined
  }
  if (tableCellMap?.[type]) {
    return tableCellMap?.[type]()
  }
}