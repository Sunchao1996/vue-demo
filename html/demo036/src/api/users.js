import request from '@/utils/request';

export function usersList(data) {
  return request({
    url: '/sys/user/list',
    method: 'post',
    data:data
  });
}

