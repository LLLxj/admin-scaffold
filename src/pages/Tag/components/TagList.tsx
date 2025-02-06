import React, { useRef } from 'react';
import { Button, Table, Tag, message } from '@/components';
import { useLocale, UseRequest } from '@/hooks';
import TagService from '@/services/tag';
import type { ITag, ITagListProps } from '../type';

const TagList: React.FC<ITagListProps> = ({
  list,
  loading,
  pages,
  setRefreshDeps,
  height,
}) => {
  console.log('TagList height')
  console.log(height)
  const { t } = useLocale();
  const currentId = useRef<string>('');

  const disableRequest = UseRequest(TagService.disable, {
    onSuccess: () => {
      message.success(t('operate_success'));
      setRefreshDeps.toggle();
    },
  });

  const enableRequest = UseRequest(TagService.enable, {
    onSuccess: () => {
      message.success(t('operate_success'));
      setRefreshDeps.toggle();
    },
  });

  const enableFn = (record: ITag) => {
    currentId.current = record?.id;
    enableRequest?.run(record?.id);
  };

  const disableFn = (record: ITag) => {
    currentId.current = record?.id;
    disableRequest?.run(record?.id);
  };

  const renderAction = (record: ITag) => {
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
      title: t('tag_column_name'),
      dataIndex: 'name',
    },
    {
      title: t('tag_column_module'),
      dataIndex: 'resource',
    },
    {
      title: t('enabled'),
      dataIndex: 'enabled',
      render: (_: any, record: ITag) => {
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
      render: (_: any, record: ITag) => renderAction(record),
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

export default TagList;
