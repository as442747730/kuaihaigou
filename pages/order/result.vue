<!-- 
   * 订单状态说明 orderStatus
   1、 待支付
   2、 支付成功,待发货
   3、 发货中
   4、 待收货
   5、 待评价
   6、 交易流程已完成
   7、 已关闭（超时/取消订单）
 -->
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

    <template v-if='orderStaus === 1'>
      <div class="pro">
        <img src="~/assets/img/order/ic_zhifuchenggong_130x90@2x.png">
      </div>
      <div class="desc">
        <h2>支付成功</h2>
        <p>订单支付成功，我们将会尽快为您发货。</p>
        <p>支付金额：<b>¥ {{ orderInfo.balanceAmount }}</b></p>
        <p>支付方式：支付宝支付</p>
      </div>
    </template>

    <div class="order-fail" v-if='orderStaus === 2'>
      <div class="pro">
        <img src="~/assets/img/order/ic_zhifuzhibai_130x90@2x.png">
      </div>
      <div class="desc">
        <h2>支付失败</h2>
        <p>订单支付失败，请重新进行支付。</p>
      </div>
    </div>

    <div class="depart-line"></div>
    <div class="other">
      <a :href="'/order/detail?id=' + orderId">查看订单</a>
      <a class="cur" href="/home">回到首页</a>
    </div>

    <!-- 广告位 -->
    <u-advert v-if='adv' :advimg='adv.path' :href='adv.url' />

  </div>
</template>

<script>
import { orderApi } from '~/api/order'
import { advertApi } from '~/api/other'
import uAdvert from '~/components/Advert'

export default {
  name: '',
  layout: 'default',

  components: {
    uAdvert
  },

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
      orderStaus: 0,

      // 广告位
      adv: null
    }
  },

  created () {
    if (this.orderInfo.status === 1) {
      this.checkOrder(false)
    } else if (this.orderInfo.status === 7) {
      this.orderStaus = 2
    } else {
      this.orderStaus = 1
    }
    this.getAdv()
  },

  methods: {
    checkOrder (s) {
      const toast1 = this.$toast.loading({ mask: true, message: '支付结果检测中', duration: 0 })
      let timer = setInterval(async () => {
        const { code, data } = await orderApi.getOrderPayOrNot(this.orderId)
        if (code === 200) {
          console.log(data)
          toast1.clear()
          if (data) {
            clearInterval(timer)
            this.orderStaus = 1
          } else {
            this.orderStaus = 2
          }
          // if (data) window.location.href = '/order/detail?id=' + this.orderId
        }
      }, 2000)
      if (s) {
        clearInterval(timer)
        toast1.clear()
      }
    },
    // 获取广告信息
    async getAdv () {
      const { code, data } = await advertApi.getAdvertisingSpace(3)
      if (code === 200) {
        let advIndex = Math.floor((Math.random() * data.imgResps.length))
        this.adv = data.imgResps[advIndex]
      }
    }
  }
}
</script>

<style lang="less">
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
  .order-fail {
    margin-bottom: 40px;
  }
  .depart-line {
    background: #f1f1f1;
    height: 14px;
    margin: 20px 0;
  }
  .other {
    text-align: center;
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
  .u-advert {
    position: absolute;
    bottom: 8vh;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>
