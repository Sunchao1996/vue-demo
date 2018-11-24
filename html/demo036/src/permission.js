import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {getToken} from '@/utils/auth' // getToken from cookie

NProgress.configure({showSpinner: false});// NProgress Configuration

// permission judge function
function hasPermission(rolesResources, route) {
  if (rolesResources.roles.indexOf('admin') >= 0) return true; // admin permission passed directly
  if (route.name === undefined) {
    return true;
  } else {
    if (route.meta === {}) {
      for (let temp of store.getters.permission_routers) {
        if (temp.name !== undefined && temp.name === route.name) {
          return true;
        }
      }
      return false;
    }else{
      return rolesResources.resources.indexOf(route.meta.permissionName) > -1;
    }
  }
}

const whiteList = ['/login', '/auth-redirect'];// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    //登录不校验
    if (to.path === '/login') {
      next({path: '/'});
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const resources = res.data.resources + ''; // note: roles must be a array! such as: ['editor','develop']
          const roles = res.data.roles;
          store.dispatch('GenerateRoutes', {roles: roles, resources: resources}).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            next({...to, replace: true}) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again');
            next({path: '/'})
          })
        })
      } else {
        console.log("userinfo now");
        console.log(to);
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        const roles = store.getters.roles;
        const resources = store.getters.resources;

        if (hasPermission({roles, resources}, to)) {
          next()
        } else {
          next({path: '/401', replace: true, query: {noGoBack: true}})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done() // finish progress bar
});
