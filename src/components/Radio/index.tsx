import React from 'react'
import { Radio as AntdRadio } from 'antd';
import type { RadioProps, RadioGroupProps } from 'antd';
import type { RadioButtonProps } from 'antd/es/radio/radioButton';

export const Radio: React.FC<RadioProps> = ({ ...props }) => {
  return <AntdRadio {...props} />;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  ...props
}) => {
  return <AntdRadio.Group {...props} />;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  ...props
}) => {
  return <AntdRadio.Button {...props} />;
}
