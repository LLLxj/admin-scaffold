import type { ModalProps as AntdModalProps } from "antd";

export interface ModalProps extends AntdModalProps {
  size?: 'small' | 'middle' | 'large';
  loading?: boolean;
  height?: number;
}