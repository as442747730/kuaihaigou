<template>
  <div class="m-order-submit">

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

    <div class="m-section-product" v-for="(item, index) in productList" :key="index">
      <div class="m-section-product-logistics">快递：{{ item.logisticsCompany }}</div>
      <div class="m-section-product-li" v-for="p in item.list" >

        <template v-if="!p.packName">
          <div class="m-section-product-item">
            <img class="m-section-product-item-img" :src="p.imgUrl" alt="">
            <div class="m-section-product-item-content">
              <p class="title">{{ p.goodsName }}</p>
              <p class="desc">{{ p.skuName }}<span class="price">￥{{ p.price }}</span></p>
              <p class="desc">x{{ p.num }}</p>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="pack-title">
            <div class="pack-title-left">{{ p.packName }}</div>
            <div class="pack-title-right">¥{{ p.price }}</div>
          </div>
          <div class="m-section-product-item bor-top" v-for="(d, i) in p.cartGoodsList" :key="i">
            <img class="m-section-product-item-img" :src="d.imgUrl" alt="">
            <div class="m-section-product-item-content">
              <p class="title">{{ d.goodsName }}</p>
              <p class="desc">{{ d.skuName }}</p>
              <p class="desc">x{{ d.num }}</p>
            </div>
          </div>
        </template>
      </div>

    </div>

    <div class="m-section-cell">
      <div class="m-section-cell-item more-link small" @click="openCoupon">
        <div class="label">优惠券</div>
        <span class="content" v-if="!couponSelected.faceValue">{{ usableCouponCount ? usableCouponCount + '张可用' : '无可用优惠券' }}</span>
        <span class="content" v-else>{{ couponSelected.faceValue }}</span>
      </div>
      <div class="m-section-cell-item">
        <div class="label">优币抵扣<span class="tip">您有Hi币 2222个</span></div>
        <van-stepper ></van-stepper>
      </div>
    </div>

    <div class="m-section-cell">
      <div class="m-section-cell-item">
        <div class="label">商品合计</div>
        <div class="content">￥{{ totalPrice }}</div>
      </div>
      <div class="m-section-cell-item">
        <div class="label">运费</div>
        <div class="content"><div class="badge">满88元包邮</div>￥{{ totalFreight - reduceFreight }}</div>
      </div>
      <div class="m-section-cell-item">
        <div class="label">优惠券</div>
        <div class="content">￥{{ couponSelected.faceValue || 0 }}</div>
      </div>
      <div class="m-section-cell-item">
        <div class="label">优币抵扣</div>
        <div class="content">0</div>
      </div>
      <div class="m-section-cell-item">
        <div class="label">活动优惠</div>
        <!-- <div class="content"><div class="badge" v-if="promotion">{{ promotion.promotionName }}</div>￥{{ promotion.amount }}</div> -->
      </div>
    </div>

    <div class="m-section-cell">
      <div class="m-section-cell-item more-link small" @click="openInvoice">
        <div class="label">发票信息</div>
        <div class="content">{{ invoinceSelected.id ?  (invoinceSelected.invoiceType === 1 ? '纸质' : '电子') + (invoinceSelected.headType === 1 ? '个人' : '单位') + '发票' : '不开发票' }}</div>
      </div>
    </div>

    <div class="m-section-bottom">
      <div class="m-section-bottom-left">应付金额：<span class="total">￥{{ payable }}</span></div>
      <div class="m-section-bottom-right active-status" @click="submitOrder">提交订单</div>
    </div>

    <transition name="slide">
      <uAddress v-show="addressShow" :addressList="addressArray" @handleSelect="handleSelect"></uAddress>
    </transition>

    <transition name="slide">
      <uInoince v-show="invoinceShow" :invoiceList="invoinceArray" @selectInvoice="handleSelectInvoice"></uInoince>
    </transition>

    <transition name="slide">
      <uCoupon v-show="couponShow" :usableList="couponArray.filter(n => { return n.useThreshold <= this.totalPrice })" :unusableList="couponArray.filter(n => { return n.useThreshold >= this.totalPrice })" @handleSelectCoupon="handleSelectCoupon"></uCoupon>
    </transition>

  </div>
</template>
<script>
import api from '~/utils/request'
import uAddress from '~/components/Address'
import uInoince from '~/components/Invoice'
import uCoupon from '~/components/Coupon'

