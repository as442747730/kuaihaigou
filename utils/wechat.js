const wx = require('weixin-js-sdk')
/* eslint-disable no-param-reassign */
const plugin = {
  install (Vue) {
    Vue.prototype.$wechat = wx
    Vue.wechat = wx
  },
  $wechat: wx
}
export default plugin
export const install = plugin.install
