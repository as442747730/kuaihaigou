/* 一些比较零散的api放到这里来 */
import request from '~/utils/request'
// 消息中心
export const messageApi = {
  /* ----------------- server -------------- */
  // 系统消息
  serverSystemInfo (param, req) {
    return request.serverGet('/api/systeminformation/paginateSystemInformation', param, req)
  },
  /* ----------------- client -------------- */
  // 系统消息
  systemInfo (param) {
    return request.clientGet('/api/systeminformation/paginateSystemInformation', param)
  },
  // 删除系统消息
  deleteSystemInfo (id) {
    return request.clientGet('/api/systeminformation/deleteSystemInformation/' + id)
  }
}
