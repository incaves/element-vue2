import request from '@/utils/request'
/**
 *
 * @param {*} current 当前页
 * @param {*} pageSize 每页多少条
 * @returns
 */
export const getArticleList = ({ current, pageSize }) => {
  return request.get('/admin/interview/query', {
    params: {
      current,
      pageSize
    }
  })
}
/**
 * 添加文章
 * @param {*} obj
 * @returns
 */
export const createArticle = obj => {
  return request.post('/admin/interview/create', obj)
}
/**
 * 删除文章
 * @param {*} id
 * @returns
 */
export const removeArticle = (id) => {
  return request.delete('/admin/interview/remove', {
    // 参数传递在请求体
    data: {
      id
    }
  })
}
/**
 * 获取单个文章
 * @param {*} id
 * @returns
 */
export const getArticleDetail = id => {
  return request.get('/admin/interview/show', {
    params: {
      id
    }
  })
}
/**
 * 修改
 * @param {*} data
 * @returns
 */
export const updateArticle = data => {
  return request.put('/admin/interview/update', data)
}
