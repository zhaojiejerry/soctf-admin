import axios from '@/axios/axios.conf'

// 新增
export function addDockerQuestion(data) {
    return axios({
        url: '/docker/addDockerQuestion',
        method: 'post',
        data
    })
}

// 删除
export function delDockerQuestion(data) {
    return axios({
        url: '/docker/delDockerQuestion',
        method: 'delete',
        params: data
    })
}

// 修改
export function editDockerQuestion(data) {
    return axios({
        url: '/docker/editDockerQuestion',
        method: 'post',
        data
    })
}

// 详情
export function getDockerQuestionById(data) {
    return axios({
        url: '/docker/getDockerQuestionById',
        method: 'post',
        data
    })
}

// 列表
export function getDockerQuestion(data) {
    return axios({
        url: '/docker/getDockerQuestion',
        method: 'post',
        data
    })
}