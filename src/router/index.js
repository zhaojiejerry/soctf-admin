import Vue from 'vue'
import Router from 'vue-router'
import env from '../../config/prod.env'

import Layout from '@/components/layout/index'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/login'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/exception/page404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Home',
        component: () => import('@/pages/home/index'),
        meta: {
          title: '首页',
          icon: 'iconfont icon-home'
        }
      },
      {
        path: 'personalDetail',
        name: 'personalDetail',
        component: () => import('@/pages/system/user/detail'),
        hidden: true,
        children: []
      },
      {
        path: 'personalEdit',
        name: 'personalEdit',
        component: () => import('@/pages/system/user/edit'),
        hidden: true,
        children: []
      },
      {
        path: 'subAccountPersonal',
        name: 'subAccountPersonal',
        component: () => import('@/pages/system/user/subAccountInfo'),
        hidden: true,
        children: []
      },
      {
        path: 'subAccountPersonalEdit',
        name: 'subAccountPersonalEdit',
        component: () => import('@/pages/system/user/addSubAccount'),
        hidden: true,
        children: []
      }
    ]
  }
]

export const asyncRouterMap = {
  layout: () => import('@/components/layout/index'),
  user: () => import('@/pages/system/user/index'),
  userDetail: () => import('@/pages/system/user/detail'),
  userEdit: () => import('@/pages/system/user/edit'),
  addSubAccount: () => import('@/pages/system/user/addSubAccount'),
  subAccountInfo: () => import('@/pages/system/user/subAccountInfo'),
  role: () => import('@/pages/system/role/index'),
  roleDetail: () => import('@/pages/system/role/detail'),
  roleEdit: () => import('@/pages/system/role/edit'),
  business: () => import('@/pages/order/health/index'),
  photo: () => import('@/pages/info/photo/index'),
  healthPlatform: () => import('@/pages/info/healthPlatform/index'),
  businessDetail: () => import('@/pages/order/health/detail'),
  businessInfo: () => import('@/pages/order/health/info'),
  deviceList: () => import('@/pages/device/deviceList'),
  editDevice: () => import('@/pages/device/editDevice'),
  deviceInfo: () => import('@/pages/device/deviceInfo'),
  deviceCoding: () => import('@/pages/device/deviceCoding'),
  addDeviceCoding: () => import('@/pages/device/addDeviceCoding'),
  templeteList: () => import('@/pages/config/templeteList'),
  addTemplete: () => import('@/pages/config/addTemplete'),
  orderList: () => import('@/pages/order/orderList'),
  orderDetails: () => import('@/pages/order/orderDetails'),
  finance: () => import('@/pages/order/finance'),
  checkBill: () => import('@/pages/order/checkBill'),
  optLogList: () => import('@/pages/system/opt/index')
}

export const lastRoutes = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'history',
  base: env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
