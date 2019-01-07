<!-- 
   * 订单状态说明 orderStatus
   1、 待支付
   2、 支付成功,待发货
   3、 发货中
   4、 待收货
   5、 待评价
   6、 交易流程已完成
   7、 已关闭（超时/取消订单
 -->
<template>
  <div class="m-order-detail" :class="{'mb0': orderDetail.status === 2 || orderDetail.status === 6}">

    <div class="status-wrapper" :style="`background-image: url(${require(`@/assets/img/order/icon-status-${iconType}.png`)})`">{{ statusTxt[orderDetail.status - 1] }}</div>

    <div class="notice-bar" v-if="orderDetail.status === 1">{{ timeCount }}后未支付，此订单将自动关闭</div>

    <div class="logi-wrapper" v-if="orderDetail.status >= 3 && orderDetail.status !== 7" @click='logisHandle'>
      <template v-if='orderDetail.status === 3 || orderDetail.status === 4'>
        <p class="title">您的订单已进入库房，准备出库<i></i></p>
        <p class="date">{{ orderDetail.distributionTime }}</p>  
      </template>
      <template v-if='orderDetail.status === 5 || orderDetail.status === 6'>
        <p class="title">感谢您在快海购购物，欢迎再次光临<i></i></p>
        <p class="date">{{ orderDetail.transactionCompleteTime || orderDetail.outStorageTime }}</p>  
      </template>
    </div>

    <div class="address-wrapper">
      <div class="title">
        <span>{{ orderDetail.name }}</span>
        <span>{{ orderDetail.phone }}</span>
      </div>
      <div class="address">{{orderDetail.province | formatPlace }}{{orderDetail.city | formatPlace }}{{orderDetail.district | formatPlace }}{{orderDetail.street | formatPlace }}{{orderDetail.address}}</div>
    </div>

    <div class="good-wrapper">
      <div :class="{'good-item': true, 'gutter': orderDetail.status !== 1 }" v-for="item in orderDetail.orderItemList">
        <!-- 普通商品 -->
        <div class="product" v-if="!item.packName">
          <div class="cover" :style="`background-image: url(${item.goodsImg})`"></div>
          <div class="info">
            <p class="title">{{ item.goodsName }}</p>
            <div class="desc">
              <span>{{ item.skuName }}</span>
              <span class="price">￥{{ item.price }}</span>
            </div>
            <p class="desc">x{{ item.num }}</p>
          </div>
          <div class="product-handler" v-if="orderDetail.status !== 1 && orderDetail.status !== 7 && item.ifEnable">
            <div class="u-button default small inline" @click="goAftersale(item.orderItemId)">{{ orderDetail.status < 5 ? '申请退款' : '申请售后'}}</div>
          </div>
        </div>
        <!-- 套餐 -->
        <div class="package" v-else>
          <div class="top">{{ item.packName }} <span>￥{{ item.packPrice }}</span></div>
          <div class="container">

            <div class="item" v-for="p in item.goodsList" :key="p.id">
              <div class="cover" :style="`background-image: url(${p.goodsImg})`"></div>
              <div class="info">
                <p class="title">{{ p.goodsName }}</p>
                <div class="desc">{{ p.skuName }}</div>
                <p class="desc">x{{ p.num }}</p>
              </div>

              <div class="product-handler pack" v-if="orderDetail.status !== 1 && p.ifEnable">
                <div class="u-button default small inline" @click="goAftersale(p.orderItemId)">{{ orderDetail.status < 5 ? '申请退款' : '申请售后'}}</div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="cost-wrapper">
      <div class="cost-wrapper-item">
        <p>商品合计：¥ {{ orderDetail.totalPrice }}</p>
        <p>运费：¥ {{ orderDetail.totalFreight }}</p>
        <p>优惠券：¥ {{ orderDetail.couponDeduction }}</p>
        <p>Hi币抵扣：¥ {{ orderDetail.hiCoinReduction }}</p>
        <p>活动优惠：¥ {{ orderDetail.fullReduction }}</p>
      </div>
      <div class="cost-wrapper-item" v-if="orderDetail.head">
        <p>发票类型：{{ (orderDetail.headType === 1 ? '个人' : '单位') + (orderDetail.invoiceType === 1 ? '电子' : '纸质') + '发票' }}</p>
        <p>发票抬头：{{ orderDetail.head }}</p>
        <p>发票内容：{{ orderDetail.contentType === 1 ? '酒水' : '购物明细' }}</p>
        <p v-if="orderDetail.invoiceType === 1">收票邮箱：{{ orderDetail.email }}</p>
      </div>
      <div class="cost-wrapper-item">
        <p>订单编号：{{ orderDetail.orderIdentify }} <!-- <span @click="">复制</span> --></p>
        <p>下单时间：{{ orderDetail.submitOrderTime }}</p>
        <p v-if="orderDetail.status !== 1">支付方式：{{ orderDetail.payMethod | getPayment() }}</p>
        <p v-if="orderDetail.status !== 1">实付金额：{{ orderDetail.balanceAmount }}</p>
        <p v-if="orderDetail.status !== 1">付款时间：{{ orderDetail.paymentTime || '-' }}</p>
      </div>
      <!-- <div class="cost-wrapper-total" v-if="orderDetail.status === 1">应付金额：<span>￥ {{ orderDetail.balanceAmount }}</span></div> -->
    </div>

    <div class="bottom-wrapper" v-if='orderDetail.status !== 6 && orderDetail.status !== 2'>
      <div class="cost-wrapper-total" v-if='orderDetail.status !==7'>
        {{ orderDetail.status === 1 ? '应付金额' : '实付金额' }}：<span>￥ {{ orderDetail.balanceAmount }}</span>
      </div>

      <!-- status 1  代付款 -->
      <template v-if="orderDetail.status === 1">
        <div class="u-button small inline default" @click="cancelOrder">取消订单</div>
        <div class="u-button small inline" @click="toPay">马上支付</div>
      </template>

      <div class="u-button small inline default" v-if="orderDetail.status === 3 || orderDetail.status === 4" @click='logisHandle'>查看物流</div>

      <div class="u-button small inline" v-if="orderDetail.status === 4" @click="confirmReceive">确认收货</div>

      <template v-if='(orderDetail.status === 5 || orderDetail.status === 6) && orderDetail.canComment'>
        <div class="u-button small inline" v-if="orderDetail.status === 5" @click="goEvaluation">评价商品</div>
        <div class="u-button small inline" v-if="orderDetail.status === 6" @click="goEvaluationAdd">去追评</div>
      </template>

      <!-- 7 已关闭 -->
      <div class="u-button small inline default" v-if="orderDetail.status === 7" @click="">删除订单</div>

    </div>

    <!-- 支付 -->
    <uPay :payMethodShow='payMethodShow' :orderId='orderId' @payClose='payClose'></uPay>

    <!-- 物流 -->
    <!-- <uLogis v-model='logisOpen' :logisData='orderDetail.deliverBillList'></uLogis> -->
  </div>
