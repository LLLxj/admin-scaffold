import React, { useMemo, useRef } from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  TreeSelect,
  message,
} from '@/components'
import { useToggle } from 'ahooks';
import { useLocale, useRequest } from '@/hooks';
import ResourceService from '@/services/resource';
import type { ResourceEditProps } from './type'
import type { TreeRefProps } from '@/components/TreeSelect/type'
import { formatTree } from '@/utils';


export const EditResource: React.FC<ResourceEditProps> = ({
  resourceId,
  type = 'primary',
  successCallback,
}) => {

  const { t } = useLocale()
  const [visible, setVisibleFn] = useToggle(false)
  const [form] = Form.useForm()
  const resourceTreeRef = useRef<TreeRefProps>()

  const createResource = useRequest(
    ResourceService.create,
    {
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

  const title = useMemo(() => {
    if (resourceId) {
      return t('edit')
    }
    return t('create')
  }, [resourceId])

  const editHandle = () => {
    setVisibleFn.toggle()
    resourceTreeRef.current?.initData()
  }

  const submit = async () => {
    await form.validateFields()
    const formData = await form.getFieldsValue()
    console.log(formData)
    const requestBody = formData
    if (!resourceId) {
      createResource.run(requestBody)
    }
  }

  const onCancel = () => {
    setVisibleFn.toggle()
    form.resetFields()
  }

  const renderLoding = () => {
    return false
  }

  return (
    <>
      <Button
        type={type}
        onClick={editHandle}
        inTable={!!resourceId}
      >
        { title }
      </Button>
      <Modal
        title={title}
        open={visible}
        onCancel={onCancel}
        loading={renderLoding()}
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
        <Form
          name="edit-resource"
          form={form}
        >
          <Form.Item
            label={t('resource_edit_name')}
            name='name'
            rules={[{
              required: true,
              message: t('resource_sumbit_rule_name_message')
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('resource_edit_parent_id')}
            name='parentId'
            rules={[{
              required: true,
              message: t('resource_sumbit_rule_parent_id_message')
            }]}
          >
            <TreeSelect
              ref={resourceTreeRef}
              treeDefaultExpandAll
              asyncHandle={ResourceService.getTree}
              asyncParams={{}}
              formatResult={(list) => {
                const tree = formatTree(list, 'id', 'name')
                return tree
              }}
            />
          </Form.Item>
          <Form.Item
            label={t('resource_edit_sortOrder')}
            name='sortOrder'
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
