import React, { useMemo } from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  TextArea,
} from '@/components'
import {
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useToggle } from 'ahooks';
import { useLocale, useRequest } from '@/hooks';
import {
  Dictionary as DictionaryService,
} from '@/services';
import type { EditProps } from '@/pages/type'
import { IDictionary } from '@/services/dictionary/type';
import '../../index.less'

export const EditDictionary: React.FC<EditProps> = ({
  id,
  type = 'primary',
  successCallback = () => {},
}) => {

  const { t } = useLocale()
  const [visible, setVisibleFn] = useToggle(false)
  const [form] = Form.useForm()
  const items = Form.useWatch('items', form)
  const getRequestFn = () => {
    if (id) {
      return DictionaryService.update;
    }
    return DictionaryService.create;
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
    DictionaryService.info,
    {
      onSuccess: (data: IDictionary) => {
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
    initForm()
    if (id) {
      getDetailRequest.run(id)
    }
  }

  const initForm = () => {
    form.setFieldValue('items', [undefined])
  }

  const addItem = async () => {
    const _items = await form.getFieldValue('items')
    const updateItems =
      _items?.length
        ? [
            ..._items,
            undefined
          ]
        : [undefined]
    form.setFieldValue('items', updateItems)
  }

  const submit = async () => {
    await form.validateFields()
    const formData = await form.getFieldsValue()
    const requestBody = {
      ...formData,
      id,
      birthDate: formData?.birthDate?.format('YYYY-MM-DD')
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
          name="edit-dictionary"
          form={form}
        >
          <Form.Item
            label={t('dictionary_edit_code')}
            name='code'
            rules={[{
              required: true,
              message: t('dictionary_sumbit_rule_code_message')
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('dictionary_edit_describe')}
            name='describe'
          >
            <TextArea />
          </Form.Item>
          <Form.List
            name='items'
          >
            {(fields, { remove }) => (
              <>
                {
                  fields.map((field, index) => {
                    const id = items?.[index]?.id
                    return (
                      <div
                        className='item-container'
                        key={index}
                      >
                        <Form.Item
                          {...field}
                          wrapperCol={{
                            span: 14
                          }}
                          key={`text${index + 1}`}
                          name={[field.name, 'text']}
                          label={t('dictionary_edit_item_text')}
                          rules={[{
                            required: true,
                            message: t('dictionary_sumbit_rule_text_message')
                          }]}
                        >
                          <Input
                            disabled={!!id}
                          />
                        </Form.Item>
                        {
                          <div
                            className="item-handle-container"
                          >
                            {
                              !id &&
                                <MinusCircleOutlined
                                  style={{ fontSize: '20px', color: '#999999' }}
                                  className="dynamic-delete-button"
                                  onClick={() => remove(field.name)}
                                />
                            }
                          </div>
                        }
                      </div>
                    )
                  })
                }
              </>
            )}
          </Form.List>
          <Form.Item
            wrapperCol={{
              offset: 6
            }}
          >
            <Button
              type="dashed"
              onClick={addItem}
              style={{ width: '60%' }}
              icon={<PlusOutlined />}
            >
              添加
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
