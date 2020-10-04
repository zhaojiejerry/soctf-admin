import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  setCookie,
  removeCookie
} from '@/utils/auth'
import {
  resetRouter,
  lastRoutes
} from '@/router'
import router from '@/router'

export function deepMenu(arr) {
  let result = []
  const len = arr.length
  let j = 0
  for (let i = 0; i < len; i++) {
    if (arr[i].children && arr[i].children.length) {
      const res = deepMenu(arr[i].children)
      if (res.length) {
        arr[i].children = []
        res.forEach((item) => {
          item.path = arr[i].path + '/' + item.path
          arr.push(item)
        })
      }
    } else if (arr[i].hidden) {
      j++
    }
    if ((j == (len - 1) && len != 1) || (j == 1 && arr[i].children.length == 0)) {
      result = [...arr]
    }
  }
  return result
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
    commit,
    state
  }) {
    commit('SET_TOKEN', '')
    commit('SET_MENU', [])
    commit('SET_CODE', [])
    commit('SET_ISLOADMENU', false)
    removeCookie('Token')
    router.push({
      path: '/login'
    })
    // resetRouter()

    // return new Promise((resolve, reject) => {
    //     logout().then((res) => {
    //         if (res.code == 0) {
    //         }
    //         resolve()
    //     }).catch(error => {
    //         reject(error)
    //     })
    // })
  },
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        const {
          data
        } = res
        if (!data) {
          reject(new Error('验证失败，请重新登录'))
        }
        const {
          user,
          menu,
          codeList
        } = data
        // 调整menu数据格式
        if (menu.length) {
          deepMenu(menu)
        }
        commit('SET_ISLOADMENU', true)
        commit('SET_MENU', menu)
        commit('SET_USER', user)
        commit('SET_CODE', codeList)
        commit('setWarningTipFlag', data.waitCheckStatus == 1)
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
      commit('SET_MENU', [])
      commit('SET_CODE', [])
      removeCookie('Token')
      resolve()
    })
  }
}

export default actions
