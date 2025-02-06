import React, { useRef } from 'react';
import {
  List,
  Tag,
  Button,
  Dropdown,
} from '@/components';
import {
  usePaginatedRequest,
  useSearch,
  useTableOption,
} from '@/hooks';
import TaskService from '@/services/task';
import { TaskSearch, TaskEdit } from './components';
import type { ITask, ITaskSearchRef } from './type';
import { Typography } from 'antd';
import type { ITaskEditRef } from './components/type';
import { DownOutlined } from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';
import type { IHandleType } from '@/pages/type'
import { UseHandleRequest } from './useHandleRequest';

const Task: React.FC = () => {
  const currentId = useRef<number>();
  const taskEditRef = useRef<ITaskEditRef>();
  const taskSearchRef = useRef<ITaskSearchRef>();
  const {
    t,
    list,
    setList,
    searchParams,
    setSearchParams,
    refreshDeps,
    setRefreshDepsFn,
    pages,
  } = useSearch<ITask>({});
  const { columns: initColumns } = useTableOption({
    resource: '任务管理列表'
  })
  console.log(initColumns)
  const { disableRequest, enableRequest, deleteRequest } = UseHandleRequest({
    setRefreshDepsFn
  })

  const getTaskRequest = usePaginatedRequest(
    (pageConfig) => {
      return TaskService.search({
        ...(pageConfig ? pageConfig : {}),
        ...(searchParams ? searchParams : {}),
      });
    },
    {
      refreshDeps: [searchParams, refreshDeps],
      paginated: true,
      defaultPageSize: pages?.pageSize,
      onSuccess: (data) => {
        const _list = data.records?.map((item: ITask) => {
          return {
            ...item,
            tagId: item?.tag?.id,
            tagName: item?.tag?.name,
            enabledLabel: item?.enabled ? '启用' : '禁用',
          };
        });
        setList(_list);
      },
    },
  );

  const enabledFn = (record: ITask) => {
    currentId.current = record?.id;
    enableRequest?.run(record?.id);
  };

  const disableFn = (record: ITask) => {
    currentId.current = record?.id;
    disableRequest?.run(record?.id);
  };

  const deleteFn = (record: ITask) => {
    currentId.current = record?.id;
    deleteRequest?.run(record?.id);
  };

  const editFn = (record: ITask) => {
    if (taskEditRef?.current) {
      taskEditRef.current.init({ id: record?.id })
    }
  }

  const searchHandle = async () => {
    const formData: Record<string, any> =
      (await taskSearchRef.current?.getFormValue()) || {};
    setSearchParams((prev: any) => ({
      ...prev,
      ...formData,
    }));
  };

  const onMenuClick = (event: MenuInfo, record: ITask) => {
    const key = event?.key as IHandleType
    const handleMap: Record<IHandleType, () => void> = {
      disabled: () => disableFn(record),
      enabled: () => enabledFn(record),
      delete: () => deleteFn(record),
    }
    const method = handleMap?.[key];
    if (method) {
      method();
    }
  }

  const handleItems = [
    {
      key: 'enabled',
      label: t('enabled'),
    },
    {
      key: 'disabled',
      label: t('disabled'),
    },
    {
      key: 'delete',
      label: t('delete'),
    },
  ]

  const renderHandleItems = (record: ITask) => {
    const keyDisabledMap: Record<IHandleType, boolean> = {
      enabled:
        currentId?.current === record?.id &&
        enableRequest?.loading,
      disabled:
        currentId?.current === record?.id &&
        disableRequest?.loading,
      delete:
        currentId?.current === record?.id &&
        deleteRequest?.loading,
    }
    const validateHandleItems = handleItems?.map((item) => {
      const key = item?.key as IHandleType;
      return {
        ...item,
        disabled: keyDisabledMap?.[key] || false
      }
    })?.filter((item) => {
      if (
        record?.enabled &&
        item?.key === 'enabled'
      ) {
        return false
      } else if (
        !record?.enabled &&
        item?.key === 'disabled'
      ) {
        return false
      }
      return true
    })
    return validateHandleItems
  }

  const renderAction = (record: ITask) => {
    return (
      <>
        <Button
          onClick={() => editFn(record)}
          type="link"
        >
          {t('edit')}
        </Button>
        <Dropdown menu={{
          items: renderHandleItems(record),
          selectedKeys: [],
          onClick: (e) => onMenuClick(e, record),
        }}>
          <Typography.Link>
            { t('more') }
            <DownOutlined />
          </Typography.Link>
        </Dropdown>
      </>
    );
  };

  const columns = [
    {
      title: t('task_column_content'),
      titleCol: 8,
      dataIndex: 'content',
    },
    {
      title: t('task_column_category'),
      dataIndex: 'tagName',
    },
    {
      title: t('task_column_start_time'),
      dataIndex: 'startTime',
    },
    {
      title: t('task_column_end_time'),
      dataIndex: 'endTime',
    },
    {
      title: t('task_column_duration'),
      dataIndex: 'duration',
    },
    {
      title: t('enabled'),
      dataIndex: 'enabled',
      render: (_: any, record: ITask) => {
        return (
          <Tag color={
            record?.enabled ? 'success' : 'warning'
          }>
            { record?.enabled ? t('enabled') : t('disabled') }
          </Tag>
        );
      },
    },
    {
      title: t('table_column_action'),
      dataIndex: 'action',
      titleCol: 6,
      render: (_: any, record: ITask) => renderAction(record),
    },
  ];

  return (
    <>
      <List
        searchContainer={
          <TaskSearch
            ref={taskSearchRef}
            searchHandle={searchHandle}
          />
        }
        tableConfig={{
          rowKey: 'id',
          dataSource: list,
          columns: columns,
          loading: getTaskRequest?.loading,
          pagination: getTaskRequest?.pagination
        }}
      />
      <TaskEdit
        ref={taskEditRef}
        successCallback={setRefreshDepsFn.toggle}
      />
    </>
  );
};

export default Task;
