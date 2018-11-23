import request from '~/utils/request'
// 用户提问
export const quizApi = {
  // 分页获取提问列表
  getQuizlist (params) {
    return request.clientGet('/api/goodsConsult/paginate', params)
  },
  // 分页获取回复列表
  getReplylist (params) {
    return request.clientGet('/api/goodsConsult/paginateReply', params)
  },
  // 咨询点赞
  consultLike (consultId) {
    return request.clientPost('/api/goodsConsult/likeConsult/' + consultId)
  },
  // 取消咨询点赞
  consultDislike (consultId) {
    return request.clientPost('/api/goodsConsult/cancelLikeConsult/' + consultId)
  }
}
