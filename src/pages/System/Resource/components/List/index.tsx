import React, { useRef } from 'react'
import { useSearch, usePaginatedRequest } from '@/hooks';
import Resource from '@/services/resource';
import { List, Access, StatusTag, TableAction } from '@/components'
import { Search } from '../Search'
import type { ISearchRefProps } from '@/pages/type';
import type { IResource } from '@/services/resource/type'

export const ResourceList: React.FC = () => {

  const {
    t,
    list,
    setList,
    searchParams,
    setSearchParams,
    refreshDeps,
    setRefreshDepsFn,
    pages,
    currentId,
  } = useSearch({});

  const searchRef = useRef<ISearchRefProps>();

  const getListRequest = usePaginatedRequest(
    (pageConfig) => {
      return Resource.search({
        ...(pageConfig ? pageConfig : {}),
        ...(searchParams ? searchParams : {}),
      });
    },
    {
      refreshDeps: [searchParams, refreshDeps],
      paginated: true,
      defaultPageSize: pages?.pageSize,
      onSuccess: (data) => {
        const _list = data.records?.map((item: IResource) => {
          return {
            ...item,
            enabledLabel: item?.enabled ? '启用' : '禁用',
          };
        });
        setList(_list);
      },
    },
  );

  const searchHandle = async () => {
    const formData: Record<string, any> =
      (await searchRef.current?.getFormValue()) || {};
    setSearchParams((prev: any) => ({
      ...prev,
      ...formData,
    }));
  };

  const renderAction = (record: IResource ) => {
    return (
      <>
        <Access
          permission='资源管理资源管理启用/禁用'
          validateConditionStatus={record?.enabled}
        >
          <TableAction
            buttonText={t('disabled')}
            asyncHandle={Resource.changeEnabled}
            asyncParams={{
              id: record?.id,
              enabled: !record?.enabled
            }}
            disabledCondition={currentId?.current === record?.id}
            loadingCondition={currentId?.current === record?.id}
          />
        </Access>
        <Access
          permission='资源管理资源管理启用/禁用'
          validateConditionStatus={!record?.enabled}
        >
          <TableAction
            buttonText={t('enabled')}
            asyncHandle={Resource.changeEnabled}
            asyncParams={{
              id: record?.id,
              enabled: !record?.enabled
            }}
            disabledCondition={currentId?.current === record?.id}
            loadingCondition={currentId?.current === record?.id}
          />
        </Access>
        <Access
          permission='资源管理资源管理删除'
        >
          <TableAction
            buttonText={t('delete')}
            asyncHandle={Resource.remove}
            asyncParams={record?.id}
            disabledCondition={currentId?.current === record?.id}
            loadingCondition={currentId?.current === record?.id}
            successCallback={setRefreshDepsFn.toggle}
            needConfirm={true}
            confirmTitle={t('resource_remove_resource_confirm_title')}
            confirmDescription={t('resource_remove_resource_confirm_description')}
          />
        </Access>
      </>
    );
  };

  const columns = [
    {
      title: t('resource_column_name'),
      dataIndex: 'name',
    },
    {
      title: t('resource_column_code'),
      dataIndex: 'code',
    },
    {
      title: t('status'),
      dataIndex: 'enabled',
      render: (_: any, record: IResource) => {
        return (
          <StatusTag
            value={record?.enabled}
          />
        );
      },
    },
    {
      title: t('resource_column_create_time'),
      dataIndex: 'createTime',
      titleCol: 6,
    },
    {
      title: t('table_column_action'),
      dataIndex: 'action',
      titleCol: 4,
      render: (_: any, record: IResource) => renderAction(record),
    },
  ]

  return (
    <div>
      <List
        searchContainer={
          <Search
            ref={searchRef}
            searchHandle={searchHandle}
          />
        }
        tableConfig={{
          rowKey: 'id',
          dataSource: list,
          columns: columns,
          loading: getListRequest?.loading,
          pagination: getListRequest?.pagination
        }}
      />
    </div>
  );
}