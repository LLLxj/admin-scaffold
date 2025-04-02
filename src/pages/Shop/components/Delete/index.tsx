import React from 'react'
import type { EditProps } from '@/pages/type'
import { useRequest, useLocale } from '@/hooks'
import { Popconfirm, Button, message } from '@/components';
import RoleService from '@/services/role';

const DeleteRole: React.FC<EditProps> = ({
  id,
  successCallback = () => {}
}) => {

  const { t } = useLocale();

  const deleteRoleRequest = useRequest(
    RoleService.removeRole,
    {
      onSuccess: () => {
        message.success({
          content: t('operate_success'),
          duration: 2,
          onClose: () => {
            successCallback()
          }
        })
      }
    }
  )

  const deleteRoleFn = () => {
    deleteRoleRequest.run(id);
  }

  return (
    <Popconfirm
      title={t('role_remove_role_confirm_title')}
      description={t('role_remove_role_confirm_description')}
      onConfirm={deleteRoleFn}
    >
      <Button
        type="link"
        inTable={true}
        disabled={deleteRoleRequest?.loading}
        loading={deleteRoleRequest?.loading}
      >
        {t('delete')}
      </Button>
    </Popconfirm>
  );
}

export default DeleteRole