import {
  useRequest,
  useLocale,
} from '@/hooks';
import { message } from '@/components';
import TaskService from '@/services/task';
import type { IUseHandleRequestProps } from './type'

export const UseHandleRequest = (
  {
    setRefreshDepsFn
  }: IUseHandleRequestProps
) => {
  const { t } = useLocale();

  const disableRequest = useRequest(TaskService.disable, {
    onSuccess: () => {
      message.success(t('operate_success'));
      setRefreshDepsFn.toggle();
    },
  });

  const enableRequest = useRequest(TaskService.enable, {
    onSuccess: () => {
      message.success(t('operate_success'));
      setRefreshDepsFn.toggle();
    },
  });

  const deleteRequest = useRequest(TaskService.delete, {
    onSuccess: () => {
      message.success(t('operate_success'));
      setRefreshDepsFn.toggle();
    },
  });

  return {
    disableRequest,
    enableRequest,
    deleteRequest,
  }
}