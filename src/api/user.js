import axios from '@/axios/axios.conf'
import constant from './api'
import qs from 'qs'

/**
 * 用户树控件
 * @param {}
 */
export function getUserTree (params) {
  return axios({
    url: constant.getUserTree,
    method: 'get',
    params: params
  })
}

/**
 * 用户所在区域控件
 * @param {}
 */
export function getUserArea (params) {
  return axios({
    url: constant.getUserAreaList,
    method: 'get',
    params: params
  })
}

/**
 * 设备地点
 * @param {}
 */
export function getDeviceArea (params) {
  return axios({
    url: constant.getDeviceAreaList,
    method: 'get',
    params: params
  })
}

/**
 * 用户分页列表
 * @param {}
 */
export function userPageList (params) {
  return axios({
    url: constant.userPageList,
    method: 'get',
    params: params
  })
}

/**
 * 用户状态切换
 * @param {}
 */
export function userToggleStatus (params) {
  return axios({
    url: constant.userToggleStatus,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}

/**
 * 用户重置密码
 * @param {}
 */
export function userResetPassword (params) {
  return axios({
    url: constant.userResetPassword,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}

/**
 * 根据ID获取用户信息
 * @param {}
 */
export function getUserById (params) {
  return axios({
    url: params.isPersonalCenter ? constant.getPersonalById : constant.getUserById,
    method: 'get',
    params: params
  })
}

/**
 * 获取下级医院列表
 * @param {}
 */
export function getUserHospitalList (params) {
  return axios({
    url: constant.getUserHospitalList,
    method: 'get',
    params: params
  })
}

/**
 * 新建用户
 * @param {}
 */
export function addUser (params) {
  return axios({
    url: constant.addUser,
    method: 'post',
    data: params
  })
}

/**
 * 新建/修改用户
 * @param {}
 */
export function editUser (params) {
  return axios({
    url: params.isPersonalCenter ? constant.editPersonalUser : constant.editUser,
    method: 'post',
    data: params
  })
}

/**
 * 获取设备列表
 * @param {}
 */
export function getUserDeviceTree (params) {
  return axios({
    url: constant.getUserDeviceTree,
    method: 'get',
    params: params
  })
}

/**
 * 子账号分页列表
 * @param {}
 */
export function subAccountPageList (params) {
  return axios({
    url: params.isPersonalCenter ? constant.personalSubAccountPageList : constant.subAccountPageList,
    method: 'get',
    params: params
  })
}

/**
 * 子账号权限查询
 * @param {}
 */
export function getPermTree (params) {
  return axios({
    url: params.isPersonalCenter ? constant.getPersonalPermTree : constant.getPermTree,
    method: 'get',
    params: params
  })
}

/**
 * 新建子账号
 * @param {}
 */
export function addSubAccount (params) {
  return axios({
    url: constant.addSubAccount,
    method: 'post',
    data: params
  })
}

/**
 * 编辑子账号
 * @param {}
 */
export function updateSubAccount (params) {
  return axios({
    url: params.isPersonalCenter ? constant.updatePersonalSubAccount : constant.updateSubAccount,
    method: 'post',
    data: params
  })
}

/**
 * 子账号查询
 * @param {}
 */
export function getSubAccountDetail (params) {
  return axios({
    url: params.isPersonalCenter ? constant.getPersonalSubAccountDetail : constant.getSubAccountDetail,
    method: 'get',
    params: params
  })
}

export function sendSmsA (params) {
  return axios({
    url: constant.sendSmsA,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}
/**
 * 发送短信
 */
export function sendMessage (params) {
  return axios({
    url: constant.sendSmsB,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}
/**
 * 短信绑定
 */
export function checkCodeA (params) {
  return axios({
    url: constant.checkCodeA,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}
/**
 * 短信绑定
 */
export function checkCodeB (params) {
  return axios({
    url: constant.checkCodeB,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}
/**
 * 更新手机号
 */
export function editPhone (params) {
  return axios({
    url: constant.editPhone,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}
/**
 * 退款
 */
export function refundOrder (params) {
  return axios({
    url: constant.refundOrder,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}
/**
 * 操作日志列表
 */
export function getLogList (params) {
  return axios({
    url: constant.getLogList,
    method: 'get',
    params: params
  })
}
