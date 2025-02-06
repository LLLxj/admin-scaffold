import { Button, Table, Tag, message } from '@/components';
import { useLocale, useRequest } from '@/hooks';
import TaskService from '@/services/task';
import React, { useRef } from 'react';
import type { ITask, ITaskListProps } from '../type';

export const TaskList: React.FC<ITaskListProps> = ({
  list,
  loading,
  pages,
  setRefreshDeps,
}) => {
  const { t } = useLocale();
  const currentId = useRef<number>();

  const disableRequest = useRequest(TaskService.disable, {
    onSuccess: () => {
      message.success(t('operate_success'));
      setRefreshDeps.toggle();
    },
  });

  const enableRequest = useRequest(TaskService.enable, {
    onSuccess: () => {
      message.success(t('operate_success'));
      setRefreshDeps.toggle();
    },
  });

  const enableFn = (record: ITask) => {
    currentId.current = record?.id;
    enableRequest?.run(record?.id);
  };

  const disableFn = (record: ITask) => {
    currentId.current = record?.id;
    disableRequest?.run(record?.id);
  };

  const renderAction = (record: ITask) => {
    return (
      <>
        {record?.enabled && (
          <Button
            disabled={
              currentId?.current === record?.id && disableRequest?.loading
            }
            loading={
              currentId?.current === record?.id && disableRequest?.loading
            }
            onClick={() => disableFn(record)}
            type="link"
          >
            禁用
          </Button>
        )}
        {!record?.enabled && (
          <Button
            disabled={
              currentId?.current === record?.id && enableRequest?.loading
            }
            loading={
              currentId?.current === record?.id && enableRequest?.loading
            }
            onClick={() => enableFn(record)}
            type="link"
          >
            启用
          </Button>
        )}
      </>
    );
  };

  const renderLoading = (): boolean => {
    const loadingStatus = [
      loading,
      enableRequest?.loading,
      disableRequest?.loading,
    ]?.includes(true);
    return loadingStatus;
  };

  const columns = [
    {
      title: t('task_column_content'),
      dataIndex: 'content',
    },
    {
      title: t('task_column_category'),
      dataIndex: 'tagName',
    },
    {
      title: t('task_column_excute_time'),
      dataIndex: 'excuteTime',
    },
    {
      title: t('enabled'),
      dataIndex: 'enabled',
      render: (_: any, record: ITask) => {
        return (
          <Tag color={record?.enabled ? 'success' : 'warning'}>
            {record?.enabledLabel}
          </Tag>
        );
      },
    },
    {
      title: t('table_column_action'),
      dataIndex: 'action',
      render: (_: any, record: ITask) => renderAction(record),
    },
  ];

  return (
    <div>
      <Table
        rowKey={(record) => record?.id}
        columns={columns}
        dataSource={list}
        loading={renderLoading()}
        pagination={pages}
      />
    </div>
  );
};