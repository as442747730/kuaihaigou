import request from '~/utils/request'
export const wineApi = {
  /* ----------------- server ----------------- */
  // 商品分页搜索
  goodList (params, req) {
    return request.serverGet('/api/esGoods/paginate', params, req)
  },
  serverAttrs (params, req) {
    return request.serverGet('/api/esGoods/listAttr', params, req)
  },
  // 美酒推荐场景
  serverScener (req) {
    return request.serverGet('/api/wine/listScener', null, req)
  },
  // 美酒推荐列表
  serverGoodwineList (scenesNo, req) {
    return request.serverGet('/api/wine/getWine/' + scenesNo, { scenesNo: scenesNo }, req)
  },
  /* ----------------- client ----------------- */
  clientList (params) {
    return request.clientGet('/api/esGoods/paginate', params)
  },
  getAreaList (countried) {
    return request.clientGet('/api/esGoods/listAreaAndLevelByCountryId/' + countried)
  },
  // 获取商品属性
  clientAttrs (params) {
    return request.clientGet('/api/esGoods/listAttr', params)
  },
  // 美酒推荐场景
  clicentScener () {
    return request.clientGet('/api/wine/listScene')
  },
  // 美酒推荐列表
  clientGoodwineList (scenesNo) {
    return request.clientGet('/api/wine/getWine/' + scenesNo)
  },
  // 获取加入对比的商品
  showGoodsForContrast (id) {
    return request.clientGet('/api/goods/showGoodsForContrast')
  }
}
