import React from 'react'
import { Input as AntdInput } from 'antd';
import type { ICommonInput, ICommonTextArea } from './type'

// 解构出 TextArea
const { TextArea: AntdTextArea } = AntdInput;

export const Input: React.FC<ICommonInput> = ({
  allowClear = true,
  ...props
}) => {
  return (
    <AntdInput
      allowClear={allowClear}
      { ...props }
    />
  );
}

// 导出 TextArea 组件
export const TextArea: React.FC<ICommonTextArea> = ({
  allowClear = true,
  ...props
}) => {
  return (
    <AntdTextArea
      allowClear={allowClear}
      showCount
      { ...props }
    />
  );
};

export const Password: React.FC<ICommonTextArea> = ({
  allowClear = true,
  ...props
}) => {
  return (
    <AntdInput.Password
      allowClear={allowClear}
      { ...props }
    />
  );
};
