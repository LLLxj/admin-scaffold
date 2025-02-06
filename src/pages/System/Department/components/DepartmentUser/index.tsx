import React, { useEffect, useState } from 'react'
import { useRequest, useLocale } from '@/hooks'
import Department from '@/services/department'
import type { DepartmentUserProps } from './type'
import type { IDepartmentUser } from '@/services/department/type'
import { Table } from '@/components'

export const DepartmentUser: React.FC<DepartmentUserProps> = ({
  departmentId,
}) => {

  const { t } = useLocale();
  const [dataSource, setDataResource] = useState<IDepartmentUser[]>([])

  const searchDepartmentUserRequest = useRequest(
    Department.searchUser,
    {
      onSuccess: (data: IDepartmentUser[]) => {
        setDataResource(data)
      }
    }
  )

  useEffect(() => {
    if (departmentId) {
      searchDepartmentUserRequest.run({
        departmentId
      })
    }
  }, [departmentId])

  const columns = [
    {
      title: t('department_user_column_id'),
      dataIndex: 'userId'
    },
    {
      title: t('department_user_column_user_name'),
      dataIndex: 'userName'
    }
  ]

  return (
    <div>
      <Table
        rowKey='userId'
        columns={columns}
        dataSource={dataSource}
        showPagination={false}
      />
    </div>
  );
}