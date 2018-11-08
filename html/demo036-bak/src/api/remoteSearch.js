import request from '@/utils/request'

export function userSearch(name) {
  return request({
    url: 'http://localhost:8080/search/user',
    method: 'get',
    params: { name }
  })
}
