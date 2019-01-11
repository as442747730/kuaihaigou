import request from '~/utils/request'

export const knowApi = {
  // client
  getKnowList (obj) {
    return request.clientGet('/api/sk/paginate', obj)
  },
  publishKnow (obj) {
    return request.clientPost('/api/sk/releaseArticle', obj)
  },
  publishKnowVideo (obj) {
    return request.clientPost('/api/sk/releaseVideo', obj)
  },
  // 关注/取消关注
  subscribeUser (obj) {
    return request.clientPost('/api/friend/followFriends', obj)
  },
  // 获取作者的信息
  getAuthorInfo (obj) {
    return request.clientGet('/api/sk/getUserContent', obj)
  },
  getReplys (obj) {
    return request.clientGet('/api/articleComment/paginateReply', obj)
  },
  // 文章点赞
  artGood (params) {
    return request.clientPostJson('/api/article/like', params)
  },
  // 取消文章点赞
  artCancle (params) {
    return request.clientPostJson('/api/article/dislike', params)
  },
  // 文章收藏
  artCollect (params) {
    return request.clientPostJson('/api/article/collect', params)
  },
  // 取消文章收藏
  artCollectCancle (params) {
    return request.clientPostJson('/api/article/cancelCollect', params)
  },
  lkieComment (id) {
    return request.clientPost(`/api/articleComment/like/${id}`, { commentId: id })
  },
  dislikeComment (id) {
    return request.clientPost(`/api/articleComment/dislike/${id}`, { commentId: id })
  },
  // handleCollect (obj) {
  //   return request.clientPost('/api/article/collect', obj)
  // },
  // handleUnCollect (obj) {
  //   return request.clientPost('/api/article/cancelCollect', obj)
  // },
  // server
  getTopicList (req) {
    return request.serverGet('/api/sk/listTopic', {}, req)
  },
  getTypeList (req) {
    return request.serverGet('/api/type/listAll', {}, req)
  },
  getVariety (req) {
    return request.serverGet('/api/variety/listAll', {}, req)
  },
  // 获取文章草稿
  draft (req) {
    return request.serverGet('/api/sk/draft', {}, req)
  },
  getArticleDetail (obj, req) {
    return request.serverGet(`/api/sk/getArticle/${obj.id}`, obj, req)
  },
  homePage (params, req) {
    return request.serverGet('/api/sk/homePage', params, req)
  }
}
