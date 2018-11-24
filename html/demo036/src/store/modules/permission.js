import {asyncRouterMap, constantRouterMap} from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(resources, route) {
  if (route.meta && route.meta.permissionName !== undefined) {
    return resources.indexOf(route.meta.permissionName) > -1;
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, resources) {
  const res = [];
  routes.forEach(route => {
    const tmp = {...route};
    if (hasPermission(resources, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, resources)
      }
      res.push(tmp)
    }
  });

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const roles = data.roles;
        const resources = data.resources;
        let accessedRouters;
        if (roles.includes('admin')) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, resources)
        }
        commit('SET_ROUTERS', accessedRouters);
        resolve()
      })
    }
  }
};

export default permission
