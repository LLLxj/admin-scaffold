export interface ResourceEditProps {
  resourceId?: number;
  type?: 'primary' | 'link';
  successCallback: () => void;
}