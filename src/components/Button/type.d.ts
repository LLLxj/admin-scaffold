import type { ButtonProps } from 'antd';

export interface ICommonButtonProps extends ButtonProps {
  children: JSX.Element[] | JSX.Element | string;
  inTable?: boolean;
}

export type ButtonType = "link" | "primary" | "text" | "default" | "dashed" | undefined;

