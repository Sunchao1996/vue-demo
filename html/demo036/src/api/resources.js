import request from '@/utils/request';

export function resourcesList(data) {
  return request({
    url: '/sys/resources/list',
    method: 'get',
    params: data
  });
}

export function checkCode(data) {
  return request({
    url: '/sys/resources/checkCode',
    method: 'get',
    params: data
  });
}

export function addResource(data) {
  return request({
    url: '/sys/resources/add',
    method: 'post',
    data
  });
}

export function delResource(data) {
  return request({
    url: '/sys/resources/delete',
    method: 'get',
    params: data
  });
}

export function getResource(data) {
  return request({
    url: '/sys/resources/getById',
    method: 'get',
    params: data
  });
}

export function updateResource(data) {
  return request({
    url: '/sys/resources/update',
    method: 'post',
    data
  });
}
