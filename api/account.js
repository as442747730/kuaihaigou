import request from '~/utils/request'
// 登录相关
export const accountApi = {
  // 公众号获取微信用户信息并登陆
  loginWithWxJs (param) {
    return request.clientPostJson('/api/loginWithWxJs', param)
  }
}
