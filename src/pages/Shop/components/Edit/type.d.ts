export interface EditShopProps {
  roleId?: number;
  type?: 'primary' | 'link';
  successCallback: () => void;
}