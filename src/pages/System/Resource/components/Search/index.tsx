
import {
  Form,
  Row,
  Col,
  Button,
} from '@/components';
import { useLocale } from '@/hooks';
import { forwardRef, useImperativeHandle } from 'react';
import { Input } from '@/components'
import { EditResource } from '../Edit';
import type { ISearchProps } from '@/pages/type'

export const Search = forwardRef(
  ({ searchHandle }: ISearchProps, parentRef) => {
    const [form] = Form.useForm();
    const { t } = useLocale();

    useImperativeHandle(parentRef, () => ({
      getFormValue: async () => {
        const formData = await form.getFieldsValue();
        return formData;
      },
    }));




    return (
      <div>
        <Form
          name="task-search"
          form={form}
          labelCol={{ span: 8 }}
        >
          <Row gutter={[20, 10]}>
            <Col span={8}>
              <Form.Item
                label={t('resource_search_name_label')}
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
                <EditResource
                  type='primary'
                  successCallback={searchHandle}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  },
);