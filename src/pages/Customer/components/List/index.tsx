import React, { useRef } from 'react';
import {
  usePaginatedRequest,
  useSearch,
} from '@/hooks';
import { Customer as CustomerService } from '@/services';
import {
  List,
  Tag,
  Access,
  TableAction,
} from '@/components'
import { Search, EditCustomer } from '../index'
import type { ISearchRef } from '@/pages/type'
import type { ICustomer } from '@/services/customer/type'
import type { ICommonItem } from '@/services/type'

export const CustomerList: React.FC = () => {

  

  const {
    t,
    list,
    setList,
    searchParams,
    setSearchParams,
    refreshDeps,
    setRefreshDepsFn,
    pages,
  } = useSearch<ICustomer>({});
 
  const searchRef = useRef<ISearchRef>();

  const getListRequest = usePaginatedRequest(
    (pageConfig) => {
      return CustomerService.search({
        ...(pageConfig ? pageConfig : {}),
        ...(searchParams ? searchParams : {}),
      });
    },
    {
      refreshDeps: [searchParams, refreshDeps],
      paginated: true,
      defaultPageSize: pages?.pageSize,
      onSuccess: (data) => {
        const _list = data.records?.map((item: ICustomer) => {
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

  const renderAction = (record: ICustomer) => {
    return (
      <>
        <Access
          permission='客户管理客户新增/编辑'
        >
          <EditCustomer
            id={record?.id}
            type='link'
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        <Access
          permission='客户管理客户启用/禁用'
          validateConditionStatus={record?.enabled}
        >
          <TableAction
            buttonText={t('disabled')}
            asyncHandle={CustomerService.disable}
            asyncParams={record?.id}
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        <Access
          permission='客户管理客户启用/禁用'
          validateConditionStatus={!record?.enabled}
        >
          <TableAction
            buttonText={t('enabled')}
            asyncHandle={CustomerService.enabled}
            asyncParams={record?.id}
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
      </>
    );
  };

  const columns = [
    {
      title: t('column_id'),
      dataIndex: 'id',
    },
    {
      title: t('customer_column_name'),
      dataIndex: 'name',
    },
    {
      title: t('customer_column_mobile'),
      dataIndex: 'mobile',
    },
    {
      title: t('customer_column_shop'),
      dataIndex: 'shop',
      render: (shop: ICommonItem) => {
        return shop?.name
      }
    },
    {
      title: t('customer_column_department'),
      dataIndex: 'department',
      render: (depaerment: ICommonItem) => {
        return depaerment?.name
      }
    },
    {
      title: t('customer_column_belong_user'),
      dataIndex: 'user',
      render: (user: ICommonItem) => {
        return user?.name
      }
    },
    {
      title: t('status'),
      dataIndex: 'enabled',
      render: (_: any, record: ICustomer) => {
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
      render: (_: any, record: ICustomer) => renderAction(record),
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