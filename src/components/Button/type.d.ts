import type { ButtonProps } from 'antd';

interface ICommonButtonProps extends ButtonProps {
  children: JSX.Element[] | JSX.Element | string;
  inTable?: boolean;
}

export { ICommonButtonProps };
