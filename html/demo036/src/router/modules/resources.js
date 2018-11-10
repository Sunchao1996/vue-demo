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
      path: 'user/index',
      name: 'User',
      component: () => import('@/views/resources/index'),
      //permissionName为该资源的代码，如果不需要进行权限控制则为空或者不设置meta
      meta: {title: 'user', icon: 'user', noCache: true, permissionName: 'User'}
    },
  ]
};
export default resourcesMap;
