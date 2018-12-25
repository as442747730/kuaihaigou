import request from '~/utils/request'

export const knowApi = {
  // client
  getKnowList (obj) {
    return request.clientGet('/api/sk/paginate', obj)
  },
  publishKnow (obj) {
    return request.clientPost('/api/sk/releaseArticle', obj)
  },

  getReplys (obj) {
    return request.clientGet('/api/articleComment/paginateReply', obj)
  },
  toggleLike (id) {
    return request.clientPost(`/api/sk/like/${id}`, { id: id })
  },
  lkieComment (id) {
    return request.clientPost(`/api/articleComment/like/${id}`, { commentId: id })
  },
  dislikeComment (id) {
    return request.clientPost(`/api/articleComment/dislike/${id}`, { commentId: id })
  },
  handleCollect (obj) {
    return request.clientPost('/api/article/collect', obj)
  },
  handleUnCollect (obj) {
    return request.clientPost('/api/article/cancelCollect', obj)
  },
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
  getArticleDetail (obj, req) {
    return request.serverGet(`/api/sk/getArticle/${obj.id}`, obj, req)
  },

  getComments (obj, req) {
    return request.serverGet('/api/articleComment/paginateComment', obj, req)
  }
}
