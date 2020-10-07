/* eslint-disable no-spaced-func */
import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/layout/index'
Vue.use(Router)

export const navRoutes = [{
        path: '/question',
        name: 'question',
        component: () =>
            import ('@/pages/question/index'),
        meta: {
            title: '问题管理',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: '/match',
        name: 'match',
        component: () =>
            import ('@/pages/match/index'),
        meta: {
            title: '比赛管理',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: '/choice',
        name: 'choice',
        component: () =>
            import ('@/pages/choice/index'),
        meta: {
            title: '选择题管理',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: '/docker',
        name: 'docker',
        component: () =>
            import ('@/pages/docker/index'),
        meta: {
            title: '容器题管理',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: '/file',
        name: 'file',
        component: () =>
            import ('@/pages/file/index'),
        meta: {
            title: '附件题管理',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: '/roles',
        name: 'roles',
        component: () =>
            import ('@/pages/roles/index'),
        meta: {
            title: '角色管理',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: '/organization',
        name: 'organization',
        component: () =>
            import ('@/pages/organization/index'),
        meta: {
            title: '组织机构',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: '/users',
        name: 'users',
        component: () =>
            import ('@/pages/users/index'),
        meta: {
            title: '用户管理',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: '/branch',
        name: 'branch',
        component: () =>
            import ('@/pages/branch/index'),
        meta: {
            title: '部门管理',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: '/permission',
        name: 'permission',
        component: () =>
            import ('@/pages/permission/index'),
        meta: {
            title: '菜单权限管理',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: '/menus',
        name: 'menus',
        component: () =>
            import ('@/pages/menus/index'),
        meta: {
            title: '菜单管理',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: '/tools',
        name: 'tools',
        component: () =>
            import ('@/pages/tools/index'),
        meta: {
            title: '武器库',
            icon: 'iconfont icon-home'
        }
    }
]
export const constantRoutes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/pages/login/login'),
        hidden: true
    },
    {
        path: '/404',
        name: '404',
        component: () =>
            import ('@/pages/exception/page404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        children: [{
                path: '/index',
                name: 'index',
                component: () =>
                    import ('@/pages/home/index'),
                meta: {
                    title: '首页',
                    icon: 'iconfont icon-home'
                }
            },
            {
                path: '/modifyPwd',
                name: 'modifyPwd',
                component: () =>
                    import ('@/pages/system/modifyPwd'),
                meta: {
                    title: '修改密码',
                    icon: 'iconfont icon-home'
                },
                hidden: true
            },
            {
                path: '/psnDetail',
                name: 'psnDetail',
                component: () =>
                    import ('@/pages/system/psnDetail'),
                hidden: true,
                meta: {
                    title: '个人中心',
                    icon: 'iconfont icon-home'
                }
            }
        ]
    }
]

export const asyncRoutes = []
export const lastRoutes = [{
    path: '*',
    redirect: '/404',
    hidden: true
}]

const createRouter = () =>
    new Router({
        mode: 'history',
        scrollBehavior: (to, from, savedPosition) => {
            if (savedPosition) {
                return savedPosition
            } else {
                return {
                    x: 0,
                    y: 0
                }
            }
        },
        routes: constantRoutes
    })

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router