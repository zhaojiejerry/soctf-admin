import axios from '@/axios/axios.conf'

// 添加权限
export function addAuthorization(data) {
    return axios({
        url: '/sys/addAuthorization',
        method: 'post',
        data
    })
}

// 权限列表
export function getAuthorizationList(data) {
    return axios({
        url: '/sys/getAuthorizationList',
        method: 'post',
        data
    })
}

// 添加角色
export function addRole(data) {
    return axios({
        url: '/sys/addRole',
        method: 'post',
        data
    })
}

// 删除角色
export function deleteRole(data) {
    return axios({
        url: '/sys/deleteRole',
        method: 'post',
        data
    })
}

// 获取角色列表
export function getRoleInfoList(data) {
    return axios({
        url: '/sys/getRoleInfoList',
        method: 'get',
        params: data
    })
}

// 角色关联权限
export function linkRoleAuthorization(data) {
    return axios({
        url: '/sys/linkRoleAuthorization',
        method: 'post',
        data
    })
}

// 修改角色
export function modifyRole(data) {
    return axios({
        url: '/sys/modifyRole',
        method: 'post',
        data
    })
}