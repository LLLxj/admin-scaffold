import type { IDepartment } from '@/services/department/type'

export interface FunctionsProps {
  department: IDepartment;
  successCallback: () => void;
}