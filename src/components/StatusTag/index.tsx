import React, { useMemo } from 'react'
import { Tag } from '@/components'

export interface StatusTagProps {
  value: boolean;
}

export const StatusTag: React.FC<StatusTagProps> = ({
  value
}) => {

  const { color, text } = useMemo(() => {
    let color: string;
    let text: string;
    if (value) {
      color = 'success'
      text = '启用'
    } else {
      color = 'warning'
      text =  '禁用'
    }
    return {
      color,
      text,
    }
  }, [value])

  return (
    <Tag
      color={color}
    >
      { text }
    </Tag>
  );
}

export default StatusTag