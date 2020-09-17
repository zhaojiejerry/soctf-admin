import axios from '@/axios/axios.conf'
import constant from './api'
import qs from 'qs'

/**
 * 登录
 * @param {object} params
 */
export function login (params) {
  return axios({
    url: constant.login,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}

/**
 * 登出
 * @param {}
 */
export function logout (data) {
  return axios({
    url: constant.logout,
    method: 'post',
    data: data
  })
}

/**
 * 用户信息
 * @param {}
 */
export function getInfo (params) {
  return axios({
    url: constant.getUserInfo,
    method: 'get',
    params: params
  })
}

/**
 * 菜单列表
 * @param {}
 */
export function menuList (params) {
  return axios({
    url: constant.getMenuList,
    method: 'get',
    params: params
  })
}

/**
 * 修改密码
 * @param {string} username
 * @param {string} oldPassword
 * @param {string} newPassword
*/

export function editPassword (params) {
  return axios({
    url: constant.editPassword,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}

/**
* 获取签字签章
* @param {string} username
*/
export function getSign (params) {
  return axios({
    url: constant.getSign,
    method: 'get',
    params: params
  })
}

/**
* 修改签字签章
* @param {string} username
* @param {string} userSign
* @param {string} hospitalSign
*/

export function updateSign (params) {
  return axios({
    url: constant.updateSign,
    method: 'post',
    data: params
  })
}
