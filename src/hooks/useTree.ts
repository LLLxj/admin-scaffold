import { useState, Key } from 'react'
import type { ITree } from '@/components/Tree/type';

export const useTree = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([])
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
  const [treeData, setTreeData] = useState<ITree[]>([])

  const getExpandedKeys = (nodes: ITree[], key: string): string[] => {
    return nodes.flatMap((node: ITree) => {
      if (node.children?.length) {
        return [node?.[key], ...getExpandedKeys(node.children, key)] 
      }
      return []
    });
  }
  

  return {
    searchKeyword,
    setSearchKeyword,
    expandedKeys,
    setExpandedKeys,
    treeData,
    setTreeData,
    getExpandedKeys,
    checkedKeys,
    setCheckedKeys,
    selectedKeys,
    setSelectedKeys,
  }
}