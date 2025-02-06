import React, {
  useMemo,
  Key,
  forwardRef,
  useImperativeHandle,
  useEffect
} from 'react'
import { Tree as AntdTree } from 'antd' 
import { NoData, Space, Input, Row } from '@/components'
import type { CommonTreeProps } from './type'
import { useDebounce } from 'ahooks';
import type { TreeDataNode } from 'antd';
import { useRequest, useTree } from '@/hooks';
import type { ITree, ExpandFnInfo } from './type';

export const Tree = forwardRef((
  {
    showSearch = false,
    formatResult,
    asyncHandle,
    asyncParams = {},
    onSelect,
    onCheck,
    getCheckedKeys,
    ...props
  }: CommonTreeProps,
  parentRef
) => {
  const {
    searchKeyword,
    setSearchKeyword,
    setExpandedKeys,
    treeData,
    setTreeData,
    getExpandedKeys,
    setCheckedKeys,
  } = useTree()
  const debouncedSearchKeyword = useDebounce(searchKeyword, { wait: 500 });
  const getDataRequest = useRequest(
    asyncHandle,
    {
      onSuccess: (data: any) => {
        if (formatResult) {
          const _treeData = formatResult(data)
          const _expandedKeys = getExpandedKeys(_treeData, 'key')
          if (getCheckedKeys) {
            const _checkKeys = getCheckedKeys(data)
            setCheckedKeys(_checkKeys)
            if (onCheck) {
              onCheck(_checkKeys)
            }
          }
          setTreeData(_treeData)
          setExpandedKeys(_expandedKeys)
        }
      }
    }
  )

  useImperativeHandle(
    parentRef,
    () => ({
      initData: () => {
        getDataRequest.run(asyncParams)
      },
      setData: (_treeData: ITree[]) => {
        setTreeData(_treeData)
        // const _expandedKeys = findNodesWithChildren(_treeData, 'key')
        // setExpandedKeys(_expandedKeys)
      },
      resetData: () => {
        setTreeData([])
      }
    })
  );

  useEffect(() => {
    if (asyncHandle) {
      getDataRequest.run(asyncParams)
    }
  }, [asyncHandle, asyncParams])

  const searchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e?.target;
    setSearchKeyword(value)
  }

  const memoTreeData = useMemo(() => {
    if (!showSearch) {
      return treeData;
    }
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data?.map((item: TreeDataNode) => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(debouncedSearchKeyword);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + debouncedSearchKeyword.length);
        const title =
          index > -1 ? (
            <Row
              key={item.key}
            >
              { beforeStr }
              <span
                className="site-tree-search-value"
              >
                { debouncedSearchKeyword }
              </span>
              { afterStr }
            </Row>
          ) : (
            <span
              key={item.key}
            >
              { strTitle }
            </span>
          );
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

  const treeOnSelect = (value: Key[]) => {
    if (onSelect) {
      onSelect(value)
    }
  }

  const treeOnCheck = (checked: any) => {
    if (onCheck) {
      onCheck(checked as Key[])
    }
  }

  const onExpandFn = (_expandedKeys: Key[], info: ExpandFnInfo) => {
    setExpandedKeys(_expandedKeys)
    if (props.onExpand) {
      props.onExpand(_expandedKeys, info)
    }
  }

  if (!treeData?.length) {
    return <NoData />
  }
  return (
    <Space>
      {
        showSearch
          ? <Input
              onChange={searchKeywordChange}
            />
          : <></>
      }
      <AntdTree
        { ...props }
        treeData={memoTreeData}
        onSelect={treeOnSelect}
        onCheck={treeOnCheck}
        onExpand={onExpandFn}
      />
    </Space>
  );
})
