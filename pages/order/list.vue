<!-- 
   * 订单状态说明 orderStatus
   1、 待支付
   2、 支付成功,待发货
   3、 发货中
   4、 待收货
   5、 待评价
   6、 交易流程已完成
   7、 已关闭（超时/取消订单)

   * 可申请售后状态 -> 5.6
   * 可申请退款状态 -> 2.3.4

   commentStatus 评价状态
   1、未评价
   2、已评价
   3、已追评

   canComment 不允许评价
 -->
<template>
  <div class="m-order-list">

    <uTabs :list="tabList" @on-change="handleTab"></uTabs>

    <van-pull-refresh class="u-pull" v-model="isLoading" @refresh="refresh" :loading-text="'刷新中'">
      <div class="order-wrapper">

        <div class="order-item" v-for="item in orderList">

          <div class="top">
            <p class="left">订单编号：{{ item.orderIdentify }}</p>
            <!-- '待付款', '待发货', '发货中', '待收货', '待评价', '已完成', '已关闭'] -->
            <p class="right">{{ statusTxt[+item.status - 1] }}</p>
          </div>

          <div class="good-wrapper good-li" v-for="p in item.orderItemList">
            <!-- 普通商品 -->
            <div class="good-li-item flex-center box-gutter" v-if="!p.packName">
              <div class="content">
                <img v-lazy="p.goodsImg" alt="" width="90" height="100">
                <div class="info">
                  <p class="title font_medium">{{ p.goodsName }}</p>
                  <div class="flex-jcsb" v-if="p.skuName">
                    <span class="sku">{{ p.skuName }}</span><span class="price">￥{{ p.price }}</span>
                  </div>
                  <p class="num">x{{ p.num }}</p>
                </div>
              </div>
            </div>
            <!-- 套餐 -->
            <div class="good-li-item" v-else>
              <div class="top top-pack">
                <div class="top-flex">
                  <div class="top-name font_medium">{{ p.packName }}</div>
                </div>
                <p class="top-price">￥{{ p.packPrice }}</p>
              </div>
              <div class="product-wrapper">
                <div class="content" v-for="(good, idx) in p.goodsList" :key="idx">
                  <img v-lazy="good.goodsImg" alt="" width="90" height="100">
                  <div class="info">
                    <p class="title font_medium">{{ good.goodsName }}</p>
                    <p class="desc">{{ good.skuName }}</p>
                    <p class="desc">{{ good.num }} 件/套</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="result">共{{ item.totalNum }}件商品 总额：￥{{ item.balanceAmount }}</div>

          <div class="bottom">

            <div class="u-button small inline default" v-if="item.status >= 3 && item.status !== 7" @click="checkLogis(item.id)">查看物流</div>

            <!-- <div class="u-button small inline default" v-if="item.status >= 2 && item.status < 7" @click='toAfterSale(item.id)'>{{ item.status === 2 || item.status === 3 || item.status === 4 ? '申请退款' : '申请售后'}}</div> -->
            <div class="u-button small inline default" v-if="(item.status === 6 || item.status === 7)" @click="deleteOrder(item.id)">删除订单</div>

            <div class="u-button small inline default" v-if="item.status === 1" @click="cancelOrder(item.id)">取消订单</div>

            <template v-if='(item.status === 5 || item.status === 6) && item.canComment' style="display:inline-block">
              <div class="u-button small inline" v-if="item.commentStatus === 1" @click="toComment(item.id)">评价商品</div>
              <div class="u-button small inline green" v-if='item.commentStatus === 2' @click="toAddComment(item.id)">去追评</div>
            </template>

            <div class="u-button small inline" v-if="item.status === 4" @click="confirmReceive(item.id)">确认收货</div>

            <div class="u-button small inline red" v-if="item.status === 1" @click="toPay(item.id)">马上支付</div>

            <div class="u-button small inline" @click="getDetail(item.id)">订单详情</div>
          </div>
        </div>
        <div class="empty" v-if="orderList.length === 0">暂无更多订单</div>

      </div>

      <div class='more-loading' v-show='pageLoding'>
        <van-loading type="spinner" />
        <p>正在加载更多</p>
      </div>

      <div class="no-more" v-show='pageEmpty'>
        <p>没有更多订单了！</p>
      </div>
    </van-pull-refresh>

  </div>
