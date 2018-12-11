<template>
  <div class="m-order-evaluation">

    <!-- <div class="eval-item" v-for="item in list" :key="item.id"> -->
    <div class="eval-item">

      <div class="product-wrapper">
        <!-- 普通商品 -->
        <!-- <div class="product" v-if="!item.packName"> -->
        <div class="product">
          <div class="cover" style="background-image: url(~@/assets/img/img2.png)"></div>
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
        <!-- <div class="package">
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
        </div> -->
      </div>

      <div class="content">
        <textarea class="content-input" placeholder="说说你对商品的评价与感触吧～"></textarea>
        <!-- <van-uploader :after-read="afterRead" accept="image/gif, image/jpeg" multiple>
          <van-icon name="photograph" />
        </van-uploader> -->
        <Upload>
          <van-icon name="photograph" ></van-icon>
        </Upload>
      </div>


    </div>

  </div>
</template>
<script>
import Upload from '~/components/Upload'

export default {
  name: '',

  layout: 'default',

  components: { Upload },

  head () {
    return {
      title: '发布评价',
      meta: [
        { hid: 'title', name: 'title', content: '发布' }
      ]
    }
  },

  data () {
    return {
      list: []
    }
  },

  methods: {
    afterRead (file, content) {
      console.log(file)
      console.log(content)
    }
  }
}
</script>
<style lang="less" scoped>
.m-order-evaluation {
  background: @cor_border;
  min-height: 100vh;
  .eval-item {
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
        height: 100px;
      }
    }
  }
}
</style>
