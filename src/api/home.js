import axios from '@/axios/axios.conf'
import constant from './api'

/**
 * 首页测试接口
 * @param {}
 */
export function testUser (params) {
  return axios({
    url: constant.testPost,
    method: 'post',
    data: params
  })
}
