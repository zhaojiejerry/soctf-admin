import axios from '@/axios/axios.conf'
import constant from './api'
import qs from 'qs'

/**
 * @param {}
 */
export function getOfflineList (params) {
  return axios({
    url: constant.getOfflineList,
    method: 'get',
    params: params
  })
}
export function getOfflineDetail (params) {
  return axios({
    url: constant.getOfflineDetail,
    method: 'get',
    params: params
  })
}
export function offlineUpload (params) {
  return axios({
    url: constant.offlineUpload,
    method: 'post',
    params: params
  })
}
export function offlineSave (params) {
  return axios({
    url: constant.offlineSave,
    method: 'post',
    data: params
  })
}
export function offlineEdit (params) {
  return axios({
    url: constant.editInfo,
    method: 'post',
    data: params
  })
}
export function paresAddress (params) {
  return axios({
    url: constant.parseAdd,
    method: 'get',
    params: params
  })
}
export function querySchool (params) {
  return axios({
    url: constant.querySchool,
    method: 'get',
    params: params
  })
}
