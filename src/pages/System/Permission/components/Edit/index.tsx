import React, {
  useMemo,
  useRef,
} from 'react'
import {
  Modal,
  Form,
  Button,
  Spin,
  message,
  Input,
  InputNumber,
  TreeSelect,
} from '@/components'
import { Radio } from 'antd'
import { useEdit, useRequest, useLocale, useForm } from '@/hooks'
import Permission from '@/services/permission'
import Resource from '@/services/resource'
import type { ISearchResourceTreeItem } from '@/services/resource/type'
import type { DataComponentProps, EditProps } from '@/pages/type'
import type { ITree } from '@/components/TreeSelect/type'

export const EditPermission: React.FC<EditProps> = (
  {
    id,
    type = 'primary',
    successCallback = () => {}
  }: EditProps,
) => {

  const [form] = Form.useForm()
  const { t } = useLocale()
  const { statusOptions } = useForm()
  const {
    open,
    setOpenFn
  } = useEdit()
  const resourceTreeRef = useRef<DataComponentProps>()

  const title = useMemo(() => {
    if (!id) {
      return t('create');
    }
    return t('edit');
  }, [id])

  const getDetailRequest = useRequest(
    Permission.detail,
    {
      manual: true,
      debounceWait: 500,
      onSuccess: (data: Record<string, any>) => {
        form.setFieldsValue({
          ...data
        })
      }
    }
  )

  const createRequest = useRequest(
    Permission.create,
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        message.success({
          content: t('operate_success'),
          duration: 1.5,
          onClose: () => {
            onCancel()
            successCallback()
          }
        })
      }
    }
  )

  const updateRequest = useRequest(
    Permission.update,
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        message.success({
          content: t('operate_success'),
          duration: 1.5,
          onClose: () => {
            onCancel()
            successCallback()
          }
        })
      }
    }
  )

  const editHandle = () => {
    setOpenFn.toggle()
    resourceTreeRef.current?.initData()
    if (id) {
      getDetailRequest.run(id)
    }
  }

  const onCancel = () => {
    setOpenFn.setLeft()
    form.resetFields()
  }

  const submit = async () => {
    const formData = await form.validateFields()
    if (!id) {
      createRequest.run(formData)
    } else {
      updateRequest.run(id, formData)
    }
  }

  const formatTree = (data: ISearchResourceTreeItem[] = []) => {
    if (!data?.length) {
      return []
    }
    const tree: ITree[] = data?.map((item: ISearchResourceTreeItem) => {
      return {
        title: item?.name,
        value: item?.id,
        children: formatTree(item?.children)
      }
    })
    return tree
  } 

  const renderLoading = () => {
    const _loading
      = [
          getDetailRequest?.loading,
          createRequest?.loading,
          updateRequest?.loading,
        ]?.includes(true)
    return _loading
  }

  return (
    <>
      <Button
        type={type}
        onClick={editHandle}
        inTable={!!id}
      >
        { title }
      </Button>
      <Modal
        title={title}
        size='middle'
        open={open}
        onCancel={onCancel}
        footer={[
          <Button
            key='cancel'
            onClick={onCancel}
          >
            取消
          </Button>,
          <Button
            key='submit'
            type='primary'
            disabled={renderLoading()}
            onClick={submit}
          >
            确定
          </Button>
        ]}
      >
        <Spin
          spinning={renderLoading()}
        >
          <Form
            name='permission-edit'
            form={form}
          >
            <Form.Item
              label={t('permission_edit_name')}
              name='name'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('permission_edit_status')}
              name='enabled'
            >
              <Radio.Group>
                {
                  statusOptions?.map((item) => (
                    <Radio
                      key={item?.label}
                      value={item?.value}
                    >
                      { item?.label }
                    </Radio>
                  ))
                }
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={t('permission_edit_sortOrder')}
              name='sortOrder'
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label={t('permission_edit_resource')}
              name='resourceId'
            >
              <TreeSelect
                ref={resourceTreeRef}
                asyncHandle={Resource.getResourceTree}
                asyncParams={{}}
                treeDefaultExpandAll={true}
                formatResult={(tree) => {
                  const list = formatTree(tree)
                  return list
                }}
              />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
    
  );
}