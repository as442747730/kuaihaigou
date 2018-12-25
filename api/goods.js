import request from '~/utils/request'
// 商品接口
export const goodsApi = {
  /* ----------------- server -------------- */
  // 获取商品详情
  getDetail (goodsId, req) {
    return request.serverGet('/api/goods/getDetail/' + goodsId, {}, req)
  },
  // 获取热门商品
  getTopSales (req) {
    return request.serverGet('/api/goods/listTopSales', {}, req)
  },
  /** -------------- client ------------------- */
  // 获取商品详情
  clientDetail (goodsId) {
    return request.clientGet('/api/goods/getDetail/' + goodsId)
  },
  // 检查是否可配送
  checkDistr (goodsId, areaId, req) {
    return request.clientGet('/api/goods/checkDistribution/' + goodsId, {areaId: areaId}, req)
  },
  // 获取收藏信息
  getCollect (goodsId) {
    return request.clientGet('/api/goods/getColleaction/' + goodsId)
  },
  // 获取单个套餐信息
  getPack (packId) {
    return request.clientGet('/api/goods/getPack/' + packId)
  },
  // 分页获取用户收藏商品
  getUserCollect (params) {
    return request.clientGet(' /api/goods/clts', params)
  },
  // 获取省份
  getProvince (id) {
    return request.clientGet('/api/area/' + id)
  },
  // 加入商品对比
  addCompare (goodsId) {
    return request.clientPost('/api/goods/addToContrast/' + goodsId)
  },
  // 加入购物车
  addCart (data) {
    return request.clientPostJson('/api/cart/addGoods', data)
  },
  // 获取商品客户评价
  getComment (obj) {
    return request.clientGet('/api/cmt/paginate', obj)
  },
  // 评价点赞
  like (commentId) {
    return request.clientPost('/api/cmt/like/' + commentId)
  },
  unlike (commentId) {
    return request.clientPost('/api/cmt/unlike/' + commentId)
  }
}
