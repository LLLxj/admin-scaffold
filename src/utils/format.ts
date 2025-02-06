import type { ITree } from '@/components/TreeSelect/type'

export const formatTree = (initTree: any[] = [], id: string, name: string) => {
  if (!initTree?.length) {
    return []
  }
  const tree: ITree[] = initTree?.map((item) => {
    return {
      title: item?.[name],
      value: item?.[id],
      children: formatTree(item?.children, id, name)
    }
  })
  return tree
}