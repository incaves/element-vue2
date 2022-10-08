import request from '@/utils/request'
/**
 *
 * @param {*} username 账号
 * @param {*} paswoord 密码
 * @returns Promise
 */
export const login = ({ username, password }) => {
  return request.post('/auth/login', {
    username,
    password
  })
}
/**
 * 需要根据请求头的token去获取个人信息
 * @returns Promise
 */
export const getUser = () => {
  return request.get('/auth/currentUser')
}
