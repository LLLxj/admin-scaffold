import { useRef } from 'react';
import { Form, Select, Button, Input, Row, Col } from '@/components';
import { useLocale } from '@/hooks';
import TagService from '@/services/tag';
import { forwardRef, useImperativeHandle } from 'react';
import type { ITagSearchProps } from './type';
import { TagEdit } from './TagEdit';
import type { IModalRef } from '@/pages/type';

export const TagSearch = forwardRef(
  ({ searchHandle }: ITagSearchProps, parentRef) => {
    const [form] = Form.useForm();
    const { t } = useLocale();

    const taskEditRef = useRef<IModalRef>();

    useImperativeHandle(parentRef, () => ({
      getFormValue: async () => {
        const formData = await form.getFieldsValue();
        return formData;
      },
    }));

    const createHandle = () => {
      if (taskEditRef?.current) {
        taskEditRef.current.init();
      }
    }

    const searchFn = async () => {
      const formData = await form.getFieldsValue();
      searchHandle(formData)
    }

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
                label={t('tag_search_name')}
                name="name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('tag_search_module')}
                name="resource"
              >
                <Select
                  asyncHandle={TagService.getAll}
                  selectLabel="name"
                  selectKey="id"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={searchFn}
                >
                  {t('search')}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={createHandle}
              >
                {t('create')}
              </Button>
            </Col>
          </Row>
        </Form>
        <TagEdit
          ref={taskEditRef}
          successCallback={searchHandle}
        />
      </div>
    );
  },
);
