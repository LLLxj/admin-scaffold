import React, {
  useMemo,
  useState,
  Key,
  useRef,
  useEffect,
} from 'react'
import {
  Button,
  Modal,
  Form,
  Space,
  message,
  Tabs,
  Tree,
  Row,
  Col,
  Spin,
} from '@/components';
import { useLocale, useRequest, useTree } from '@/hooks';
import RoleService from '@/services/role';
import type {
  EditRoleProps,
} from './type'
import { useToggle } from 'ahooks';
import ResourceService from '@/services/resource'
import type {
  ISearchResourceTreeItem,
  ISearchPermissionRelationItem,
  ISearchPropertyRelation,
  ISearchPropertyRelationItem,
} from '@/services/resource/type'
import type { TreeRefProps, ITree } from '@/components/Tree/type'

export const EditRole: React.FC<EditRoleProps> = ({
  roleId,
  type = 'primary',
  successCallback,
}) => {

  const { t } = useLocale();
  const [form] = Form.useForm();
  const [visible, setVisibleFn] = useToggle(false)
  const [resourceId, setResourceId] = useState<Key>()
  const {
    selectedKeys,
    setSelectedKeys,
  } = useTree()
  const items = [
    {
      key: 'role_edit_permission',
      label: t('role_edit_tabs_set_permission'),
      value: 'role_edit_permission',
    },
    {
      key: 'role_edit_property',
      label: t('role_edit_tabs_set_property'),
      value: 'role_edit_property',
    },
    {
      key: 'role_edit_rule',
      label: t('role_edit_tabs_set_rule'),
      value: 'role_edit_rule',
    },
  ];

  type ItemKey = typeof items[number]['key'];

  const [activeKey, setActiveKey] = useState<ItemKey>();
  const [selectProperties, setSelectedProperties] = useState<Key[]>([])
  const resourceTreeRef = useRef<TreeRefProps>()
  const propertyTreeRef = useRef<TreeRefProps>()

  const createRoleRequest = useRequest(
    RoleService.create,
    {
      onSuccess: () => {
        message.success({
          content: t('operate_success'),
          duration: 3,
          onClose: () => {
            successCallback()
          }
        })
        
      }
    }
  )

  const getResourceTreeRequest = useRequest(
    ResourceService.getResourceTree,
    {
      manual: true,
      onSuccess: (data: ISearchResourceTreeItem[]) => {

        const formatChildren = (treeData: ISearchResourceTreeItem[]): ITree[] => {
          if (!treeData?.length) {
            return []
          }
          return treeData.map((item: ISearchResourceTreeItem) => {
            const children = formatChildren(item?.children)
            return {
              title: item?.name,
              value: item?.id,
              key: item?.id,
              children,
            }
          })
        }

        const _treeData = formatChildren(data)
        handleTreeData(_treeData)
      }
    }
  )

  const getPropertyTreeRequest = useRequest(
    ResourceService.getPropertyTree,
    {
      manual: true,
      onSuccess: (data: any[]) => {
        const generateKey = (key: number | string, parentId?: number | string) => {
          if (parentId) {
            return `${parentId}_${key}`
          }
          return `${key}`
        }
        
        const formatChildren = (
          children: ITree[],
          parentId?: number | string
        ): ITree[] => {
          if (!children?.length) {
            return []
          }
          return children?.map((item: ITree) => {
            const key = generateKey(item?.id, parentId);
            const children = formatChildren(item?.children, key)
            return {
              title: item?.name,
              value: item?.id,
              key,
              children,
            }
          })
        }
        const _treeData = formatChildren(data)
        handleTreeData(_treeData)
      }
    }
  )

  const getRuleTreeRequest = useRequest(
    ResourceService.getResourceTree,
    {
      manual: true,
      onSuccess: (data: ISearchResourceTreeItem[]) => {
        const _treeData = data?.map((item) => {
          return {
            title: item?.name,
            value: item?.id,
            key: item?.id,
            children: item?.children?.map((p) => {
              return {
                title: p?.name,
                value: p?.id,
                key: p?.id,
              }
            })
          }
        })
        resourceTreeRef.current?.setData(_treeData)
      }
    }
  )

  const getPermissionRelationRequest = useRequest(
    RoleService.getPermissionRelation,
    {
      onSuccess: (data: ISearchPermissionRelationItem[]) => {
        const _propertyTreeData =
          data?.length
            ? [
                {
                  title: '全部',
                  value: -1,
                  key: -1,
                  children: data?.map((item) => {
                    return {
                      title: item?.name,
                      value: item?.id,
                      key: item?.id,
                    }
                  })
                }
              ]
            : []
        const _selectedProperties =
          data?.length
            ? data?.reduce((prev: number[], cur: ISearchPermissionRelationItem) => {
                if (cur?.selected) {
                  return [
                    ...prev,
                    cur?.id
                  ]
                }
                return prev;
              }, [])
            : []
        propertyTreeRef.current?.setData(_propertyTreeData)
        setSelectedProperties(_selectedProperties)
      }
    }
  )

  const getPropertyRelationRequest = useRequest(
    RoleService.getPropertyRelation,
    {
      onSuccess: (data: ISearchPropertyRelation) => {
        const _propertyTreeData: ITree[] = []
        let _selectedProperties: Key[] = []
        let index = -5;
        const titleMap: Record<string, string> = {
          conditions: '查询条件',
          desensitizeFields: '脱敏字段',
          exportFields: '导出字段',
          tableHeaders: '表头字段',
        }
        for (const [key, value] of Object.entries(data)) {
          const _currentSelectProperties = value
            ?.filter((item: ISearchPropertyRelationItem) => item?.selected)
            ?.map((item: ISearchPropertyRelationItem) => item?.id)
          const parentKey = -1 + index
          const currentTreeDataItem = {
            title: titleMap?.[key],
            value: key,
            key: parentKey,
            children: value?.map((item: ISearchPropertyRelationItem) => {
              return {
                title: item?.name,
                value: item?.id,
                key: item?.id,
              }
            })
          }
          
          _propertyTreeData.push(currentTreeDataItem)
          _selectedProperties = [
            ..._selectedProperties,
            ..._currentSelectProperties,
          ]
          index = index + 1;
        }
        if (propertyTreeRef.current) {
          propertyTreeRef.current?.setData(_propertyTreeData)
        }
        setSelectedProperties(_selectedProperties)
      }
    }
  )

  const getRuleRelationRequest = useRequest(
    RoleService.getRuleRelation,
    {
      onSuccess: (data) => {
        console.log(data)
      }
    }
  )

  const updateRolePermissionRequest = useRequest(
    RoleService.updateRolePermission,
    {
      onSuccess: () => {
        message.success({
          content: t('operate_success'),
          duration: 1.5,
          onClose: () => {
            onCancel()
          }
        })
      }
    }
  )

  const updateRolePropertyRequest = useRequest(
    RoleService.updateRolePeroperty,
    {
      onSuccess: () => {
        message.success({
          content: t('operate_success'),
          duration: 1.5,
          onClose: () => {
            onCancel()
          }
        })
      }
    }
  )

  const title = useMemo(() => {
    if (roleId) {
      return t('edit')
    }
    return t('create')
  }, [roleId])

  useEffect(() => {
    if (visible && resourceTreeRef.current) {
      getResource()
    }
  }, [visible])

  const editHandle = () => {
    setVisibleFn.toggle()
    changeActiveKey(items?.[0]?.key)
  }

  const onCancel = () => {
    setVisibleFn.toggle()
    form.resetFields()
    setActiveKey('')
    setSelectedProperties([])
    setResourceId('')
    setSelectedKeys([])
  }


  const changeActiveKey = (value: ItemKey) => {
    setActiveKey(value)
    resetTreeData()
    getResource(value)
  }

  const onSelect = (treeActiveKey: Key[]) => {
    let formatSelectedKeys: Key[] = treeActiveKey
    if (activeKey === 'role_edit_property') {
      formatSelectedKeys = treeActiveKey?.map(
        (item) => getPropertyKey(item)
      )
    }
    const _resourceId  = formatSelectedKeys?.[0]
    setSelectedKeys(treeActiveKey)
    setResourceId(_resourceId)
    getRelations({
      resourceId: _resourceId,
      type: activeKey,
    })
  }

  const onCheck = (keys: Key[]) => {
    setSelectedProperties(keys)
  }

  const getResource = (type: ItemKey = 'role_edit_permission') => {

    const handleMap: Record<ItemKey, () => void> = {
      role_edit_permission:
        () => getResourceTreeRequest.run(),
      role_edit_property:
        () => getPropertyTreeRequest.run(resourceId, roleId),
      role_edit_rule:
        () => getRuleTreeRequest.run(resourceId, roleId),
    }
    if (type && handleMap?.[type]) {
      handleMap?.[type]()
    }
  }

  const getRelations = ({
    resourceId,
    type
  }: {
    resourceId?: Key,
    type?: ItemKey
  }) => {
    if (!resourceId || !type) {
      return 
    }
    const getRelationParams = {
      resourceId,
      roleId,
    }
    const handleMap: Record<ItemKey, () => void> = {
      role_edit_permission:
        () => getPermissionRelationRequest.run({
          resourceId,
          roleId,
        }),
      role_edit_property:
        () => getPropertyRelationRequest.run({
          permissionId: resourceId,
          roleId,
        }),
      role_edit_rule:
        () => getPermissionRelationRequest.run(getRelationParams),
    }
    if (handleMap?.[type]) {
      handleMap?.[type]()
    }
  }

  const updateRolePermission = () => {
    const postData = {
      resourceId,
      roleId,
      permissions: selectProperties?.filter((item) => Number(item) > 0),
    }
    updateRolePermissionRequest.run(postData)
  }

  const updateRoleProperty = () => {
    const resourceId = getResourceKey(selectedKeys?.[0])
    const postData = {
      resourceId,
      roleId,
      properties: selectProperties,
    }
    updateRolePropertyRequest.run(postData)
  }

  const updateRoleRule = () => {

  }
 
  const submit = async () => {
    const handleMap: Record<ItemKey, () => void> = {
      role_edit_permission: () => updateRolePermission(),
      role_edit_property: () => updateRoleProperty(),
      role_edit_rule: () => updateRoleRule(),
    };
    if (activeKey && handleMap?.[activeKey]) {
      handleMap?.[activeKey]()
    }
  }

  const getPropertyKey = (initKey: Key) => {
    const key = initKey as string;
    const keys = key?.split('_')
    return Number(keys?.[keys?.length - 1])
  }

  const getResourceKey = (initKey: Key) => {
    const key = initKey as string;
    const keys = key?.split('_')
    return Number(keys?.[0])
  }

  const handleTreeData = (treeData: ITree[]) => {
    resourceTreeRef.current?.setData(treeData)
    // const _expandedKeys = getExpandedKeys(treeData, 'key')
    // setExpandedKeys(_expandedKeys)
  }

  const resetTreeData = () => {
    resourceTreeRef.current?.setData([])
    propertyTreeRef.current?.setData([])
  }

  const renderLoding = () => {
    return [
      createRoleRequest?.loading,
      updateRolePermissionRequest?.loading,
      getPermissionRelationRequest?.loading,
      getPropertyRelationRequest?.loading,
      getRuleRelationRequest?.loading,
      updateRolePropertyRequest?.loading,
    ]?.includes(true)
  }

  return (
    <>
      <Button
        type={type}
        onClick={editHandle}
        inTable={!!roleId}
      >
        { title }
      </Button>
      <Modal
        title={title}
        open={visible}
        onCancel={onCancel}
        size='middle'
        loading={renderLoding()}
        height={600}
        footer={[
          <Button
            key="cancle"
            onClick={onCancel}
          >
            { t('cancle') }
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={submit}
            loading={renderLoding()}
            disabled={renderLoding()}
          >
            { t('confirm') }
          </Button>
        ]}
      >
        <Space
          direction='vertical'
        >
          <Tabs
            items={items}
            activeKey={activeKey}
            onChange={changeActiveKey}
          />
          <Form
            name="edit-role"
            form={form}
          >
            <Row>
              <Col
                span={8}
              >
                <Tree
                  ref={resourceTreeRef}
                  showSearch={false}
                  defaultExpandAll
                  selectedKeys={selectedKeys}
                  onSelect={onSelect}
                  height={500}
                />
              </Col>
              <Col
                span={16}
              >
                <Spin
                  spinning={renderLoding()}
                >
                  <Tree
                    ref={propertyTreeRef}
                    name='property-tree'
                    showSearch={false}
                    defaultExpandAll
                    checkable={true}
                    multiple={true}
                    checkedKeys={selectProperties}
                    onCheck={onCheck}
                  />
                </Spin>
              </Col>
            </Row>
          </Form>
        </Space>
      </Modal>
    </>
  );
}