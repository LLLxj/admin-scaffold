import type { ITree } from '@/components/TreeSelect/type'

export const formatTree = (
  initTree: any[] = [],
  titleKey: string,
  valueKey: string,
  childrenKey: string = 'children',
) => {
  if (!initTree?.length) {
    return []
  }
  const tree: ITree[] = initTree?.map((item) => {
    return {
      title: item?.[titleKey],
      value: item?.[valueKey],
      children: formatTree(item?.[childrenKey], titleKey, valueKey)
    }
  })
  return tree
}