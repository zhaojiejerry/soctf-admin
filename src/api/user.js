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
    method: 'post',
    data
  })
}
/**
 * 用户树控件
 * @param {}
 */
export function getUserTree(params) {
  return axios({
    url: '',
    method: 'get',
    params: params
  })
}

/**
 * 用户所在区域控件
 * @param {}
 */
export function getUserArea(params) {
  return axios({
    url: '',
    method: 'get',
    params: params
  })
}

/**
 * 用户分页列表
 * @param {}
 */
export function userPageList(params) {
  return axios({
    url: '',
    method: 'get',
    params: params
  })
}

/**
 * 用户状态切换
 * @param {}
 */
export function userToggleStatus(params) {
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

/**
 * 新建/修改用户
 * @param {}
 */
export function editUser(params) {
  return axios({
    url: '/sys/modifyUser',
    method: 'post',
    data: params
  })
}
