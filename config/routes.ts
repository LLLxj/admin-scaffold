const routes = [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/dashboard',
        name: 'route_dashboard',
        component: './Dashboard',
      },
      {
        path: '/shop',
        name: 'route_shop_manage',
        permissionCodes: [
          '店家管理',
          '店家列表',
        ],
        routes: [
          {
            path: '/shop/index',
            name: 'route_shop_list',
            permissionCodes: [
              '店家列表',
            ],
            component: './Shop',
          },
        ]
      },
      {
        path: '/customer',
        name: 'route_customer',
        permissionCodes: [
          '客户管理客户列表',
        ],
        component: './Customer',
      },
      {
        path: '/system',
        name: 'route_system_config',
        permissionCodes: [
          '部门管理',
          '角色管理',
          '用户管理',
          '资源管理',
          '权限管理',
          '字典管理'
        ],
        routes: [
          {
            permissionCodes: [
              '部门管理部门管理列表',
            ],
            path: '/system/department',
            name: 'route_system_department',
            component: './System/Department',
          },
          {
            permissionCodes: [
              '角色管理角色管理列表',
            ],
            path: '/system/role',
            name: 'route_system_role',
            component: './System/Role',
          },
          {
            permissionCodes: [
              '用户管理用户管理列表',
            ],
            path: '/system/account',
            name: 'route_system_account',
            component: './System/Account',
          },
          {
            permissionCodes: [
              '资源管理资源管理列表',
            ],
            path: '/system/resource',
            name: 'route_system_resource',
            component: './System/Resource',
          },
          {
            permissionCodes: [
              '权限管理权限管理列表',
            ],
            path: '/system/permission',
            name: 'route_system_permission',
            component: './System/Permission',
          },
          {
            permissionCodes: [
              '字典管理字典管理列表',
            ],
            path: '/system/dictionary',
            name: 'route_system_dictionary',
            component: './System/Dictionary',
          },
        ]
      },
      // {
      //   path: '/tag',
      //   name: 'route_tag',
      //   component: './Tag',
      // },
    ],
  },
  {
    path: '/login',
    component: './Login',
  },
  
  {
    path: '/404',
    component: './404',
  },
];

export default routes

