import type { ICurrentUser } from '@/models/type'

type ISize = 'middle' | 'small' | 'large'

interface ISystemConfig {
  size: ISize,
  language: string;
}

interface IInitialData {
  currentUser: ICurrentUser;
}

async function getInitialState() {
  const initialData: IInitialData = {
    currentUser: {} as ICurrentUser,
  };
  return initialData;
}

export { ICurrentUser, ISize, ISystemConfig, getInitialState, IInitialData }
