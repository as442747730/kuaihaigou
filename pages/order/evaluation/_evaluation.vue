<template>
  <div class="m-order-evaluation">

    <div class="eval-item" v-for="(item, index) in list" :key="index">

      <div class="product-wrapper">
        <!-- 普通商品 -->
        <div class="product" v-if="!item.packName">
          <div class="cover" v-lazy:background-image="require('~/assets/img/img2.png')"></div>
          <div class="info">
            <p class="title">法国1982拉菲法国1982拉菲传奇Lafite</p>
            <div class="desc">
              <span>单瓶/普通装</span>
              <span class="price">¥260.0</span>
            </div>
            <p class="desc">x1</p>
          </div>
        </div>
        <!-- 套餐 -->
        <div class="package" v-else>
          <div class="top">法国1982拉菲法国1982拉菲传奇套餐<span>￥233</span></div>
          <div class="container">
            <div class="item">
              <div class="cover" style="background-image: url(~@/assets/img/img2.png)"></div>
              <div class="info">
                <p class="title">法国1982拉菲法国1982拉菲传奇Lafite</p>
                <div class="desc">单瓶/普通装</div>
                <p class="desc">x1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <textarea v-model="item.content" class="content-input" placeholder="说说你对商品的评价与感触吧～"></textarea>
        <ImageHandler v-model="item.imgList"></ImageHandler>
      </div>

      <div class="rate-wrapper">
        <span>商品评分</span>
        <van-rate v-model="item.rate" :size="18" color="#FC6249" void-color="#DFDFDF"></van-rate>
      </div>
    </div>


    <div class="checkbox-wrapper">
      <van-checkbox v-model="ifAnonymous">匿名提交</van-checkbox>
    </div>

    <div class="btn-wrapper fit">
      <van-button class="submit-btn" @click="submitEvalua">提交</van-button>
    </div>

  </div>
</template>
<script>
import { orderApi } from '~/api/order'
import ImageHandler from '~/components/evaluation/ImageHandler'
<<<<<<< HEAD
=======
// import { ImagePreview } from 'vant'
>>>>>>> 0face60a9dbe20b909fa75bc6a82fbef43f6d14b

export default {
  name: '',

  layout: 'default',

  components: { ImageHandler },

  head () {
    return {
      title: '发布评价',
      meta: [
        { hid: 'title', name: 'title', content: '发布' }
      ]
    }
  },

  async asyncData (req) {
    orderApi.getEvaluationInfo(req.params.evaluation, req).then(res => {
      if (res.code === 506) {
        req.redirect('/account/login')
      }
      if (res.code === 200) {
        console.log(res.data)
        const a = res.data.orderItemList
        a.forEach(n => {
          n.content = ''
          n.imgList = []
          n.rate = 0
        })
        return { list: a, orderId: res.data.id }
      } else {
        req.redirect('/error')
      }
    })
  },

  data () {
    return {
      orderId: null,
      list: [],
      ifAnonymous: false
    }
  },

  methods: {
    async submitEvalua () {
      let reqObj = []
      const v = this
      reqObj = this.list.map(n => { return { content: n.content, evaluationLevel: n.rate, goodsId: n.id, ifAnonymous: v.ifAnonymous, imgs: JSON.stringify(n.imgList), orderId: v.orderId } })
      const { code } = await orderApi.submitEvaluation(reqObj)
      if (code === 200) {
        this.$toast.success('提交成功')
        window.location.href = '/order/list'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.m-order-evaluation {
  background: @cor_border;
  min-height: 100vh;
  padding-bottom: 20px;
  .eval-item {
    margin-bottom: 30px;
    .product-wrapper {
      background: white;
      margin-bottom: 10px;
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
        background-size: cover;
        box-sizing: border-box;
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
    .content {
      background: white;
      margin-bottom: 10px;
      padding: 20px;
      &-input {
        box-sizing: border-box;
        width: 100%;
        font-size: 15px;
        line-height: 20px;
        height: 100px;
        margin-bottom: 20px;
        &::placeholder {
          color: #C7C7C7;
        }
      }
      .image-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .img-item {
          width: 70px;
          height: 70px;
          border-radius: 5px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          transition: 0.2s;
          .img-close-btn {
            position: absolute;
            left: -7px;
            top: -5px;
            width: 20px;
            height: 20px;
            display: block;
            border-radius: 100%;
            background: white;
            font-size: 0;
          }
        }
        .upload-box {
          width: 70px;
          height: 70px;
          box-sizing: border-box;
          border-radius: 5px;
          background: @cor_border;
          padding-top: 42px;
          text-align: center;
          font-size: 11px;
          color: #C7C7C7;
          background-image: url('~/assets/img/order/icon-add.png');
          background-size: 16px 16px;
          background-position: center 18px;
          background-repeat: no-repeat;
        }
      }
    }
    .rate-wrapper {
      padding: 30px 20px 20px 20px;
      background: white;
      display: flex;
      align-items: center;
      font-size: 0;
      span {
        color: @cor_333;
        font-size: 15px;
        margin-right: 13px;
      }
    }
  }
  .checkbox-wrapper {
    margin-bottom: 45px;
    font-size: 14px;
    padding: 0 20px;
    color: @cor_666;
  }
  .btn-wrapper {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;
    &.fit {
      padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
      padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    }
    .submit-btn {
      width: 100%;
      height: 50px;
      display: block;
      background: #03A1CD;
      border: none;
      color: white;
    }
  }
}
</style>
