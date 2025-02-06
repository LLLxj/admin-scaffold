import type { ButtonType } from '@/pages/type'

export interface TableActionProps {
  asyncHandle?: (data: any) => Promise<any>; // request api
  asyncParams?: any; // request data
  buttonText: string;
  loading?: boolean;
  loadingCondition?: boolean;
  disabled?: boolean;
  disabledCondition?: boolean;
  buttonType?: ButtonType;
  successCallback?: (data?: any) => void;
  successShowTip?: boolean;
  needConfirm?: boolean;
  confirmTitle?: string;
  confirmDescription?: string;
}