</template>

<script>
import { orderApi, afterSaleApi } from '~/api/order'
import uPay from '~/components/Pay'
// import uLogis from '~/components/order/Logistics'
import api from '~/utils/request'

export default {
  name: '',

  layout: 'default',

  components: {
    uPay
    // uLogis
  },

  head () {
    return {
      title: '订单详情',
      meta: [
        { hid: 'title', name: 'title', content: '订单详情' }
      ]
    }
  },

  async asyncData (req) {
    return api.all([
      orderApi.getOrderDetail(req.query.id, req),
      afterSaleApi.getAlreadyComplate(req.query.id, req),
      orderApi.getPayMsgServer(req.query.id, req)
    ]).then(api.spread(function (res1, res2, res3) {
      if (res1.code === 506 || res2.code === 506) {
        req.redirect('/account/login')
      }
      // console.log(res1.data, res2.data)
      let payInfo = {}
      if (res1.code === 200 && res2.code === 200) {
        res1.data.orderItemList.forEach((n, i) => {
          if (!n.packName && res2.data.filter(m => m.orderItemId === n.orderItemId).length !== 0 && res2.data.filter(m => m.orderItemId === n.orderItemId)[0].num === n.num) {
            n.ifEnable = false
          } else {
            n.ifEnable = true
          }
        })
        res1.data.orderItemList.forEach((n, id) => {
          if (n.packName) {
            n.goodsList.forEach((m) => {
              if (res2.data.filter(t => m.orderItemId === t.orderItemId).length !== 0 && m.num === res2.data.filter(t => m.orderItemId === t.orderItemId)[0].num) {
                m.ifEnable = false
              } else {
                m.ifEnable = true
              }
            })
          }
        })
        if (res3.code === 200) {
          payInfo = res3.data
        }
        console.log(payInfo)
        // let payMethodShow = false
        // if (req.query.type === 'pay') {
        //   payMethodShow = true
        // }
        return { orderDetail: res1.data, orderId: req.query.id, payInfo: payInfo, type: req.query.type }
      } else {
        req.redirect('/error')
      }
    }))
  },

  computed: {
    iconType () {
      return this.statusIcon[this.orderDetail.status - 1]
    }
  },

  watch: {
    $route (to, from) {
      if (to.hash === '') {
        this.logisOpen = false
      } else if (to.hash === '#logis') {
        this.logisOpen = true
      }
    }
  },

  data () {
    return {
      orderId: null,

      statusTxt: ['待付款', '待发货', '发货中', '待收货', '待评价', '已完成', '已关闭'],
      statusIcon: ['clock', 'receive', 'receive', 'receive', 'comment', 'success', 'close'],

      orderStatus: null,
      timeCount: '00小时00分00秒',
      orderDetail: {},
      payInfo: {},

      payMethodShow: false,
      type: null,
      // 物流
      logisOpen: false
    }
  },

  mounted () {
    console.log(this.orderDetail)
    if (this.orderDetail.status === 1) {
      this.countTime(parseInt(this.payInfo.timestamp / 1000) + 10)
      if (this.type === 'pay') this.payMethodShow = true
    }
  },

  methods: {
    cancelOrder () {
      this.$dialog.confirm({
        message: '确定取消订单吗？'
      }).then(async () => {
        this.$toast('ssdfsd')
        const { code } = await orderApi.cancelOrder(this.orderId)
        if (code === 200) {
          this.$toast.success('取消订单成功')
          // this.fetchData()
          window.location.reload()
        }
      }).catch(() => {})
    },
    confirmReceive () {
      this.$dialog.confirm({
        message: '确定确认收货吗？'
      }).then(async () => {
        const { code } = await orderApi.receiveOrder(this.orderId)
        if (code === 200) {
          this.$toast.success('确认收货成功')
          // this.fetchData()
          window.location.reload()
        }
      })
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

    toPay () {
      this.payMethodShow = true
    },

    payClose () {
      this.payMethodShow = false
    },
    // 物流查看开关
    logisHandle () {
      // this.logisOpen = true
      // window.location.hash = 'logis'
      window.location.href = `/order/logistics/${this.orderId}`
    },

    goAftersale (val) {
      window.location.href = `/aftersale/application/${val}`
    },

    goEvaluation () {
      window.location.href = `/order/evaluation/${this.orderId}`
    },

    goEvaluationAdd () {
      window.location.href = `/order/evaluation/${this.orderId}?type=add`
    }
  }
}
</script>

<style lang="less" scoped>
.m-order-detail {
  background: @cor_border;
  padding-bottom: 50px;
  min-height: 100vh;
  &.mb0 {
    padding-bottom: 0;
  }
  .status-wrapper {
    background: white;
    height: 193px;
    padding-top: 136px;
    box-sizing: border-box;
    background-position: center 47px;
    background-size: 75px 75px;
    background-repeat: no-repeat;
    margin-bottom: 10px;
    text-align: center;
    font-size: 17px;
    font-weight: bold;
    color: @cor_333;
    // &.clock {
    //   background-image: url('~/assets/img/order/icon-status-clock.png');
    // }
    // &.receive {
    //   background-image: url('~/assets/img/order/icon-status-receive.png');
    // }
    // &.comment {
    //   background-image: url('~/assets/img/order/icon-status-comment.png');
    // }
    // &.success {
    //   background-image: url('~/assets/img/order/icon-status-success.png');
    // }
    // &.close {
    //   background-image: url('~/assets/img/order/icon-status-close.png');
    // }
  }
  .logi-wrapper {
    background: white;
    padding: 30px 20px 20px 60px;
    margin-bottom: 1PX;
    background-image: url('~/assets/img/order/icon-car.png');
    background-size: 35px 35px;
    background-position: 14px 30px;
    background-repeat: no-repeat;
    .title {
      color: @cor_333;
      font-size: 15px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      i {
        width: 12px;
        height: 12px;
        display: block;
        background-image: url('~/assets/img/order/icon-arrow.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .date {
      padding-top: 6px;
      font-size: 13px;
      line-height: 20px;
      color: @cor_666;
    }
  }
  .notice-bar {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #FC6249;
    color: white;
    font-size: 13px;
    position: fixed;
    top: 0;
  }
  .address-wrapper {
    background: white;
    padding: 30px 20px 25px 60px;
    background-image: url('~/assets/img/order/icon-position.png');
    background-size: 17px 21px;
    background-position: 23px 38px;
    background-repeat: no-repeat;
    margin-bottom: 10px;
    .title {
      font-size: 15px;
      color: @cor_333;
      font-weight: bold;
      display: flex;
      align-items: center;
      span:nth-child(2) {
        margin-left: 15px;
      }
    }
    .address {
      font-size: 13px;
      line-height: 20px;
      color: @cor_666;
      margin-top: 6px;
    }
  }
  .good-wrapper {
    margin-bottom: 10px;
    .good-item {
      background: white;
      & + .good-item {
        border-top: 1PX solid @cor_border;
      }
      .product-handler {
        font-size: 0;
        margin-top: 15px;
        width: 100%;
        border-top: 1PX solid @cor_border;
        padding-top: 15px;
        text-align: right;
        box-sizing: border-box;
        &.pack {
          width: 100%;
          padding-bottom: 15px;
        }
      }
      .product {
        padding: 25px 20px 20px 20px;
        display: flex;
        flex-wrap: wrap;
      }
      .package {
        .top {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1PX solid @cor_border;
          font-size: 15px;
          font-weight: bold;
          color: @cor_333;
          .price {
            font-size: 17px;
            font-family: Impact;
            color: @cor_333;
          }
        }
        .container {
          padding: 20px 20px 20px 50px;
          border-bottom: 1PX solid @cor_border;
          .item {
            display: flex;
            flex-wrap: wrap;
            & + .item {
              margin-top: 10px;
            }
          }
        }
      }
      .cover {
        width: 90px;
        height: 100px;
        background-position: center;
        background-size: contain;
        box-sizing: border-box;
        background-repeat: no-repeat;
        border: 1PX solid #F5F5F5;
        border-radius: 5px;
        margin-right: 15px;
      }
      .info {
        flex: 1;
        .title {
          font-size: 15px;
          line-height: 25px;
          color: @cor_333;
          font-weight: bold;
        }
        .desc {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: @cor_666;
          .price {
            font-family: Impact;
            color: @cor_333;
            font-size: 17px;
          }
        }
      }
    }
  }
  .cost-wrapper {
    background: white;
    &-item {
      padding: 20px;
      border-bottom: 1PX solid @cor_border;
      p {
        font-size: 13px;
        color: @cor_666;
        &:not(:last-child) {
          margin-bottom: 20px;
        }
        span {
          margin-left: 10px;
          color: #03A1CD;
          font-size: 11px;
        }
      }
    }
    &-total {
      // text-align: right;
      // padding: 13px;
      margin-top: 8px;
      float: left;
      font-size: 14px;
      color: @cor_333;
      span {
        font-size: 20px;
        color: #F99C00;
        font-family: Impact;
      }
    }
  }
  .bottom-wrapper {
    width: 100%;
    height: 50px;
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    text-align: right;
    padding: 10px 20px;
    box-sizing: border-box;
    font-size: 0;
    .u-button {
      display: inline-block;
      margin: 0 5px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .gutter {
    margin-bottom: 10px;
  }
}
</style>
