import axios from '@/axios/axios.conf'
import constant from './api'
import qs from 'qs'

/**
 * 体检单分页列表
 * @param {}
 */
export function healthPageList (params) {
  return axios({
    url: constant.healthList,
    method: 'get',
    params: params
  })
}

/**
 * 照相单分页列表
 * @param {}
 */
export function photoPageList (params) {
  return axios({
    url: constant.photoPageList,
    method: 'get',
    params: params
  })
}

/**
 * 体检单上传（发送信息）
 * @param {}
 */
export function healthUpload (params) {
  return axios({
    url: constant.healthUpload,
    method: 'get',
    params: params
  })
}

/**
 * 生成预览体检报告
 * @param {}
 */
export function healthPreview (params) {
  return axios({
    url: constant.healthPreview,
    method: 'get',
    params: params
  })
}

/**
 * 体检单详情
 * @param {}
 */
export function getHealthById (params, isPlatform) {
  return axios({
    url: isPlatform ? constant.getPlatformHealthById : constant.getHealthById,
    method: 'get',
    params: params
  })
}

/**
 * 体检单上（下）一单
 * @param {}
 */
export function getNextHealth (params) {
  return axios({
    url: constant.getNextHealth,
    method: 'get',
    params: params
  })
}

/**
 * 体检单审核
 * @param {}
 */
export function healthCheck (params, isPlatform) {
  return axios({
    url: isPlatform ? constant.platformHealthCheck : constant.healthCheck,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}
/**
 * 体检单更新
 * @param {}
 */
export function updateHealthInfo (params) {
  return axios({
    url: constant.updateHealthInfo,
    method: 'post',
    data: params
  })
}
/**
 * 导出六合一
 * @param {}
 */
export function exportSixOne (params) {
  return axios({
    url: constant.exportSixOne,
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}
/**
 * 获取历史视频播放地址
 * @param {}
 */
export function getHistoryVideo (params) {
  return axios({
    url: constant.getHistoryVideo,
    method: 'get',
    params: params
  })
}

/**
 * 获取体检数据统计
 * @param {}
 */
export function getHealthReportStatistics () {
  return axios({
    url: constant.getHealthReportStatistics,
    method: 'get'
  })
}
/**
 * 获取待审核列表
 * @param {}
 */
export function getReviewList (params) {
  return axios({
    url: constant.reviewList,
    method: 'post',
    params: params
  })
}
/**
 * 审核工作台-体检单审核状态查询
 * @param {}
 */
export function getCurrentCheckState (params) {
  return axios({
    url: constant.currentCheckState,
    method: 'get',
    params: params
  })
}
/**
 * 审核工作台-体检单新订单语音提示开关
 * @param {}
 */
export function toggleWaitCheckNoice (params) {
  return axios({
    url: constant.toggleWaitCheckNoice,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  })
}
/**
 * web-待审核提醒
 * @param {}
 */
export function getWaitCheck (params) {
  return axios({
    url: constant.getWaitCheck,
    method: 'get',
    params: params
  })
}
/**
 * 根据用户id获取设备列表
 * @param {*} params
 */
export function getDeviceListByUserId (params) {
  return axios({
    url: constant.getDeviceListByUserId,
    method: 'get',
    params: params
  })
}
