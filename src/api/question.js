import axios from '@/axios/axios.conf'

// 获取问题列表
export function getWriteUpForPage(data) {
    return axios({
        url: '/writeup/getWriteUpForPage',
        method: 'post',
        data
    })
}

// 删除
export function deleteWriteUp(data) {
    return axios({
        url: '/writeup/deleteWriteUp',
        method: 'get',
        params: data
    })
}

// 修改
export function modifyWriteUp(data) {
    return axios({
        url: '/writeup/modifyWriteUp',
        method: 'post',
        data
    })
}

// 新增
export function addWriteUp(data) {
    return axios({
        url: '/writeup/addWriteUp',
        method: 'post',
        data
    })
}

// 查看详情
export function getQuestionWriteUp(data) {
    return axios({
        url: '/writeup/getQuestionWriteUp',
        method: 'get',
        params: data
    })
}