import axios from '@/axios/axios.conf'

// 新增菜单
export function addPermission(data) {
    return axios({
        url: '/sys/addPermission',
        method: 'post',
        data
    })
}

// 删除菜单
export function deletePermission(data) {
    return axios({
        url: '/sys/deletePermission',
        method: 'get',
        params: data
    })
}

// 查询菜单详情
export function getOnePermission(data) {
    return axios({
        url: '/sys/getOnePermission',
        method: 'get',
        params: data
    })
}

// 关联角色和菜单
export function linkRoleMenu(data) {
    return axios({
        url: '/sys/linkRoleMenu',
        method: 'post',
        data
    })
}

// 修改菜单
export function modifyPermission(data) {
    return axios({
        url: '/sys/modifyPermission',
        method: 'post',
        data
    })
}

// 查询菜单列表（分级）
export function getPermissionList(data) {
    return axios({
        url: '/sys/getPermissionList',
        method: 'get',
        params: data
    })
}

export function getPermissionTree(data) {
    return axios({
        url: '/sys/getPermissionListTree',
        method: 'get',
        params: data
    })
}