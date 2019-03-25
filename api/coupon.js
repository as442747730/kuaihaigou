import request from '~/utils/request'
export const couponApi = {
  /* ---------------- serve ------------------ */
  serverGetList (params, req) {
    return request.serverGet('/api/coupon/', params, req)
  },
  /* ---------------- client ---------------------- */
  couponlist (params) {
    return request.clientGet('/api/coupon/', params)
  },
  // 兑换优惠卷
  convertCoupon (params) {
    return request.clientPost('/api/coupon/code', params)
  },
  // 获取可用优惠卷
  listForUsable (params) {
    return request.clientGet('/api/coupon/listForUsable', params)
  },
  // 获取已过期优惠券
  getOldCoupon () {
    return request.clientGet('/api/coupon/paginateOldCoupon')
  }
}
