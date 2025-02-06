import React, { useState } from 'react'
import { ColorPicker } from 'antd';
import type { ColorPickerProps, GetProp } from 'antd';
import { Row } from '@/components'


type Color = GetProp<ColorPickerProps, 'value'>;


const ThemeColorPicker: React.FC = () => {
  const [color, setColor] = useState<Color>('#1677ff');

  const onChange = (value: Color) => {
    setColor(value)
  }

  return (
    <Row
      align='middle'
    >
      <ColorPicker
        value={color}
        onChange={onChange}
      />
    </Row>
  );
}

export default ThemeColorPicker