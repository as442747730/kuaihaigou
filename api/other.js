/* 一些比较零散的api放到这里来 */
import request from '~/utils/request'
// 购物车
export const advertApi = {
  // 获取广告信息
  /*
    no 信息
    1、首页-新闻资讯-本周/本月最热下方
    2、商品详情-左侧
    3、支付成功/失败页面
    4、红酒百科-新闻资讯-本周/本月最热下方
    5、新闻资讯首页-本周/本月最热下方
    6、新闻资讯-标签页面-精彩评论下方
  */
  getAdvertisingSpace (num) {
    return request.clientGet('/api/advertisingspace/getAdvertisingSpace/' + num, { no: num })
  }
}
