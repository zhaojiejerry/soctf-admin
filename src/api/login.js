import axios from '@/axios/axios.conf'
import constant from './api'
import qs from 'qs'
/**
 * 登录
 * @param {object} params
 */
// 账号密码登录
export function login(data) {
    return axios({
        url: '/sys/loginByName',
        method: 'post',
        data
    })
}

// 获取图片验证码
export function getLoginCode() {
    return axios({
        url: '/sys/picVerificationCode',
        method: 'get',
        responseType: 'arraybuffer'
    })
}

/**
 * 登出
 * @param {}
 */
export function logout(data) {
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
export function getInfo(params) {
    return axios({
        url: constant.getUserInfo,
        method: 'get',
        params: params
    })
}