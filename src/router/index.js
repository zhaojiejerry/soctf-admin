/* eslint-disable no-spaced-func */
import Vue from 'vue'
import Router from 'vue-router'
import env from '../../config/prod.env'

import Layout from '@/components/layout/index'
Vue.use(Router)

export const navRoutes = [{
        path: 'index',
        name: 'Home',
        component: () =>
            import ('@/pages/home/index'),
        meta: {
            title: '首页',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: 'question',
        name: 'question',
        component: () =>
            import ('@/pages/question/index'),
        meta: {
            title: '问题管理',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: 'questionEdit',
        name: 'questionEdit',
        component: () =>
            import ('@/pages/question/modify'),
        hidden: true
    },
    {
        path: 'match',
        name: 'match',
        component: () =>
            import ('@/pages/match/index'),
        meta: {
            title: '比赛管理',
            icon: 'iconfont icon-home'
        }
    },
    {
        path: 'matchEdit',
        name: 'matchEdit',
        component: () =>
            import ('@/pages/match/modify'),
        hidden: true
    },
    {
        path: 'personalDetail',
        name: 'personalDetail',
        component: () =>
            import ('@/pages/system/user/detail'),
        hidden: true,
        children: []
    },
    {
        path: 'personalEdit',
        name: 'personalEdit',
        component: () =>
            import ('@/pages/system/user/edit'),
        hidden: true,
        children: []
    },
    {
        path: 'subAccountPersonal',
        name: 'subAccountPersonal',
        component: () =>
            import ('@/pages/system/user/subAccountInfo'),
        hidden: true,
        children: []
    },
    {
        path: 'subAccountPersonalEdit',
        name: 'subAccountPersonalEdit',
        component: () =>
            import ('@/pages/system/user/addSubAccount'),
        hidden: true,
        children: []
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
        children: navRoutes
    }
]

export const lastRoutes = [{
    path: '*',
    redirect: '/404',
    hidden: true
}]

const createRouter = () => new Router({
    mode: 'history',
    base: env.BASE_URL,
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