<template>
  <div class="m-cart">

    <van-nav-bar title="购物车" left-arrow @click-left='historyBack'>
    </van-nav-bar>

    <div class="m-cart-ul" v-if='goodsList.length !== 0'>

      <div class="m-cart-li" v-for="(item, index) in goodsList" :key="index">
        <!-- 普通商品 -->
        <div class="m-cart-li-item box-gutter" v-if="!item.packName">
          <van-swipe-cell :right-width="70">
            <van-checkbox v-model="item.chosen" checked-color="#03a1cd"></van-checkbox>
            <div class="content">
              <div class="pro">
                <img :src="item.imgUrl" alt="">
              </div>
              <div class="info">
                <p class="title font_medium">{{ item.goodsName }}</p>
                <div class="flex-jcsb">
                  <span class="sku">{{ item.skuName ? '规格：' + item.skuName : '规格：单品' }}</span>
                </div>
                <div class="flex-jcsb">
                  <span class="price font_impact">¥{{ (+item.num) * (+item.unitPrice) }}</span>
                  <van-stepper :min="1" v-model="item.num" :integer="true" @change='handleNumChange(item)'/>
                  <div class="stock-over" v-if='item.enough'>库存不足</div>
                </div>
              </div>
            </div>
            <span class="cart-delete" slot="right" @click='delet(item)'>删除</span>
          </van-swipe-cell>
        </div>
        <!-- 套餐 -->
        <div class="m-cart-li-item" v-else>
          <div class="top">
            <van-swipe-cell :right-width="70">
              <div class="pack-name">
                <van-checkbox v-model="item.chosen" checked-color="#03a1cd" class='ib-middle'></van-checkbox>
                <div class="title ib-middle font_medium">{{ item.packName }}</div>
              </div>
              <div class="top-flex">
                <p class="top-price font_impact">¥{{ (+item.unitPrice) * (+item.num) }}</p>
                <van-stepper v-model="item.num" :min="1" :integer="true" @change='handleNumChange(item)'/>
                <div class="stock-over" v-if='item.empty'>库存不足</div>
              </div>
              <span class="cart-delete" slot="right" @click='delet(item)'>删除</span>
            </van-swipe-cell>
          </div>
          <div class="product-wrapper">
            <div class="content" v-for="(good, idx) in item.cartGoodsList" :key="idx">
              <div class="pro">
                <img :src="good.imgUrl" alt="">
              </div>
              <div class="info">
                <p class="title font_medium">{{ good.goodsName }}</p>
                <p class="desc">{{ good.skuName ? '规格：' + good.skuName : '规格：单品' }}</p>
                <p class="desc">1件/套</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="default-empty full" v-if='goodsList.length === 0' @click='backToGoods'>您的购物车空空如也，赶块去购物吧~</div>

    <div class="m-cart-bottom">
      <div class="m-cart-bottom-left">
        <van-checkbox v-model="chooseAll" @change="toggleChooseAll" checked-color="#03a1cd">全选</van-checkbox>
        <span class="total">合计：</span><span class="price font_impact">¥{{ total }}</span>
      </div>
      <div class="m-cart-bottom-right active-status" @click="settlement">去结算</div>
    </div>

  </div>
