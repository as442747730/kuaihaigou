<template>
  <div class="m-cart">

    <div class="m-cart-ul">

      <div class="m-cart-li" v-for="(item, index) in goodsList" :key="index">
        <!-- 普通商品 -->
        <div class="m-cart-li-item flex-center box-gutter" v-if="!item.packName">
          <van-checkbox v-model="item.chosen"></van-checkbox>
          <div class="content">
            <img :src="item.imgUrl" alt="" width="90" height="100">
            <div class="info">
              <p class="title">{{ item.goodsName }}</p>
              <div class="flex-jcsb" v-if="item.skuName">
                <span class="sku">{{ item.skuName }}</span>
                <span class="sku right">选规格</span>
              </div>
              <div class="flex-jcsb">
                <van-stepper :min="1" v-model="item.num" :integer="true" />
                <span class="price">￥{{ (+item.num) * (+item.unitPrice) }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 套餐 -->
        <div class="m-cart-li-item" v-else>
          <div class="top">
            <div class="top-flex">
              <van-checkbox v-model="item.chosen"></van-checkbox>
              <div class="top-name">{{ item.packName }}</div>
              <van-stepper v-model="item.num" :min="1" :integer="true" />
            </div>
            <p class="top-price">￥{{ (+item.unitPrice) * (+item.num) }}</p>
          </div>
          <div class="product-wrapper">
            <div class="content" v-for="(good, idx) in item.cartGoodsList" :key="idx">
              <img src="../../assets/img/img2.png" alt="" width="90" height="100">
              <div class="info">
                <p class="title">{{ good.goodsName }}</p>
                <p class="desc">{{ good.skuName }}</p>
                <p class="desc">{{ good.num }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="m-cart-bottom">
      <div class="m-cart-bottom-left">
        <van-checkbox v-model="chooseAll" @change="toggleChooseAll">全选</van-checkbox>
        <span class="total">合计：</span><span class="price">￥{{ total }}</span>
      </div>
      <div class="m-cart-bottom-right active-status" @click="settlement">去结算</div>
    </div>

  </div>
</template>
<script>
import api from '~/utils/request'

export default {
  name: 'cart',
  layout: 'default',

  head () {
    return {
      title: '我的购物车',
      meta: [
        { hid: 'title', name: 'title', content: '我的购物车' }
      ]
    }
  },

  computed: {
    total () {
      let t = 0
      this.goodsList.forEach((item) => {
        if (item.chosen) {
          t += (+item.num) * (+item.unitPrice)
        }
      })
      return t
    }
  },

  async asyncData (req) {
    return api.serverGet('/api/cart/getCart', {}, req).then((res) => {
      console.log(res.data[0].cartGoodsList)
      if (res.code === 506) {
        window.location.href = '/account/login'
      }
      res.data.forEach((item) => {
        item.chosen = false
      })
      return { goodsList: res.data }
    })
  },

  data () {
    return {
      chooseAll: false,

      goodsList: [
        { chosen: false, goodsName: '法国1982拉菲法国1982拉菲传奇Lafite', skuName: '单瓶/普通装', num: 1, price: 260, cover: 'fsdfdsfsdf.jpg' },
        { chosen: false, packName: '法国1982拉菲-套餐A', price: 244, itemList: [{ goodsName: '法国1982拉菲法国1982拉菲传奇Lafite', skuName: '单瓶/普通装', num: 1, imgUrl: 'sdfsdf' }, { goodsName: '法国1982拉菲法国1982拉菲传奇Lafite', skuName: '单瓶/普通装', num: 1, imgUrl: 'sdfsdf' }] }
      ]
    }
  },

  methods: {
    toggleChooseAll (val) {
      this.goodsList.forEach((item) => {
        item.chosen = val
      })
    },

    async settlement () {
      if (this.total === 0) return
      const { code } = await api.clientGet('/api/coupon/listForUsable', { amount: this.total })
      if (code === 200) {
        let r = []
        this.goodsList.forEach((item) => {
          if (item.chosen) {
            if (item.packid) {
              r.push({ num: item.num, packid: item.packid })
            } else {
              r.push({ goodsid: item.goodsid, num: item.num, skuid: item.skuid })
            }
          }
        })
        const { c, d } = await api.clientPostJson('/api/order/readyToSettle', { orderDetailReqList: r })
        if (c === 200) {
          if (d.length !== 0) {
            // 有库存不足的商品
            // todo
            this.$toast('购物车中有库存不足的商品')
          } else {
            // 可以提交订单
            window.location.href = '/order/submit'
          }
        }
      }
    }
  }

}
</script>
<style lang="less" scoped>
.m-cart {
  position: relative;
  min-height: 100vh;
  &-ul {
    padding-bottom: 60px;
    .m-cart-li {
      background: white;
      margin-bottom: 10px;
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
        .top {
          padding-bottom: 15px;
          border-bottom: 1px solid #EEEEEE;
          padding: 30px 20px 15px 10px;
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
            padding-left: 20px;
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
            border: 1px solid #E6E6E6;
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
              margin-top: 8px;
              .sku {
                color: #999999;
                font-size: 13px;
                &.right {
                  color: #333333;
                }
              }
              .price {
                font-size: 19px;
                color: #F99C00;
                font-family: Impact;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
  }
  &-bottom {
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
      font-size: 13px;
      color: #333333;
      line-height: 50px;
      padding-left: 10px;
      display: flex;
      align-items: center;
      .van-checkbox {
        font-size: 13px;
      }
      .total {
        font-size: 15px;
        padding-left: 24px;
        color: #333333;
      }
      .price {
        font-family: Impact;
        font-size: 19px;
        color: #F99C00;
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
}
</style>