import React from 'react';
import {
  usePaginatedRequest,
  useSearch,
} from '@/hooks';
import { Dictionary as DictionaryService } from '@/services';
import {
  List,
  Tag,
  Access,
  Form,
} from '@/components'
import { Search, EditDictionary } from '../index'
import type { IDictionary, IDictionaryItem } from '@/services/dictionary/type'

export const DictionaryList: React.FC = () => {

  const {
    t,
    list,
    setList,
    searchParams,
    setSearchParams,
    refreshDeps,
    setRefreshDepsFn,
    pages,
  } = useSearch<IDictionary>({});
 
  const [searchForm] = Form.useForm()
  

  const getListRequest = usePaginatedRequest(
    (pageConfig) => {
      return DictionaryService.search({
        ...(pageConfig ? pageConfig : {}),
        ...(searchParams ? searchParams : {}),
      });
    },
    {
      refreshDeps: [searchParams, refreshDeps],
      paginated: true,
      defaultPageSize: pages?.pageSize,
      onSuccess: (data) => {
        const _list = data.records?.map((item: IDictionary) => {
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

  const renderAction = (record: IDictionary) => {
    return (
      <>
        <Access
          permission='字典管理字典管理新增/编辑'
        >
          <EditDictionary
            id={record?.id}
            type='link'
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
      title: t('dictionary_column_code'),
      dataIndex: 'code',
    },
    {
      title: t('dictionary_column_describe'),
      dataIndex: 'describe',
    },
    {
      title: t('dictionary_column_items'),
      dataIndex: 'items',
      render: (items: IDictionaryItem[]) => {
        if (!items?.length) {
          return undefined
        }
        return items?.map((item) => item?.text)?.join(',')
      }
    },
    {
      title: t('status'),
      dataIndex: 'enabled',
      render: (_: any, record: IDictionary) => {
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
      render: (_: any, record: IDictionary) => renderAction(record),
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