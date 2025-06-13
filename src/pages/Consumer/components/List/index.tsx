import React from 'react';
import {
  usePaginatedRequest,
  useSearch,
} from '@/hooks';
import { Consumer as ConsumerService } from '@/services';
import {
  List,
  Access,
  TableAction,
  Form,
  TableCell,
} from '@/components'
import type { IConsumer } from '@/services/consumer/type'
import { Search, Edit } from '../index'

export const ConsumerList: React.FC = () => {
  const resource = '耗材管理耗材管理'
  const {
    t,
    list,
    setList,
    searchParams,
    setSearchParams,
    refreshDeps,
    setRefreshDepsFn,
    pages,
  } = useSearch<IConsumer>({});
 
  const [searchForm] = Form.useForm()
  

  const getListRequest = usePaginatedRequest(
    (pageConfig) => {
      return ConsumerService.search({
        ...(pageConfig ? pageConfig : {}),
        ...(searchParams ? searchParams : {}),
      });
    },
    {
      refreshDeps: [searchParams, refreshDeps],
      paginated: true,
      defaultPageSize: pages?.pageSize,
      onSuccess: (data) => {
        const _list = data.records?.map((item: IConsumer) => {
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
    const formData = await searchForm.getFieldsValue()
    setSearchParams((prev: any) => ({
      ...prev,
      ...formData,
    }));
  };

  const renderAction = (record: IConsumer) => {
    return (
      <>
        <Access
          permission={`${resource}新增/编辑`}
        >
          <Edit
            id={record?.id}
            type='link'
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        <Access
          permission={`${resource}启用/禁用`}
          validateConditionStatus={record?.enabled}
        >
          <TableAction
            buttonText={t('disabled')}
            asyncHandle={ConsumerService.disable}
            asyncParams={record?.id}
            successCallback={setRefreshDepsFn.toggle}
          />
        </Access>
        <Access
          permission={`${resource}启用/禁用`}
          validateConditionStatus={!record?.enabled}
        >
          <TableAction
            buttonText={t('enabled')}
            asyncHandle={ConsumerService.enabled}
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
      titleCol: 1,
    },
    {
      title: t('consumer_column_name'),
      dataIndex: 'name',
    },
    {
      title: t('consumer_column_stock'),
      dataIndex: 'stock',
      render: (value: number) => {
        return (
          <TableCell
            type='number'
            value={value}
            format='0,0'
          />
        )
      }
    },
    {
      title: t('consumer_column_price'),
      dataIndex: 'price',
      titleCol: 4,
      render: (value: number) => {
        return (
          <TableCell
            type='number'
            value={value}
          />
        )
      }
    },
    {
      title: t('consumer_column_description'),
      dataIndex: 'description',
    },
    {
      title: t('status'),
      dataIndex: 'enabled',
      render: (value: boolean) => {
        return (
          <TableCell
            type='status'
            value={value}
          />
        );
      },
    },
    {
      title: t('table_column_action'),
      dataIndex: 'action',
      titleCol: 6,
      render: (_: any, record: IConsumer) => renderAction(record),
    },
  ]

  return (
    <div>
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
          loading: getListRequest?.loading,
          pagination: getListRequest?.pagination
        }}
      />
    </div>
  );
}