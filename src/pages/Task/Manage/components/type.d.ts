import type { IModalRef } from '@/pages/type';

export interface ITaskSearchProps {
  // parentRef: any;
  searchHandle: () => void;
}

export interface ITaskEditInitProps {
  id?: number
}
export interface ITaskEditProps {
  successCallback?: () => void;
}

export type ITaskEditRef = IModalRef