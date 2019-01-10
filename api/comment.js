import request from '~/utils/request'
// 购物车
export const commentApi = {
  // 创建评论
  createComent (params) {
    return request.clientPostJson('/api/articleComment/create', params)
  },
  // 获取评论列表
  getComments (obj) {
    return request.clientGet('/api/articleComment/paginateComment', obj)
  }
}
