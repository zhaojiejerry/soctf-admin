import router from '@/router/index'
import store from '@/vuex/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getCookie } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

// 路由跳转检测是否登录
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // 处理体检单上一单和下一单切换问题
  if (!to.path || to.path.indexOf('health') == -1) {
    localStorage.removeItem('healthCondition')
  }
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getCookie('Token')

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasPermission = store.getters.isLoadMenu
      if (hasPermission) {
        next()
      } else {
        try {
          const { menu } = await store.dispatch('getInfo')
          const accessRoutes = await store.dispatch('generateRoutes', menu)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('resetToken')
          Message.error(error || '存在错误')
          next(`/login?redirect=${to.fullPath}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  // finish progress bar
  NProgress.done()
})
