import axios from '@/axios/axios.conf'
import constant from './api'

/**
 * 查询模板列表
 * @param {}
 */
export function getTemplateList (params) {
  return axios({
    url: constant.templateList,
    method: 'get',
    params: params
  })
}

/**
 * 新增、更新模板
 * @param {}
 */
export function editTemplate (params) {
  return axios({
    url: constant.editTemplate,
    method: 'post',
    data: params
  })
}

/**
 * 查询模板详情
 * @param {}
 */
export function getTemplateDetail (params) {
  return axios({
    url: constant.templateDetail,
    method: 'get',
    params: params
  })
}
