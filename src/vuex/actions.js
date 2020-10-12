/* eslint-disable */
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

export function BtnChildren(roles, id) {
    const res = []
    if (roles.length > 0) {
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].type == 2) {
                var tmp = {
                    ...roles[i]
                }
                res.push(tmp.id)
            }
        }
    }
    return res
}

export function RoutesChildren(roles) {
    const res = []
    if (roles.length > 0) {
        roles.forEach(element => {
            var tmp = {
                path: element.path,
                component: () =>
                    import ('@/pages' + element.redirect),
                name: element.name,
                hidden: element.hidden,
                meta: {
                    title: element.title,
                    icon: element.icon,
                    btn: BtnChildren(element.children)
                },
            }
            if (element.type == 1) {
                res.push(tmp)
            }
        });
    }
    return res
}

export function filterRoutes(power) {
    const res = [];
    power.forEach(item => {
        // console.log(item)
        const tmp = {
            ...item
        }
        var role = {}
        if (RoutesChildren(tmp.children).length == 0) {
            role = {
                path: tmp.path,
                component: Layout,
                redirect: tmp.path,
                children: [{
                    path: tmp.path,
                    component: () =>
                        import ('@/pages' + tmp.redirect),
                    name: tmp.name,
                    hidden: tmp.hidden,
                    meta: {
                        title: tmp.title,
                        icon: tmp.icon,
                        btn: BtnChildren(tmp.children)
                    },
                }]
            }
        } else {
            role = {
                path: tmp.path,
                component: Layout,
                redirect: tmp.path,
                meta: {
                    title: tmp.title,
                    icon: tmp.icon,
                },
                children: RoutesChildren(tmp.children)
            }
        }
        if (tmp.type == 1) {
            res.push(role)
        }
    });
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
                commit('SET_ROLES', data.menu)
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
            // const accessedRoutes = filterAsyncRoutes(navRoutes, roles)
            const accessedRoutes = filterRoutes(roles)
                // console.log(accessedRoutes, 234)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default actions