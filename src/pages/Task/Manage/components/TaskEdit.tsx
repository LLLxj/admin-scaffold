import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
  Modal,
  Input,
  Form,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Spin,
  message,
} from '@/components'
import { useRequest, useToggle } from 'ahooks'
import TaskService from '@/services/task'
import { useLocale } from '@/hooks';
import type { ITaskEditInitProps, ITaskEditProps } from './type';
import TagService from '@/services/tag'
import type { ITask } from '../type'
import moment from 'moment'

export const TaskEdit = forwardRef((
  {
    successCallback
  }: ITaskEditProps,
  parentRef
) => {

  const { t } = useLocale();
  const timeFormat = 'YYYY-MM-DD'
  const createKey = t('create');
  const editKey = t('edit');
  const [open, setOpenFn] = useToggle(false)
  const [form] = Form.useForm()
  const [title, setTitle] = useState<string>(createKey)
  const [taskId, setTaskId] = useState<number>()

  useImperativeHandle(
    parentRef,
    () => ({
      init: (initData: ITaskEditInitProps) => {
        setOpenFn.setRight()
        if (initData?.id) {
          setTaskId(initData?.id)
          setTitle(editKey)
          getDetailRequest.run(initData?.id);
        }
      }
    })
  )

  const getDetailRequest = useRequest(
    TaskService.info,
    {
      manual: true,
      debounceWait: 500,
       onSuccess: (data: ITask) => {
        const { content, tag, startTime, endTime, duration } = data;
        form.setFieldsValue({
          content,
          startTime:
            startTime
              ? moment(startTime, timeFormat)
              : undefined,
          endTime:
            endTime
              ? moment(endTime, timeFormat)
              : undefined,
          duration,
          tagId: tag?.id,
        })
       }
     }
  )

  const createRequest = useRequest(
    TaskService.create,
    {
      manual: true,
      debounceWait: 500,
      onSuccess: () => {
        successHandle()
      }
    }
  )

  const updateRequest = useRequest(
    TaskService.update,
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
    console.log(formData)
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
    if (!taskId) {
      createRequest.run(formatFormData)
    } else {
      updateRequest.run(taskId, formatFormData)
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
            name="content"
            label={t('task_column_content')}
            rules={[{
              required: true,
              message: t('task_sumbit_rule_content_message')
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('task_search_category')}
            name="tagId"
            rules={[{
              required: true,
              message: t('task_sumbit_rule_category_message')
            }]}
          >
            <Select
              asyncHandle={TagService.getAll}
              selectLabel="name"
              selectKey="id"
            />
          </Form.Item>
          <Form.Item
            label={t('task_column_start_time')}
            name="startTime"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label={t('task_column_end_time')}
            name="endTime"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label={t('task_column_duration')}
            name="duration"
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
})
