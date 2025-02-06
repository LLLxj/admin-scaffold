import React, { useEffect, useState, useMemo, Key } from 'react'
import {
  Tree,
  Card,
  Input,
  Space,
  Row,
  Col,
} from '@/components';
import type { TreeDataNode } from 'antd';
import { useRequest, UseInnerHeight } from '@/hooks'
import { useToggle, useDebounce } from 'ahooks';
import DepartmentService from '@/services/department'
import type { ISearchTreeItem } from '@/services/department/type'
import './index.less';
import { UseDepartment } from './useDepartment';
import { Functions, DepartmentUser } from './components';

const Department: React.FC = () => {

  const [treeData, setTreeData] = useState<TreeDataNode[]>([])
  const [refreshDeps, setRefreshDeps] = useToggle()
  const { height } = UseInnerHeight()
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const debouncedSearchKeyword = useDebounce(searchKeyword, { wait: 500 });
  const { renderTree } = UseDepartment();
  const [departmentId, setDepartmentId] = useState<number>()

  const getTaskRequest = useRequest(
    DepartmentService.getTree,
    {
      onSuccess: (data: ISearchTreeItem) => {
        const _treeData = renderTree([data])
        setTreeData(_treeData)
      },
    },
  );

  useEffect(() => {
    getTaskRequest.run({
      departmentId: 0
    })
  }, [refreshDeps])

  const searchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e?.target;
    setSearchKeyword(value)
  }

  const onSelect = (selectKeys: Key[]) => {
    setDepartmentId(selectKeys?.[0] as number)
  }

  const memoTreeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data?.map((item: TreeDataNode) => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(debouncedSearchKeyword);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + debouncedSearchKeyword.length);
        const titleLabel =
          index > -1 ? (
            <span
              key={item.key}
            >
              <span>
                { beforeStr }
                <span
                  className="site-tree-search-value"
                >
                  { debouncedSearchKeyword }
                </span>
                { afterStr }
              </span>
            </span>
          ) : (
            <span
              key={item.key}
            >
              { strTitle }
            </span>
          );
        const title = (
          <Row
            key={item.key}
            justify="space-between"
          >
            <Col>
              { titleLabel }
            </Col>
            <Col>
              <Functions
                node={item}
                successCallback={setRefreshDeps.toggle}
              />
            </Col>
          </Row>
        )
        if (item.children) {
          return {
            title,
            key: item.key,
            children: loop(item.children)
          };
        }
        return {
          title,
          key: item.key,
        };
      })
    return loop(treeData)
  }, [debouncedSearchKeyword, treeData])

  return (
    <Row
      gutter={[10, 0]}
    >
      <Col
        span={12}
      >
        <Card
          style={{
            height: `${height}px`,
          }}
        >
          <Space>
            <Input
              onChange={searchKeywordChange}
            />
            <Tree
              treeData={memoTreeData}
              showSearch={false}
              defaultExpandAll
              blockNode
              onSelect={onSelect}
            />
          </Space>
          
        </Card>
      </Col>
      <Col
        span={12}
      >
        <Card
          style={{
            height: `${height / 2}px`,
          }}
        >
          <DepartmentUser
            departmentId={departmentId}
          /> 
        </Card>
      </Col>
    </Row>
  );
}

export default Department