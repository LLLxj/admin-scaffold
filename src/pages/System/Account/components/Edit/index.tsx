import React, { useMemo, useState } from 'react'
import type { EditAccountProps } from './type'
import {
  Button,
  Modal,
  Form,
  Select,
  message,
  Access,
  Input,
} from '@/components';
import { useLocale, UseModal, useRequest } from '@/hooks'
import RoleService from '@/services/role';
import AccountService from '@/services/account';
import type { IAccount } from '@/services/account/type'
import type { IConditionResponseItem } from '@/services/condition/type'

export const EditAccount: React.FC<EditAccountProps> = ({
  userId,
  successCallback = () => {},
  buttonLabel,
  buttonType,
  buttonInTable,
}) => {

  const { t } = useLocale();
  const { open, setOpenFn } = UseModal();
  const [form] = Form.useForm()
  const [options, setOptions] = useState<{
    label: string;
    value: number | string
  }[]>([])

  const getUpdateRequest = () => {
    if (userId) {
      return AccountService.update;
    }
    return AccountService.create;
  }

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
          ...data,
          roleIds
        })
      }
    }
  )

  const updateUserRoleRequest = useRequest(
    getUpdateRequest(),
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

  const editFn = () => {
    setOpenFn.toggle()
    getAllRoleRequest.run()
    if (userId) {
      getUserInfoRequest.run(userId)
    }
  }

  const onCancel = () => {
    setOpenFn.toggle()
    form.resetFields()
    setOptions([])
  }

  const submit = async () => {
    await form.validateFields()
    const formData = await form.getFieldsValue()
    updateUserRoleRequest.run({
      id: userId,
      ...formData
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
        permission='用户管理用户管理新增/编辑'
      >
        <Button
          type={buttonType}
          inTable={buttonInTable}
          onClick={editFn}
        >
          { buttonLabel }
        </Button>
      </Access>
      
      <Modal
        title={buttonLabel}
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
            label={t('account_edit_name')}
            name="name"
            rules={[{
              required: true,
              message: t('account_sumbit_rule_name_message')
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('account_edit_mobile')}
            name="mobile"
            rules={[{
              required: true,
              message: t('account_sumbit_rule_mobile_message')
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('account_edit_role')}
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
