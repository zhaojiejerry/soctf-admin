import axios from '@/axios/axios.conf'

// 获取竞赛列表
export function getGameInfoListForPage(data) {
    return axios({
        url: '/game/getGameInfoListForPage',
        method: 'post',
        data
    })
}

// 删除
export function deleteGame(data) {
    return axios({
        url: '/game/deleteGame',
        method: 'get',
        params: data
    })
}

// 新增
export function addGameInfo(data) {
    return axios({
        url: '/game/addGameInfo',
        method: 'post',
        data
    })
}

// 结束
export function endGame(data) {
    return axios({
        url: '/game/endGame',
        method: 'get',
        params: data
    })
}

// 查看详情
export function getGameInfoDetail(data) {
    return axios({
        url: '/game/getGameInfoDetail',
        method: 'post',
        params: data
    })
}

// 修改
export function modifyGameInfo(data) {
    return axios({
        url: '/game/modifyGameInfo',
        method: 'post',
        data
    })
}

// 发布
export function startGame(data) {
    return axios({
        url: '/game/startGame',
        method: 'get',
        params: data
    })
}