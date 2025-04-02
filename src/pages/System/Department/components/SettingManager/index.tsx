import React, { useEffect } from 'react'
import { useLocale, useRequest } from '@/hooks'
import {
  Modal,
  Form,
  Spin,
  Button,
  message,
  Select,
} from '@/components'
import { useToggle } from 'ahooks'
import DepartmentService from '@/services/department'
import UserService from '@/services/account'
import type { IDepartmentUser } from '@/services/department/type'

interface SettingManagerProps {
  successCallback: () => void;
  departmentId: number;
}

export const SettingManager: React.FC<SettingManagerProps> = ({
  successCallback,
  departmentId,
}) => {

  const { t } = useLocale()
  const [visible, setVisibleFn] = useToggle(false)
  const [form] = Form.useForm()

  const getDepartmentManagerRequest = useRequest(
    DepartmentService.searchDepartmentManager,
    {
      onSuccess: (data: IDepartmentUser[]) => {
        const userIds = data?.map((item) => item?.userId)
        form.setFieldsValue({
          userIds
        })
      }
    }
  )

  const editDepartmentManageRequest = useRequest(
    DepartmentService.updateDepartmentManager,
    {
      onSuccess: () => {
        message.success(t('operate_success'));
        onCancel()
        successCallback()
      }
    }
  )

  useEffect(() => {
    if (visible && departmentId) {
      getDepartmentManagerRequest.run({
        departmentId
      })
    }
  }, [visible])

  const editUser = () => {
    setVisibleFn.toggle()
  }
  
  const onCancel = () => {
    setVisibleFn.toggle()
    form.resetFields()
  }

  const submit = async () => {
    const formData = await form.validateFields()
    editDepartmentManageRequest.run({
      ...formData,
      departmentId
    })
  }

  const renderLoding = () => {
    return [
      editDepartmentManageRequest?.loading,
    ]?.includes(true)  
  }

  return (
    <>
      <Button
        type="link"
        inTable={true}
        onClick={editUser}
      >
        { t('department_setting_manager') }
      </Button>
      <Modal
        title={t('department_setting_manager')}
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
            disabled={renderLoding()}
            onClick={submit}
          >
            确定
          </Button>
        ]}
      >
        <Spin
          spinning={renderLoding()}
        >
          <Form
            name="update-department-manager"
            form={form}
          >
            <Form.Item
              label={t('department_choose_user')}
              name="userIds"
            >
              <Select
                asyncHandle={UserService.getAllUser}
                selectKey='id'
                selectLabel='name'
                mode='multiple'
                refreshDeps={visible}
              />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}
