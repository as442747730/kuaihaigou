import request from '~/utils/request'
// 百科
export const encyApi = {
  /* ----------------- server  ------------------ */
  // 红酒百科主页
  encyclopediaHomePage (params, req) {
    return request.serverGet('/api/sk/encyclopediaHomePage/', params, req)
  },
  // 行业热点主页
  paginate (params, req) {
    return request.serverGet('/api/news/paginateClassificationNews/', params, req)
  },
  serverInitials (req) {
    return request.serverGet('/api/baike/listVarietyCategory', null, req)
  },
  serverVarietyList (id, req) {
    return request.serverGet('/api/baike/getVarietyDetail/' + id, { varietyid: id }, req)
  },
  serverCountry (params, req) {
    return request.serverGet('/api/baike/listCountryForArea', params, req)
  },
  serverAreaDetail (id, req) {
    return request.serverGet('/api/baike/getAreaDetail/' + id, { areaid: id }, req)
  },
  serverWineryCountry (params, req) {
    return request.serverGet('/api/baike/listCountryForWinery', params, req)
  },
  serverWineryDetail (id, req) {
    return request.serverGet('/api/baike/getWineryDetail/' + id, { wineryid: id }, req)
  },
  /* ----------------- client  ------------------ */
  // 获取品种
  getVarietyList (obj) {
    return request.clientGet('/api/baike/listVarietyByFirstWord', obj)
  },
  // 当品种为红葡萄 1，白葡萄 2, 其它 varietyid
  getVarietyDetail (id) {
    return request.clientGet('/api/baike/getVarietyDetail/' + id)
  },
  // 首字母
  clientInitials () {
    return request.clientGet('/api/baike/listVarietyCategory')
  },
  /**
   * 产区
   */
  // 获取国家
  getAreaCountry (params) {
    return request.clientGet('/api/baike/listCountryForArea', params)
  },
  // 获取大产区
  getAreaBig (params) {
    return request.clientGet('/api/baike/listOneAreaByCountryidForArea', params)
  },
  // 获取下一级产区
  getAreaNext (params) {
    return request.clientGet('/api/baike/listAreaBySuperiorAreaidForArea', params)
  },
  getAreaDetail (areaid) {
    // 产区详情
    return request.clientGet('/api/baike/getAreaDetail/' + areaid, { areaid: areaid })
  },
  /**
   * 酒庄
   **/
  // 获取国家
  getWineryCountry (params) {
    return request.clientGet('/api/baike/listCountryForWinery', params)
  },
  // 获取大产区
  getWineryBig (params) {
    return request.clientGet('/api/baike/listOneAreaByCountryidForWinery', params)
  },
  // 获取下一级产区
  getWineryNext (params) {
    return request.clientGet('/api/baike/listAreaBySuperiorAreaidForWinery', params)
  },
  // 酒庄列表
  getWineryList (params) {
    return request.clientGet('/api/baike/paginateBaikeWinery', params)
  },
  // 酒庄详情
  getWineryDetail (id) {
    return request.clientGet('/api/baike/getWineryDetail/' + id)
  },
  // 质疑
  questEncy (params) {
    return request.clientPostJson('/api/baike/submitBaikeQuestion', params)
  }
}
