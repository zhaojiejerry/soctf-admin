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
        method: 'get',
        params: data
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

// 答题结果明细
export function getRstDetail(data) {
    return axios({
        url: '/docker/getDockerRstDetailByQuestion',
        method: 'post',
        data
    })
}

// 答题情况统计
export function getStatistics(data) {
    return axios({
        url: '/docker/getDockerStatisticsByQuestion',
        method: 'get',
        params: data
    })
}

// 详情
export function getDockerQuestionAndStatus(data) {
    return axios({
        url: '/docker/getDockerQuestionAndStatusById2',
        method: 'post',
        data
    })
}

// [个人竞赛]开始做容器题 生成url
export function indComNewContainer(data) {
    return axios({
        url: '/docker/indComNewContainer',
        method: 'post',
        data,
        hideloading: true
    })
}

// [个人竞赛]放弃提交答案，直接关闭容器，0分
export function indComRenounce(data) {
    return axios({
        url: '/docker/indComRenounce',
        method: 'post',
        data
    })
}

// [个人竞赛] 提交答案
export function indComSubmitAnswers(data) {
    return axios({
        url: '/docker/indComSubmitAnswers',
        method: 'post',
        data
    })
}

// [团队竞赛] 开始做容器题 生成url
export function teamComNewContainer(data) {
    return axios({
        url: '/docker/teamComNewContainer',
        method: 'post',
        data,
        hideloading: true
    })
}

// [团队竞赛] 放弃提交答案， 直接关闭容器， 0 分
export function teamComRenounce(data) {
    return axios({
        url: '/docker/teamComRenounce',
        method: 'post',
        data
    })
}

// [团队竞赛] 提交答案
export function teamComSubmitAnswers(data) {
    return axios({
        url: '/docker/teamComSubmitAnswers',
        method: 'post',
        data
    })
}