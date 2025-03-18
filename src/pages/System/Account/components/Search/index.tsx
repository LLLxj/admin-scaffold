import React from 'react'
import {
  Form,
  Row,
  Col,
  Button,
  Input
} from '@/components';
import { useLocale } from '@/hooks';
import { EditAccount } from '../Edit';
import type { SearchProps } from './type'

export const Search: React.FC<SearchProps> = ({
  searchHandle,
  form,
}) => {

  const { t } = useLocale()

  const resetHandle = async () => {
    await form.resetFields()
    searchHandle()
  }

  return (
    <Form
      name="task-search"
      form={form}
      labelCol={{ span: 8 }}
    >
      <Row gutter={[20, 10]}>
        <Col span={8}>
          <Form.Item
            label={t('account_column_name')}
            name="name"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('account_column_mobile')}
            name="mobile"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button
              type="primary"
              onClick={searchHandle}
            >
              {t('search')}
            </Button>
          </Form.Item>
          
        </Col>
        <Col>
          <Form.Item>
            <EditAccount
              buttonLabel={t('create')}
              buttonType='primary'
              successCallback={searchHandle}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button
              onClick={resetHandle}
            >
              { t('reset') }
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}