import Vue from 'vue'
import App from './App'
import Echarts from 'echarts'
// element-ui
import Element from 'element-ui'
import '@/assets/scss/element-variables.scss'
// 字体图标和公共样式
import '@/assets/font/iconfont.css'
import '@/assets/scss/common.scss'
// vue-router
import router from '@/router/index'
// vuex
import store from '@/vuex/store'
// pxToRem
import '@/utils/rem'

import './permission'

import 'e-icon-picker/dist/index.css' // 基础样式
import 'e-icon-picker/dist/main.css' // fontAwesome 图标库样式
// VueClipboard
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Element.Dialog.props.closeOnClickModal.default = false
Vue.config.productionTip = false
Vue.use(Element)
Vue.use(VueClipboard)

Vue.prototype.$echarts = Echarts

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')