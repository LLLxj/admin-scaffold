import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react'
import { TreeSelect as AntdTreeSelect } from 'antd';
import { useRequest } from '@/hooks';
import type { TreeRequestProps, ITree } from './type'

export const TreeSelect = forwardRef((
  {
    asyncHandle,
    asyncParams,
    formatResult,
    ...props
  }: TreeRequestProps,
  parentRef
) => {

  const [treeData, setTreeData] = useState<ITree[]>([])

  useImperativeHandle(
    parentRef,
    () => ({
      initData: () => {
        getDataRequest.run(asyncParams)
      },
      setData: (data: ITree[]) => {
        setTreeData(data)
      },
      resetTreeData: () => {
        setTreeData([])
      }
    })
  );

  const getDataRequest = useRequest(
    asyncHandle,
    {
      onSuccess: (data: any) => {
        if (formatResult) {
          const _treeData = formatResult(data)
          setTreeData(_treeData)
        }
      }
    }
  )

  return (
    <AntdTreeSelect
      { ...props }
      treeData={treeData}
    />
  );
})
