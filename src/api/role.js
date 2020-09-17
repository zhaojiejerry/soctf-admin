import axios from '@/axios/axios.conf'
import constant from './api'
import qs from 'qs'

/**
 * 角色列表
 * @param {}
 */
export function roleList (params) {
  return axios({
    url: constant.roleList,
    method: 'get',
    params: params
  })
}

/**
 * 删除角色
 * @param {}
 */
export function roleDelete (params) {
  return axios({
    url: constant.roleDelete,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}

/**
 * 根据ID获取角色信息
 * @param {}
 */
export function getRoleById (params) {
  return axios({
    url: constant.getRoleById,
    method: 'get',
    params: params
  })
}

/**
 * 角色ID获取权限树
 * @param {}
 */
export function getRoleTree (params) {
  return axios({
    url: constant.getRoleTree,
    method: 'get',
    params: params
  })
}

/**
 * 新建/修改角色
 * @param {}
 */
export function editRole (params) {
  return axios({
    url: constant.editRole,
    method: 'post',
    data: params
  })
}
