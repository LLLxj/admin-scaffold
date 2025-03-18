import React from 'react'
import { Modal, Form, Input, message } from '@/components';
import { useEdit, useRequest, useLocale } from '@/hooks';
import RoleService from '@/services/role';
import type { CreateRoleProps } from './type'
import { Button } from 'antd';

export const CreateRole: React.FC<CreateRoleProps> = ({
  successCallback
}) => {

  const [form] = Form.useForm()
  const { open, setOpenFn } = useEdit()
  const { t } = useLocale()

  const createRoleRequest = useRequest(
    RoleService.create,
    {
      manual: true,
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

  const createFn = () => {
    setOpenFn.setRight()
  }

  const submit = async() => {
    await form.validateFields()
    const formData = form.getFieldsValue()
    createRoleRequest.run(formData)
  }

  const onCancel = () => {
    form.resetFields()
    setOpenFn.setLeft()
  }

  return (
    <>
      <Button
        type='primary'
        onClick={createFn}
      >
        { t('create') }
      </Button>
      <Modal
        title='创建角色'
        open={open}
        onCancel={onCancel}
        onOk={submit}
        size='small'
      >
        <Form
          name='create-role'
          form={form}
        >
          <Form.Item
            label='角色名称'
            name='name'
            rules={[{
              required: true,
              message: '请输入角色名称'
            }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
    
  );
}
