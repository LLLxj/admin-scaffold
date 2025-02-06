import React, { useRef, useState } from 'react';
import {
  List,
  Button,
  Tag,
  Dropdown,
  message,
} from '@/components';
import {
  usePaginatedRequest,
  useLocale,
  useRequest,
  useSearch,
} from '@/hooks';
import TagService from '@/services/tag';
import { useToggle } from 'ahooks';
import { Typography } from 'antd'
import { TagSearch, TagEdit } from './components';
import type { ITag, ITagSearchRef } from './type';
import type { ITagEditRef } from './components/type';
import type { IHandleType } from '@/pages/type';
import type { MenuInfo } from 'rc-menu/lib/interface';

const TagModule: React.FC = () => {

  const { t } = useLocale();
  const currentId = useRef<string>('');
  const tagEditRef = useRef<ITagEditRef>();
  const tagSearchRef = useRef<ITagSearchRef>();
  const [list, setList] = useState<ITag[]>([]);
  const [searchParams, setSearchParams] = useState({});
  const [refreshDeps, setRefreshDeps] = useToggle(false);

  const {
    pages,
  } = useSearch<ITag>({});
 
  const disableRequest = useRequest(TagService.disable, {
    onSuccess: () => {
      message.success(t('operate_success'));
      setRefreshDeps.toggle();
    },
  });

  const enableRequest = useRequest(TagService.enable, {
    onSuccess: () => {
      message.success(t('operate_success'));
      setRefreshDeps.toggle();
    },
  });

  const deleteRequest = useRequest(TagService.delete, {
    onSuccess: () => {
      message.success(t('operate_success'));
      setRefreshDeps.toggle();
    },
  });

  const getTagRequest = usePaginatedRequest(
    (pageConfig) => {
      return TagService.search({
        ...(pageConfig ? pageConfig : {}),
        ...(searchParams ? searchParams : {}),
      });
    },
    {
      refreshDeps: [searchParams, refreshDeps],
      paginated: true,
      defaultPageSize: pages?.pageSize,
      onSuccess: (data) => {
        const _list = data.records?.map((item: ITag) => {
          return {
            ...item,
            enabledLabel: item?.enabled ? '启用' : '禁用',
          };
        });
        setList(_list);
      },
    },
  );

  const searchHandle = async (formData: any) => {
    setSearchParams((prev) => ({
      ...prev,
      ...formData,
    }));
  };

  const enabledFn = (record: ITag) => {
    currentId.current = record?.id;
    enableRequest?.run(record?.id);
  };

  const disableFn = (record: ITag) => {
    currentId.current = record?.id;
    disableRequest?.run(record?.id);
  };

  const deleteFn = (record: ITag) => {
    currentId.current = record?.id;
    deleteRequest?.run(record?.id);
  };

  const editFn = (record: ITag) => {
    if (tagEditRef?.current) {
      tagEditRef.current.init({ id: record?.id })
    }
  }

  const onMenuClick = (event: MenuInfo, record: ITag) => {
    const key = event?.key as IHandleType
    const handleMap: Record<IHandleType, () => void> = {
      disabled: () => disableFn(record),
      enabled: () => enabledFn(record),
      delete: () => deleteFn(record),
    }
    const method = handleMap?.[key];
    if (method) {
      method();
    }
  }

  const handleItems = [
    {
      key: 'enabled',
      label: t('enabled'),
    },
    {
      key: 'disabled',
      label: t('disabled'),
    },
    {
      key: 'delete',
      label: t('delete'),
    },
  ]

  const renderHandleItems = (record: ITag) => {
    const keyDisabledMap: Record<IHandleType, boolean> = {
      enabled:
        currentId?.current === record?.id &&
        enableRequest?.loading,
      disabled:
        currentId?.current === record?.id &&
        disableRequest?.loading,
      delete:
        currentId?.current === record?.id &&
        deleteRequest?.loading,
    }
    const validateHandleItems = handleItems?.map((item) => {
      const key = item?.key as IHandleType;
      return {
        ...item,
        disabled: keyDisabledMap?.[key] || false
      }
    })?.filter((item) => {
      if (
        record?.enabled &&
        item?.key === 'enabled'
      ) {
        return false
      } else if (
        !record?.enabled &&
        item?.key === 'disabled'
      ) {
        return false
      }
      return true
    })
    return validateHandleItems
  }

  const renderAction = (record: ITag) => {
    return (
      <>
        <Button
          onClick={() => editFn(record)}
          type="link"
        >
          {t('edit')}
        </Button>
        <Dropdown menu={{
          items: renderHandleItems(record),
          selectedKeys: [],
          onClick: (e) => onMenuClick(e, record),
        }}>
          <Typography.Link>
            { t('more') }
          </Typography.Link>
        </Dropdown>
      </>
    );
  };

  const columns = [
    {
      title: t('tag_column_name'),
      dataIndex: 'name',
    },
    {
      title: t('tag_column_module'),
      dataIndex: 'resource',
    },
    {
      title: t('enabled'),
      dataIndex: 'enabled',
      render: (_: any, record: ITag) => {
        return (
          <Tag
            color={
              record?.enabled ? 'success' : 'warning'
            }
          >
            { record?.enabled ? t('enabled') : t('disabled') }
          </Tag>
        );
      },
    },
    {
      title: t('table_column_action'),
      dataIndex: 'action',
      titleCol: 4,
      render: (_: any, record: ITag) => renderAction(record),
    },
  ];

  return (
    <>
      <List
        searchContainer={
          <TagSearch
            ref={tagSearchRef}
            searchHandle={searchHandle}
          />
        }
        tableConfig={{
          rowKey: 'id',
          dataSource: list,
          columns: columns,
          loading: getTagRequest?.loading,
          pagination: getTagRequest?.pagination
        }}
      />
      <TagEdit
        ref={tagEditRef}
        successCallback={setRefreshDeps.toggle}
      />
    </>
  );
}

export default TagModule