import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
} from '@/components';
import { useLocale } from '@/hooks';
import type { ISearchProps } from '@/pages/type';
import {
  Dictionary as DictionaryService,
} from '@/services';

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
        name="project-item-search"
        form={form}
        labelCol={{ span: 10 }}
      >
        <Row gutter={[20, 10]}>
          <Col span={8}>
            <Form.Item
              label={t('project_item_search_name_label')}
              name="name"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col
            span={8}
          >
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
              />
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