</template>

<script>
import { orderApi } from '~/api/order'
import api from '~/utils/request'
import uTabs from '@/components/Tabs'

export default {
  name: '',
  layout: 'default',

  components: { uTabs },

  head () {
    return {
      title: '我的订单',
      meta: [
        { hid: 'title', name: 'title', content: '我的订单' }
      ]
    }
  },

  async asyncData (req) {
    return api.serverGet('/api/order/paginate', { page: 1, count: 10 }, req).then((res) => {
      // orderApi.getOrderList({ page: 1, count: 10 }, req).then((res) => {
      console.log(res.code)
      if (res.code === 506) {
        req.redirect('/account/login')
      }
      if (res.code === 200) {
        return { orderList: res.data.array }
      } else {
        req.redirect('/error')
      }
    })
  },

  data () {
    return {
      statusTxt: ['待付款', '待发货', '发货中', '待收货', '待评价', '已完成', '已关闭'],

      tabList: [
        { name: '全部', key: 'all' },
        { name: '待付款', key: '1' },
        { name: '待收货', key: '4' },
        { name: '待评价', key: '5' }
      ],

      isLoading: false,

      orderList: [],

      status: null,
      currentPage: 1,

      isBottom: false,
      pageEmpty: false,
      pageLoding: false
    }
  },

  watch: {
    isBottom (val) {
      if (val && !this.pageEmpty && this.orderList.length >= 10) {
        this.currentPage += 1
        this.moreData(this.currentPage)
      }
    }
  },

  mounted () {
    console.log(this.orderList)
    let ele = document.querySelector('.u-pull')
    ele.addEventListener('scroll', this.handleScroll(() => {
      this.eleHeight = ele.clientHeight
      this.scrollHeight = ele.scrollHeight
      let scrollTop = ele.scrollTop
      // 距离底部大约200像素
      if (scrollTop + this.eleHeight >= this.scrollHeight - 200) {
        this.isBottom = true
      } else {
        this.isBottom = false
      }
    }))
    this.pageEmpty = this.orderList.length <= 10 && this.orderList.length !== 0
  },

  methods: {
    handleTab (val) {
      this.currentPage = 1
      this.pageEmpty = false
      this.status = val === 'all' ? null : val
      this.fetchData()
    },
    // 获取订单列表
    async fetchData () {
      this.pageLoding = true
      const Toast1 = this.$toast.loading('数据获取中')
      const { code, data } = await orderApi.getOrderListClient({ page: this.currentPage, count: 10, status: this.status })
      if (code === 200) {
        this.orderList = data.array
        this.pageEmpty = this.orderList.length <= 10 && this.orderList.length !== 0
        Toast1.clear()
        this.pageLoding = false
      }
    },
    // 上拉加载更多
    async moreData () {
      this.pageLoding = true
      const { code, data } = await orderApi.getOrderListClient({ page: this.currentPage, count: 10, status: this.status })
      if (code === 200) {
        this.orderList.push(...data.array)
        if (data.array.length <= 10) {
          this.pageEmpty = true
        }
        this.pageLoding = false
      }
    },
    // 刷新
    async refresh () {
      this.isLoading = true
      this.currentPage = 1
      await this.fetchData()
      this.isLoading = false
      this.pageEmpty = this.orderList.length <= 10 && this.orderList.length !== 0
    },

    cancelOrder (val) {
      this.$dialog.confirm({
        message: '确定取消订单吗？'
      }).then(async () => {
        const { code } = await orderApi.cancelOrder(val)
        if (code === 200) {
          this.$toast.success('取消订单成功')
          this.fetchData()
        }
      })
    },
    confirmReceive (val) {
      this.$dialog.confirm({
        message: '确定确认收货吗？'
      }).then(async () => {
        const { code } = await orderApi.receiveOrder(val)
        if (code === 200) {
          this.$toast.success('确认收货成功')
          this.fetchData()
        }
      })
    },

    deleteOrder (val) {
      this.$dialog.confirm({
        message: '确定删除订单吗？'
      }).then(async () => {
        const { code } = await orderApi.deleteOrder(val)
        if (code === 200) {
          this.$toast.success('订单已删除')
          this.fetchData()
        }
      })
    },

    handleScroll (fn) {
      let Switch = true
      return function () {
        if (!Switch) return
        Switch = false
        setTimeout(() => {
          fn.apply(this, arguments)
          Switch = true
        }, 250)
      }
    },

    getDetail (val) {
      window.location.href = `/order/detail?id=${val}`
    },
    // 去评价
    toComment (val) {
      window.location.href = `/order/evaluation/${val}`
    },
    // 去追评
    toAddComment (val) {
      window.location.href = `/order/evaluation/${val}?type=add`
    },
    // 去售后
    // toAfterSale (val) {
    //   window.location.href = `/order/aftersale/${val}`
    // },
    // 查看物流
    checkLogis (val) {
      window.location.href = `/order/logistics/${val}`
    },
    // 去支付
    toPay (val) {
      window.location.href = `/order/detail?id=${val}&type=pay`
    }
  }
}
</script>

