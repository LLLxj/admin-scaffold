import type { FormInstance } from 'antd'

export interface SearchProps {
  searchHandle: () => void;
  form: FormInstance;
}