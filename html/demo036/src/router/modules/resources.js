import Layout from '@/views/layout/Layout'

const resourcesMap = {
  path: '/sys',
  component: Layout,
  meta: {title: 'sysManage', icon: 'peoples', noCache: true, permissionName: 'Sys'},
  children: [
    {
      path: 'resources/index',
      name: 'Resources',
      component: () => import('@/views/resources/index'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'resources', icon: 'edit', noCache: true, permissionName: 'Resources'}
    },
    {
      hidden: true,
      path: 'resources/add',
      component: () => import('@/views/resources/components/add'),
      name: 'ResourcesAdd',
      meta: {permissionName: 'ResourcesAdd', title: 'resourcesAdd'}
    },
    {
      hidden: true,
      path: 'resources/update',
      component: () => import('@/views/resources/components/update'),
      name: 'ResourcesUpdate',
      meta: {permissionName: 'ResourcesUpdate', title: 'resourcesUpdate'}
    },
    {
      path: 'users/index',
      name: 'Users',
      component: () => import('@/views/users/index'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'users', icon: 'user', noCache: true, permissionName: 'Users'}
    },
    {
      path: 'roles/index',
      name: 'Roles',
      component: () => import('@/views/roles/index'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'roles', icon: 'role', noCache: true, permissionName: 'Roles'}
    },
    {
      hidden: true,
      path: 'roles/add',
      component: () => import('@/views/roles/components/add'),
      name: 'RolesAdd',
      meta: {permissionName: 'RolesAdd', title: 'rolesAdd'}
    },
    {
      hidden: true,
      path: 'users/add',
      component: () => import('@/views/users/components/add'),
      name: 'UsersAdd',
      meta: {permissionName: 'UsersAdd', title: 'usersAdd'}
    },
    {
      hidden: true,
      path: 'roles/update',
      component: () => import('@/views/roles/components/update'),
      name: 'RolesUpdate',
      meta: {permissionName: 'RolesUpdate', title: 'rolesUpdate'}
    },
    {
      hidden: true,
      path: 'users/update',
      component: () => import('@/views/users/components/update'),
      name: 'UsersUpdate',
      meta: {permissionName: 'UsersUpdate', title: 'usersUpdate'}
    },
    {
      hidden: true,
      path: 'users/updatePwd',
      component: () => import('@/views/users/components/updatePwd'),
      name: 'UsersUpdatePwd',
      meta: {title: 'usersUpdatePwd'}
    }
  ]
};
export default resourcesMap;
