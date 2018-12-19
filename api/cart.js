import request from '~/utils/request'
// 购物车
export const cartApi = {
  // server
  getCart (req) {
    return request.serverGet('/api/cart/getCart', null, req)
  },
  // client
  // 购物车数据
  getCartClient (req) {
    return request.clientGet('/api/cart/getCart')
  },
  // 修改商品数量
  updateNum (obj) {
    return request.clientPostJson('/api/cart/updateNum', obj)
  },
  // 删除商品
  deleteGoods (obj) {
    return request.clientPostJson('/api/cart/deleteGoods', obj)
  },
  // 保存结算商品信息
  readyToSettle (obj) {
    return request.clientPostJson('/api/order/readyToSettle', obj)
  }
}
