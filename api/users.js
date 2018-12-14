import request from '~/utils/request'
// 用户接口
export const userApi = {
  // 获取用户详情
  userDetail () {
    return request.clientPost('/api/user/detail', null)
  },
  // 修复用户详情
  upduserinfo (params) {
    return request.clientPost('/api/user/upd_info', params)
  },
  // 更新用户个性签名
  updsignature (params) {
    return request.clientPost('/api/user/signature', params)
  }
}
