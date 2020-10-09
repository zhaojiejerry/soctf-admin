import axios from '@/axios/axios.conf'

// 添加公告
export function addNotice(data) {
    return axios({
        url: '/addNotice',
        method: 'post',
        data
    })
}

// 删除公告
export function delNoticeById(data) {
    return axios({
        url: '/delNoticeById',
        method: 'delete',
        params: data
    })
}

// 管理员端公告列表
export function getNoticeListForAdmin(data) {
    return axios({
        url: '/getNoticeListForAdmin',
        method: 'post',
        data
    })
}

// 修改公告
export function updNotice(data) {
    return axios({
        url: '/updNotice',
        method: 'post',
        data
    })
}

// 获取公告详情
export function getNoticeDetails(data) {
    return axios({
        url: '/getNoticeDetails',
        method: 'get',
        params: data
    })
}