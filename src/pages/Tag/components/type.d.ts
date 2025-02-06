import type { IModalRef } from '@/pages/type';

export interface ITagSearchProps {
  searchHandle: (data?: any) => void;
}

export interface ITagEditInitProps {
  id?: number
}
export interface ITagEditProps {
  successCallback?: () => void;
}

export type ITagEditRef = IModalRef