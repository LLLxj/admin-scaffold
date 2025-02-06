import React, { useRef, useEffect } from 'react';
import { Space } from 'antd';
import { useSize } from 'ahooks'
import { Table, Row } from '@/components'
import type { ICommonListProps } from './type';

export const List: React.FC<ICommonListProps> = ({
  searchContainer,
  tableConfig
}) => {
  const height = useRef<number>(0)
  const searchContainerRef = useRef(null)
  const searchContainerSize = useSize(searchContainerRef)

  useEffect(() => {

    setTableHeight()
    // 添加 resize 事件监听器
    window.addEventListener('resize', setTableHeight);

    // 组件卸载时移除监听器
    return () => {
      window.removeEventListener('resize', setTableHeight);
    };
  }, [])

  const setTableHeight = () => {
    // ref src/layouts/BasicLayout.less
    const searchContainerHeight = searchContainerSize?.height || 0
    const countHeight = window.innerHeight - 56 - 24 - searchContainerHeight - 160 - 32;
    height.current = countHeight
  }


  return (
    <Row
      style={{
        width: '100%',
      }}
    >
      <Space
        direction="vertical"
        size="middle"
        style={{
          width: '100%',
        }}
      >
        <div
          ref={searchContainerRef}
        >
          {searchContainer}
        </div>
        <div
          style={{
            width: '100%',
            boxSizing: 'content-box',
          }}
        >
          <Table
            scroll={{
              y: height.current
            }}
            { ...tableConfig }
          />
        </div>
      </Space>
    </Row>
  );
};

