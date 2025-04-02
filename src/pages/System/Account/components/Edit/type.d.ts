import type { ISuccessCallback } from '@/pages/type'
import type { ButtonType } from '@/components/Button/type'
export interface EditAccountProps {
  id?: number;
  successCallback: ISuccessCallback;
  buttonLabel: string;
  buttonType: ButtonType;
  buttonInTable?: boolean;
}