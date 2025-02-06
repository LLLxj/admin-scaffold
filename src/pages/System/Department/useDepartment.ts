import type { TreeDataNode } from 'antd';
import type { ISearchTreeItem } from '@/services/department/type'

export const UseDepartment = () => {

  const renderTree = (initTree: ISearchTreeItem[]): TreeDataNode[] => {
    if (!initTree?.length) {
      return []
    }
    const treeData: TreeDataNode[] = initTree?.map((item: ISearchTreeItem) => {
      return {
        key: item?.id,
        title: item?.name,
        children: renderTree(item?.children)
      }
    })
    return treeData
  }

  return {
    renderTree
  }
}