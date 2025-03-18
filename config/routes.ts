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
        path: '/task',
        name: 'route_task_manage',
        // permissionCodes: [
        //   '任务管理',
        //   '任务管理列表',
        //   '任务看板'
        // ],
        routes: [
          {
            path: '/task/manage',
            name: 'route_task_list',
            permissionCodes: [
              '任务管理任务管理列表',
            ],
            component: './Task/Manage',
          },
          {
            path: '/task/dashboard',
            name: 'route_task_dashboard',
            permissionCodes: [
              '任务管理任务看板',
            ],
            component: './Task/Dashboard',
          },
        ]
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
        ]
      },
      {
        path: '/tag',
        name: 'route_tag',
        component: './Tag',
      },
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

