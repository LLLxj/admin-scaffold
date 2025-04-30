import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
} from '@/components';
import { useLocale } from '@/hooks';
import type { ISearchProps } from '@/pages/type';
import { Input } from '@/components'
import { EditDictionary } from '../Edit';

export const Search: React.FC<ISearchProps> = ({
  searchHandle,
  form,
}) => {
  const { t } = useLocale();

  const resetHandle = async () => {
    await form.resetFields()
    searchHandle()
  }

  return (
    <div>
      <Form
        name="customer-search"
        form={form}
        labelCol={{ span: 8 }}
      >
        <Row gutter={[20, 10]}>
          <Col span={8}>
            <Form.Item
              label={t('customer_search_name_label')}
              name="name"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={t('customer_search_mobile_label')}
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
              <Button
                onClick={resetHandle}
              >
                { t('reset') }
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <EditDictionary
                successCallback={searchHandle}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}