import React, { useRef } from 'react'
import { useSearch, usePaginatedRequest } from '@/hooks';
import Permission from '@/services/permission';
import { List, Access, StatusTag, TableAction } from '@/components'
import { Search } from '../Search'
import type { ISearchRefProps } from '@/pages/type';
import type { ISearchPermissionItem } from '@/services/permission/type'
import { EditPermission } from '../Edit'

export const PermissionList: React.FC = () => {

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
      return Permission.search({
        ...(pageConfig ? pageConfig : {}),
        ...(searchParams ? searchParams : {}),
      });
    },
    {
      refreshDeps: [searchParams, refreshDeps],
      paginated: true,
      defaultPageSize: pages?.pageSize,
      onSuccess: (data) => {
        const _list = data.records?.map((item: ISearchPermissionItem) => {
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

  const renderAction = (record: ISearchPermissionItem) => {
    return (
      <>
        <Access
          permission='权限管理权限管理新增/编辑'
        >
          <EditPermission
            id={record?.id}
            inTable={true}
            type="link"
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        <Access
          permission='权限管理权限管理启用/禁用'
          validateConditionStatus={record?.enabled}
        >
          <TableAction
            buttonText={t('disabled')}
            asyncHandle={Permission.changeEnabled}
            asyncParams={{
              permissionId: record?.id,
              enabled: !record?.enabled
            }}
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        <Access
          permission='权限管理权限管理启用/禁用'
          validateConditionStatus={!record?.enabled}
        >
          <TableAction
            buttonText={t('enabled')}
            asyncHandle={Permission.changeEnabled}
            asyncParams={{
              permissionId: record?.id,
              enabled: !record?.enabled
            }}
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        <Access
          permission='权限管理权限管理删除'
        >
          <TableAction
            buttonText={t('delete')}
            asyncHandle={Permission.remove}
            asyncParams={record?.id}
            disabledCondition={currentId?.current === record?.id}
            loadingCondition={currentId?.current === record?.id}
            successCallback={setRefreshDepsFn.toggle}
            needConfirm={true}
            confirmTitle={t('permission_remove_resource_confirm_title')}
            confirmDescription={t('permission_remove_resource_confirm_description')}
          />
        </Access>
      </>
    );
  };

  const columns = [
    {
      title: t('permission_column_name'),
      dataIndex: 'name',
    },
    {
      title: t('permission_column_code'),
      dataIndex: 'code',
    },
    {
      title: t('permission_column_status'),
      dataIndex: 'enabled',
      render: (_: any, record: ISearchPermissionItem) => {
        return (
          <StatusTag
            value={record?.enabled}
          />
        );
      },
    },
    {
      title: t('permission_column_create_time'),
      dataIndex: 'createTime',
      titleCol: 6,
    },
    {
      title: t('table_column_action'),
      dataIndex: 'action',
      titleCol: 4,
      render: (_: any, record: ISearchPermissionItem) => renderAction(record),
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