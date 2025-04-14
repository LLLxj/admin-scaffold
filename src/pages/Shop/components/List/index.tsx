import React, { useRef } from 'react';
import {
  usePaginatedRequest,
  useSearch,
  useRequest,
} from '@/hooks';
import { Shop as ShopService} from '@/services';
import {
  List,
  Tag,
  Access,
  message,
  TableAction,
} from '@/components'
import { Search } from '../index'
import type { ISearchRef } from '@/pages/type'
import type { IShop } from '@/services/shop/type'
import { EditShop } from '../Edit';

export const ShopList: React.FC = () => {

  const {
    t,
    list,
    setList,
    searchParams,
    setSearchParams,
    refreshDeps,
    setRefreshDepsFn,
    pages,
  } = useSearch<IShop>({});
  const searchRef = useRef<ISearchRef>();

  const getListRequest = usePaginatedRequest(
    (pageConfig) => {
      return ShopService.list({
        ...(pageConfig ? pageConfig : {}),
        ...(searchParams ? searchParams : {}),
      });
    },
    {
      refreshDeps: [searchParams, refreshDeps],
      paginated: true,
      defaultPageSize: pages?.pageSize,
      onSuccess: (data) => {
        const _list = data.records?.map((item: IShop) => {
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
    ShopService.changeEnabled,
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

  const renderAction = (record: IShop) => {
    return (
      <>
        <Access
          permission='店家列表店家新增/编辑'
        >
          <EditShop
            id={record?.id}
            type='link'
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        <Access
          permission='店家列表店家启用/禁用'
          validateConditionStatus={record?.enabled}
        >
          <TableAction
            buttonText={t('disabled')}
            asyncHandle={ShopService.disable}
            asyncParams={record?.id}
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        <Access
          permission='店家列表店家启用/禁用'
          validateConditionStatus={!record?.enabled}
        >
          <TableAction
            buttonText={t('enabled')}
            asyncHandle={ShopService.enabled}
            asyncParams={record?.id}
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        {/* <Access
          permission='角色管理角色管理删除'
        >
          <TableAction
            buttonText={t('delete')}
            asyncHandle={ShopService.remove}
            asyncParams={record?.id}
            successCallback={setRefreshDepsFn.toggle}
            needConfirm={true}
            confirmTitle={t('role_remove_role_confirm_title')}
            confirmDescription={t('role_remove_role_confirm_description')}
          />
        </Access> */}
        
      </>
    );
  };

  const columns = [
    {
      title: t('column_id'),
      dataIndex: 'id',
    },
    {
      title: t('shop_column_name'),
      dataIndex: 'name',
    },
    {
      title: t('shop_column_mobile'),
      dataIndex: 'mobile',
    },
    {
      title: t('shop_column_contact_name'),
      dataIndex: 'contactName',
    },
    {
      title: t('shop_column_boss_name'),
      dataIndex: 'bossName',
    },
    {
      title: t('status'),
      dataIndex: 'enabled',
      render: (_: any, record: IShop) => {
        return (
          <Tag
            color={
              record?.enabled ? 'success' : 'warning'
            }
          >
            { record?.enabled ? t('enabled') : t('disabled')}
          </Tag>
        );
      },
    },
    {
      title: t('table_column_action'),
      dataIndex: 'action',
      titleCol: 6,
      render: (_: any, record: IShop) => renderAction(record),
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