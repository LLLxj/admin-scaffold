import React, { useState } from 'react'
import type { EditAccountProps } from './type'
import {
  Button,
  Modal,
  Form,
  Select,
  message,
  Access,
} from '@/components';
import { useLocale, UseModal, useRequest } from '@/hooks'
import RoleService from '@/services/role';
import AccountService from '@/services/account';
import type { IAccount } from '@/services/account/type'
import type { IConditionResponseItem } from '@/services/condition/type'

export const EditAccount: React.FC<EditAccountProps> = ({
  userId,
  setRefreshDepsFn,
}) => {

  const { t } = useLocale();
  const { open, setOpenFn } = UseModal();
  const [form] = Form.useForm()
  const [options, setOptions] = useState<{
    label: string;
    value: number | string
  }[]>([])

  const getAllRoleRequest = useRequest(
    RoleService.all,
    {
      onSuccess: (data: IConditionResponseItem[]) => {
        const _options = data?.map((item) => {
          return {
            label: item?.name,
            value: item?.id
          }
        })
        setOptions(_options)
      }
    }
  )

  const getUserInfoRequest = useRequest(
    AccountService.detail,
    {
      onSuccess: (data: IAccount) => {
        const roleIds = data?.roles?.map((item) => item?.id);
        form.setFieldsValue({
          roleIds
        })
      }
    }
  )

  const updateUserRoleRequest = useRequest(
    AccountService.updateUserRole,
    {
      onSuccess: () => {
        message.success({
          content: t('operate_success'),
          duration: 1.5,
          onClose: () => {
            onCancel()
            setRefreshDepsFn.toggle()
          }
        })
      }
    }
  )

  const editFn = () => {
    setOpenFn.toggle()
    getAllRoleRequest.run()
    getUserInfoRequest.run(userId)
  }

  const onCancel = () => {
    setOpenFn.toggle()
    form.resetFields()
    setOptions([])
  }

  const submit = async () => {
    await form.validateFields()
    const roleIds = await form.getFieldValue('roleIds')
    updateUserRoleRequest.run({
      userId,
      roleIds,
    })
  }

  const renderLoding = () => {
    return [
      getUserInfoRequest?.loading,
      updateUserRoleRequest?.loading
    ]?.includes(true)
  }

  return (
    <>
      <Access
        permission='用户管理用户-角色属性保存'
      >
        <Button
          type='link'
          inTable={true}
          onClick={editFn}
        >
          {t('account_column_handle_setting_role')}
        </Button>
      </Access>
      
      <Modal
        title={t('account_handle_edit_role')}
        open={open}
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
            key="submit"
            type="primary"
            disabled={updateUserRoleRequest?.loading}
            loading={updateUserRoleRequest?.loading}
            onClick={submit}
          >
            { t('confirm') }
          </Button>
        ]}
      >
        <Form
          name="edit-role"
          form={form}
        >
          <Form.Item
            label="角色"
            name="roleIds"
          >
            <Select
              options={options}
              mode='multiple'
              optionFilterProp="label"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
