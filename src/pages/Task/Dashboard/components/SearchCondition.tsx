import React from 'react'
import { useLocale } from '@/hooks'
import {
  Form,
  RangePicker,
  Button,
  message,
} from '@/components'
import type { ISearchCondition } from './type'
import { Row, Col } from '@/components'

export const SearchCondition: React.FC<ISearchCondition> = ({
  setSearchParams
}) => {

  const [form] = Form.useForm()
  const { t } = useLocale()
  const timeFormat = 'YYYY-MM-DD'

  const searchFn = async () => {
    const timeRange = await form.getFieldValue('range')
    if (!timeRange?.length) {
      message.warning('请选择时间范围');
      return;
    }
    const formatFormData = {
      startTime: timeRange?.[0]?.format(timeFormat),
      endTime: timeRange?.[1]?.format(timeFormat),
    }
    setSearchParams({
      ...formatFormData
    })
  }

  return (
    <Form
      name="task-dashboard-search"
      form={form}
    >
      <Row
        gutter={[20, 0]}
      >
        <Col
          span={12}
        >
          <Form.Item
            name="range"
            label={t('task_dashboard_search_range_label')}
          >
            <RangePicker />  
          </Form.Item>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={searchFn}
          >
            { t('search') }
          </Button>
        </Col>
      </Row>
    </Form>
    
  );
}
