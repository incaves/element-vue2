import { removeToken, getToken, setToken } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      token: getToken() || '' // 页面一进入,默认从本地存储读取token(刷新token也不会丢失)
    }
  },
  mutations: {
    setUserToken (state, payload) {
      state.token = payload // 存储到Vuex
      setToken(payload) // 存储到本地存储
    },
    logout (state) {
      state.token = ''
      removeToken()
    }
  }
}
