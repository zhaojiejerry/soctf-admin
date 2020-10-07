import {
    login,
    getUserTree
} from '@/api/user'
import {
    setCookie,
    getCookie,
    removeCookie
} from '@/utils/auth'
import {
    // asyncRoutes,
    navRoutes
} from '@/router'
import router from '@/router'
import Layout from '@/components/layout/index'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = {
            ...route
        }
        if (hasPermission(roles, tmp)) {
            // console.log(tmp.children)
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push({
                path: tmp.path,
                component: Layout,
                redirect: tmp.path,
                children: [tmp]
            })
        }
    })

    return res
}

const actions = {
    login({
        commit
    }, userInfo) {
        const {
            username,
            password,
            verifyCode
        } = userInfo
        return new Promise((resolve, reject) => {
            login({
                userName: username,
                password: password,
                verifyCode: verifyCode,
                userType: 2
            }).then(res => {
                if (res.success) {
                    const str = Math.random().toString(36).substring(2)
                    commit('SET_TOKEN', str)
                    setCookie('Token', str)
                }
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    logout({
        commit
    }) {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeCookie('Token')
        router.push({
            path: '/login'
        })
    },
    getInfo({
        commit
    }) {
        return new Promise((resolve, reject) => {
            getUserTree({
                userId: getCookie('usrId')
            }).then(res => {
                const {
                    data,
                    success
                } = res
                if (!success) {
                    reject(new Error('验证失败，请重新登录'))
                }
                commit('SET_ROLES', data)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    resetToken({
        commit
    }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROUTES', [])
            removeCookie('Token')
            resolve()
        })
    },
    generateRoutes({
        commit
    }, roles) {
        return new Promise(resolve => {
            // let accessedRoutes
            // if (roles.includes('admin')) {
            //     accessedRoutes = asyncRoutes || []
            // } else {
            const accessedRoutes = filterAsyncRoutes(navRoutes, roles)
                // }
                // console.log(accessedRoutes, 234)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default actions