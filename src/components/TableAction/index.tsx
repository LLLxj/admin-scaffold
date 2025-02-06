import React, { useMemo } from 'react'
import { message } from '../message';
import { useRequest, useLocale, useEdit } from '@/hooks';
import { Button, Popconfirm } from '@/components';
import type { TableActionProps } from './type'

export const TableAction: React.FC<TableActionProps> = ({
  asyncHandle,
  asyncParams,
  buttonText,
  buttonType = 'link',
  successShowTip = true,
  // loadingCondition,
  // disabledCondition,
  successCallback = () => {},
  needConfirm = false,
  confirmTitle = '',
  confirmDescription = '',
}) => {

  const { t } = useLocale();
  const { open, setOpenFn } = useEdit();

  const handleRequest = useRequest(
    asyncHandle,
    {
      onSuccess: () => {
        if (successShowTip) {
          message.success({
            content: t('operate_success'),
            duration: 1.5,
            onClose: () => {
              successCallback()
            }
          })
        }
      }
    }
  )

  const onHandle = () => {
    handleRequest.run(asyncParams)
  }

  const handleCancel = () => {
    setOpenFn.setLeft()
  }

  const renderLoding = () => {
    return handleRequest?.loading
  }

  const renderDisabled = () => {
    return handleRequest?.loading
  }

  const tableAction = useMemo(() => {
    if (!needConfirm) {
      return (
        <Button
          type={buttonType}
          disabled={renderDisabled()}
          loading={renderLoding()}
          onClick={onHandle}
          inTable={true}
        >
          { buttonText }
        </Button>
      )
    }
    return (
      <Popconfirm
        title={confirmTitle}
        description={confirmDescription}
        onConfirm={onHandle}
        okButtonProps={{ loading: handleRequest?.loading }}
        open={open}
        onCancel={handleCancel}
      >
        <Button
          type={buttonType}
          inTable={true}
          onClick={() => setOpenFn.setRight()}
        >
          { buttonText }
        </Button>
      </Popconfirm>
    )
  }, [needConfirm, open])

  return (
    <span>
      { tableAction }
    </span>
  );
}
