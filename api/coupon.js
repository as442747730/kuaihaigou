import request from '~/utils/request'
export const couponApi = {
  /* ---------------- serve ------------------ */
  serverGetList (params, req) {
    return request.serverGet('/api/coupon/', params, req)
  },
  /* ---------------- client ---------------------- */
  couponlist (params) {
    return request.clientGet('/api/coupon/', params)
  }
}
