import axios from '@/axios/axios.conf'
import qs from 'qs'

/**
 * 登录
 * @param {object} params
 */
// 账号密码登录
export function login(data) {
  return axios({
    url: '/sys/loginByName',
    method: 'post',
    data
  })
}

// 获取图片验证码
export function getLoginCode() {
  return axios({
    url: '/sys/picVerificationCode',
    method: 'get',
    responseType: 'arraybuffer'
  })
}

/**
 * 用户信息
 * @param {}
 */
export function getInfo(params) {
  return axios({
    url: '',
    method: 'get',
    params: params
  })
}

// 获取用户列表
export function getUserInfoList(data) {
  return axios({
    url: '/sys/getUserInfoList',
    method: 'post',
    data
  })
}

// 获取团队列表
export function getTeamInfoListForPage(data) {
  return axios({
    url: '/team/getTeamInfoListForPage',
    method: 'post',
    data
  })
}

// 获取团队列表
export function deleteUser(data) {
  return axios({
    url: '/sys/deleteUser',
    method: 'get',
    params: data
  })
}

// 获取用户详情
export function getOneUserInfo(data) {
  return axios({
    url: '/sys/getOneUserInfo',
    method: 'get',
    params: data
  })
}

// 修改用户
export function modifyUser(data) {
  return axios({
    url: '/sys/modifyUser',
    method: 'post',
    data
  })
}

// 获取手机验证码
// bizTyp:register-注册，login-登录，modifyPwd-修改密码
// phoneNumber:手机号
export function getMobileCode(data) {
  return axios({
    url: '/sys/sendSmsCodeMy',
    method: 'post',
    data
  })
}

export function resetPassword(data) {
  return axios({
    url: '/sys/resetPassword',
    method: 'post',
    data
  })
}

/**
 * 用户树控件
 * @param {}
 */
export function getUserTree(data) {
  return axios({
    url: '',
    method: 'get',
    params: data
  })
}

/**
 * 用户所在区域控件
 * @param {}
 */
export function getUserArea(data) {
  return axios({
    url: '',
    method: 'get',
    params: data
  })
}

/**
 * 用户分页列表
 * @param {}
 */
export function userPageList(data) {
  return axios({
    url: '',
    method: 'get',
    params: data
  })
}

/**
 * 用户状态切换
 * @param {}
 */
export function userToggleStatus(data) {
  return axios({
    url: '',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

/**
 * 用户重置密码
 * @param {}
 */
export function userResetPassword(params) {
  return axios({
    url: '',
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
export function getUserById(params) {
  return axios({
    url: '',
    method: 'get',
    params: params
  })
}

/**
 * 新建用户
 * @param {}
 */
export function addUser(params) {
  return axios({
    url: '/sys/addUser',
    method: 'post',
    data: params
  })
}
