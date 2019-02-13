<template>
  <div class="m-order-submit" :class="{'fullScreen': fullScreen}">

    <van-nav-bar style='position: fixed' :title="clearHead || '填写订单'" left-arrow :right-text="navTxt" @click-left='historyBack' @click-right="jump">
    </van-nav-bar>

    <div class="m-section-position more-link" @click="openAddress">
      <span v-if="!addressSelected.phone">添加收货地址</span>
      <div class="address-info" v-else>
        <div class="head">
          <div class="title">{{ addressSelected.name }}</div>
          <div class="title">{{ addressSelected.phone }}</div>
          <div class="default-badge" v-if="addressSelected.ifDefault">默认</div>
        </div>
        <p class="address">{{ String(addressSelected.province).split(',')[0] + String(addressSelected.city).split(',')[0] + String(addressSelected.district).split(',')[0] + String(addressSelected.street).split(',')[0] + addressSelected.address }}</p>
      </div>
    </div>

    <div class="m-section-product" v-for="(item, index) in productList" :key="index" :style="{'marginBottom' : goodsNoSend.length !== 0 ? '0px' : ''}">
      <div class="m-section-product-logistics">快递：{{ item.logisticsCompany }}</div>
      <div class="m-section-product-li" v-for="(p, k) in item.list" :key='k'>
        <template v-if="!p.packName">
          <div class="m-section-product-item">
            <div class="m-section-product-item-pro">
              <img class="m-section-product-item-img" :src="p.imgUrl" alt="">
            </div>
            <div class="m-section-product-item-content">
              <p class="title font_medium">{{ p.goodsName }}</p>
              <p class="desc">{{ p.skuName ? '规格：' + p.skuName : '规格：单品' }}<span class="price font_impact">￥{{ p.sellPrice }}</span></p>
              <p class="desc">x{{ p.num }}</p>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="pack-title" :class="{'mt-10': k > 0}">
            <div class="pack-title-left font_medium">{{ p.packName }}</div>
            <div class="pack-title-right font_impact">¥{{ p.sellPrice }}</div>
          </div>
          <div class="m-section-product-item bor-top" v-for="(d, i) in p.cartGoodsList" :key="i">
            <div class="m-section-product-item-pro">
              <img class="m-section-product-item-img" :src="d.imgUrl" alt="">
            </div>
            <div class="m-section-product-item-content">
              <p class="title font_medium">{{ d.goodsName }}</p>
              <p class="desc">{{ d.skuName ? '规格：' + d.skuName : '规格：单品' }}</p>
              <p class="desc">x{{ d.num }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 不可配送 -->
    <template v-if='goodsNoSend.length !== 0'>
      <div class="m-section-product-logistics" style="color: #FB6248; margin-bottom: 0">不可配送</div>
      <div class="m-section-product no-send" v-for="(item, index2) in goodsNoSend">
        <div class="m-section-product-li">
          <template v-if="!item.packName">
            <div class="m-section-product-item">
              <div class="m-section-product-item-pro">
                <img class="m-section-product-item-img" :src="item.imgUrl" alt="">
              </div>
              <div class="m-section-product-item-content">
                <p class="title font_medium">{{ item.goodsName }}</p>
                <p class="desc">{{ item.skuName ? '规格：' + item.skuName : '规格：单品' }}<span class="price font_impact">￥{{ item.sellPrice }}</span></p>
                <p class="desc">x{{ item.num }}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="pack-title" :class="{'mt-10': index2 > 0}">
              <div class="pack-title-left font_medium">{{ item.packName }}</div>
              <div class="pack-title-right font_impact">¥{{ item.sellPrice }}</div>
            </div>
            <div class="m-section-product-item bor-top" v-for="(d, i2) in item.cartGoodsList" :key="i2">
              <div class="m-section-product-item-pro">
                <img class="m-section-product-item-img" :src="d.imgUrl" alt="">
              </div>
              <div class="m-section-product-item-content">
                <p class="title font_medium">{{ d.goodsName }}</p>
                <p class="desc">{{ d.skuName ? '规格：' + d.skuName : '规格：单品' }}</p>
                <p class="desc">x{{ d.num }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>

    <div class="m-section-cell">
      <div class="m-section-cell-item more-link small" @click="openCoupon">
        <div class="label">优惠券</div>
        <span class="content" v-if="!couponSelected.faceValue">{{ usableCouponCount ? usableCouponCount + '张可用' : '无可用优惠券' }}</span>
        <span class="content" v-else>￥{{ formatMoney(couponSelected.faceValue) }}</span>
      </div>
      <div class="m-section-cell-item">
        <div class="label">优币抵扣<span class="tip">您有Hi币 {{ formatMoney(rewardNow) }}个</span></div>
        <van-stepper :min='0' :max="maxReward" v-model='rewardMoney' @change='handleNumChange'></van-stepper>
      </div>
    </div>

    <div class="m-section-cell">
      <div class="m-section-cell-item">
        <div class="label">商品合计</div>
        <div class="content">￥{{ totalPrice }}</div>
      </div>
      <div class="m-section-cell-item">
        <div class="label">运费</div>
        <div class="content">
          <template v-if='ifReduction'>
            <div class="badge" v-if='reductionStrategy.ifDeliveryIncluded'>满{{ reductionStrategy.minimumCost }}包邮</div>
            <div class="badge" v-else>满{{ reductionStrategy.minimumCost }}减{{ reductionStrategy.reduceMoney }}</div>
          </template>
          ￥{{ totalFreight - reduceFreight }}
        </div>
      </div>
      <div class="m-section-cell-item">
        <div class="label">优惠券</div>
        <div class="content">￥{{ couponSelected.faceValue ? '-' + couponSelected.faceValue : 0 }}</div>
      </div>
      <div class="m-section-cell-item">
        <div class="label">优币抵扣</div>
        <div class="content">{{ rewardMoney !== 0 ? '-' + rewardMoney : rewardMoney }}</div>
      </div>
      <div class="m-section-cell-item" v-if='fullSub !== 0'>
        <div class="label">活动优惠</div>
        <div class="content"><div class="badge">{{ promotion.promotionName }}</div>￥-{{ fullSub }}</div>
      </div>
    </div>

    <div class="m-section-cell">
      <div class="m-section-cell-item more-link small" @click="openInvoice">
        <div class="label">发票信息</div>
        <div class="content">{{ invoinceSelected.id ? (invoinceSelected.invoiceType === 1 ? '纸质' : '电子') + (invoinceSelected.headType === 1 ? '个人' : '单位') + '发票' : '不开发票' }}</div>
      </div>
    </div>

    <!-- 留言 -->
    <div class="m-section-cell">
      <div class="msg">
        <h4>订单留言</h4>
        <textarea v-model="msg" class="reason-content" :maxlength="150" rows="5" placeholder="请输入留言内容" @blur="ioskeyborad"></textarea>
        <span class="words">{{ msg.length }}/150</span>
      </div>
    </div>

    <div class="m-section-bottom">
      <div class="m-section-bottom-left">应付金额：<span class="total">￥{{ formatMoney(payable) }}</span></div>
      <div class="m-section-bottom-right active-status" @click="submitOrder">提交订单</div>
    </div>

    <transition name="slide">
      <uAddress v-show="addressShow" :addressList="addressArray" @handleSelect="handleSelect"></uAddress>
    </transition>

    <transition name="slide">
      <uInoince v-show="invoinceShow" :invoiceList="invoinceArray" @selectInvoice="handleSelectInvoice"></uInoince>
    </transition>

    <transition name="slide">
      <uCoupon v-show="couponShow" :amount="formatMoney(payable)" :usableList="couponArray.filter(n => { return n.useThreshold <= this.totalPrice })" :unusableList="couponArray.filter(n => { return n.useThreshold >= this.totalPrice })" @handleSelectCoupon="handleSelectCoupon" @changeCoupon='changeCoupon'></uCoupon>
    </transition>

    <!-- 支付 -->
    <uPay :payMethodShow='payMethodShow' :orderId='orderId' :env='env' @payClose='payClose'></uPay>

  </div>
</template>
<script>
import api from '~/utils/request'
import uAddress from '~/components/Address'
import uInoince from '~/components/Invoice'
import uCoupon from '~/components/Coupon'
import uPay from '~/components/Pay'
import { Toast } from 'vant'
import tools from '~/utils/tools'

export default {
  name: 'submit',
  layout: 'default',

  components: {
    uAddress,
    uInoince,
    uCoupon,
    uPay
  },

  computed: {
    payable () {
      let c = +this.couponSelected.faceValue || 0 // 优惠卷
      let p = +this.fullSub // 活动满减
      // console.log(p)
      let s = +this.rewardMoney || 0
      this.maxReward = this.totalPrice - c - p
      if (this.maxReward > this.rewardNow) {
        this.maxReward = this.rewardNow
      }
      return (this.totalPrice + this.totalFreight - this.reduceFreight - c - p - s)
    },
    clearHead () {
      // 防止物理返回键导致navTitle没有重置
      let title = this.navTitle
      if (!this.addressShow && !this.couponShow && !this.invoinceShow) {
        title = ''
      }
      return title
    }
  },

  async asyncData (req) {
    return api.all([
      api.serverGet('/api/shippingAddress/listAll', {}, req), // 地址
      api.serverGet('/api/order/calcFreight?time=' + new Date().getTime(), {}, req), // 运费
      api.serverGet('/api/promotion/get', null, req), // 活动
      // api.serverGet('/api/coupon/listForUsable', {}, req), // 优惠券
      api.serverGet('/api/invoice/listAll', {}, req), // 发票信息
      api.serverGet('/api/reward/getTotalActualAmount/', null, req) // hi币总额
    ])
      .then(api.spread(function (res1, res2, res3, res4, res5) {
        // 检测用户环境是否为微信浏览器,0为非微信,1为微信
        const ua = req.req.headers['user-agent']
        let env = 0
        if (/MicroMessenger/.test(ua)) {
          // 检测用户设备
          env = 1
        }
        if (res1.code === 506 || res2.code === 506 || res3.code === 506 || res4.code === 506) {
          if (env === 1) {
            return req.redirect('/home')
          } else {
            return req.redirect('/account/login')
          }
        }
        let a = []
        let b = []
        if (res2.code === 200) {
          res2.data.freightList.forEach((item) => {
            a.push({ logisticsCompany: item.logisticsCompany, list: [] })
          })
          a.forEach((item, index) => {
            item.list.push(...res2.data.goodsList.filter(n => { return n.logistics === item.logisticsCompany }))
            item.list.push(...res2.data.packList.filter(n => { return n.logistics === item.logisticsCompany }))
          })

          // 不可配送
          b.push(...res2.data.goodsList.filter(n => !n.ifDistribute))
          b.push(...res2.data.packList.filter(n => !n.ifDistribute))
        }
        console.log('res1', res1.data)
        // console.log(res2.data)
        // console.log('res2', res2)

        // 获取默认收货地址
        let defaultAdress = res1.data.find(v => v.ifDefault) || {}
        return {
          env: env, // 用户浏览器环境
          addressArray: res1.data, // 所有可选的收货地址
          addressSelected: defaultAdress,
          reduceFreight: res2.data.reduceFreight || 0, //
          totalFreight: res2.data.totalFreight || 0, // 总运费
          totalPrice: res2.data.totalPrice || 0, // 商品合计
          reductionStrategy: res2.data.reductionStrategy || {}, // 减免策略
          promotion: res3.data || {},
          productList: a,
          goodsNoSend: b,
          // usableCouponCount: s.length || 0, // 可用优惠券数量
          // couponArray: s, // 优惠卷
          invoinceArray: res4.data,
          rewardNow: res5.data // hi币总额
        }
      }))
  },

  head () {
    return {
      title: '填写订单',
      meta: [
        { hid: 'title', name: 'title', content: '填写订单' }
      ]
    }
  },

  data () {
    return {
      env: 0, // 用户浏览器,微信或者非微信

      fullScreen: false,
      navTitle: '',
      navTxt: '',
      // 活动
      promotion: {},
      // 地址
      addressShow: false,
      addressSelected: {},
      addressArray: [],
      // 优惠券
      couponShow: false,
      couponSelected: {},
      couponArray: [],
      usableCouponCount: 0, // 可用优惠券数量
      usableList: [],
      // 发票
      invoinceShow: false,
      invoinceSelected: {},
      invoinceArray: [],
      // 费用信息
      reduceFreight: 0,
      totalFreight: 0,
      totalPrice: 0,
      reductionStrategy: {}, // 减免策略
      ifReduction: false,
      // hi钱币
      rewardNow: 0, // 现有hi币
      rewardMoney: 0, // 使用hi币
      maxReward: 0, // 最大hi币额度
      // 活动优惠 全场满减
      fullSub: 0,
      msg: '', // 留言信息
      payMethodShow: false, // 支付弹框
      // 支付方式
      payMethod: 0,
      // 生成的订单id
      orderId: null,

      productList: [],
      goodsNoSend: []
    }
  },

  watch: {
    $route (to, from) {
      if (to.hash === '') {
        this.addressShow = false
        this.couponShow = false
        this.invoinceShow = false
        this.fullScreen = false
        this.navTitle = ''
        this.navTxt = ''
      } else if (to.hash === '#address') {
        this.addressShow = true
      } else if (to.hash === '#coupon') {
        this.couponShow = true
      } else if (to.hash === '#invoice') {
        this.invoinceShow = true
      }
    }
  },

  async mounted () {
    const { code } = await api.clientGet('/api/order/calcFreight?time=' + new Date().getTime(), {})
    if (code === 60004 || code === 506) {
      this.$toast('该商品已过期，请到购物车重新下单或者完成之前的订单')
      setTimeout(() => {
        if (this.orderId) {
          window.location.href = '/order/detail?id=' + this.orderId
        } else {
          window.location.href = '/order/cart'
        }
      }, 1000)
    } else if (code === 10026) {
      setTimeout(() => {
        this.$dialog.confirm({
          message: '系统检测到您还没有默认收获地址，是否要去填写收货地址'
        }).then(() => {
          window.location.href = '/address/manage?from=submit'
        }).catch(() => {
          window.location.href = '/order/cart'
        })
      }, 1000)
    }
    await api.clientGet('/api/coupon/listForUsable', { amount: this.totalPrice }).then(response => {
      if (response.code === 200) {
        this.couponArray = response.data
        this.usableCouponCount = response.data.length
      }
    })
    console.log('reductionStrategy', this.reductionStrategy)
    if (this.promotion.promotionName && this.totalPrice >= this.promotion.threshold) {
      this.fullSub = this.promotion.amount
      this.fullSubCache = this.promotion.amount
      this.promotionId = this.promotion.id
      this.promotionIdCache = this.promotion.id
    }
    // 减免策略
    let { minimumCost, ifDeliveryIncluded, reduceMoney } = this.reductionStrategy
    if (this.totalPrice > minimumCost) {
      this.ifReduction = true
      this.reduceFreight = ifDeliveryIncluded ? this.totalFreight : reduceMoney >= this.totalFreight ? this.totalFreight : reduceMoney
    }
  },

  methods: {
    ioskeyborad () {
      window.scroll(0, 0)
    },
    openAddress () {
      this.addressShow = true
      this.fullScreen = true
      this.navTitle = '选择地址'
      this.navTxt = '管理'
      window.location.hash = 'address'
    },
    async handleSelect (val) {
      this.addressSelected = val
      this.addressShow = false
      this.fullScreen = false
      this.navTitle = ''
      const toast1 = Toast.loading({ mask: true, message: '数据获取中', duration: 0 })
      const { code, data } = await api.clientGet('/api/order/calcFreight', { areaId: val.city.split(',')[1] })
      if (code === 200) {
        // console.log(data)
        // 可配送
        this.productList = []
        data.freightList.forEach((item) => {
          this.productList.push({ logisticsCompany: item.logisticsCompany, list: [], listNoSend: [] })
        })
        this.productList.forEach((item, index) => {
          item.list.push(...data.goodsList.filter(n => { return n.logistics === item.logisticsCompany }))
          item.list.push(...data.packList.filter(n => { return n.logistics === item.logisticsCompany }))
        })
        // 不可配送
        this.goodsNoSend = []
        this.goodsNoSend.push(...data.goodsList.filter(n => !n.ifDistribute))
        this.goodsNoSend.push(...data.packList.filter(n => !n.ifDistribute))
        toast1.clear()
      }
    },

    openInvoice () {
      this.invoinceShow = true
      this.fullScreen = true
      this.navTitle = '选择发票信息'
      this.navTxt = '管理'
      window.location.hash = 'invoice'
    },
    handleSelectInvoice (val) {
      this.fullScreen = false
      this.navTitle = ''
      this.navTxt = ''
      if (val.id === this.invoinceSelected.id) {
        this.invoinceSelected = {}
      } else {
        this.invoinceSelected = val
      }
      this.invoinceShow = false
    },

    changeCoupon (val) {
      this.couponArray = val
      this.usableCouponCount = val.length
    },

    openCoupon () {
      // if (this.usableCouponCount === 0) return
      this.couponShow = true
      this.fullScreen = true
      this.navTitle = '选择优惠卷'
      window.location.hash = 'coupon'
    },
    handleSelectCoupon (val) {
      this.couponShow = false
      this.fullScreen = false
      this.navTitle = ''
      this.couponSelected = val
      // 不选择优惠劵
      if (val === '') {
        this.promotionId = this.promotionIdCache || null
        this.fullSub = this.fullSubCache || 0
        console.log(this.fullSub)
      } else {
        // 选择优惠劵
        // 当优惠卷不可以与全场满减活动叠加时
        if (!this.promotion.ifAccumulated && this.totalPrice >= this.promotion.threshold) {
          this.promotionId = null
          this.fullSub = 0
          this.$toast('该满减活动与优惠卷不可叠加，请在两者选一项')
        }
      }
    },

    async submitOrder () {
      if (!this.addressSelected.id) {
        return this.$toast('请选择收货地址')
      }
      if (this.goodsNoSend.length !== 0) {
        return this.$toast('您的订单中含有不在配送范围内商品，请返回购物车修改')
      }
      let obj = {
        shippingAddressId: this.addressSelected.id, // 收货地址id
        remark: this.msg, // 留言
        invoiceId: this.invoinceSelected.id, // 发票信息id
        promotionId: this.promotionId || '', // 优惠活动id
        couponId: this.couponSelected.couponId || null, // 优惠卷id
        hiCoinReduction: this.rewardMoney, // hi币抵扣
        totalFeight: this.totalFreight - this.reduceFreight, // 实际运费
        source: 2 // 来源: 1:PC 2:移动端 3:APP
      }
      // 如果是hi币全额支付
      if (this.payable === 0 && this.rewardMoney) {
        // this.payHimoney = true
        this.$dialog.confirm({
          title: '支付提示',
          message: '当前支付方式为hi币全额付款,是否确认付款?'
        }).then(async () => {
          // on confirm
          const toast2 = Toast.loading({ mask: true, message: '订单生成中', duration: 0 })
          const { code, data } = await api.clientPostJson('/api/order/order', obj)
          if (code === 200) {
            toast2.clear()
            this.orderId = data.orderid
            window.location.href = '/order/result?orderId=' + this.orderId
          } else {
            this.$toast(data)
          }
        }).catch(() => {
        })
      } else {
        // 非hi币，普通支付
        const toast2 = Toast.loading({ mask: true, message: '订单生成中', duration: 0 })
        const { code, data } = await api.clientPostJson('/api/order/order', obj)
        if (code === 200) {
          toast2.clear()
          this.payMethodShow = true
          this.orderId = data.orderid
        } else {
          this.$toast(data)
        }
      }
    },

    async payClose (val) {
      this.payMethodShow = val
      if (!this.payMethodShow) {
        const toast3 = Toast.loading({ mask: true, message: '正在跳转到订单页面', duration: 0 })
        setTimeout(() => {
          window.location.href = '/order/detail?id=' + this.orderId
          toast3.clear()
        }, 1000)
      }
    },

    historyBack () {
      this.fullScreen = false
      this.navTitle = ''
      this.navTxt = ''
      if (this.addressShow) {
        this.addressShow = false
        window.history.go(-1)
        // window.location.hash = ''
        return
      }
      if (this.invoinceShow) {
        this.invoinceShow = false
        window.history.go(-1)
        // window.location.hash = ''
        return
      }
      if (this.couponShow) {
        this.couponShow = false
        window.history.go(-1)
        // window.location.hash = ''
        return
      }
      window.location.href = '/order/cart'
    },

    handleNumChange () {
      console.log(this.maxReward)
      if (this.rewardMoney === undefined) this.rewardMoney = 0
      this.rewardMoney = this.formatMoney(this.rewardMoney)
    },

    jump () {
      if (this.invoinceShow) {
        window.location.href = '/invoice/list'
      }
      if (this.addressShow) {
        window.location.href = '/address/manage?from=submit'
      }
      if (this.invoinceShow) {
        window.location.href = '/invoice/manage?from=submit'
      }
    },

    formatMoney (a) {
      return tools.money(a)
    }
  }
}
</script>
<style lang="less">
.van-nav-bar {
  width: 100%;
  position: fixed;
}
.m-order-submit {
  position: relative;
  min-height: 100vh;
  background: @cor_border;
  font-size: 0;
  padding-bottom: 50px;
  box-sizing: border-box;
  overflow: hidden;
  &.fullScreen {
    height: 0vh;
    min-height: 0vh;
    overflow: hidden;
    box-sizing: border-box;
    padding-bottom: 0;
  }
  .m-section-position {
    margin-top: 46px;
    height: 65px;
    background: #FFFFFF;
    position: relative;
    font-size: 15px;
    color: @cor_333;
    padding-left: 67px;
    &::before {
      content: '';
      display: block;
      width: 17px;
      height: 21px;
      background-image: url('../../assets/img/order/icon-position.png');
      background-size: cover;
      background-position: center;
      position: absolute;
      top: 50%;
      left: 23px;
      transform: translate(0, -50%);
    }
    span {
      line-height: 65px;
    }
    .address-info {
      padding-top: 14px;
      .head {
        display: flex;
        align-items: center;
        .title {
          font-size: 15px;
          color: @cor_333;
          padding-right: 15px;
        }
        .default-badge {
          color: #FF5B1F;
          font-size: 9px;
          padding: 2px;
          border: 1PX solid #FF5B1F;
          border-radius: 2px;
        }
      }
      .address {
        margin-top: 10px;
        font-size: 13px;
        color: @cor_666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
      }
    }
  }

  .m-section-cell {
    padding: 0 20px;
    padding-top: 10px;
    background: #FFFFFF;
    margin-bottom: 10px;
    &-item {
      position: relative;
      padding: 20px 0 20px 0;
      display: flex;
      align-items: center;
      &:not(:last-child) {
        border-bottom: 1PX solid @cor_border;
      }
      .label {
        flex: 1;
        font-size: 15px;
        font-color: @cor_333;
        .tip {
          padding-left: 10px;
          color: @cor_999;
          font-size: 13px;
        }
      }
      .content {
        font-size: 14px;
        color: @cor_999;
        .badge {
          display: inline-block;
          vertical-align: bottom;
          padding: 2px;
          background: #FB6248;
          border-radius: 2px;
          color: white;
          font-size: 11px;
          margin-right: 6px;
        }
      }
      .van-stepper {
        padding-right: 10px;
      }
    }
    .msg {
      position: relative;
      padding: 20px 0 20px 0;
      h4 {
        font-size: 15px;
        color: #333;
        font-weight: normal;
      }
      textarea {
        width: 100%;
        margin: 0.4rem 0 0.53333rem 0;
        font-size: 0.4rem;
        line-height: 1.5;
        color:#333;
      }
      span {
        color: #C7C7C7;
        font-size: 0.37333rem;
        position: absolute;
        right: 0;
        bottom: 26px;
      }
    }
  }

  .m-section-product {
    background: #fff;
    margin-bottom: 10px;
    &-logistics {
      height: 35px;
      line-height: 35px;
      background: #F5F5F5;
      font-size: 13px;
      color: @cor_333;
      padding-left: 20px;
      margin-bottom: 10px;
    }

    &-li {
      .pack-title {
        border-top: 1PX solid @cor_border;
        border-bottom: 1PX solid @cor_border;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        margin-bottom: 10px;
        &.mt-10 {
          margin-top: 10px;
        }
        &-left {
          font-size: 15px;
          color: @cor_333;
        }
        &-right {
          font-size: 17px;
          color: #F99C00;
        }
      }
    }

    &-item {
      padding: 10px 0;
      margin: 0 20px;
      display: flex;
      &-pro {
        border: 1PX solid @cor_border;
        border-radius: 4px;
        width: 78px;
        height: 88px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      &-content {
        width: 230px;
        display: inline-block;
        vertical-align: top;
        padding-left: 15px;
        .title {
          font-size: 15px;
          color: @cor_333;
          line-height: 25px;
          height: 50px;
          overflow: hidden;
          display: flex;
          align-items: center;
          word-break: break-all;
        }
        .desc {
          margin-top: 6px;
          font-size: 13px;
          color: @cor_666;
          .price {
            font-size: 17px;
            color: #F99C00;
            font-family: Impact;
            float: right;
          }
        }
      }
    }

  }

  .m-section-bottom {
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
    background: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    display: flex;
    align-items: flex-start;
    font-size: 0;
    &-left {
      flex: 1;
      font-size: 15px;
      color: @cor_333;
      line-height: 50px;
      padding-left: 20px;
      .total {
        font-size: 19px;
        color: #F99C00;
        font-family: Impact;
      }
    }
    &-right {
      width: 120px;
      height: 100%;
      line-height: 50px;
      text-align: center;
      background: #03A1CD;
      font-size: 15px;
      color: white;
    }
  }

  .more-link {
    &.small {
      padding-right: 32px;
      &:after {
        right: 10px;
      }
    }
    &:after {
      content: '';
      display: block;
      width: 6px;
      height: 9px;
      background-image: url('../../assets/img/order/icon-arrow-right.png');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      top: 50%;
      right: 30px;
      transform: translate(0, -50%);
    }
  }
}
.m-layout > div:first-child {
  transition: none;
}
</style>
