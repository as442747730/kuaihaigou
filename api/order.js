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
    return request.serverGet(`/api/order/toComment/${id}`, {}, req)
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
  },
  // 获取订单信息
  getPayMsg (orderId) {
    return request.clientGet('/api/order/getPayMsg/' + orderId)
  },
  // 支付宝创建wap支付
  alipay (obj) {
    return request.clientPostJson('/api/alipay/wap/build', obj)
  }
}

export const afterSaleApi = {
  // server
  getAfterSaleList (obj, req) {
    return request.serverGet('/pf-api/afterSale/paginate', obj, req)
  },
  getAftersaleDetail (id, req) {
    return request.serverGet(`/api/afterSale/getDetail/${id}`, { afterSaleId: id }, req)
  },
  getGoodAndPriceInfo (id, req) {
    return request.serverGet(`/api/afterSale/getGoodsForAfterSale/${id}`, { orderItemId: id }, req)
  },
  getAlreadyComplate (id, req) {
    return request.serverGet(`/api/afterSale/listGoodsInAfterSale/${id}`, { orderId: id }, req)
  },
  // client
  getAfterSaleListClient (obj) {
    return request.clientGet('/pf-api/afterSale/paginate', obj)
  },
  createApplication (obj) {
    return request.clientPost('/api/afterSale/create', obj)
  },
  cancelAftersale (id) {
    return request.clientPost(`/api/afterSale/cancel/${id}`)
  }
}
