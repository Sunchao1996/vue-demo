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

export function checkUserName(data) {
  return request({
    url: '/sys/user/checkUserCode',
    method: 'post',
    data: {
      userName: data
    }
  });
}

export function saveUser(data) {
  return request({
    url: '/sys/user/addUser',
    method: 'post',
    data
  });
}

export function deleteUser(id) {
  return request({
    url: '/sys/user/deleteUser',
    method: 'post',
    data: {
      id: id
    }
  });
}

export function getUserById(id) {
  return request({
    url: '/sys/user/getById',
    method: 'post',
    data: {
      id: id
    }
  });
}

export function updateUser(data) {
  return request({
    url: '/sys/user/updateUser',
    method: 'post',
    data: data
  });
}

export function updateUserPwd(data) {
  return request({
    url: '/sys/user/updateUserPwd',
    method: 'post',
    data: data
  });
}
