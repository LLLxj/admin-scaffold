import React, { useMemo } from 'react'
import { Modal as AntdModal } from 'antd';
import { Spin } from '../Spin';
import type { ModalProps } from './type';
import { toNumber } from '@/utils'

export const Modal: React.FC<ModalProps> = ({
  centered = true,
  size = 'small',
  width,
  loading = false,
  height,
  children,
  style = {},
  ...props
}) => {

  const sizeWidthMap = {
    small: {
      width: 520,
      height: 180,
    },
    middle: {
      width: 800,
      height: 240,
    },
    large: {
      width: 1200,
      height: 400,
    },
  }

  const sizeConfig = useMemo(() => {
    let finalWidth: number = 0;
    let finalHeight: number = 0;
    if (width) {
      finalWidth = toNumber(width);
    } else {
      finalWidth = sizeWidthMap?.[size]?.width
    }
    if (height) {
      finalHeight = height;
    } else {
      finalHeight = sizeWidthMap?.[size]?.height
    }
    return {
      width: finalWidth,
      height: finalHeight,
    }
  }, [size, width, height])

  return (
    <AntdModal
      centered={centered}
      maskClosable={false}
      { ...props }
      width={sizeConfig?.width}
      style={{
        ...style,
      }}
    >
      <Spin
        spinning={loading}
      >
        <div
          style={{
            height: `${sizeConfig?.height}px`,
            overflow: 'auto'
          }}
        >
          { children }
        </div>
      </Spin>
    </AntdModal>
  );
}