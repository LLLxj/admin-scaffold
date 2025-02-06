import React from 'react'
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Spin,
  Tooltip,
  message,
} from '@/components'
import { useRequest, useLocale } from '@/hooks'
import Department from '@/services/department'
import { useToggle } from 'ahooks'

import { PlusOutlined } from '@ant-design/icons'

interface CreateDepartmentProps {
  setRefreshDeps: () => void;
  departmentId: number;
}

export const CreateDepartment: React.FC<CreateDepartmentProps> = ({
  setRefreshDeps,
  departmentId
}) => {
  const { t } = useLocale();
  const [visible, setVisibleFn] = useToggle(false)
  const [form] = Form.useForm()

  const updateRequest = useRequest(
    Department.create,
    {
      onSuccess: () => {
        message.success(t('operate_success'));
        onCancel()
        setRefreshDeps()
      }
    }
  )

  const appendChild = () => {
    setVisibleFn.toggle()
  }

  const onCancel = () => {
    setVisibleFn.toggle()
    form.resetFields()
  }

  const submit = async () => {
    const formData = await form.validateFields()
    updateRequest.run({
      ...formData,
      parentId: departmentId
    })
  }

  const renderLoading = () => {
    const _loading
      = [
          updateRequest?.loading
        ]?.includes(true)
    return _loading
  }

  return (
    <>
      <Tooltip
        title={t('department_append_child')}
      >
        <PlusOutlined
          onClick={appendChild}
        />
      </Tooltip>
      <Modal
        title={t('department_append_child')}
        open={visible}
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
            name="append-child"
            form={form}
          >
            <Form.Item
              label={t('department_name')}
              name="name"
              rules={[{
                required: true,
                message: t('department_sumbit_rule_name_message')
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('department_sort_order')}
              name="sortOrder"
              rules={[{
                required: true,
                message: t('department_sumbit_rule_sort_order_message')
              }]}
            >
              <InputNumber />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
    
  );
}
