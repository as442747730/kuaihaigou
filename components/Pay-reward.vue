<!-- 
  本模块在知识分享详情页和个人主页打赏页均有用到
  有articleId -> 知识分享，没有就是个人主页
  其中,支付时分为两种情况, 微信浏览器支付和非微信浏览器支付
  1.微信浏览器中 -> 只允许微信支付
  2.非微信浏览器 -> 允许支付宝或者微信支付
 -->
<template>
  <van-actionsheet class='pay-methods u-reward' v-model="payShow" :close-on-click-overlay='false'>
    <div class="pay-methods-top">
      <h3 class="font_medium">
        我要打赏
        <van-icon name="cross" @click='closePay' />
      </h3>
      <ul class="reward-item">
        <li class="reward-list" v-for='($v, $k) in rewardData' :key='$k' :class="['type_' + $k, rewardIndex === $k ? 'cur' : '']" @click='checkPrice($k)'>
            <span><b>{{ formatMoney($v.price) }}</b>元</span>
            <p>{{ $v.desc }}</p>
        </li>
      </ul>
      <!-- <p>请在{{ timeCount }}内完成支付</p> -->
      <!-- <span>支付金额 <b>¥{{ orderInfo.balanceAmount }}</b></span> -->
    </div>
    <div class="pay-methods-chose">
      <div class="item zfb" :class="{'checked': payMethod === 0}" @click='handlePay(0)' v-if='env !== 1'>
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
  import { rewardApi } from '@/api/reward'
  import tools from '@/utils/tools'
  export default {
    name: 'uPay',

    props: {
      payShow: {
        type: Boolean
      },
      articelId: {
        type: String,
        default: null
      },
      userid: {
        type: String
      },
      setRewardIndex: {
        type: Number,
        default: null
      },
      env: {
        type: Number
      }
    },

    watch: {
      async payShow (val) {
        if (val) {
          this.rewardIndex = this.setRewardIndex ? this.setRewardIndex : 0
          this.amount = this.rewardData[this.setRewardIndex || this.rewardIndex].price
        }
      }
    },

    data () {
      return {
        payMethod: this.env,
        type: null,
        // timeCount: '00小时00分00秒',
        zfbHtml: null,
        payLoading: false,

        rewardData: [{
          price: 0.01,
          desc: '喜欢你'
        }, {
          price: 5.2,
          desc: '么么哒'
        }, {
          price: 6.66,
          desc: '666'
        }, {
          price: 12,
          desc: '佩服'
        }, {
          price: 50,
          desc: '老司机'
        }, {
          price: 520,
          desc: '带我飞'
        }],
        rewardIndex: null
      }
    },

    created () {
      this.rewardIndex = this.setRewardIndex ? this.setRewardIndex : 0
      this.amount = this.rewardData[this.setRewardIndex || this.rewardIndex].price
    },

    methods: {
      closePay () {
        this.$emit('payClose', false)
      },
      handlePay (val) {
        this.payMethod = val
      },
      checkPrice (index) {
        if (this.rewardIndex === index) {
          this.rewardIndex = null
          return
        }
        this.amount = this.rewardData[index].price
        this.rewardIndex = index
        if (this.payMethod === 1) {
        }
      },
      async paySubmit () {
        this.payLoading = true
        // 支付宝
        let obj = {
          amount: this.amount, // 赏金
          amountType: this.rewardIndex, // 赏金类别
          sharingKknowledgeId: this.articelId, // 知识分享文章id
          toUserId: this.userid // 被打赏用户ID
        }
        // 生成订单号
        this.rewardId = await this.createOrder(obj)
        let returnUrl = ''
        if (this.articelId) {
          returnUrl = 'http://' + window.location.host + '/knowledge/detail/' + this.articelId + '?type=' + tools.getUrlQues('type') + '&rewardId=' + this.rewardId
        } else {
          returnUrl = 'http://' + window.location.host + '/user/reward?uid=' + this.userid + '&rewardId=' + this.rewardId
        }
        if (this.payMethod === 0) {
          const { code, data } = await rewardApi.alipayReward({
            rewardId: this.rewardId,
            returnUrl: returnUrl
          })
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
          // 微信
          let obj = {
            rewardId: this.rewardId
            // redirectUrl: 'http://' + window.location.host + '/order/result?orderId=' + this.orderId
          }
          console.log(obj)
          const { code, data } = await rewardApi.wechatReward(obj)
          if (code === 200) {
            window.location.href = data.mwebUrl + '&redirect_url=' + encodeURIComponent(returnUrl)
          } else {
            this.$toast(data)
            this.payLoading = false
          }
        }
      },
      // 创建支付单号
      async createOrder (obj) {
        const { code, data } = await rewardApi.insertRewardApply(obj)
        if (code === 200) {
          return data.rewardId
        } else {
          this.$toast(data)
        }
      },
      formatMoney (a) {
        return tools.money(a)
      }
    }
  }
</script>
<style lang="less" scoped>
.pay-methods { 
  padding: 30px 20px 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #fff;
  &-top {
    text-align: center;
    h3 {
      color: #333;
      font-size: 19px;
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
.reward-item {
  margin-top: 20px;
  font-size: 0;
}
.reward-list {
  text-align: left;
  box-sizing: border-box;
  padding: 10px 0 11px 12px;
  width: 103px;
  height: 60px;
  border-radius: 8px;
  margin-right: 10px;
  display: inline-block;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;
  cursor: pointer;
  box-sizing: border-box;
  border: 1PX solid transparent;
  position: relative;
  &:after {
    display: none;
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 20px;
    height: 20px;
    background: url('~/assets/img/reward/pic_check_blue_30x30@2x.png') no-repeat center/contain;
  }
  &.cur {
    border-color: #03a1cd;
    &:after {
      display: block;
    }
  }
  &:last-child {
    margin-right: 0;
  }
  &.type_0{
    background-image: url('~/assets/img/reward/img_dahsan_01_175x100@2x.png');
    margin-bottom: 20px;
  }
  &.type_1{
    background-image: url('~/assets/img/reward/img_dahsan_02_175x100@2x.png') 
  }
  &.type_2{
    margin-right: 0;
    background-image: url('~/assets/img/reward/img_dahsan_03_175x100@2x.png') 
  }
  &.type_3{
    background-image: url('~/assets/img/reward/img_dahsan_04_175x100@2x.png') 
  }
  &.type_4{
    background-image: url('~/assets/img/reward/img_dahsan_05_175x100@2x.png') 
  }
  &.type_5{
    background-image: url('~/assets/img/reward/img_dahsan_06_175x100@2x.png') 
  }
  span{
    font-size: 12px;
    color: #fff;
    b{
      margin-right: 5px;
      font-weight: normal;
      font-size: 22px;
      font-family: 'Impact';
      position: relative;
      top: 3px;
    }
  }
  p{
    font-size: 10px;
    color: #fff;
    margin-top: 5px;
  }
}
</style>
<style lang="less">
  .pay-submit {
    span {
      color: #fff;
    }
  }
  .pay-methods .van-hairline--bottom {
    display: none;
  }
</style>