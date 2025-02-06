import {
  Form,
  Select,
  Row,
  Col,
  Button,
} from '@/components';
import { useLocale } from '@/hooks';
import TagService from '@/services/tag';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { ITaskSearchProps } from './type';
import { Input } from '@/components'
import { TaskEdit } from './TaskEdit';
import type { IModalRef } from '@/pages/type';

export const TaskSearch = forwardRef(
  ({ searchHandle }: ITaskSearchProps, parentRef) => {
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
                label={t('task_search_content_label')}
                name="content"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('task_search_category')}
                name="tagId"
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
                  onClick={searchHandle}
                >
                  {t('search')}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={createHandle}
                >
                  {t('create')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <TaskEdit
          ref={taskEditRef}
          successCallback={searchHandle}
        />
      </div>
    );
  },
);