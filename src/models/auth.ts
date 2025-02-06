import Auth from '@/services/auth';
import type { IAuthLogin, IAuthLoginVo } from '@/services/auth/type';
import { history, useModel } from '@umijs/max';
import { useState } from 'react';
import type { ICurrentUser } from './type';
import { getPermissionCodes } from '@/utils'

const useAuthModel = () => {
  const { setInitialState } = useModel('@@initialState');
  const [userInfo, setUserInfo] = useState<ICurrentUser>();

  const login = async (data: IAuthLogin) => {
    const response: IAuthLoginVo = await Auth.login(data);
    const { token } = response;
    localStorage.setItem('authorization', token);
    history.push('/dashboard');
  };

  const getUserInfo = async () => {
    const currentUser = await Auth.getUserInfo();
    const permissions = getPermissionCodes(currentUser?.resources)
    const _currentUser = {
      ...currentUser,
      permissions,
    }
    setUserInfo(_currentUser);
    setInitialState(_currentUser);
    return currentUser
  };

  const logout = async () => {
    await Auth.logout();
    localStorage.clear();
    history.replace('/login');
  };

  return {
    login,
    logout,
    getUserInfo,
    userInfo,
  };
};

export default useAuthModel;
