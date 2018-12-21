import request from '~/utils/request'
// 用户接口
export const userApi = {
  // serve
  serverPostInfo (req) {
    return request.serverPost('/api/user/detail', null, req)
  },
  serveGetAartical (params, req) {
    return request.serverGet('/api/sk/myCreation', params, req)
  },
  // client
  // 获取用户详情
  userDetail () {
    return request.clientPost('/api/user/detail')
  },
  // 修复用户详情
  upduserinfo (params) {
    return request.clientPost('/api/user/upd_info', params)
  },
  // 更新用户个性签名
  updsignature (params) {
    return request.clientPost('/api/user/signature', params)
  },
  // 更新用户头像
  updateHeadImg (headimgurl) {
    return request.clientPost('/api/user/head_img', { headimgurl: headimgurl })
  },
  // 我的文章
  getArticle (params) {
    return request.clientGet('/api/sk/myCreation', params)
  },
  // 酒坛诗社
  windPoetry (params) {
    return request.clientGet('/api/sign/paginateHomeUserSign', params)
  },
  // 好友/粉丝列表
  friendlist (params, req) {
    return request.clientGet('/api/friend/followFriends', params, req)
  },
  // 关注好友
  likeFriend (params) {
    return request.clientPost('/api/friend/followFriends', params)
  },
  // 解绑
  dsunbind (type) {
    return request.clientPost('/api/user/unbind/' + type)
  },
  // 获取验证码
  getPhoneCode (params) {
    return request.clientPost('/api/code/', params)
  },
  // 修改手机号码
  updatephone (params) {
    return request.clientPost('/api/phone', params)
  }
}
