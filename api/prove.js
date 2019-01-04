import request from '~/utils/request'
// 会员认证
export const proveApi = {
  // server
  powerList () {
    return request.serverGet('/api/acp/list?no=3')
  },
  // client
  certMajor (obj) {
    return request.clientPostJson('/api/user/cert/pro', obj)
  },
  certDefault (id) {
    return request.clientPost('/api/user/cert/default/' + id)
  }
}
