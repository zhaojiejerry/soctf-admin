import axios from '@/axios/axios.conf'

// 添加武器库
export function addWeaponTool(data) {
    return axios({
        url: '/Weapon/addWeaponTool',
        method: 'post',
        data
    })
}

// 删除武器库
export function deleteWeaponTool(data) {
    return axios({
        url: '/Weapon/deleteWeaponTool',
        method: 'get',
        params: data
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

// 获取武器库列表
export function getWeaponListForPage(data) {
    return axios({
        url: '/Weapon/getWeaponListForPage',
        method: 'post',
        data
    })
}

// 修改权限
export function updateWeaponTool(data) {
    return axios({
        url: '/Weapon/updateWeaponTool',
        method: 'post',
        data
    })
}