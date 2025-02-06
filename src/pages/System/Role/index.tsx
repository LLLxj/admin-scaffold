import React from 'react'
import { Row } from '@/components';
import { RoleList } from './components';

const Role: React.FC = () => {
  return (
    <Row
      gutter={[10, 0]}
    >
      <RoleList />
    </Row>
  );
}

export default Role