import request from '~/utils/request'
// 商品接口
export const goodsApi = {
  // 获取商品详情
  getDetail (goodsId, req) {
    return request.serverGet('/api/goods/getDetail/' + goodsId, {}, req)
  },
  // 获取热门商品
  getTopSales (req) {
    return request.serverGet('/api/goods/listTopSales', {}, req)
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
  }
}
