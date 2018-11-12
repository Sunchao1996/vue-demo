import request from '@/utils/request';

export function usersList(data) {
  return request({
    url: '/sys/user/list',
    method: 'post',
    data: data
  });
}

export function usersStatusUpdate(data) {
  return request({
    url: '/sys/user/updateStatus',
    method: 'post',
    data: data
  });
}

export function usersResetPwd(data) {
  return request({
    url: '/sys/user/updateResetPwd',
    method: 'post',
    data: data
  });
}
