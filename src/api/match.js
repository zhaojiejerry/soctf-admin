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