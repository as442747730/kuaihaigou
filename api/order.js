import request from '~/utils/request'
// 订单
export const orderApi = {
  // server
  getOrderList (obj, req) {
    return request.serverGet('/api/order/paginate', obj, req)
  },
  getOrderDetail (id, req) {
    return request.serverGet(`/api/order/getDetail/${id}`, {}, req)
  },
  getEvaluationInfo (id, req) {
    return request.serverGet(`/api/order/toComment/${id}`, req)
  },
  // client
  getOrderListClient (obj) {
    return request.clientGet('/api/order/paginate', obj)
  },
  cancelOrder (id) {
    return request.clientGet(`/api/order/cancelOrder/${id}`)
  },
  receiveOrder (id) {
    return request.clientPost(`/api/order/confirmReceipt/${id}`)
  },
  deleteOrder (id) {
    return request.clientPost(`${id}`)
  },
  submitEvaluation (obj) {
    return request.clientPost('/api/cmt/createComment', obj)
  }
}
