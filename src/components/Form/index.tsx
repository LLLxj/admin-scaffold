import React from 'react';
import { Form as AntdForm } from 'antd';
import type { ICommonFormProps } from './type';
import './index.less'

const {
  useForm,
  useFormInstance,
  useWatch,
  Item,
  List,
  ErrorList,
  Provider,
} = AntdForm;

export const Form = ({ children, ...props }: ICommonFormProps) => {

  const defaultConfig = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <AntdForm
      className='common-form-container'
      {...defaultConfig}
      {...props}
    >
      {children}
    </AntdForm>
  );
};
Form.useForm = useForm;
Form.useFormInstance = useFormInstance;
Form.useWatch = useWatch;
Form.Item = Item;
Form.List = List;
Form.ErrorList = ErrorList;
Form.Provider = Provider;