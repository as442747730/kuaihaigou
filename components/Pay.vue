<template>
  <van-actionsheet class='pay-methods' v-model="payMethodShow" :close-on-click-overlay='false'>
    <div class="pay-methods-top">
      <h3 class="font_medium">
        付款方式
        <van-icon name="cross" @click='closePay' />
      </h3>
      <p>请在{{ timeCount }}内完成支付</p>
      <span>支付金额 <b>¥{{ orderInfo.balanceAmount }}</b></span>
    </div>
    <div class="pay-methods-chose">
      <div class="item zfb" :class="{'checked': payMethod === 0}" @click='handlePay(0)'>
        <i class="ib-middle"></i>
        <h4 class="ib-middle">支付宝支付</h4>
        <div class="icon-check"></div>
      </div>
      <div class="item wx" :class="{'checked': payMethod === 1}" @click='handlePay(1)'>
        <i class="ib-middle"></i>
        <h4 class="ib-middle">微信支付</h4>
        <div class="icon-check"></div>
      </div>
    </div>
    <van-button class='pay-submit' type="default" size='large' @click='paySubmit' :loading='payLoading'>确认支付</van-button>
    <div v-if='zfbHtml' class="fake" v-html='zfbHtml'></div>
  </van-actionsheet>
</template>
<script>
  import { orderApi } from '@/api/order'
  export default {
    name: 'uPay',

    props: {
      payMethodShow: {
        type: Boolean
      },
      orderId: {
        type: String
      }
    },

    watch: {
      async payMethodShow (val) {
        if (val) {
          const { code, data } = await orderApi.getPayMsg(this.orderId)
          if (code === 200) {
            this.orderInfo = data
            console.log(data)
            this.countTime(parseInt(data.timestamp / 1000) + 10)
          }
        }
      }
    },

    data () {
      return {
        payMethod: 0,
        timeCount: '00小时00分00秒',
        zfbHtml: null,
        payLoading: false,

        orderInfo: {}
      }
    },

    methods: {
      closePay () {
        this.$emit('payClose', false)
      },
      handlePay (val) {
        this.payMethod = val
      },
      countTime (pt) {
        var nt = new Date().getTime() / 1000
        var t = nt
        setInterval(() => {
          t = t + 1
          var hh = parseInt((pt - t) / 60 / 60)
          var ii = parseInt((pt - t) / 60) - parseInt((pt - t) / 3600) * 60
          var ss = parseInt((pt - t - (parseInt((pt - t) / 60) * 60)))
          if ((pt - t) > 0) {
            this.timeCount = zero(hh) + '小时' + zero(ii) + '分' + zero(ss) + '秒'
          } else {
            this.timeCount = '00小时00分00秒'
            window.location.reload()
          }
        }, 1 * 1000)
        function zero (n) {
          var m = ''
          if (n < 10) {
            m = '0' + n.toString()
          } else {
            m = n
          }
          return m
        }
      },
      async paySubmit () {
        this.payLoading = true
        if (this.payMethod === 0) {
          let obj = {
            orderid: this.orderId,
            // returnUrl: '/order/detail?id=' + this.orderId
            returnUrl: 'http://' + window.location.host + '/order/result?orderId=' + this.orderId
          }
          const { code, data } = await orderApi.alipay(obj)
          if (code === 200) {
            this.zfbHtml = data.payInfo
            setTimeout(() => {
              document.forms[0].submit()
            }, 500)
            console.log(data)
          } else {
            this.$toast(data)
            this.payLoading = false
          }
        } else if (this.payMethod === 1) {
          let obj = {
            orderId: this.orderId,
            redirectUrl: 'http://' + window.location.host + '/order/result?orderId=' + this.orderId
          }
          const { code, data } = await orderApi.wxReward(obj)
          if (code === 200) {
            console.log(data)
            // window.location.href = data
          } else {
            this.$toast(data)
            this.payLoading = false
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.pay-methods { 
  padding: 30px 20px 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  ul {
    display: none!important;
  }
  &-top {
    text-align: center;
    h3 {
      color: #333;
      font-size: 19px;
    }
    p {
      font-size: 14px;
      color: #999;
      margin: 22px 0 10px;        
    }
    span {
      color: #666;
      font-size: 15px;
      b {
        color: #fb6248;
      }
    }
    i {
      font-size: 16px;
      float: right;
    }
  }
  &-chose {
    border-top: 1PX solid #eee;
    font-size: 15px;
    color: #333;
    margin-top: 20px;
    i {
      width: 30px;
      height: 30px;
      margin-right: 8px;
    }
    .zfb i{
      background: url('~/assets/img/ic_alipay 30x30@2x.png') no-repeat center/contain
    }
    .wx i{
      background: url('~/assets/img/ic_wachat_pay_30x30@2x.png') no-repeat center/contain
    }
    .item {
      padding: 15px 0;
      &.checked .icon-check {
        background: url('~/assets/img/icon-checkbox-active.png') no-repeat center/contain
      }
    }
    .icon-check {
      float: right;
      width: 18px;
      height: 18px;
      border: 1PX solid #eee;
      border-radius: 50%;
      margin-top: 5px;
    }
  }
  .pay-submit {
    margin: 20px 0 10px;
    background: #03a1cd;
    span {
      color: #fff;
    }
  }
}
</style>
<style lang="less">
  .pay-methods {
    ul {
      display: none
    }
  }
  .pay-submit {
    span {
      color: #fff;
    }
  }
</style>