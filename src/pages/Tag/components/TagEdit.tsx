import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
  Modal,
  Input,
  Form,
  Button,
  Spin
} from '@/components'
import { message } from 'antd'
import { useRequest, useToggle } from 'ahooks'
import { useLocale } from '@/hooks';
import type { ITagEditInitProps, ITagEditProps } from './type';
import TagService from '@/services/tag'
import type { ITag } from '../type'

export const TagEdit = forwardRef((
  {
    successCallback
  }: ITagEditProps,
  parentRef
) => {

  const { t } = useLocale();
  const timeFormat = 'YYYY-MM-DD'
  const createKey = t('create');
  const editKey = t('edit');
  const [open, setOpenFn] = useToggle(false)
  const [form] = Form.useForm()
  const [title, setTitle] = useState<string>(createKey)
  const [tagId, setTagId] = useState<number>()

  useImperativeHandle(
    parentRef,
    () => ({
      init: (initData: ITagEditInitProps) => {
        setOpenFn.setRight()
        if (initData?.id) {
          setTagId(initData?.id)
          setTitle(editKey)
          getDetailRequest.run(initData?.id);
        }
      }
    })
  )

  const getDetailRequest = useRequest(
    TagService.info,
    {
      manual: true,
      debounceWait: 500,
       onSuccess: (data: ITag) => {
        const { name, resource } = data;
        form.setFieldsValue({
          name,
          resource,
        })
       }
     }
  )

  const createRequest = useRequest(
    TagService.create,
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        successHandle()
      }
    }
  )

  const updateRequest = useRequest(
    TagService.update,
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        successHandle()
      }
    }
  )

  const successHandle = () => {
    message.success(t('operate_success'));
    onCancel()
    if (successCallback) {
      successCallback()
    }
  }

  const onCancel = () => {
    setOpenFn.setLeft()
    form.resetFields()
  }

  const submit = async () => {
    const formData = await form.validateFields()
    const formatFormData = {
      ...formData,
      startTime:
        formData?.startTime
          ? formData?.startTime.format(timeFormat)
          : undefined,
      endTime:
        formData?.endTime
          ? formData?.endTime.format(timeFormat)
          : undefined,
    }
    if (!tagId) {
      createRequest.run(formatFormData)
    } else {
      updateRequest.run(tagId, formatFormData)
    }
    
  }

  const renderLoading = () => {
    const _loading
      = [
          getDetailRequest?.loading,
          createRequest?.loading,
          updateRequest?.loading,
        ]?.includes(true)
    return _loading
  }

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button
          key='cancle'
          onClick={onCancel}
        >
          { t('cancle') }
        </Button>,
        <Button
          key='submit'
          type='primary'
          disabled={renderLoading()}
          onClick={submit}
        >
          { t('confirm') }
        </Button>
      ]}
    >
      <Spin
        spinning={renderLoading()}
      >
        <Form
          name="task-edit"
          form={form}
        >
          <Form.Item
            name="name"
            label={t('tag_column_name')}
            rules={[{
              required: true,
              message: t('tag_column_rule_name_message')
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('tag_column_module')}
            name="resource"
            rules={[{
              required: true,
              message: t('tag_column_rule_module_message')
            }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
})
