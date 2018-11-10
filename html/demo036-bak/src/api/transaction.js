import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'http://localhost:8080/transaction/list',
    method: 'get',
    params: query
  })
}
