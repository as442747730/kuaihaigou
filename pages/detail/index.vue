<template>
  <main class="u-detail">

    <section class="u-detail_header">
      <van-nav-bar title="商品详情" left-arrow>
        <van-icon name="fenxiang" slot="right" />
        <van-icon name="collect" slot="right" />
      </van-nav-bar>
    </section>

    <section class="u-detail_info">

      <div class="u-detail_banner">
        <div v-swiper:mySwiper="swiperBanner">
          <div class="swiper-wrapper">
            <div class="swiper-slide banner-list">
              <div class="banner-list-box">
                <div class="pro">
                  <img src="~/assets/img/img.png">
                </div>
              </div>
            </div>
            <div class="swiper-slide banner-list">
              <div class="banner-list-box">
                <div class="pro">
                  <img src="~/assets/img/img.png">
                </div>
              </div>
            </div>
            <div class="swiper-slide banner-list">
              <div class="banner-list-box">
                <div class="pro">
                  <img src="~/assets/img/img.png">
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-page">
            <span class="point active"></span>
            <span class="point"></span>
            <span class="point"></span>
          </div>
        </div>
      </div>

      <div class="u-detail_info-desc margin-30">
        <h2 class="limit_one">法国1982拉菲法国1982拉菲传奇Lafite</h2>
        <p>750ml | 日常餐酒 | 紧致单宁</p>
        <em class="price">
          ¥ 399
        </em>
        <div class="to-compare">
          去对比
        </div>
      </div>
    </section>

    <div class="u-detail_line"></div>

    <section class="u-detail_choose">
      <div class="u-detail_choose-item" @click="skuShow = true">
        <span>选择规格</span>
        <div class="choose-txt">
          <p class="ib-middle">礼盒装</p>
          <i class="van-icon ib-middle van-icon-arrow"></i>
        </div>
      </div>
      <div class="u-detail_choose-item" @click="packShow = true">
        <span>套餐购买</span>
        <div class="choose-txt">
          <p class="ib-middle">查看</p>
          <i class="van-icon ib-middle van-icon-arrow"></i>
        </div>
      </div>
    </section>

    <div class="u-detail_line"></div>

    <section class="u-detail_tab">
      <ul class="tab-item">
        <li class="tab-list cur">
          <span>图文详情</span>
        </li>
        <li class="tab-list">
          <span>酒评参数</span>
        </li>
        <li class="tab-list">
          <span>评价提问</span>
        </li>
        <li class="tab-list">
          <span>售后服务</span>
        </li>
      </ul>
    </section>

    <!-- 内容模块 -->
    <article class="u-goods-content">
      <div class="goods-details">
        <div class="title">
          <p>Goods details</p>
          <h3>商品详情</h3>
        </div>
      </div>
    </article>
    <!-- 底栏 -->
    <van-goods-action>
      <van-goods-action-mini-btn icon="kefu" text=" " @click="onClickefu" />
      <van-goods-action-mini-btn icon="cart2" text=" " @click="onClickMiniBtn" />
      <van-goods-action-big-btn text="加入购物车" @click="onClickBigBtn" />
      <van-goods-action-big-btn text="立即购买" @click="onClickBigBtn" primary />
    </van-goods-action>
    <!-- 规格弹窗 -->
    <van-actionsheet v-model="skuShow" title="选择规格">
      <div class="sku-wrap">
        <div class="goods-info">
          <div class="pro ib-middle">
            <img src="~/assets/img/img.png">
          </div>
          <div class="desc ib-bottom">
            <div class="price">
              ¥399
            </div>
            <div class="selected">
              已选：【普通装】
            </div>
          </div>
        </div>
        <div class="sku-item">
          <h4 class="sku-title">包装</h4>
          <div class="sku-item-ul">
            <div class="sku-list cur">
              <span class="sku-name">普通装</span>
            </div>
            <div class="sku-list">
              <span class="sku-name">礼盒装</span>
            </div>
          </div>
        </div>
        <div class="sku-item">
          <h4 class="sku-title">包装</h4>
          <div class="sku-item-ul">
            <div class="sku-list cur">
              <span class="sku-name">普通装</span>
            </div>
            <div class="sku-list">
              <span class="sku-name">礼盒装</span>
            </div>
          </div>
        </div>
        <div class="sku-num">
          <h4>数量</h4>
          <van-stepper :min="1" v-model="num" :integer="true" />
        </div>
      </div>
    </van-actionsheet>
    <!-- 套餐弹窗 -->
    <van-actionsheet v-model="packShow" title="选择套餐">
      <div class="sku-wrap pack-wrap">
        <div class="goods-info">
          <div class="pro ib-middle">
            <img src="~/assets/img/img.png">
          </div>
          <div class="desc ib-bottom">
            <div class="price">
              ¥399
            </div>
            <div class="selected">
              已选：【套餐一】
            </div>
          </div>
        </div>
        <div class="sku-item">
          <h4 class="sku-title">包装</h4>
          <div class="sku-item-ul">
            <div class="sku-list cur">
              <span class="sku-name">普通装</span>
            </div>
            <div class="sku-list">
              <span class="sku-name">礼盒装</span>
            </div>
            <div class="sku-list">
              <span class="sku-name">礼盒装</span>
            </div>
            <div class="sku-list">
              <span class="sku-name">礼盒装</span>
            </div>   
          </div>
        </div>
        <div class="pack-goods-bill">
          <span>商品清单：</span>
          <p>法国1982拉菲法国1982拉菲传奇Lafite + 开瓶器 + 红酒玻璃九件套 + 套餐商品A +套餐商品B + 套餐商品C</p>
        </div>
        <div class="sku-num">
          <h4>数量</h4>
          <van-stepper :min="1" v-model="num" :integer="true" />
        </div>
      </div>
    </van-actionsheet>

  </main>
