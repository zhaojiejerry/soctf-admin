import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import {
    getCookie
} from '@/utils/auth'

Vue.use(Vuex)

const state = {
    routes: [],
    addRoutes: [],
    token: getCookie('Token'),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
}

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})