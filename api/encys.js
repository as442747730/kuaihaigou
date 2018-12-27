import request from '~/utils/request'
// 百科
export const encyApi = {
  /* ----------------- server  ------------------ */
  getInitials (req) {
    return request.serverGet('/api/baike/listVarietyCategory', null, req)
  },
  serverVarietyList (id, req) {
    return request.serverGet('/api/baike/getVarietyDetail/' + id, { varietyid: id }, req)
  },
  /* ----------------- client  ------------------ */
  // 获取品种
  getVarietyList (obj) {
    return request.clientGet('/api/baike/listVarietyByFirstWord', obj)
  },
  // 当品种为红葡萄 1，白葡萄 2
  getVarietyDetail (id) {
    return request.clientGet('/api/baike/getVarietyDetail/' + id, { varietyid: id })
  }

}
