import type React from 'react';
import { useMemo } from 'react';
import { useModel } from '@umijs/max';


export interface AccessProps {
  permission?: string;
  permissions?: string[];
  children: React.ReactNode;
  validateConditionStatus?: boolean;
}

export const Access = ({
  permission = '',
  children,
  validateConditionStatus = true,
  permissions = [],
}: AccessProps) => {
  const { userInfo } = useModel('auth');
  const isValid = useMemo(() => {
    if (permissions?.length) {
      const _permissionStatus = permissions.some((p) => userInfo?.permissions?.includes(p));
      return _permissionStatus && validateConditionStatus;
    }
    return userInfo?.permissions?.includes(permission) && validateConditionStatus
  }, [userInfo?.id, permission, validateConditionStatus, permissions]);
  return isValid ? children : null;
};
