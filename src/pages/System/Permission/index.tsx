import React from 'react'
import { Row } from '@/components';
import { PermissionList } from './components';

const Permission: React.FC = () => {
  return (
    <Row
      gutter={[10, 0]}
    >
      <PermissionList />
    </Row>
  );
}
export default Permission
