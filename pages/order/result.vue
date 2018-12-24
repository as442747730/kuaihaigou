<template>
  <div class="m-order-result">

    <template v-if='orderStaus === 0'>
      <div class="pro">
        <img src="~/assets/img/order/icon-status-clock.png">
      </div>
      <div class="desc font_hight">
        <h2>支付结果检测中</h2>
      </div>
    </template>

    <div v-if='orderStaus === 1'>
      <div class="pro">
        <img src="~/assets/img/order/ic_zhifuchenggong_130x90@2x.png">
      </div>
      <div class="desc">
        <h2>支付成功</h2>
        <p>订单支付成功，我们将会尽快为您发货。</p>
        <p>支付金额：<b>¥ 260</b></p>
        <p>支付方式：支付宝支付</p>
      </div>
    </div>

    <div class="depart-line"></div>
    <div class="other">
      <a href="">查看订单</a>
      <a class="cur" href="">回到首页</a>
    </div>
  </div>
</template>

<script>
import { orderApi } from '~/api/order'

export default {
  name: '',
  layout: 'default',

  head () {
    return {
      title: '支付结果',
      meta: [
        { hid: 'title', name: 'title', content: '支付结果' }
      ]
    }
  },

  async asyncData (req) {
    const { code, data } = await orderApi.getPayMsgServer(req.query.orderId, req)
    if (code === 506) {
      req.redirect('/account/login')
    }
    if (code === 200) {
      console.log(data)
      return { orderInfo: data, orderId: req.query.orderId }
    } else {
      req.redirect('/error')
    }
  },

  data () {
    return {
      orderId: null,
      orderInfo: {},
      orderStaus: 0
    }
  },

  created () {
    this.checkOrder(false)
  },

  methods: {
    checkOrder (s) {
      const toast1 = this.$toast.loading({ mask: true, message: '支付结果检测中', duration: 0 })
      let timer = setInterval(async () => {
        const { code, data } = await orderApi.getOrderPayOrNot(this.orderId)
        if (code === 200) {
          console.log(data)
          if (data) {
            toast1.clear()
            clearInterval(timer)
            this.orderStaus = 1
          }
          // if (data) window.location.href = '/order/detail?id=' + this.orderId
        }
      }, 2000)
      if (s) {
        clearInterval(timer)
        toast1.clear()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.m-order-result {
  padding: 50px 0 0;
  .pro {
    text-align: center;
    img {
      width: 130px;
      height: auto;
    }
  }
  .desc {
    text-align: center;
    h2 {
      color: #333;
      font-size: 17px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    p {
      font-size: 13px;
      color: #999;
      margin: 13px 0;
      b {
        color: #FB6248;
      }
    }
  }
  .depart-line {
    background: #f1f1f1;
    height: 14px;
    margin: 20px 0;
  }
  .other {
    a {
      display: inline-block;
      width: 160px;
      text-align: center;
      height: 38px;
      line-height: 40px;
      border: 1PX solid #eee;
      color: #666;
      margin: 0 10px;
      font-size: 15px;
      border-radius: 3px;
      &.cur {
        color: #fff;
        background: #03a1cd;
        border-color: #03a1cd;
      }
    }
  }
}
</style>
