import React from 'react'
import { List, Tag, Form } from '@/components';
import {
  usePaginatedRequest,
  useSearch,
} from '@/hooks';
import DepartmentService from '@/services/department';
import type { IDepartment } from '@/services/department/type'
import type { ICommonItem } from '@/services/type'
import { EditDepartment, Search } from './components';

const Department: React.FC = () => {

  const {
    t,
    list,
    setList,
    searchParams,
    setSearchParams,
    refreshDeps,
    setRefreshDepsFn,
    pages,
  } = useSearch<IDepartment>({});
  const [searchForm] = Form.useForm()

  const getAccountRequest = usePaginatedRequest(
    (pageConfig) => {
      return DepartmentService.search({
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
            ? data?.records?.map((item: IDepartment) => {
                return {
                  ...item,
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

  const renderAction = (record: IDepartment) => {
    return (
      <>
        <EditDepartment
          departmentId={record?.id}
          successCallback={() => setRefreshDepsFn.toggle()}
        />
      </>
    );
  };

  const columns = [
    {
      title: t('column_id'),
      dataIndex: 'id',
    },
    {
      title: t('department_column_name'),
      dataIndex: 'name',
    },
    {
      title: t('department_column_parent'),
      dataIndex: 'parent',
      render: (parent: ICommonItem) => {
        if (!parent?.id) {
          return undefined
        }
        return (
          <span>{ parent?.name }</span>
        )
      }
    },
    {
      title: t('enabled'),
      dataIndex: 'enabled',
      render: (_: any, record: IDepartment) => {
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

export default Department