
import type { TreeProps, DataNode } from 'antd'
export type ITree = DataNode

export type TreeRequestProps = TreeProps & RequestOption

export interface CommonTreeProps extends TreeRequestProps {
  showSearch?: boolean;
  name?: string;
  onSelect?: (data: Key[]) => void;
  onCheck?: (data: Key[]) => void;
  
}

export interface TreeRefProps {
  initData: () => void;
  setData: (data: ITree[]) => void; 
}

export interface RequestOption {
  asyncHandle?: (data: any) => Promise<any>;
  asyncParams?: any;
  formatResult?: (data: any[]) => DataNode[]; // 格式化树形结构
  getTreeActiveKey?: (data: DataNode[]) => string;
  getCheckedKeys?: (data: any[]) => Key[]
}

export interface ExpandFnInfo {
  node: EventDataNode<TreeDataNode>;
  expanded: boolean;
  nativeEvent: MouseEvent;
}
