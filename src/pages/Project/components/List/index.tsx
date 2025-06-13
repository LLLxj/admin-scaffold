import React from 'react';
import {
  usePaginatedRequest,
  useSearch,
} from '@/hooks';
import { Project as ProjectService } from '@/services';
import {
  List,
  Access,
  TableAction,
  Form,
  TableCell,
} from '@/components'
import type { IProject } from '@/services/project/type'
import { Search, Edit } from '../index'

export const ProjectList: React.FC = () => {
  const resource = '项目管理项目管理'
  const {
    t,
    list,
    setList,
    searchParams,
    setSearchParams,
    refreshDeps,
    setRefreshDepsFn,
    pages,
  } = useSearch<IProject>({});
 
  const [searchForm] = Form.useForm()
  

  const getListRequest = usePaginatedRequest(
    (pageConfig) => {
      return ProjectService.search({
        ...(pageConfig ? pageConfig : {}),
        ...(searchParams ? searchParams : {}),
      });
    },
    {
      refreshDeps: [searchParams, refreshDeps],
      paginated: true,
      defaultPageSize: pages?.pageSize,
      onSuccess: (data) => {
        const _list = data.records?.map((item: IProject) => {
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

  const renderAction = (record: IProject) => {
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
            asyncHandle={ProjectService.disable}
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
            asyncHandle={ProjectService.enabled}
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
      title: t('project_column_name'),
      dataIndex: 'name',
    },
    {
      title: t('project_column_price'),
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
      title: t('project_column_description'),
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
      render: (_: any, record: IProject) => renderAction(record),
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