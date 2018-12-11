<template>
  <div class="m-order-list">


    <uTabs :list="tabList" @on-change="handleTab"></uTabs>

    <van-pull-refresh class="u-pull" v-model="isLoading" @refresh="refresh">
      <div class="order-wrapper">

        <div class="order-item" v-for="item in orderList">

          <div class="top">
            <p class="left">订单编号：{{ item.orderIdentify }}</p>
            <!-- '待付款', '待发货', '发货中', '待收货', '待评价', '已完成', '已关闭'] -->
            <p class="right">{{ statusTxt[+item.status - 1] }}</p>
          </div>

          <div class="good-wrapper good-li" v-for="p in item.goods">
            <!-- 普通商品 -->
            <div class="good-li-item flex-center box-gutter" v-if="!p.packName">
              <div class="content">
                <img :src="p.imgUrl" alt="" width="90" height="100">
                <div class="info">
                  <p class="title">{{ p.goodsName }}</p>
                  <div class="flex-jcsb" v-if="p.skuName">
                    <span class="sku">{{ p.skuName }}</span><span class="price">￥{{ p.price }}</span>
                  </div>
                  <p class="num">x{{ item.num }}</p>
                </div>
              </div>
            </div>
            <!-- 套餐 -->
            <div class="good-li-item" v-else>
              <div class="top top-pack">
                <div class="top-flex">
                  <div class="top-name">{{ p.packName }}</div>
                </div>
                <p class="top-price">￥{{ p.price }}</p>
              </div>
              <div class="product-wrapper">
                <div class="content" v-for="(good, idx) in p.itemList" :key="idx">
                  <img src="~@/assets/img/img2.png" alt="" width="90" height="100">
                  <div class="info">
                    <p class="title">{{ good.goodsName }}</p>
                    <p class="desc">{{ good.skuName }}</p>
                    <p class="desc">{{ good.num }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="result">共1件商品 总额：￥400</div>

          <div class="bottom">
            <div class="u-button small">马上支付</div>

            <div class="u-button small" v-if="item.status === 2 || item.status === 3 || item.status === 4 || item.status === 5 || item.status === 6">{{ item.status === 2 || item.status === 3 || item.status === 4 ? '申请退款' : '申请售后'}}</div>
            <div class="u-button small" v-if="item.status === 1" @click=''>取消订单</div>
            <div class="u-button small">订单详情</div>
            <div v-if='item.status === 5 || item.status === 6' style="display:inline-block">
              <!-- <div class="u-button small" v-if="item.commentStatus === 1"><a :href="">评价</a></div> -->
              <!-- <div class="u-button small green" v-if="item.commentStatus === 2"><a :href="">去追评</a></div> -->
            </div>
            <div class="u-button small" v-if="item.status === 4" @click=''>确认收货</div>
            <div class="u-button small red" v-if="item.status === 1">支付订单</div>
          </div>

        </div>

      </div>
    </van-pull-refresh>

  </div>
</template>

<script>
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

  // async asyncData (req) {
  //   return api.serverGet('/api/order/paginate', { page: 1, count: 10 }, req).then((res) => {
  //     console.log(res.data)
  //     if (res.code === 506) {
  //       req.redirect('/account/login')
  //     }
  //     res.data.forEach((item) => {
  //       item.chosen = false
  //     })
  //     return { goodsList: res.data }
  //   })
  // },

  data () {
    return {
      statusTxt: ['待付款', '待发货', '发货中', '待收货', '待评价', '已完成', '已关闭'],

      tabList: [
        { name: '全部', key: 'all' },
        { name: '待付款', key: 'prep' },
        { name: '待收货', key: 'prec' },
        { name: '待评价', key: 'pree' }
      ],

      isLoading: false,

      /* eslint-disable */
      orderList: [
        { status: 1, 
          goods: [
          {
            goodsName: '法国1982拉菲法国1982拉菲传奇Lafite', skuName: '单瓶/普通装', num: 1, price: 260, cover: 'fsdfdsfsdf.jpg'
          },
          {
            packName: '法国1982拉菲-套餐A', price: 244, itemList: [
            {
              goodsName: '法国1982拉菲法国1982拉菲传奇Lafite', skuName: '单瓶/普通装', num: 1, imgUrl: 'sdfsdf'
            },
            {
              goodsName: '法国1982拉菲法国1982拉菲传奇Lafite', skuName: '单瓶/普通装', num: 1, imgUrl: 'sdfsdf'
            }
          ]
        }]
      }],
      /* eslint-disable */

      currentPage: 1
    }
  },

  methods: {
    handleTab (val) {
      this.fetchData()
    },
    fetchData () {

    },
    // 刷新
    async refresh () {
      const { code, data } = await api.clientGet('api/order/paginate', { page: ++this.currentPage, count: 10 })
      if (code === 200) {
        this.orderList = data.array
      }
    }
  }
}
</script>

<style lang="less" scoped>
.m-order-list {
  background: #F5F5F5;
  min-height: 100vh;
  .u-pull {
    height: calc(~'100vh - 45px');
  }
  .order-wrapper {
    .order-item {
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
        padding: 15px 20px 15px 0;
        padding-right: 20px;
        text-align: right;
        font-size: 0;
        .u-button {
          display: inline-block;
          padding: 0 12px;
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
            margin-top: 20px;
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
