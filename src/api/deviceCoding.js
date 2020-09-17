import axios from '@/axios/axios.conf'
import constant from './api'

/**
 * 查询设备编码库列表
 * @param {}
 */
export function getDeviceCodingList (params) {
  return axios({
    url: constant.deviceCodingList,
    method: 'get',
    params: params
  })
}

/**
 * 新增设备编码库
 * @param {}
 */
export function addDeviceCoding (params) {
  return axios({
    url: constant.addDeviceCoding,
    method: 'post',
    data: params
  })
}

/**
 * 查询厂商列表
 * @param {}
 */
export function getManufacturerList (params) {
  return axios({
    url: constant.getManufacturerList,
    method: 'get',
    params: params
  })
}

/**
 * 查询设备型号列表
 * @param {}
 */
export function getModelList (params) {
  return axios({
    url: constant.getModelList,
    method: 'get',
    params: params
  })
}

/**
 * 新增设备型号
 * @param {}
 */
export function addDeviceModel (params) {
  return axios({
    url: constant.addDeviceModel,
    method: 'post',
    data: params
  })
}

/**
 * 新增厂商名称
 * @param {}
 */
export function addDeviceManufacturer (params) {
  return axios({
    url: constant.addDeviceManufacturer,
    method: 'post',
    data: params
  })
}

/**
 * 生成设备编号
 * @param {}
 */
export function generatorCode (params) {
  return axios({
    url: constant.generatorCode,
    method: 'get',
    params: params
  })
}
