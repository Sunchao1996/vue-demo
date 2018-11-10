import request from '@/utils/request';

export function rolesList(data) {
  return request({
    url: '/sys/roles/list',
    method: 'get',
    params: data
  });
}

export function addRole(data) {
  return request({
    url: '/sys/roles/add',
    method: 'post',
    data
  });
}

export function checkRoleCode(roleCode) {
  return request({
    url: '/sys/roles/checkRoleCode',
    method: 'post',
    data: {
      'roleCode': roleCode
    }
  });
}

export function delRole(roleId) {
  return request({
    url: '/sys/roles/delete',
    method: 'post',
    data: {
      'roleId': roleId
    }
  });
}

export function getRole(roleId) {
  return request({
    url: '/sys/roles/get',
    method: 'post',
    data: {
      'roleId': roleId
    }
  });
}

export function updateRole(data) {
  return request({
    url: '/sys/roles/update',
    method: 'post',
    data
  });
}
