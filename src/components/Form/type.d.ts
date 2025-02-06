import type { FormProps } from 'antd';

interface ICommonFormProps extends FormProps {
  children: JSX.Element[] | JSX.Element | any;
}

export { ICommonFormProps };
