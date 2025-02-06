import React from 'react'
import { Row } from '@/components';
import { ResourceList } from './components';

const Resource: React.FC = () => {
  return (
    <Row
      gutter={[10, 0]}
    >
      <ResourceList />
    </Row>
  );
}

export default Resource