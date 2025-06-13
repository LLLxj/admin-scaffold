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
import { Edit } from '../Edit';

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
        name="consumer-search"
        form={form}
        labelCol={{ span: 8 }}
      >
        <Row gutter={[20, 10]}>
          <Col span={8}>
            <Form.Item
              label={t('consumer_search_name_label')}
              name="name"
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
              <Edit
                successCallback={searchHandle}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}