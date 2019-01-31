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
  },
  // 分页查询商品评论
  goodsComment (param) {
    return request.clientGet('/api/cmt/paginateMyGoodsComment', param)
  },
  // 获取评价回复内容
  getCommentReply (obj) {
    return request.clientGet('/api/cmt/paginateCommentReply', obj)
  },
  // 评论点赞（楼主）
  comGood (id) {
    return request.clientPost('/api/cmt/like/' + id, {id: id})
  },
  // 取消评论点赞（楼主）
  comCancle (id) {
    return request.clientPost('/api/cmt/unlike/' + id, {id: id})
  },
  // 普通回复点赞
  ordGood (replyId) {
    return request.clientPost('/api/cmt/likeCommentReply/' + replyId, { replyId: replyId })
  },
  // 取消回复点赞
  ordCancle (replyId) {
    return request.clientPost('/api/cmt/cancelLikeCommentReply/' + replyId, { replyId: replyId })
  },
  // 添加评论回复
  addComment (data) {
    return request.clientPostJson('/api/cmt/reply', data)
  }
}
