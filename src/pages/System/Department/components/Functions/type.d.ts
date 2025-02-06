import type { TreeDataNode } from 'antd';

export interface FunctionsProps {
  node: TreeDataNode;
  successCallback: () => void;
}