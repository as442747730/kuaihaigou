import request from '~/utils/request'
export const rewardApi = {
  // 创建打赏申请
  insertRewardApply (obj) {
    return request.clientPostJson('/api/reward/insertRewardApply/', obj)
  },
  // 知识分享模块  微信打赏
  wechatReward (obj) {
    return request.clientPostJson('/api/wxpay/wap/rewardPay', obj)
  },
  // 微信打赏，在微信浏览器内
  rewardPayInWx (obj) {
    return request.clientPostJson('/api/wxpay/js/rewardPay', obj)
  },
  // 支付宝
  alipayReward (obj) {
    return request.clientPostJson('/api/alipay/wap/reward/', obj)
  },
  // 检测支付状态
  checkPayOrNot (rewardId) {
    return request.clientGet('/api/reward/getRewardPayOrNot/' + rewardId)
  }
}
