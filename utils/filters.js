// 全局 filter
export default [
  // 格式化地址
  {
    name: 'formatPlace',
    fun: (str) => {
      if (!str) return ''
      return String(str).split(',')[0]
    }
  },
  // 格式化支付方式
  {
    name: 'getPayment',
    fun: (val) => {
      const t = ['未支付', '微信', '支付宝', 'Hi币支付', '优惠券支付']
      return t[+val]
    }
  }
]
