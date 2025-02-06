import { useModel } from '@umijs/max';
import { useState } from 'react';
import type { ISize } from '@/app';

// type ISystemSizeType = 'small' | 'middle' | 'large'

const useSystemModel = () => {
  const { setInitialState } = useModel('@@initialState');
  const [size, setSize] = useState<ISize>('small');

  const chooseSize = async (data: ISize) => {
    setSize(data)
    setInitialState((prev: any) => ({
      ...prev,
      systemConfig: {
        ...prev?.systemConfig,
        size
      }
    }))
  };

  return {
    chooseSize,
    size,
  };
};

export default useSystemModel;
