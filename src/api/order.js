import axios from '@/axios/axios.conf'
import constant from './api'

/**
 * 查询订单列表
 * @param {}
 */
export function getOrderList (params) {
  return axios({
    url: constant.orderList,
    method: 'get',
    params: params
  })
}

/**
 * 查询用户订单统计数据
 * @param {}
 */
export function getOrderStatistics (params) {
  return axios({
    url: constant.orderStatistics,
    method: 'get',
    params: params
  })
}

/**
 * 查询用户订单统计数据
 * @param {}
 */
export function getMerchantPayChannel (params) {
  return axios({
    url: constant.getMerchantPayChannel,
    method: 'get',
    params: params
  })
}
/**
 * 订单导出excel
 * @param {}
 */
export function exportExcel (params) {
  return axios({
    url: constant.exportExcelApi,
    method: 'get',
    params: params
  })
}
/**
 * 订单详情
 * @param {}
 */
export function getOrderDetails (params) {
  return axios({
    url: constant.orderDetails,
    method: 'get',
    params: params
  })
}
/**
 * 财务统计
 * @param {}
 */
export function getfinanceApi (params) {
  return axios({
    url: constant.finance,
    method: 'get',
    params: params
  })
}

/**
 * 对账列表
 * @param params
 */
export function getBillList (params) {
  return axios({
    url: constant.checkBill,
    method: 'get',
    params: params
  })
}
/**
 * 对账数量
 * @param params
 */
export function getBillCount (params) {
  return axios({
    url: constant.billCount,
    method: 'get',
    params: params
  })
}

/**
 * 更新异常订单
 */
export function updateBill (params) {
  return axios({
    url: constant.updateBill,
    method: 'post',
    data: params
  })
}

/**
 * 对账导出
 * @param params
 */
export function exportBill (params) {
  return axios({
    url: constant.exportBill,
    method: 'get',
    params: params
  })
}

/**
 * 业务订单分页列表
 * @param {}
 */
export function businessPageList (params) {
  return axios({
    url: constant.BusinessPageList,
    method: 'get',
    params: params
  })
}
/**
 * @param {}
 */
export function getBizOrderDetails (params) {
  return axios({
    url: constant.getBizOrderDetails,
    method: 'get',
    params: params
  })
}
/**
 * 获取关联交易记录
 */
export function getOrdersByReportId (params) {
  return axios({
    url: constant.getOrdersByReportId,
    method: 'get',
    params: params
  })
}
export function exportBusinessExcel (params) {
  return axios({
    url: constant.exportBusinessExcel,
    method: 'get',
    params: params
  })
}
