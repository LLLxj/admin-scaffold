import React from 'react'
import {
  Tooltip,
  Popconfirm,
  message
} from '@/components';
import { useRequest, useLocale } from '@/hooks'
import { DeleteOutlined } from '@ant-design/icons'
import DepartmentService from '@/services/department'


interface DeleteDepartmentProps {
  setRefreshDeps: () => void;
  departmentId: number;
}

export const DeleteDepartment: React.FC<DeleteDepartmentProps> = ({
  setRefreshDeps,
  departmentId
}) => {
  const { t } = useLocale();

  const deleteNodeRequest = useRequest(
    DepartmentService.remove,
    {
      onSuccess: () => {
        message.success(t('operate_success'));
        setRefreshDeps()
      }
    }
  )

  const deleteDepartment = () => {
    deleteNodeRequest.run(departmentId);
  }

  return (
    <Tooltip
      title={t('department_remove_node')}
    >
      <Popconfirm
        title={t('department_remove_node_confirm_title')}
        description={t('department_remove_node_confirm_description')}
        onConfirm={deleteDepartment}
      >
        <DeleteOutlined />
      </Popconfirm>
    </Tooltip>
  );
}
