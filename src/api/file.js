import axios from '@/axios/axios.conf'

// 新增
export function addFileQuestion(data) {
    return axios({
        url: '/file/addFileQuestion',
        method: 'post',
        data
    })
}

// 删除
export function delFileQuestion(data) {
    return axios({
        url: '/file/delFileQuestion',
        method: 'post',
        params: data
    })
}

// 修改
export function editFileQuestion(data) {
    return axios({
        url: '/file/editFileQuestion',
        method: 'post',
        data
    })
}

// 获取列表
export function getFileQuestion(data) {
    return axios({
        url: '/file/getFileQuestion',
        method: 'post',
        data
    })
}

// 获取详情
export function getFileQuestionById(data) {
    return axios({
        url: '/file/getFileQuestionById',
        method: 'get',
        params: data
    })
}