import type { InputProps } from 'antd'

export type ICommonInput = InputProps

interface ICommonTextArea extends InputProps {
  allowClear?: boolean;
}
