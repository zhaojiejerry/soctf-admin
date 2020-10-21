import axios from '@/axios/axios.conf'

/**
 * 登录
 * @param {object} params
 */
// 账号密码登录
export function login(data) {
    return axios({
        url: '/sys/loginByName',
        method: 'post',
        data
    })
}

// 获取图片验证码
export function getLoginCode() {
    return axios({
        url: '/sys/picVerificationCode',
        method: 'get',
        responseType: 'arraybuffer'
    })
}

// 用户关联角色
export function linkUserRole(data) {
    return axios({
        url: '/sys/linkUserRole',
        method: 'post',
        data
    })
}

// 获取用户列表
export function getUserInfoList(data) {
    return axios({
        url: '/sys/getUserInfoList',
        method: 'post',
        data
    })
}

// 获取团队列表
export function getTeamInfoListForPage(data) {
    return axios({
        url: '/team/getTeamInfoListForPage',
        method: 'post',
        data
    })
}

// 获取团队列表
export function deleteUser(data) {
    return axios({
        url: '/sys/deleteUser',
        method: 'get',
        params: data
    })
}

// 获取用户详情
export function getOneUserInfo(data) {
    return axios({
        url: '/sys/getOneUserInfo',
        method: 'get',
        params: data
    })
}

// 修改用户
export function modifyUser(data) {
    return axios({
        url: '/sys/modifyUser',
        method: 'post',
        data
    })
}

// 获取手机验证码
// bizTyp:register-注册，login-登录，modifyPwd-修改密码
// phoneNumber:手机号
export function getMobileCode(data) {
    return axios({
        url: '/sys/sendSmsCodeMy',
        method: 'post',
        data
    })
}

// 重置密码
export function resetPassword(data) {
    return axios({
        url: '/sys/resetPassword',
        method: 'post',
        data
    })
}

/**
 * 用户树控件
 * @param {}
 */
export function getUserTree(data) {
    return axios({
        url: '/sys/getPermissionTreeVoByUserId',
        method: 'get',
        params: data
    })
}

/**
 * 新建用户
 * @param {}
 */
export function addUser(params) {
    return axios({
        url: '/sys/addUser',
        method: 'post',
        data: params
    })
}

// 历史战绩 - 题目列表
export function getHistoricalRecords(data) {
    return axios({
        url: '/career/getHistoricalRecords',
        method: 'post',
        data
    })
}

// 总览数据
export function getOverviewForUser(data) {
    return axios({
        url: '/career/getOverviewForUser',
        method: 'get',
        params: data
    })
}

// 历史记录 - 个人技能雷达图
export function getPersonalSkillRadarChart(data) {
    return axios({
        url: '/career/getPersonalSkillRadarChart',
        method: 'post',
        data
    })
}

// 排行榜
export function getRankingList(data) {
    return axios({
        url: '/career/getRankingListForPage',
        method: 'post',
        data
    })
}

// 获取武器库列表
export function getWeaponListForPage(data) {
    return axios({
        url: '/Weapon/getWeaponListForPage',
        method: 'post',
        data
    })
}

// 查看武器库详情
export function getOneWeaponToolInfo(data) {
    return axios({
        url: '/Weapon/getOneWeaponToolInfo',
        method: 'get',
        params: data
    })
}

// 荣誉
export function HistoricalHonor(data) {
    return axios({
        url: '/career/HistoricalHonor',
        method: 'post',
        data
    })
}

// 比赛记录
export function getCompetitionRecord(data) {
    return axios({
        url: '/career/getCompetitionRecord',
        method: 'post',
        data
    })
}

// 比赛记录
export function hideUserScore(data) {
    return axios({
        url: '/hideUserScore',
        method: 'get',
        params: data
    })
}

// 加分
export function addScoreToUser(data) {
    return axios({
        url: '/career/addScoreToUser',
        method: 'post',
        data
    })
}