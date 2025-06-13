import React, { useMemo } from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  TextArea,
  InputNumber,
  Select,
} from '@/components'
import { useToggle } from 'ahooks';
import { useLocale, useRequest } from '@/hooks';
import {
  ProjectItem as ProjectItemService,
  Dictionary as DictionaryService,
} from '@/services';
import type { EditProps } from '@/pages/type'
import { IProjectItem } from '@/services/projectItem/type';

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
      return ProjectItemService.update;
    }
    return ProjectItemService.create;
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
    ProjectItemService.info,
    {
      onSuccess: (data: IProjectItem) => {
        if (data?.id) {
          form.setFieldsValue({
            ...data,
            categoryId: data?.category?.id
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
          name="edit-customer"
          form={form}
        >
          <Form.Item
            label={t('project_item_edit_name')}
            name='name'
            rules={[{
              required: true,
              message: t('project_item_sumbit_rule_name_message')
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('project_item_edit_price')}
            name='price'
            rules={[{
              required: true,
              message: t('project_item_sumbit_rule_price_message')
            }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label={t('project_item_edit_category')}
            name='categoryId'
            rules={[{
              required: true,
              message: t('project_item_sumbit_rule_category_message')
            }]}
          >
            <Select
              asyncHandle={DictionaryService.list}
              asyncParams={{
                code: 'PROJECT_ITEM_CATEGORY'
              }}
              selectKey='id'
              selectLabel='name'
              refreshDeps={visible}
            />
          </Form.Item>
          <Form.Item
            label={t('project_item_edit_description')}
            name='description'
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
