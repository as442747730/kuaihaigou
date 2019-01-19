import request from '~/utils/request'
export const searchApi = {
  /* ---------------- serve ------------------ */
  serverGetList (params, req) {
    return request.serverGet('/api/coupon/', params, req)
  },
  /* ---------------- client ---------------------- */
  searchGoods (params) {
    return request.clientGet('/api/esGoods/paginate', params)
  },
  // 百科搜索内容
  searchBaiKe (params) {
    return request.clientGet('/api/baike/search', params)
  },
  // 知识分享搜索内容
  searchShare (params) {
    return request.clientGet('/api/sk/search', params)
  },
  // 知识分享搜索内容
  searchNews (params) {
    return request.clientGet('/api/news/search', params)
  }
}
