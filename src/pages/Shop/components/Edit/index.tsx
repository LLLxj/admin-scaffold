import React, { useMemo, useRef } from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  TextArea
} from '@/components'
import { useToggle } from 'ahooks';
import { useLocale, useRequest } from '@/hooks';
import ShopService from '@/services/shop';
import type { EditProps } from '@/pages/type'
import type { TreeRefProps } from '@/components/TreeSelect/type'
import { IShop } from '@/services/shop/type';

export const EditShop: React.FC<EditProps> = ({
  id,
  type = 'primary',
  successCallback = () => {},
}) => {

  const { t } = useLocale()
  const [visible, setVisibleFn] = useToggle(false)
  const [form] = Form.useForm()

  const getRequestFn = () => {
    if (id) {
      return ShopService.update;
    }
    return ShopService.create;
  }

  const editShopRequest = useRequest(
    getRequestFn(),
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

  const getDetailRequest = useRequest(
    ShopService.info,
    {
      onSuccess: (data: IShop) => {
        if (data?.id) {
          form.setFieldsValue({
            ...data
          })
        }
      }
    }
  )

  const title = useMemo(() => {
    if (id) {
      return t('edit')
    }
    return t('create')
  }, [id])

  const editHandle = () => {
    setVisibleFn.toggle()
    if (id) {
      getDetailRequest.run(id)
    }
  }

  const submit = async () => {
    await form.validateFields()
    const formData = await form.getFieldsValue()
    const requestBody = {
      ...formData,
      id,
    }
    editShopRequest.run(requestBody)
  }

  const onCancel = () => {
    setVisibleFn.toggle()
    form.resetFields()
  }

  const renderLoding = () => {
    return [
      editShopRequest.loading,
      getDetailRequest.loading
    ].includes(true)
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
        open={visible}
        height={300}
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
            label={t('shop_edit_name')}
            name='name'
            rules={[{
              required: true,
              message: t('shop_sumbit_rule_name_message')
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('shop_edit_mobile')}
            name='mobile'
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('shop_edit_contact_name')}
            name='contactName'
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('shop_edit_boss_name')}
            name='bossName'
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('shop_edit_description')}
            name='description'
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
