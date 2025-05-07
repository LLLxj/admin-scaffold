import React, { useMemo } from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  TextArea,
  DatePicker,
  RadioGroup,
  Select,
  TreeSelect,
} from '@/components'
import { useToggle } from 'ahooks';
import { useLocale, useRequest } from '@/hooks';
import {
  Customer as CustomerService,
  Shop as ShopService,
  Account as AccountService,
  Department as DepartmentService,
  Dictionary as DictionaryService,
} from '@/services';
import type { EditProps } from '@/pages/type'
import { ICustomer } from '@/services/customer/type';
import dayjs from 'dayjs'
import { formatTree } from '@/utils';

export const EditCustomer: React.FC<EditProps> = ({
  id,
  type = 'primary',
  successCallback = () => {},
}) => {

  const { t } = useLocale()
  const [visible, setVisibleFn] = useToggle(false)
  const [form] = Form.useForm()

   const genderOptions = [
      {
        label: t('male'),
        value: 'male',
      },
      {
        label: t('female'),
        value: 'female',
      },
      {
        label: t('unknow'),
        value: 'unknow',
      },
    ]

  const getRequestFn = () => {
    if (id) {
      return CustomerService.update;
    }
    return CustomerService.create;
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
    CustomerService.info,
    {
      onSuccess: (data: ICustomer) => {
        if (data?.id) {
          form.setFieldsValue({
            ...data,
            shopId: data?.shop?.id,
            departmentId: data?.department?.id,
            userId: data?.user?.id,
            birthDate:
              data?.birthDate
                ? dayjs(data?.birthDate)
                : undefined,
            tagIds:
              data?.tags?.map((item) => item?.id) || []
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
        height={600}
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
            label={t('customer_edit_name')}
            name='name'
            rules={[{
              required: true,
              message: t('customer_sumbit_rule_name_message')
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('customer_edit_mobile')}
            name='mobile'
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('customer_column_birth_date')}
            name='birthDate'
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label={t('customer_edit_gender')}
            name='gender'
            rules={[{
              required: true,
              message: t('customer_sumbit_rule_gender_message')
            }]}
          >
            <RadioGroup
              options={genderOptions}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item
            label={t('customer_edit_shop')}
            name='shopId'
            rules={[{
              required: true,
              message: t('customer_sumbit_rule_shop_message')
            }]}
          >
            <Select
              asyncHandle={ShopService.getAll}
              selectKey='id'
              selectLabel='name'
              refreshDeps={visible}
            />
          </Form.Item>
          <Form.Item
            label={t('customer_edit_department')}
            name='departmentId'
            rules={[{
              required: true,
              message: t('customer_sumbit_rule_department_message')
            }]}
          >
            <TreeSelect
              asyncHandle={DepartmentService.getTree}
              asyncParams={{}}
              treeDefaultExpandAll={true}
              formatResult={(tree) => {
                const list = formatTree(tree, 'name', 'id', 'children')
                return list
              }}
            />
          </Form.Item>
          <Form.Item
            label={t('customer_edit_belong_user')}
            rules={[{
              required: true,
              message: t('customer_sumbit_rule_belong_user_message')
            }]}
            name='userId'
          >
            <Select
              asyncHandle={AccountService.getAll}
              selectKey='id'
              selectLabel='name'
              refreshDeps={visible}
            />
          </Form.Item>
          <Form.Item
            label={t('customer_edit_tag')}
            name='tagIds'
          >
            <Select
              asyncHandle={DictionaryService.list}
              asyncParams={{
                code: 'CUSTOMER_TAG'
              }}
              mode='multiple'
              selectKey='id'
              selectLabel='name'
              refreshDeps={visible}
            />
          </Form.Item>
          <Form.Item
            label={t('customer_edit_remark')}
            name='remark'
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
