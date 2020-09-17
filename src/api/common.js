import axios from '@/axios/axios.conf'
import constant from './api'
import qs from 'qs'

/**
 * 省市区三级联动控件
 * @param {}
 */
export function areaSelect (params) {
  return axios({
    url: constant.areaSelect,
    method: 'get',
    params: params
  })
}

/**
 * 查询区域下的驾校列表
 * @param {}
 */
export function getSchoolList (params) {
  return axios({
    url: constant.schoolList,
    method: 'get',
    params: params
  })
}

/**
 * 获取页面按钮权限信息
 * @param {}
 */
export function getBtnPermission (params) {
  return axios({
    url: constant.getBtnPermission,
    method: 'get',
    params: params
  })
}

/**
 * 获取页面按钮权限信息
 * @param {}
 */
export function fileUpload (params) {
  return axios.post(constant.fileUpload, params)
}
