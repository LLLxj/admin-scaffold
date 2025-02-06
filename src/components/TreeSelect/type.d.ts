import type { RequestOption } from '../Tree/type'
import type { TreeSelectProps } from 'antd';
interface ITreeDate {
  title: string | React.ReactNode;
  value: string | number;
}

export type TreeRequestProps = RequestOption & TreeSelectProps

export interface ITree extends ITreeDate {
  children: ITreeDate[]
}

export interface TreeRefProps {
  initData: () => void;
  setTreeData: (data: ITree[]) => void;
  resetTreeData: () => void;
}
