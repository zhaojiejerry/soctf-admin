import { constantRoutes } from '@/router/index'

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_CODE: (state, codeList) => {
    state.btnPermissions = codeList
  },
  SET_ISLOADMENU: (state, value) => {
    state.isLoadMenu = value
  },
  SET_ROUTES: (state, asyncRoutes) => {
    state.addRoutes = asyncRoutes
    state.permissionRoutes = [...constantRoutes, ...asyncRoutes]
  },
  setMultiVideoVisible: (state, value) => {
    state.multiVideoVisible = value
  },
  setWarningTipFlag: (state, value) => {
    state.warningTipFlag = value
  },
  ADD_CACHED_VIEW: (state, view) => {
    state.cachedViews = [view]
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },
  setTime (state, time) {
    if (state.timer) {
      // 关闭interval;
      clearInterval(state.timer)
    }
    state.time = time
    // 倒计时开始计数
    state.timer = window.setInterval(() => {
      if (state.time) {
        state.time--
      } else {
        clearInterval(state.timer)
      }
    }, 1000)
  },
  setShowTakePhoto (state, flag) {
    state.showTakePhoto = flag
  },
  setPrintPhotoObj (state, val) {
    state.printPhotoObj = val
  },
  setIsShowReadIdCard (state, val) {
    state.isShowReadIdCard = val
  },
  setIdCardObj (state, val) {
    state.idCardObj = val
  },
  setJsPhoto (state, val) {
    state.jsPhoto = val
  },
  setTjPhoto (state, val) {
    state.tjPhoto = val
  },
  setShowDownload (state, val) {
    state.showDownload = val
  },
  setMac (state, val) {
    state.mac = val
  }
}

export default mutations
