const KEY = 'my-token-element-pc' // 独一无二的key
// 读取
export const getToken = () => {
  return localStorage.getItem(KEY)
}
// 存储
export const setToken = (newToken) => {
  return localStorage.setItem(KEY, newToken)
}
// 删除
export const removeToken = () => {
  return localStorage.removeItem(KEY)
}
