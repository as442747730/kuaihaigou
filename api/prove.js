import request from '~/utils/request'
// 会员认证
export const proveApi = {
  // server
  powerList () {
    return request.serverGet('/api/acp/list?no=3')
  },
  // client
  // 专业认证
  certMajor (obj) {
    return request.clientPostJson('/api/user/cert/pro', obj)
  },
  // 媒体认证
  certMedia (obj) {
    return request.clientPostJson('/api/user/cert/self_media', obj)
  },
  // 专业认证设置默认
  certDefault (id) {
    return request.clientPost('/api/user/cert/default/' + id)
  },
  // 取消专业认证
  cancelMajor (id) {
    return request.clientPost('/api/user/cert/cancel/pro_type/' + id)
  },
  // 取消自媒体认证
  cancelMedia (id) {
    return request.clientPost('/api/user/cert/cancel/self_media/' + id)
  },
  // 取消官方认证
  cancelOffice (id) {
    return request.clientPost('/api/user/cert/cancel/official')
  }
}
