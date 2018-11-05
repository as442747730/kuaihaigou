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
        <br>
        <div class="active">
          全场满88元免邮
        </div>
      </div>
    </section>

    <div class="u-detail_line"></div>

    <!-- 配送 -->
    <div class="u-detail_send">
      <div class="ib-middle">
        <i></i>
        <span>广东 广州</span>
      </div>
      <div class="choose-txt">
        <p class="ib-middle">可配送</p>
        <i class="van-icon ib-middle van-icon-arrow"></i>
      </div>
    </div>

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

    <div class="u-detail_line" id="local"></div>

    <section class="u-detail_tab">
      <ul class="tab-item">
        <li class="tab-list" :class="{'cur': tabIndex === 1}" @click="chooseType(1)">
          <span>图文详情</span>
        </li>
        <li class="tab-list" :class="{'cur': tabIndex === 2}" @click="chooseType(2)">
          <span>酒评参数</span>
        </li>
        <li class="tab-list" :class="{'cur': tabIndex === 3}" @click="chooseType(3)">
          <span>评价提问</span>
        </li>
        <li class="tab-list" :class="{'cur': tabIndex === 4}" @click="chooseType(4)">
          <span>售后服务</span>
        </li>
      </ul>
    </section>

    <section class="u-detail_tab hidden" :class="{'show': tabFixed}">
      <ul class="tab-item">
        <li class="tab-list" :class="{'cur': tabIndex === 1}" @click="chooseType(1)">
          <span>图文详情</span>
        </li>
        <li class="tab-list" :class="{'cur': tabIndex === 2}" @click="chooseType(2)">
          <span>酒评参数</span>
        </li>
        <li class="tab-list" :class="{'cur': tabIndex === 3}" @click="chooseType(3)">
          <span>评价提问</span>
        </li>
        <li class="tab-list" :class="{'cur': tabIndex === 4}" @click="chooseType(4)">
          <span>售后服务</span>
        </li>
      </ul>
    </section>

    <!-- 内容模块 -->
    <transition name='slide-fade2' mode="out-in">
      <component v-bind:is="view"></component>
    </transition>

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
import bannerImg from '~/assets/img/home/img_home_335x180@2x.png'
import uGraphic from '~/pages/detail/graphic'
import uParame from '~/pages/detail/parame'
import uComment from '~/pages/detail/comment'
import uAfter from '~/pages/detail/after'

