import request from '~/utils/request'
export const searchApi = {
  /* ---------------- serve ------------------ */
  serverGetList (params, req) {
    return request.serverGet('/api/coupon/', params, req)
  },
  // 商品
  serverGoods (params) {
    return request.serverGet('/api/esGoods/paginate', params)
  },
  // 更新搜索词热度
  updataKeyword (params) {
    return request.serverPostJson('/api/searchkeyword/updateSearchKeyword', params)
  },
  // 搜索关键词
  listSearchKeyword (req) {
    return request.serverGet('/api/searchkeyword/listSearchKeyword')
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
