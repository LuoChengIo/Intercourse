import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/zjxt-api/user/userManage/login',
    method: 'post',
    data
  })
}
export function getEncKey(data) {
  return request({
    url: '/user/userManage/getEncKey',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function passwordReset(data) { // 密码重置
  return request({
    url: '/userManage/passwordReset',
    method: 'post',
    data
  })
}
export function getFunctionList(data) { // 查询菜单列表
  return request({
    url: '/systemManage/getFunctionList ',
    method: 'post',
    data
  })
}
export function addCompany(data) { // 新增公司
  return request({
    url: '/systemManage/addCompany',
    method: 'post',
    data
  })
}
export function deleteCompany(data) { // 删除公司
  return request({
    url: '/systemManage/deleteCompany',
    method: 'post',
    data
  })
}
export function modifyCompanyInformation(data) { // 修改公司信息
  return request({
    url: '/systemManage/modifyCompanyInformation',
    method: 'post',
    data
  })
}
export function getCompanyInformation(data) { // 查询公司详细信息
  return request({
    url: '/systemManage/getCompanyInformation',
    method: 'post',
    data
  })
}
export function getCompanyList(params) { // 查询公司列表
  return request({
    url: '/systemManage/getCompanyList',
    method: 'get',
    params
  })
}
export function addUser(data) { // 新增用户
  return request({
    url: '/systemManage/addUser',
    method: 'post',
    data
  })
}
export function modifyUserInformation(data) { // 修改用户信息
  return request({
    url: '/systemManage/modifyUserInformation',
    method: 'post',
    data
  })
}
export function getUserInformation(data) { // 查询用户信息
  return request({
    url: '/systemManage/getUserInformation',
    method: 'post',
    data
  })
}
export function midifyUserStatus(data) { // 修改用户状态
  return request({
    url: '/systemManage/midifyUserStatus',
    method: 'post',
    data
  })
}
export function getUserList(data) { // 查询用户列表
  return request({
    url: '/systemManage/getUserList',
    method: 'post',
    data
  })
}
export function addRole(data) { // 新增角色
  return request({
    url: '/systemManage/addRole',
    method: 'post',
    data
  })
}
export function modifyRoleInformation(data) { // 修改角色信息
  return request({
    url: '/systemManage/modifyRoleInformation',
    method: 'post',
    data
  })
}
export function deleteRole(data) { // 删除角色信息
  return request({
    url: '/systemManage/deleteRole',
    method: 'post',
    data
  })
}
export function getRoleList(data) { // 查询角色列表
  return request({
    url: '/systemManage/getRoleList',
    method: 'post',
    data
  })
}
export function getRoleFunction(data) { // 查询角色功能列表
  return request({
    url: '/systemManage/getRoleFunction',
    method: 'post',
    data
  })
}
export function uploadImage(data) { // 上传图片
  return request({
    url: '/systemManage/uploadImage',
    method: 'post',
    data
  })
}
