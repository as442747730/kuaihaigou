import request from '~/utils/request'
// 百科
export const encyApi = {
  /* ----------------- server  ------------------ */
  // 红酒百科主页
  encyclopediaHomePage (parame, req) {
    return request.serverGet('/api/sk/encyclopediaHomePage/', parame, req)
  },
  // 行业热点主页
  paginate (parame, req) {
    return request.serverGet('/api/news/paginateClassificationNews/', parame, req)
  },
  serverInitials (req) {
    return request.serverGet('/api/baike/listVarietyCategory', null, req)
  },
  serverVarietyList (id, req) {
    return request.serverGet('/api/baike/getVarietyDetail/' + id, { varietyid: id }, req)
  },
  serverCountry (id, req) {
    return request.serverGet('/api/baike/listCountryForArea/' + id, null, req)
  },
  serverWineryCountry (id, req) {
    return request.serverGet('/api/baike/listCountryForWinery/' + id, null, req)
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
  getAreaCountry (id) {
    return request.clientGet('/api/baike/listCountryForArea/' + id)
  },
  // 获取大产区
  getAreaBig (countryid) {
    return request.clientGet('/api/baike/listOneAreaByCountryidForArea/' + countryid)
  },
  // 获取下一级产区
  getAreaNext (areaid) {
    return request.clientGet('/api/baike/listAreaBySuperiorAreaidForArea/', { areaid: areaid })
  },
  getAreaDetail (areaid) {
    // 产区详情
    return request.clientGet('/api/baike/getAreaDetail/' + areaid, { areaid: areaid })
  },
  /**
   * 酒庄
   **/
  // 获取国家
  getWineryCountry (id) {
    return request.clientGet('/api/baike/listCountryForWinery/' + id)
  },
  // 获取大产区
  getWineryBig (countryid) {
    return request.clientGet('/api/baike/listOneAreaByCountryidForWinery/' + countryid)
  },
  // 获取下一级产区
  getWineryNext (areaid) {
    return request.clientGet('/api/baike/listAreaBySuperiorAreaidForWinery/', { areaid: areaid })
  },
  // 酒庄列表
  getWineryList (params) {
    return request.clientGet('/api/baike/paginateBaikeWinery', params)
  },
  // 酒庄详情
  getWineryDetail (id) {
    return request.clientGet('/api/baike/getWineryDetail/' + id)
  }
}
