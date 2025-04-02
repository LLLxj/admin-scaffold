import React from 'react'
import {
  Row,
  Col,
} from '@/components';
import type { FunctionsProps } from './type';
import { EditDepartment, DeleteDepartment, EditDepartmentUser } from '../index'

export const Functions: React.FC<FunctionsProps> = ({
  department,
  successCallback,
}) => {

  return (
    <Row
      gutter={[8, 0]}
    >
      <Col>
        <EditDepartment
          successCallback={successCallback}
          departmentId={department?.id}
        />
      </Col>
      <Col>
        <EditDepartmentUser
          successCallback={successCallback}
          departmentId={department?.id}
        />
      </Col>
      <Col>
        <DeleteDepartment
          successCallback={successCallback}
          departmentId={department?.id}
        />
      </Col>
    </Row>
  );
}