export default {
  name: 'submit',
  layout: 'default',

  components: { uAddress, uInoince, uCoupon },

  computed: {
    payable () {
      let c = +this.couponSelected.faceValue || 0
      // let p = +this.promotion.amount || 0
      // return (this.totalPrice + this.totalFreight - this.reduceFreight - c - p)
      return (this.totalPrice + this.totalFreight - this.reduceFreight - c)
    }
  },

  // transition: {},

  async asyncData (req) {
    return api.all([
      api.serverGet('/api/shippingAddress/listAll', {}, req), // 地址
      api.serverGet('/api/order/calcFreight?time=' + new Date().getTime(), {}, req), // 运费
      api.serverGet('/api/promotion/get', {}, req), // 活动
      api.serverGet('/api/coupon/listForUsable', { amount: 100 }, req), // 优惠券
      api.serverGet('/api/invoice/listAll', {}, req)
    ])
      .then(api.spread(function (res1, res2, res3, res4, res5) {
        if (res1.code === 506 || res2.code === 506 || res3.code === 506 || res4.code === 506 || res5.code === 506) {
          return req.redirect('/account/login')
        }
        // console.log(res1.data)
        // console.log(res2.data)
        console.log(res3.data)
        // console.log(res4.data)

        let a = []
        res2.data.freightList.forEach((item) => {
          a.push({ logisticsCompany: item.logisticsCompany, list: [] })
        })
        a.forEach((item, index) => {
          item.list.push(...res2.data.goodsList.filter(n => { return n.logistics === item.logisticsCompany }))
          item.list.push(...res2.data.packList.filter(n => { return n.logistics === item.logisticsCompany }))
        })
        // console.log(a)

        return {
          addressArray: res1.data, // 所有可选的收货地址
          reduceFreight: res2.data.reduceFreight, //
          totalFreight: res2.data.totalFreight, // 总运费
          totalPrice: res2.data.totalPrice, // 商品合计
          reductionStrategy: res2.data.reductionStrategy, // 减免策略
          promotion: res3.data,
          productList: a,
          usableCouponCount: res4.data.length, // 可用优惠券数量
          couponArray: res4.data,
          invoinceArray: res5.data
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
      reductionStrategy: {},

      productList: []
    }
  },

  methods: {
    openAddress () {
      this.addressShow = true
    },
    async handleSelect (val) {
      this.addressSelected = val
      this.addressShow = false
      const { code, data } = await api.clientGet('/api/order/calcFreight', { areaId: val.city.split(',')[1] })
      if (code === 200) {
        console.log(data)
      }
    },

    openInvoice () {
      this.invoinceShow = true
    },
    handleSelectInvoice (val) {
      if (val.id === this.invoinceSelected.id) {
        this.invoinceSelected = {}
      } else {
        this.invoinceSelected = val
      }
      this.invoinceShow = false
    },

    openCoupon () {
      if (this.usableCouponCount === 0) return
      this.couponShow = true
    },
    handleSelectCoupon (val) {
      this.couponShow = false
      this.couponSelected = val
    },

    async submitOrder () {
      console.log(this.addressSelected)
      if (!this.addressSelected.id) {
        return this.$toast('请选择收货地址')
      }
      this.$toast.loading({ mask: true, message: '提交订单中', duration: 0 })
      const { code, data } = await api.clientPostJson('/api/order/order', {
        shippingAddressId: this.addressSelected.id,
        // remark
        invoiceId: this.invoinceSelected.id,
        promotionId: '', // todo
        couponId: this.couponSelected.couponId
      })
      if (code === 200) {
        this.$toast.clear()
      } else {
        this.$toast(data)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.m-order-submit {
  position: relative;
  min-height: 100vh;
  background: @cor_border;
  font-size: 0;
  padding-bottom: 50px;
  .m-section-position {
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
  }

  .m-section-product {
    background: #FFFFFF;

    &-logistics {
      height: 35px;
      line-height: 35px;
      background: #F5F5F5;
      font-size: 13px;
      color: @cor_333;
      padding-left: 20px;
    }

    &-li {
      .pack-title {
        border-top: 1PX solid @cor_border;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
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
      padding: 20px 0;
      margin: 0 20px;
      // border-bottom: 1px solid #F1F1F1;
      &-img {
        border: 1PX solid @cor_border;
        border-radius: 4px;
        width: 88px;
        height: 98px;
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
        }
        .desc {
          margin-top: 10px;
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
</style>
