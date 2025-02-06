import React from 'react'
import { List, Tag, Form } from '@/components';
import {
  usePaginatedRequest,
  useSearch,
} from '@/hooks';
import AccountService from '@/services/account';
import type { IAccount } from '@/services/account/type'
import { EditAccount, Search } from './components';

const Account: React.FC = () => {

  const {
    t,
    list,
    setList,
    searchParams,
    setSearchParams,
    refreshDeps,
    setRefreshDepsFn,
    pages,
  } = useSearch<IAccount>({});
  const [searchForm] = Form.useForm()

  const getAccountRequest = usePaginatedRequest(
    (pageConfig) => {
      return AccountService.search({
        ...(pageConfig ? pageConfig : {}),
        ...(searchParams ? searchParams : {}),
      });
    },
    {
      refreshDeps: [searchParams, refreshDeps],
      paginated: true,
      defaultPageSize: pages?.pageSize,
      onSuccess(data) {
        const _list =
          data?.records?.length
            ? data?.records?.map((item: IAccount) => {
                return {
                  ...item,
                  roleNames: item?.roles?.map((r) => r?.name),
                }
              })
            : []
        setList(_list)
      },
    }
  )

  const searchHandle = async () => {
    const formData = await searchForm.getFieldsValue()
    setSearchParams({
      ...searchParams,
      ...formData
    })
  }

  const renderAction = (record: IAccount) => {
    return (
      <>
        <EditAccount
          userId={record?.id}
          setRefreshDepsFn={setRefreshDepsFn}
        />
      </>
    );
  };

  const columns = [
    {
      title: t('account_column_id'),
      dataIndex: 'id',
    },
    {
      title: t('account_column_name'),
      dataIndex: 'username',
    },
    {
      title: t('account_column_mobile'),
      titleCol: 8,
      dataIndex: 'mobile',
    },
    {
      title: t('account_column_role'),
      dataIndex: 'role',
    },
    {
      title: t('enabled'),
      dataIndex: 'enabled',
      render: (_: any, record: IAccount) => {
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
      fixed: 'right',
      render: (_: any, record: IAccount) => renderAction(record),
    },
  ];

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <List
        searchContainer={
          <Search
            searchHandle={searchHandle}
            form={searchForm}
          />
        }
        tableConfig={{
          rowKey: 'id',
          dataSource: list,
          columns: columns,
          loading: getAccountRequest?.loading,
          pagination: getAccountRequest?.pagination
        }}
      />
    </div>
  );
}

export default Account