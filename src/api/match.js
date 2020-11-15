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

// 发送赛事密钥短信
export function sendGameToken(data) {
    return axios({
        url: '/sys/sendGameToken',
        method: 'get',
        params: data
    })
}

// 查看竞赛试卷简略信息(本场竞赛题目集合)
export function getPaperInfoForGame(data) {
    return axios({
        url: '/getPaperInfoForGame',
        method: 'get',
        params: data
    })
}

// 删除试题
export function deleteQuestions(data) {
    return axios({
        url: '/deleteQuestions',
        method: 'post',
        data
    })
}

// 获取详情
export function getUserInfosByGame(data) {
    return axios({
        url: '/game/getUserInfosByGame',
        method: 'get',
        params: data
    })
}

// 获取直播折线图
export function directSeeding(data) {
    return axios({
        url: '/game/directSeeding',
        method: 'get',
        params: data
    })
}

// 解题总榜
export function getRankingListForPage(data) {
    return axios({
        url: '/game/getRankingListForPage',
        method: 'post',
        data
    })
}

// 解题总榜表头
export function getRankingListForTop(data) {
    return axios({
        url: '/game/getRankingListForTop',
        method: 'get',
        params: data
    })
}

// 中断竞赛
export function breakGame(data) {
    return axios({
        url: '/game/breakGame',
        method: 'get',
        params: data
    })
}

// 获取作弊列表
export function getCheat(data) {
    return axios({
        url: '/game/getCheat',
        method: 'post',
        data
    })
}

// 用户提交记录
export function getEndReportList(data) {
    return axios({
        url: '/game/getEndReportList',
        method: 'post',
        data
    })
}

// 排行榜导出
export function exportRankingList(data) {
    return axios({
        url: '/game/exportRankingList',
        method: 'get',
        responseType: 'blob',
        params: data
    })
}