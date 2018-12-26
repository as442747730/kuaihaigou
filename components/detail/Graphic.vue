<template>
  <article class="u-goods-content">
    <!-- 图文详情 -->
    <div class="goods-details">
      <div class="u-detail-title">
        <p>Goods details</p>
        <h3>商品详情</h3>
      </div>
      <div class="content" v-html="viewdata.goodsDetailMobile"></div>
    </div>

    <div class="packing-list">
      <div class="u-detail-title">
        <p>Packing list</p>
        <h3>包装清单</h3>
      </div>
      <div class="content" v-html="viewdata.listDetailMobile"> 
      </div>
    </div>

    <div class="customs">
      <div class="u-detail-title">
        <p>Cost/customs declaration</p>
        <h3>费用／进口清单</h3>
      </div>
      <div class="customs-wrap">
        <!-- <p>关税明细计算方法 ></p> -->

        <div class="swiperCustoms" v-swiper:mySwiper2="swiperCustoms" ref="swiperTop">
          <div class="swiper-wrapper">
            <div class="swiper-slide customs-list"  v-for="(item, index) in viewdata.lists" :key="index">
              <div class="customs-list-box">
                <div class="pro">
                  <img :src="item.imgUrl">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="swiperThumbs" v-swiper:mySwiper3="swiperThumbs" ref="swiperThumbs">
          <div class="swiper-wrapper">
            <div class="swiper-slide customs-thumbs-list" v-for="(small, index) in viewdata.lists" :key="index">
              <div class="full bg" :style="'background: url(' + small.imgUrl + ') no-repeat center/cover'"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- <div class="u-detail-loading" v-if='!parameShow'>
      <van-loading color="rgba(0, 0, 0, .5)" size="20px"/>
      <p>正在加载中...</p>
    </div> -->
    <!-- 推荐 -->
    <u-evaluation :hostlist="hotList" /> 

  </article>
</template>
<script>
import uEvaluation from './Evaluation'
import bannerImg from '~/assets/img/home/img_home_335x180@2x.png'

export default {
  name: 'u-graphic',

  components: {
    uEvaluation
  },

  props: {
    viewdata: Object,
    hotlist: Array
  },

  data () {
    return {
      hotList: this.hotlist,
      bannerImg: bannerImg,
      swiperThumbs: {
        speed: 600,
        // slidesPerView: 6,
        centeredSlides: true,
        slidesPerView: 'auto',
        slideToClickedSlide: true
      },
      swiperCustoms: {
        speed: 600,
        slidesPerView: 'auto'
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
    console.log(this.viewdata, 'viewdata')
  },

  methods: {
  }

}
</script>
