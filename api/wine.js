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
  }
}
