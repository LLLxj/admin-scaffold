import React from 'react'
import AvatarDropdown from './AvatarDropDown'
import SelectLang from './SelectLang'
import ThemePicker from './ThemePicker';
import { Row, Col } from '@/components'

export const HeaderContent: React.FC = () => {
  return (
    <Row
      justify="end"
      align='middle'
      gutter={[10, 0]}
    >
      <Col>
        <ThemePicker />
      </Col>
      <Col>
        <SelectLang />
      </Col>
      <Col>
        <AvatarDropdown />
      </Col>
    </Row>
  );
}