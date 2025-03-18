import React, { useRef } from 'react';
import {
  usePaginatedRequest,
  useSearch,
  useRequest,
} from '@/hooks';
import RoleService from '@/services/role';
import {
  List,
  Tag,
  Button,
  Access,
  message,
  TableAction,
} from '@/components'
import { Search } from '../index'
import type { ISearchRef, IRole } from './type'
import { EditRole } from '../Edit';
import DeleteRole from '../DeleteRole';

export const DepartmentList: React.FC = () => {

  const {
    t,
    list,
    setList,
    searchParams,
    setSearchParams,
    refreshDeps,
    setRefreshDepsFn,
    pages,
  } = useSearch<IRole>({});
  const searchRef = useRef<ISearchRef>();
  const currentId = useRef<number>();

  const getListRequest = usePaginatedRequest(
    (pageConfig) => {
      return RoleService.list({
        ...(pageConfig ? pageConfig : {}),
        ...(searchParams ? searchParams : {}),
      });
    },
    {
      refreshDeps: [searchParams, refreshDeps],
      paginated: true,
      defaultPageSize: pages?.pageSize,
      onSuccess: (data) => {
        const _list = data.records?.map((item: IRole) => {
          return {
            ...item,
            enabledLabel: item?.enabled ? '启用' : '禁用',
          };
        });
        setList(_list);
      },
    },
  );

  const changeEnabledRequest = useRequest(
    RoleService.changeEnabled,
    {
      onSuccess: () => {
        message.success(t('operate_success'));
        setRefreshDepsFn.toggle();
      },
    }
  );

  const searchHandle = async () => {
    const formData: Record<string, any> =
      (await searchRef.current?.getFormValue()) || {};
    setSearchParams((prev: any) => ({
      ...prev,
      ...formData,
    }));
  };

  const renderAction = (record: IRole) => {
    return (
      <>
        <Access
          permission='部门管理部门管理新增/编辑'
        >
          <EditRole
            roleId={record?.id}
            type='link'
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        <Access
          permission='部门管理部门管理启用/禁用'
          validateConditionStatus={record?.enabled}
        >
          <TableAction
            buttonText={t('disabled')}
            asyncHandle={RoleService.changeEnabled}
            asyncParams={{
              id: record?.id,
              enabled: !record?.enabled
            }}
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        <Access
          permission='部门管理部门管理启用/禁用'
          validateConditionStatus={!record?.enabled}
        >
          <TableAction
            buttonText={t('enabled')}
            asyncHandle={RoleService.changeEnabled}
            asyncParams={{
              id: record?.id,
              enabled: !record?.enabled
            }}
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        <Access
          permission='部门管理部门管理删除'
        >
          <TableAction
            buttonText={t('delete')}
            asyncHandle={RoleService.removeRole}
            asyncParams={record?.id}
            successCallback={setRefreshDepsFn.toggle}
            needConfirm={true}
            confirmTitle={t('role_remove_role_confirm_title')}
            confirmDescription={t('role_remove_role_confirm_description')}
          />
          {/* <DeleteRole
            roleId={record?.id}
            successCallback={setRefreshDepsFn.toggle}
          /> */}
        </Access>
        
      </>
    );
  };

  const columns = [
    {
      title: t('role_column_id'),
      dataIndex: 'id',
    },
    {
      title: t('role_column_name'),
      dataIndex: 'name',
    },
    {
      title: t('enabled'),
      dataIndex: 'enabled',
      render: (_: any, record: IRole) => {
        return (
          <Tag
            color={
              record?.enabled ? 'success' : 'warning'
            }
          >
            {record?.enabledLabel}
          </Tag>
        );
      },
    },
    {
      title: t('table_column_action'),
      dataIndex: 'action',
      render: (_: any, record: IRole) => renderAction(record),
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