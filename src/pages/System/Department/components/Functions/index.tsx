import React from 'react'
import {
  Row,
  Col,
} from '@/components';
import type { FunctionsProps } from './type';
import { EditDepartment, DeleteDepartment, AddDepartmentUser } from '../index'

export const Functions: React.FC<FunctionsProps> = ({
  node,
  successCallback,
}) => {

  return (
    <Row
      gutter={[8, 0]}
    >
      <Col>
        <EditDepartment
          successCallback={successCallback}
          departmentId={node.key as number}
        />
      </Col>
      <Col>
        <AddDepartmentUser
          setRefreshDeps={successCallback}
          departmentId={node.key as number}
        />
      </Col>
      <Col>
        <DeleteDepartment
          setRefreshDeps={successCallback}
          departmentId={node.key as number}
        />
      </Col>
    </Row>
  );
}