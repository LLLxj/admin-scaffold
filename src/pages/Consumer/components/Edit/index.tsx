import React, { useMemo } from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  TextArea,
  InputNumber,
} from '@/components'
import { useToggle } from 'ahooks';
import { useLocale, useRequest } from '@/hooks';
import { Consumer as ConsumerService } from '@/services';
import type { EditProps } from '@/pages/type'
import { IConsumer } from '@/services/consumer/type';


export const Edit: React.FC<EditProps> = ({
  id,
  type = 'primary',
  successCallback = () => {},
}) => {

  const { t } = useLocale()
  const [visible, setVisibleFn] = useToggle(false)
  const [form] = Form.useForm()

  const getRequestFn = () => {
    if (id) {
      return ConsumerService.update;
    }
    return ConsumerService.create;
  }

  const editRequest = useRequest(
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
    ConsumerService.info,
    {
      onSuccess: (data: IConsumer) => {
        if (data?.id) {
          form.setFieldsValue({
            ...data,
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
    setVisibleFn.setRight()
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
    editRequest.run(requestBody)
  }

  const onCancel = () => {
    setVisibleFn.setLeft()
    form.resetFields()
  }

  const renderLoding = () => {
    return [
      editRequest.loading,
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
        height={400}
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
          name="edit-consumer"
          form={form}
        >
          <Form.Item
            label={t('consumer_edit_name')}
            name='name'
            rules={[{
              required: true,
              message: t('consumer_sumbit_rule_name_message')
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('consumer_edit_price')}
            name='price'
            rules={[{
              required: true,
              message: t('consumer_sumbit_rule_price_message')
            }]}
          >
            <InputNumber />
          </Form.Item>
          {
            !id && (
              <Form.Item
                label={t('consumer_edit_stock')}
                name='stock'
                rules={[{
                  required: true,
                  message: t('consumer_sumbit_rule_stock_message')
                }]}
              >
                <InputNumber />
              </Form.Item>
            )
          }
          <Form.Item
            label={t('consumer_edit_description')}
            name='description'
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
