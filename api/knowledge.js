import request from '~/utils/request'

export const knowApi = {
  // client
  getKnowList (obj) {
    return request.clientGet('/api/sk/paginate', obj)
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
  }
}
