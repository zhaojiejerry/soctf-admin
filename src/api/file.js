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

// 答题结果明细
export function getRstDetail(data) {
    return axios({
        url: '/file/getFileRstDetailByQuestion',
        method: 'post',
        data
    })
}

// 答题情况统计
export function getStatistics(data) {
    return axios({
        url: '/file/getFileStatisticsByQuestion',
        method: 'get',
        params: data
    })
}

// 详情
export function getFileQuestionAndStatus(data) {
    return axios({
        url: '/file/getFileQuestionAndStatusById2',
        method: 'post',
        data
    })
}

// [个人竞赛] 开始做附件题 生成url
export function indComNewFile(data) {
    return axios({
        url: '/file/indComNewFile',
        method: 'post',
        data,
        hideloading: true
    })
}

// [个人竞赛] 放弃提交答案 0 分
export function fileIndComRenounce(data) {
    return axios({
        url: '/file/indComRenounce',
        method: 'post',
        data
    })
}

// [个人竞赛] 提交答案
export function fileIndComSubmitAnswers(data) {
    return axios({
        url: '/file/indComSubmitAnswers',
        method: 'post',
        data
    })
}

// [团队竞赛] 开始做附件题 生成url
export function teamComNewFile(data) {
    return axios({
        url: '/file/teamComNewFile',
        method: 'post',
        data,
        hideloading: true
    })
}

// [团队竞赛] 放弃提交答案， 直接关闭附件， 0 分
export function fileTeamComRenounce(data) {
    return axios({
        url: '/file/teamComRenounce',
        method: 'post',
        data
    })
}

// [团队竞赛] 提交答案
export function teamSubmitAnswers(data) {
    return axios({
        url: '/file/teamComSubmitAnswers',
        method: 'post',
        data
    })
}