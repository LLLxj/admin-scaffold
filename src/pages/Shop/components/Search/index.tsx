import {
  Form,
  Row,
  Col,
  Button,
} from '@/components';
import { useLocale } from '@/hooks';
import { forwardRef, useImperativeHandle } from 'react';
import type { ISearchProps } from '@/pages/type';
import { Input } from '@/components'
import { EditShop } from '../Edit';

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
          name="shop-search"
          form={form}
          labelCol={{ span: 8 }}
        >
          <Row gutter={[20, 10]}>
            <Col span={8}>
              <Form.Item
                label={t('shop_search_name_label')}
                name="name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('shop_search_mobile_label')}
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
                <EditShop
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