export default {
  components: {
    uGraphic,
    uParame,
    uComment,
    uAfter
  },

  head () {
    return {
      title: '商品详情',
      meta: [
        { hid: 'title', name: 'title', content: '商品详情' }
      ]
    }
  },

  data () {
    return {
      bannerImg: bannerImg,
      isQuestion: false,
      // 初始化数据
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
      },

      active: 1,
      view: uGraphic,
      tabIndex: 1,
      tabFixed: false,
      // 功能数据
      skuShow: false,
      packShow: false,
      num: 10
    }
  },

  mounted () {
    this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    this.scrollTimer = null
    let that = this
    window.addEventListener('scroll', this.handleScroll(function () {
      let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      let tabOffsetTop = document.querySelector('.u-detail_tab').offsetTop
      // 距离底部大约200像素
      // let nowPosition = scrollTop + this.windowHeight
      if (scrollTop >= tabOffsetTop) {
        that.tabFixed = true
      } else {
        that.tabFixed = false
      }
    }))
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
    },
    handleScroll (fn) {
      let Switch = true
      return function () {
        if (!Switch) return
        Switch = false
        setTimeout(() => {
          fn.apply(this, arguments)
          Switch = true
        }, 300)
      }
    },
    chooseType (val) {
      this.isQuestion = false
      this.tabIndex = val
      this.goAnchor('#local')
      switch (val) {
        case 1:
          this.view = 'uGraphic'
          break
        case 2:
          this.view = 'uParame'
          break
        case 3:
          this.view = 'uComment'
          break
        case 4:
          this.view = 'uAfter'
          break
      }
    },
    // 锚点跳转
    goAnchor (selector) {
      let anchor = this.$el.querySelector(selector)
      document.body.scrollTop = anchor.offsetTop
    }
  }

}
</script>
<style lang="less">
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
      border: 1PX solid #e6e6e6;
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
        top: 35px;
        width: 78px;
        height: 31px;
        line-height: 33px;
        border: 1PX solid #c7c7c7;
        border-radius: 18px;
        text-align: center;
        color: #333;
        font-size: 13px;
      }
      .active {
        margin-top: 10px;
        display: inline-block;
        padding: 5px 6px;
        color: #fff;
        font-size: 11px;
        font-weight: bold;
        font-family: 'PingFangSC-Medium';
        border-radius: 2px;
        background:rgba(251,98,72,1)
      }
    }
  }
  &_line {
    height: 10px;
    background: #f5f5f5; 
  }
  &_send {
    padding: 19px 30px;
    font-size: 0;
    .ib-middle {
      i {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        width: 14px;
        height: 17px;
        background: url('~/assets/img/icons/ic_position_b_18x18@2x.png') no-repeat center/contain
      }
      span {
        vertical-align: middle;
        display: inline-block;
        font-weight: bold;
        font-size: 15px;
        font-family: 'PingFangSC-Semibold';
        color: #333;
      }
    }
    .choose-txt {
      float: right;
      p {
       color: #666; 
       margin-right: 10px;
       font-size: 15px;
      }
      i {
        color: #333;
        font-weight: bold;
        font-size: 10px;
      }
    }
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
        border: 1PX solid #e6e6e6;
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
        border: 1PX solid #f1f1f1;
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
    &.hidden {
      visibility: hidden;
      position: fixed;
      z-index: 99;
      left: 0;
      top: 0;
      width: 100%;
      background: #fff;
      transform: translateY(-140%);
      transition: ease .6s;
    }
    &.show {
      visibility: visible;
      transform: none;
      box-shadow: -1PX -12px 11px 9px #131313;
    }
    .tab-item {
      padding: 0 30px; 
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1PX solid #f1f1f1;
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
  .van-modal {
    z-index: 2000!important
  }
}
.u-goods-content {
  overflow: hidden;
  font-size: 0;
  .content {
    img {
      max-width: 100%;
      height: auto;
    }
  }
  .customs {
    .u-detail-title h3 {
      width: 130px!important;
    }
    &-wrap {
      p {
        margin: 10px 0 20px;
        text-align: center;
        color: #4285F4;
        font-size: 13px;
        font-family: 'PingFang-SC-Medium';
        font-weight: bold;
      }
      .swiperCustoms {
        padding-left: 25px;
        margin-bottom: 14px;
      }
      .swiperThumbs {
        left: -260px;
        width: 629px;
      }
    }
  }
  .customs-list {
    width: 315px;
    margin-left: 5px;
    &.swiper-slide-active {
      .customs-list-box {
        transform: scale(1);
      }     
    }
    &:last-child {
      width: 350px;
    }
    &-box {
      border-radius: 8px;
      border: 1PX solid #e6e6e6;
      box-sizing: border-box;
      width: 315px;
      height: 400px;
      transform: scale(.94);
      transition: transform ease .6s;
    }
    .pro {
      width: 100%;
      height: 400px;
      text-align: center;
      line-height: 400px;
      img {
        width: auto;
        height: 100;
        vertical-align: middle;
      }
    }
  }
  .customs-thumbs-list {
    width: 60px;
    height: 72px;
    .full {
      transition: transform ease .6s;
      transform: scale(.9);
      position: relative;
      &:after {
        content: '';
        opacity: .4;
        transition: opacity .6s;
        background: #000;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
    &.swiper-slide-active {
      margin-right: 5px;
      margin-left: 5px;
      .full {
        transform: scale(1);
        &:after {
          opacity: 0;
        }
      }
    }
  }
}

.u-detail-title {
  text-align: center;
  margin: 26px 0 23px;
  position: relative;
  &:after {
    content: '';
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 7px;
    height: 1PX;
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

.u-detail-loading {
  text-align: center;
  background: #f5f5f5;
  color: rgba(0, 0, 0, .5);
  margin: 30px 0 0;
  .van-loading {
    padding: 15px 0; 
    display: inline-block;
    vertical-align: middle;
  }
  p {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 10px;
  }
}
.van-dialog {
  z-index: 10001!important
}
.van-modal {
  z-index: 10000!important
}
.van-actionsheet__item {
  height: 50px;
  &:first-child {
    border-bottom: 6px solid #e6e6e8;
    span {
      color: #D0352D
    } 
  }
  span {
    font-size: 17px;
    color: #000;
  }
}
</style>