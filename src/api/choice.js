import axios from '@/axios/axios.conf'

// 新增
export function addChoiceQuestion(data) {
    return axios({
        url: '/addChoiceQuestion',
        method: 'post',
        data
    })
}

// 删除
export function deleteChoiceQuestion(data) {
    return axios({
        url: '/deleteChoiceQuestion',
        method: 'post',
        params: data
    })
}

// 列表
export function getChoiceListForAdmin(data) {
    return axios({
        url: '/getChoiceListForAdmin',
        method: 'post',
        data
    })
}

// 详情
export function getOneChoiceQuestion(data) {
    return axios({
        url: '/getOneChoiceQuestion',
        method: 'post',
        params: data
    })
}

// 修改
export function modifyChoiceQuestion(data) {
    return axios({
        url: '/modifyChoiceQuestion',
        method: 'post',
        data
    })
}