import {
  LogoutOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { setAlpha } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel } from '@umijs/max';
import { Avatar } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { HeaderDropdown } from '@/components';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarLogo = () => {
  const { userInfo: currentUser } = useModel('auth');
  const avatarClassName = useEmotionCss(({ token }) => {
    return {
      color: token.colorPrimary,
      verticalAlign: 'top',
      background: setAlpha(token.colorBgContainer, 0.85),
    };
  });

  const avatarSrc = !currentUser?.username
    ? (currentUser?.username as string)
    : `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser?.username.substring(currentUser?.username.length - 2)}`;

  return (
    <Avatar
      className={avatarClassName}
      src={avatarSrc}
      alt="avatar"
    />
  );
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
}) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const { logout } = useModel('auth');
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  const { setInitialState } =
    useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        logout();
        return;
      }
    },
    [setInitialState],
  );

  const menuItems = [
    {
      key: 'outlined',
      icon: <ToolOutlined />,
      label: '修改密码',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <span className={actionClassName}>
        <AvatarLogo />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
