import request from '~/utils/request'
// 评论
export const commentApi = {
  // 创建评论
  createComent (params) {
    return request.clientPostJson('/api/articleComment/create', params)
  },
  // 创建回复评论
  createReply (params) {
    return request.clientPostJson('/api/articleComment/createReply', params)
  },
  // 获取评论列表
  getComments (obj) {
    return request.clientGet('/api/articleComment/paginateComment', obj)
  },
  // 评论点赞
  comGood (id) {
    return request.clientPost('/api/articleComment/like/' + id, {commentId: id})
  },
  // 评论取消点赞
  comCancle (id) {
    return request.clientPost('/api/articleComment/dislike/' + id, {commentId: id})
  },
  // 获取评论回复分页列表
  getRelyList (params) {
    return request.clientGet('/api/articleComment/paginateReply', params)
  }
}
// 会员中心评论
export const memberCommentApi = {
  // 分页查询我的评论
  commentlist (param, req) {
    return request.serverGet('/api/articleComment/paginateMyComment', param, req)
  },
  oriCommentGet (param) {
    return request.clientGet('/api/articleComment/paginateMyComment', param)
  }
}
