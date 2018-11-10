import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'
import router from  '@/router'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: 'http://localhost:8080', // api 的 base_url
  timeout: 500000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error)
  }
);

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data;
    console.log(res);
    if (res.success !== true) {
      console.log("res");
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      });
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.returnCode === 50008 || res.returnCode === 50012 || res.returnCode === 50014) {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('err')
    } else {
      response.data = response.data.data;
      return response;
    }
  },
  err => {
    // 当响应异常时做一些处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误(400)';
          break;
        case 401:
          err.message = '未授权，请重新登录(401)';
          break;
        case 403:
          err.message = '拒绝访问(403)';
          break;
        case 404:
          err.message = '请求出错(404)';
          break;
        case 408:
          err.message = '请求超时(408)';
          break;
        case 500:
          err.message = '服务器错误(500)';
          break;
        case 501:
          err.message = '服务未实现(501)';
          break;
        case 502:
          err.message = '网络错误(502)';
          break;
        case 503:
          err.message = '服务不可用(503)';
          break;
        case 504:
          err.message = '网络超时(504)';
          break;
        case 505:
          err.message = 'HTTP版本不受支持(505)';
          break;
        default:
          err.message = `连接出错(${err.response.status})!`;
      }
    } else {
      err.message = '连接服务器失败!'
    }
    console.log('err' + err); // for debug
    Message({
      message: err.message,
      type: 'error',
      duration: 5 * 1000
    });
    if(err.response.status===401){
      router.push({path: '/401', replace: true, query: {noGoBack: true}});
    }
    return Promise.reject('err');
  }
);

export default service
