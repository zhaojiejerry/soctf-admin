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