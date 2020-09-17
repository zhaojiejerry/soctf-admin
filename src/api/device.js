import axios from '@/axios/axios.conf'
import constant from './api'
import qs from 'qs'

/**
 * 查询设备列表
 * @param {}
 */
export function getDeviceList (params) {
  return axios({
    url: constant.deviceList,
    method: 'get',
    params: params
  })
}

/**
 * 删除设备
 * @param {}
 */
export function deleteDevice (params) {
  return axios({
    url: constant.deleteDevice,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}
export function deviceDisable (params) {
  return axios({
    url: constant.deviceDisable,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}
export function deviceEnable (params) {
  return axios({
    url: constant.deviceEnable,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}

/**
 * 设备详情
 * @param {}
 */
export function deviceDetail (params) {
  return axios({
    url: constant.deviceDetail,
    method: 'get',
    params: params
  })
}

/**
 * 新增、更新设备
 * @param {}
 */
export function updateDevice (params) {
  return axios({
    url: constant.updateDevice,
    method: 'post',
    data: params
  })
}

/**
 * 远程开关机
 * @param {}
 */
export function deviceRemoteControl (params) {
  return axios({
    url: constant.deviceRemoteControl,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}

/**
 * 获取设备统计数据
 * @param {}
 */
export function getDeviceStatistics () {
  return axios({
    url: constant.getDeviceStatistics,
    method: 'get'
  })
}
/**
 * 视频播放心跳
 * @param {}
 */
export function startStream (params) {
  return axios({
    url: constant.startStream,
    method: 'post',
    data: params
  })
}
