import React, { useEffect, useState } from 'react';
import ProLayout from '@ant-design/pro-layout';
import { useModel, Link, Outlet, useLocation } from '@umijs/max';
import { HeaderContent } from '@/components';
import { useLocale } from '@/hooks';
import type { Route } from '@ant-design/pro-layout/es/typing'
import type { ICurrentUser } from '@/models/type'
import './BasicLayout.less';
import { authRoute } from '@/utils'

const BasicLayout: React.FC = () => {
  const { getUserInfo } = useModel('auth');
  const [currentUser, setCurrentUser] = useState<ICurrentUser>()
  const { t } = useLocale();
  const location = useLocation();
  useEffect(() => {
    getCurrentUser()
  }, []);

  const getCurrentUser = async () => {
    const currentUser = await getUserInfo();
    setCurrentUser(currentUser)
  }
  
  const formatRoutes = () => {
    const validateRoutes = authRoute(currentUser?.resources);
    const _routes = validateRoutes?.map((item) => {
      const children =
        item?.routes?.length
          ? renderChildren(item?.routes)
          : undefined
      return {
        ...item,
        children,
        name: t(item?.name),
      }
    })
    
    return {
      ..._routes?.[0],
      routes: _routes
    }
  }

  const renderChildren = (children: Route[]) => {
    const formatChildren = children?.map((item: Route) => {
      const children: Route[] =
        item?.routes?.length
          ? renderChildren(item?.routes)
          : [] as Route[]
      return {
        ...item,
        name: t(item?.name),
        children,
      }
    })
    return formatChildren;
  }

  return (
    <div className="wrapper">
      <ProLayout
        navTheme="light"
        layout="mix"
        fixedHeader={true}
        fixSiderbar={true}
        logo={null}
        title="blog-admin"
        route={formatRoutes()}
        location={location} // 传递 location 属性
        menuItemRender={(menuItemProps: any, defaultDom: any) => {
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        headerContentRender={() => <HeaderContent />}
      >
        <div className='container'>
          <Outlet />
        </div>
      </ProLayout>
    </div>
  );
};

export default BasicLayout;