<style lang="less" scoped>
.m-order-list {
  background: @cor_border;
  min-height: 100vh;
  .u-pull {
    height: calc(~'100vh - 45px');
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .order-wrapper {
    .empty {
      font-size: 14px;
      color: @cor_999;
      text-align: center;
      height: 200px;
      line-height: 80px;
    }
    .order-item {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      .top {
        background: white;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        margin-bottom: 1PX;
        .left {
          color: @cor_666;
          font-size: 13px;
        }
        .right {
          color: #FB6248;
          font-size: 13px;
        }
      }
      .result {
        border-left: 4PX solid #03A0CB;
        background: white;
        font-size: 13px;
        color: @cor_333;
        text-align: right;
        margin-top: 1PX;
        margin-bottom: 1PX;
        padding: 12px 0;
        padding-right: 15px;
      }
      .bottom {
        background: white;
        padding: 15px 15px 15px 0;
        padding-right: 20px;
        text-align: right;
        font-size: 0;
        &>div {
          margin: 0 5px; 
        }
      }
    }

    .good-wrapper {
      background: white;
    }
    .good-li {
      background: white;
      margin-bottom: 1PX;
      .box-gutter {
        padding: 25px 20px 25px 10px;
      }
      &-item {
        font-size: 0;
        line-height: 1;
        &.flex-center {
          display: flex;
          align-items: center;
        }
        .top-pack {
          border-bottom: 1PX solid #EEEEEE;
        }
        .product-wrapper {
          padding: 0 20px 25px 40px;
          .content {
            padding: 20px 0;
            border-bottom: 1PX solid #eee;
            &:last-child {
              border-bottom: 0;
              padding-bottom: 0;
            }
            .desc {
              font-size: 13px;
              color: #999999;
              margin-top: 10px;
            }
          }
        }
        .top-flex {
          font-size: 15px;
          color: #333333;
          display: flex;
          align-items: center;
          .top-name {
            flex: 1;
            // padding-left: 20px;
          }
        }
        .top-price {
          color: #F99C00;
          font-size: 17px;
          font-family: Impact;
          padding-left: 40px;
          margin-top: 6px;
        }
        .content {
          flex: 1;
          display: flex;
          img {
            border: 1PX solid #E6E6E6;
            margin-left: 15px;
            border-radius: 3px;
          }
          .info {
            flex: 1;
            vertical-align: top;
            margin-left: 15px;
            .title {
              font-size: 15px;
              line-height: 22px;
              color: #333333;
            }
            .flex-jcsb {
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              .sku {
                color: #999999;
                font-size: 13px;
                &.right {
                  color: #333333;
                }
              }
              .price {
                font-size: 17px;
                color: #F99C00;
                font-family: Impact;
                // line-height: 30px;
              }
            }
            .num {
              margin-top: 10px;
              font-size: 12px;
              color: @cor_666;
            }
          }
        }
      }
    }
  }
}
</style>
