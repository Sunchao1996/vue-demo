import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  };
  return request({
    url: 'http://localhost:8080/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'http://localhost:8080/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: 'http://localhost:8080/user/info',
    method: 'get',
    params: { token }
  })
}

