import React from 'react'
import { UserAddOutlined } from '@ant-design/icons';
import { useLocale, useRequest } from '@/hooks'
import {
  Modal,
  Form,
  Spin,
  AutoComplete,
  Tooltip,
  Button,
  message,
} from '@/components'
import { useToggle } from 'ahooks'
import Department from '@/services/department'
import Condition from '@/services/condition';

interface AddDepartmentUserProps {
  setRefreshDeps: () => void;
  departmentId: number;
}

export const AddDepartmentUser: React.FC<AddDepartmentUserProps> = ({
  setRefreshDeps,
  departmentId,
}) => {

  const { t } = useLocale()
  const [visible, setVisibleFn] = useToggle(false)
  const [form] = Form.useForm()

  const addUserRequest = useRequest(
    Department.addUser,
    {
      onSuccess: () => {
        message.success(t('operate_success'));
        onCancel()
        setRefreshDeps()
      }
    }
  )

  const addUser = () => {
    console.log('addUser')
    setVisibleFn.toggle()
  }
  
  const onCancel = () => {
    setVisibleFn.toggle()
    form.resetFields()
  }

  const submit = async () => {
    const formData = await form.validateFields()
    addUserRequest.run({
      ...formData,
      departmentId
    })
  }

  return (
    <>
      <Tooltip
        title={t('department_append_user')}
      >
        <UserAddOutlined
          onClick={addUser}
        />
      </Tooltip>
      <Modal
        title={t('department_append_user')}
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
            disabled={addUserRequest?.loading}
            onClick={submit}
          >
            确定
          </Button>
        ]}
      >
        <Spin
          spinning={addUserRequest?.loading}
        >
          <Form
            name="add-department-user"
            form={form}
          >
            <Form.Item
              label={t('department_choose_user')}
              name="userIds"
              rules={[{
                required: true,
                message: t('department_sumbit_rule_choose_user_message')
              }]}
            >
              <AutoComplete
                asyncHandle={Condition.user}
                searchKeyword='username'
                selectKey='id'
                selectLabel='name'
                mode='multiple'
              />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}