</template>
<script>
import { cartApi } from '~/api/cart'

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
    const { code, data } = await cartApi.getCart(req)
    if (code === 200) {
      data.forEach((item) => {
        item.chosen = false
      })
    } else if (code === 506) {
      req.redirect('/account/login')
    }
    return { goodsList: data }
  },

  data () {
    return {
      chooseAll: false,

      goodsList: []
      // goodsList: [
      //   { chosen: false, goodsName: '法国1982拉菲法国1982拉菲传奇Lafite', skuName: '单瓶/普通装', num: 1, price: 260, cover: 'fsdfdsfsdf.jpg' },
      //   { chosen: false, packName: '法国1982拉菲-套餐A', price: 244, itemList: [{ goodsName: '法国1982拉菲法国1982拉菲传奇Lafite', skuName: '单瓶/普通装', num: 1, imgUrl: 'sdfsdf' }, { goodsName: '法国1982拉菲法国1982拉菲传奇Lafite', skuName: '单瓶/普通装', num: 1, imgUrl: 'sdfsdf' }] }
      // ]
    }
  },

  created () {
    console.log(this.goodsList)
  },

  methods: {
    toggleChooseAll (val) {
      this.goodsList.forEach((item) => {
        item.chosen = val
      })
    },
    // 修改购买数量
    async handleNumChange (val) {
      /* 产品分为单品，非套餐（sku），套餐；判断规则为：
         skuid -> 非套餐
         packid -> 套餐
         都没有 -> 单品
      */
      let obj = {}
      if (val.skuid) {
        // 非套餐
        obj = {
          skuNum: val.num,
          skuid: val.skuid
        }
      } else if (val.packid) {
        // 套餐
        obj = {
          packNum: val.num,
          packid: val.packid
        }
      } else {
        // 单品
        obj = {
          goodsNum: val.num,
          goodsid: val.goodsid
        }
      }
      const { code, data } = await cartApi.updateNum(obj)
      if (code === 200) {
        console.log('修改成功')
        if (data) {
          this.$set(val, 'num', data)
          this.$set(val, 'empty', true)
          this.$toast('该商品最大可购买数量为' + data)
        } else {
          this.$set(val, 'empty', false)
        }
        if (data === 0) {
          this.$set(val, 'empty', true)
        }
      } else {
        this.$toast(data)
      }
    },
    // 去结算
    async settlement () {
      if (this.total === 0) return
      const v = this
      let r = []
      v.goodsList.forEach((item) => {
        if (item.chosen) {
          if (item.packid) {
            r.push({ num: item.num, packid: item.packid })
          } else {
            r.push({ goodsid: item.goodsid, num: item.num, skuid: item.skuid })
          }
        }
      })
      const { code, data } = await cartApi.readyToSettle({ orderDetailReqList: r })
      if (code === 200) {
        if (data.length !== 0) {
          // 有库存不足的商品
          data.forEach((v, index) => {
            this.goodsList.find(v2 => {
              if ((v2.skuid === v.skuid) && (v.skuid !== undefined)) {
                this.$set(v2, 'empty', true)
              } else if (v2.packid === v.packid && (v.packid !== undefined)) {
                this.$set(v2, 'empty', true)
              } else if (v2.goodsid === v.goodsid && (v.goodsid !== undefined)) {
                this.$set(v2, 'empty', true)
              }
            })
          })
          this.$toast('购物车中有库存不足的商品')
        } else {
          // 可以提交订单
          console.log('submit')
          window.location.href = '/order/submit'
        }
      }
    },
    // 删除商品
    delet (val) {
      this.$dialog.confirm({
        message: '确定删除吗？'
      }).then(async () => {
        let obj = val.skuid ? {skuid: val.skuid} : val.packid ? {packid: val.packid} : {goodsid: val.goodsid}
        console.log(obj)
        const { code } = await cartApi.deleteGoods(obj)
        if (code === 200) {
          this.$toast('删除成功')
          this.fetchData()
        }
      })
    },

    async fetchData () {
      const { code, data } = await cartApi.getCartClient()
      if (code === 200) {
        data.forEach((item) => {
          item.chosen = false
        })
      } else if (code === 506) {
        window.location.href = '/account/login'
      }
      this.goodsList = data
    },

    backToGoods () {
      window.location.href = '/winecenter'
    },

    historyBack () {
      window.location.href = '/winecenter'
      // window.history.go(-1)
    }
  }
}
</script>
<style lang="less">
.m-cart {
  position: relative;
  min-height: 100vh;
  background: @cor_border;
  &-ul {
    padding-bottom: 50px;
    .m-cart-li {
      background: white;
      margin-bottom: 10px;
      padding-left: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      &-item {
        font-size: 0;
        line-height: 1;
        &.box-gutter .van-swipe-cell__wrapper {
          display: flex;
          align-items: center;
        }
        &.flex-center {
          display: flex;
          align-items: center;
        }
        .top {
          border-bottom: 1PX solid #EEEEEE;
          .pack-name {
            color: #333;
            font-size: 15px;
            .title {
              padding-left: 20px;
            }
          }
          .van-swipe-cell__wrapper {
            padding: 30px 20px 15px 0px;
          }
          .cart-delete {
            line-height: 97px;
          }
        }
        .product-wrapper {
          padding: 10px 20px;
          .content {
            padding: 10px 0;
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
          justify-content: space-between;
          margin-top: 7px;
          position: relative;
          .top-name {
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
          padding: 25px 20px 25px 0px;
          .pro {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            width: 80px;
            height: 90px;
            border: 1PX solid #E6E6E6;
            margin-left: 15px;
          }
          img {
            max-width: 100%;
            max-height: 100%;
          }
          .info {
            flex: 1;
            vertical-align: top;
            margin-left: 15px;
            .title {
              font-size: 15px;
              line-height: 22px;
              color: #333;
              height: 44px;
              overflow: hidden;
            }
            .flex-jcsb {
              display: flex;
              justify-content: space-between;
              margin-top: 7px;
              position: relative;
              .sku {
                color: #999;
                font-size: 13px;
                &.right {
                  color: #333;
                }
              }
              .price {
                font-size: 17px;
                color: #F99C00;
                font-family: Impact;
                line-height: 30px;
              }
              .van-stepper {
                margin-top: 4px; 
              }
            }
          }
        }
        .cart-delete {
          display: block;
          text-align: center;
          width: 70px;
          height: 100%;
          line-height: 152px;
          background: #FB6248;
          color: #fff;
          font-size: 15px;
        }
        .stock-over {
          position: absolute;
          font-size: 13px;
          color: #FB6248;
          right: 12px;
          top: -19px;
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
.van-checkbox .van-checkbox__icon .van-icon {
  color: #fff;
  border-color: #ddd;
  background-color: #ddd;
}
</style>