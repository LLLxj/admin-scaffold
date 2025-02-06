import type React from 'react';
import { useMemo } from 'react';
import { useModel } from '@umijs/max';


export interface AccessProps {
  permission: string | string[];
  children: React.ReactNode;
  validateConditionStatus?: boolean;
}

export const Access = ({
  permission,
  children,
  validateConditionStatus = true,
}: AccessProps) => {
  const { userInfo } = useModel('auth');
  const isValid = useMemo(() => {
    if (Array.isArray(permission)) {
      const _permissionStatus = permission.some((p) => userInfo?.permissions?.includes(p));
      return _permissionStatus && validateConditionStatus;
    }
    return userInfo?.permissions?.includes(permission) && validateConditionStatus
  }, [userInfo?.id, permission, validateConditionStatus]);
  return isValid ? children : null;
};
