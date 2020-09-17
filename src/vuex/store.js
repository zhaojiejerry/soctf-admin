import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import { getCookie } from '@/utils/auth'

Vue.use(Vuex)

const state = {
  // 页面倒计时时间
  time: 0,
  // 倒计时定时任务
  timer: null,
  showTakePhoto: {
    show: false,
    title: '',
    tip: '',
    type: ''
  },
  jsPhoto: '',
  tjPhoto: '',
  printPhotoObj: {},
  isShowReadIdCard: false, // 身份证读取弹窗
  idCardObj: {},
  showDownload: false, // 下载弹窗
  mac: '', // 设备编码
  // 系统级别
  token: getCookie('Token'),
  menu: [], // 路由权限信息
  user: {}, // 用户信息
  permissionRoutes: [], // 根据权限组装的完整路由
  addRoutes: [], // 增加的动态路由
  isLoadMenu: false,
  btnPermissions: [], // 权限code列表
  multiVideoVisible: false, // 多视频窗口是否开启
  warningTipFlag: false, // 是否开启新体检单语音提醒
  cachedViews: [] // 需要keep-alive缓存的页面数组 ['user', 'deviceList', 'orderList', 'business']
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
