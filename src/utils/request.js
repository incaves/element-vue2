import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/',
  timeout: 5000
})
request.interceptors.request.use(
  (config) => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        Message.error('登陆状态已过期')
        store.commit('user/logout')
        router.push('/login')
      } else {
        Message.error(err.response.data.message)
      }
    }
    return Promise.reject(err)
  }
)
export default request
