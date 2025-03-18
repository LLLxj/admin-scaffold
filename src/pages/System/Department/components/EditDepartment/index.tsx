import React, { useMemo, useRef } from 'react'
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Spin,
  message,
  TreeSelect,
} from '@/components'
import { useRequest, useLocale } from '@/hooks'
import Department from '@/services/department'
import { useToggle } from 'ahooks'
import type { DataComponentProps } from '@/pages/type'
import type { ITree } from '@/components/TreeSelect/type'
import type { ButtonType } from '@/components/Button/type'


interface EditDepartmentProps {
  successCallback: () => void;
  departmentId?: number;
}

export const EditDepartment: React.FC<EditDepartmentProps> = ({
  successCallback,
  departmentId
}) => {
  const { t } = useLocale();
  const [visible, setVisibleFn] = useToggle(false)
  const [form] = Form.useForm()
  const departmentTreeRef = useRef<DataComponentProps>()
  

  const updateRequest = useRequest(
    Department.create,
    {
      onSuccess: () => {
        message.success(t('operate_success'));
        onCancel()
        successCallback()
      }
    }
  )

  const buttonOption = useMemo(() => {
    if (departmentId) {
      return {
        props: {
          type: 'link' as ButtonType,
          inTable: true,
        },
        label: t('edit')
      }
    }
    return {
      props: {
        type: 'primary' as ButtonType
      },
      label: t('create')
    }
  }, [departmentId])

  const formatTree = (data: any[] = []) => {
    if (!data?.length) {
      return []
    }
    const tree: ITree[] = data?.map((item: any) => {
      return {
        title: item?.name,
        value: item?.id,
        children: formatTree(item?.children)
      }
    })
    return tree
  }

  const createFn = () => {
    setVisibleFn.toggle()
    departmentTreeRef.current?.initData()
  }

  const onCancel = () => {
    setVisibleFn.toggle()
    form.resetFields()
  }

  const submit = async () => {
    const formData = await form.validateFields()
    updateRequest.run(formData)
  }

  const renderLoading = () => {
    const _loading
      = [
          updateRequest?.loading
        ]?.includes(true)
    return _loading
  }

  return (
    <>
       <Button
        { ...buttonOption.props }
        onClick={createFn}
      >
        { buttonOption.label }
      </Button>
      <Modal
        title={t('department_append_department')}
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
            disabled={renderLoading()}
            onClick={submit}
          >
            确定
          </Button>
        ]}
      >
        <Spin
          spinning={renderLoading()}
        >
          <Form
            name="append-child"
            form={form}
          >
            <Form.Item
              label={t('department_name')}
              name="name"
              rules={[{
                required: true,
                message: t('department_sumbit_rule_name_message')
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('department_sort_order')}
              name="sortOrder"
              rules={[{
                required: true,
                message: t('department_sumbit_rule_sort_order_message')
              }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label={t('department_parent_department')}
              name="parentId"
            >
              <TreeSelect
                ref={departmentTreeRef}
                asyncHandle={Department.getTree}
                asyncParams={{}}
                treeDefaultExpandAll={true}
                formatResult={(tree) => {
                  const list = formatTree(tree)
                  return list
                }}
              />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
    
  );
}
