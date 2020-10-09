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

// 生成试卷
export function createPaperInfo(data) {
    return axios({
        url: '/createPaperInfoForGame',
        method: 'post',
        data
    })
}

// 获取赛事文档（type=1 -> 赛事说明文档；type=2 -> 赛事积分文档）
export function getGameOssFile(data) {
    return axios({
        url: '/game/getGameOssFile',
        method: 'get',
        params: data
    })
}

// 竞赛排行榜
export function getRankingList(data) {
    return axios({
        url: '/game/getRankingList',
        method: 'get',
        params: data,
        hideloading: true
    })
}

// 获取公告列表 接口中type区别：1公告，2直播，3系统，4奖励
export function getIndexNotice(data) {
    return axios({
        url: '/getNoticeListForUser',
        method: 'post',
        data,
        hideloading: true
    })
}

// 竞赛成绩落库
export function rankingInDB(data) {
    return axios({
        url: '/game/rankingInDB',
        method: 'get',
        params: data
    })
}

// 获取竞赛分数展示
export function getScoreViewList(data) {
    return axios({
        url: '/getScoreViewList',
        method: 'get',
        params: data
    })
}

// 修改最终竞赛成绩（管理端，按照需求修改完成题目分数后，提交全部题目分数列表）
export function modifyContestFinalScore(data) {
    return axios({
        url: '/modifyContestFinalScore',
        method: 'post',
        data
    })
}

// 隐藏 / 显示用户竞赛成绩
export function hideContestUserScore(data) {
    return axios({
        url: '/hideContestUserScore',
        method: 'get',
        params: data
    })
}