</template>
<script>
// import api from '~/utils/request'

export default {
  data () {
    return {
      skuShow: false,
      packShow: false,

      num: 10,
      active: 1,

      swiperBanner: {
        speed: 600,
        slidesPerView: 'auto',
        on: {
          slideChangeTransitionStart: function (swiper) {
            document.querySelectorAll('.point').forEach(el => {
              el.classList.remove('active')
            })
            document.getElementsByClassName('swiper-page')[0].querySelectorAll('.point')[this.activeIndex].classList.add('active')
          }
        }
        // watchSlidesProgress: true,
        // on: {
        //   setTransition: function() {
        //   },
        //   progress: function(progress) {
        //     var swiper = this
        //     for (var i = 0; i < swiper.slides.length; i++) {
        //       var slideProgress = swiper.slides[i].progress
        //       console.log(slideProgress)
        //       swiper.slides[i].querySelector(".banner-list-box").style.opacity = slideProgress + 1
        //     }
        //   }
        // }
      }
    }
  },

  methods: {
    onClickMiniBtn () {
      console.log(1)
    },
    onClickBigBtn () {
      console.log(2)
    },
    onClickefu () {
      console.log(3)
    }
  }

}
</script>
<style lang="less" scoped>
.u-detail {
  margin-bottom: 50px;
  &_banner {
    padding-left: 25px;
    .swiper-page {
      position: absolute;
      width: 100%;
      text-align: center;
      bottom: 10px;
      left: -10px;
      z-index: 11;
      span {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 0 5px;
        background: #000;
        opacity: .15;
        &.active {
          opacity: .5
        }
      }
    }
  }
  .banner-list {
    width: 315px;
    margin-left: 5px;
    &.swiper-slide-active {
      .banner-list-box {
        transform: scale(1);
        &:after{
          opacity: 0;
        }
      }     
    }
    &:last-child {
      width: 350px;
    }
    &-box {
      border-radius: 8px;
      border: 1px solid #e6e6e6;
      box-sizing: border-box;
      width: 315px;
      height: 350px;
      transform: scale(.94);
      transition: transform ease .6s;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        border-radius: 8px;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: .1;
        background: #000;
        transition: opacity .6s;
        transform: translateZ(0);
      }
    }
    .pro {
      width: 100%;
      height: 350px;
      text-align: center;
      line-height: 350px;
      img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
      }
    }
  }
  &_info {
    font-size: 0;
    margin-top: 15px;
    &-desc {
      margin-bottom: 25px;
      position: relative;
      margin-top: 20px;
      h2 {
        font-size: 17px;
        color: #333;
      }
      p {
        font-size: 14px;
        color: #999;
        margin: 12px 0 10px;
      }
      .price {
        font-size: 19px;
        font-style: normal;
        font-family: 'Impact';
        color: #F99C00
      }
      .to-compare {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 78px;
        height: 31px;
        line-height: 33px;
        border: 1px solid #c7c7c7;
        border-radius: 18px;
        text-align: center;
        color: #333;
        font-size: 13px;
      }
    }
  }
  &_line {
    height: 10px;
    background: #f5f5f5; 
  }
  &_choose {
    padding: 0px 30px; 
    &-item {
      padding: 25px 0; 
      font-size: 15px;
      &:last-child {
        padding: 0 0 025px 0; 
      }
      span {
        color: #333;
        font-weight: bold;
        font-family: 'PingFang-SC-Medium'
      }
      .choose-txt {
        float: right;
        p {
         color: #666; 
         margin-right: 10px;
        }
        i {
          color: #333;
          font-weight: bold;
          font-size: 10px;
        }
      }
    }
  }
  .sku-wrap {
    padding: 0 20px 86px; 
    .goods-info {
      padding: 20px 0 0;
      margin-bottom: 30px;
      .pro {
        width: 100px;
        height: 100px;
        border: 1px solid #e6e6e6;
        line-height: 100px;
        text-align: center;
        img {
          max-height: 100%;
          max-width: 100%;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .desc {
        margin-bottom: 16px;
        margin-left: 14px;
        .price {
          font-family: 'Impact';
          color: #F99C00;
          font-size: 19px;
        }
        .selected {
          margin-top: 10px;
          font-size: 13px;
          color: #666;
        }
      }
    }
    // sku信息
    .sku-item {
      h4 {
        margin: 10px 0 20px;
        font-size: 15px;
        color: #333;
        font-family: 'PingFang-SC-Medium';
      }
      .sku-list {
        margin-right: 15px; 
        display: inline-block;
        width: 158px;
        height: 38px;
        line-height: 40px;
        text-align: center;
        background: #FCFCFC;
        border: 1px solid #f1f1f1;
        font-size: 13px;
        color: #333;
        font-weight: bold;
        margin-bottom: 20px;
        &:nth-child(2n) {
          margin-right: 0
        }
        &.cur {
          background: #DEF3F9;
          color: #03A1CD;
          border-color: transparent;
        }
      }
    }
    .sku-num {
      margin-top: 10px;
      h4 {
        font-size: 15px;
        display: inline-block;
        vertical-align: top;
        margin-top: 6px;
      }
      .van-stepper {
        float: right;
      }
    }
  }
  .pack-wrap {
    .pack-goods-bill {
      font-size: 0;
      span {
        color: #333;
        font-weight: bold;
        font-size: 13px;
      }
      p {
        margin-top: 6px;
        font-size: 12px;
        color: #666;
        line-height: 22px;
      }
    }
    .sku-num {
      margin-top: 30px;
    }
  }
  .van-goods-action {
    z-index: 9999;
  }

  &_tab {
    .tab-item {
      padding: 0 30px; 
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1px solid #f1f1f1;
    }
    .tab-list {
      font-size: 13px;
      color: #ccc;
      font-weight: bold;
      font-family: 'PingFang-SC-Medium';
      position: relative;
      &.cur {
        color: #333;
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -16px;
          margin-left: -10px;
          width: 20px;
          height: 2px;
          background: #333;
        }
      }
    }
  }
}
.u-goods-content {
  overflow: hidden;
  font-size: 0;
  .title {
    text-align: center;
    margin: 20px 0;
    position: relative;
    &:after {
      content: '';
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 7px;
      height: 1px;
      background: #ddd;
      z-index: -1;
    }
    h3 {
      font-size: 15px;
      color: #333;
      font-family: 'PingFangSC-Semibold';
      font-weight: bold;
      width: 96px;
      background: #fff;
      display: inline-block;
    }
    p {
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 5px;
      font-size: 12px;
      color: #ddd;
      font-family: 'PingFangSC-Semibold';
    }
  }
}
</style>