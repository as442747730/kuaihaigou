<template>
  <article class="u-goods-comment">
    <div class="detail_comment-tab">
      <ul>
        <li class="cur">客户评价</li>
        <li>客户提问</li>
      </ul>
    </div>
    <div class="detail_comment-satisfy">
      <div class="how-much">
        <em class="ib-middle">872387</em>
        <span class="ib-middle">人购买后满意</span>
        <div class="bar">
          <i class="bar-now" style="width: 50%"></i>
          <p>满意度97.5%</p>
          <div class="fake-p" style="width: 50%">
            <p>满意度97.5%</p>
          </div>
        </div>
      </div>
    </div>

    <div class="u-detail_line"></div>

    <div class="detail_comment-type">
      <ul>
        <li class="cur">优先内容<span>(873)</span></li>
        <li>带图片<span>(362)</span></li>
        <li>全部<span>(3873)</span></li>
      </ul>
    </div>

    <div class="u_comment">
      <ul>
        <li class="u_comment-list" v-for="($v, $k) in testData">
          <div class="header-img ib-middle" style="background-color: #88c3ff"></div>
          <div class="user-infor ib-middle">
            <span class="ib-middle">王小乐leshi</span>
            <br>
            <div class="ib-middle">
              <i class="level" style="background-color: #ff8888"></i>
              <i class="prove" style="background-color: #f79dec"></i>
            </div>
          </div>
          <div class="like_type type1" style="background-color: #7ce4ff"></div>
          <p class="desc">酒是好酒，只是我不会品，但是包装好看啊，不信你看。</p>

          <div class="pro">
            <div v-for="($v2, $k2) in $v.imgList" class="pro-item" :style="'background: url(' + $v2 + ') no-repeat center/cover'" @click='showBigImg($k2, $v.imgList)'></div>
          </div>

          <div class="other">
            <div class="time">2018-10-26</div>
            <div class="fr">
              <span @click='reply()'>回复(10)</span>
              <span>
                <i class="ib-middle"></i>
                <u class="ib-middle">1</u>
              </span>
            </div>
          </div>

          <!-- 追评 -->
          <div class="add-comment">
            <h3>用户33天后追评</h3>
            <p>好好好好，酒色香味都是上品！跟朋友喝了一瓶，剩下的全让盆友掠夺去了，准备再买几箱囤着！</p>
          </div>

          <!-- 官方回复 -->
          <div class="office-comment">
            <p>
              <span>快海购官方：</span>
              感谢您对我们快海购的支持，本着客户至上的原则，我们会努力做好每一个细节，愿我们的红酒能够给您的生活增添色彩，期待您的再次光临，祝您生活愉快！
            </p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 回复框 -->
    <div class="u-reply" v-if='replyShow' :class="{'show': replyShowDelay}">
      <section class="u-detail_header">
        <van-nav-bar title="评论详情" left-arrow @click-left='onClickLeft'>
          <van-icon name="fenxiang" slot="right" />
        </van-nav-bar>
      </section>

    </div>
  </article>
</template>
<script>
import { ImagePreview } from 'vant'

import Img1 from '~/assets/img/bk1.png'

import Img2 from '~/assets/img/green_wine.jpg'

import Img3 from '~/assets/img/home/img_home_335x180@2x.png'

export default {
  name: 'u-comment',

  components: {
  },

  data () {
    return {
      replyShow: false,
      replyShowDelay: false,

      testData: [{
        imgList: [Img1, Img2]
      }, {
        imgList: [Img3]
      }]
    }
  },

  mounted () {
  },

  methods: {
    showBigImg (index, val) {
      ImagePreview({
        images: val,
        startPosition: index,
        onClose () {
        }
      })
    },
    reply () {
      this.replyShow = true
      setTimeout(() => {
        this.replyShowDelay = true
      }, 60)
    },
    onClickLeft () {
      this.replyShowDelay = false
    }
  }
}
</script>
<style lang="less" scoped>
.u-goods-comment {
  font-size: 0;
}
.detail_comment {
  &-tab {
    padding: 13px 0;
    background: #F5F5F5;
    li {
      box-sizing: border-box;
      font-size: 14px;
      width: 50%;
      display: inline-block;
      vertical-align: middle;
      font-family: 'PingFang-SC-Regular';
      border-right: 1px solid #ccc;
      text-align: center;
      color: #666;
      &:last-child {
        border-right: 0;
      }
      &.cur {
        font-weight: bold;
        color: #333;
        font-family: 'PingFangSC-Semibold'
      }
    }
  }
  &-satisfy {
    .how-much {
      padding: 20px;
      em {
        font-weight: bold;
        font-family: 'Impact';
        font-size: 17px;
        color: #F99C00;
      }
      span {
        font-family: 'PingFang-SC-Medium';
        font-size: 11px;
        margin-left: 5px;
      }
      .bar {
        width: 335px;
        height: 20px;
        background: rgba(239,249,252,1);
        border-radius: 10px;
        position: relative;
        line-height: 20px;
        overflow: hidden;
        margin-top: 12px;
        font-size: 11px;
        font-weight: 600;
        text-align: center;
        &-now {
          position: absolute;
          height: 100%;
          left: 0;
          top: 0;
          background: #59C3E1;
          border-radius: 10px;
        }
        p {
          font-family: 'PingFangSC-Semibold';
          color: #59C3E1;
          position: relative;
          z-index: 1;
        }
        .fake-p {
          position: absolute;
          height: 100%;
          left: 0;
          top: 0;
          color: #fff;
          z-index: 2;
          border-radius: 10px;
          overflow: hidden;
          p {
            position: absolute;
            width: calc(10rem - 40px);
            color: #fff;
          }
        }
      }
    }
  }
  &-type {
    padding: 15px 20px;
    border-bottom: 1px solid #f5f5f5;
    li {
      display: inline-block;
      width: 98px;
      height: 28px;
      line-height: 29px;
      border-radius: 4px;
      border: 1px solid #eee;
      margin-right: 10px;
      font-size: 13px;
      font-family: 'PingFang-SC-Medium';
      font-weight: bold;
      text-align: center;
      color: #999;
      &:last-child {
        margin-right: 0;
      }
      span {
        display: inline-block;
        font-size: 12px;
      }
      &.cur {
        color: #333;
        border-color: #000;
      }
    }
  }
}
.u_comment {
  padding: 0 20px;
  overflow: hidden;
  &-list {
    &:first-child {
      margin-top: 30px;
    }
    margin-bottom: 30px;
    .header-img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
    }
    .user-infor {
      span {
        font-size: 15px;
        color: #333;
        font-family: 'PingFangSC-Semibold';
        font-weight: bold;
        margin-bottom: 5px;
      }
      &>div {
        i {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          overflow: hidden;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          display: inline-block;
          margin-right: 5px;
        }
      }
    }
    .like_type {
      float: right;
      background: red;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
    }
    .desc {
      color: #333;
      font-family: 'PingFang-SC-Medium';
      line-height: 25px;
      text-align: justify;
      margin: 13px 0;
      font-size: 15px;
    }
    .pro-item {
      width: 72px;
      height: 72px;
      margin-right: 15px;
      margin-bottom: 15px;
      display: inline-block;
      &:last-child {
        margin-right: 0;
      }
    }
    .other {
      padding-bottom: 22px;
      border-bottom: 1px solid #f1f1f1;
      .time {
        font-size: 12px;
        color: #999;
        display: inline-block;
      }
      .fr {
        margin-top: -5px;
        &>span {
          display: inline-block;
          vertical-align: middle;
          font-family: 'PingFangSC-Medium';
          font-size: 13px;
          font-weight: bold;
          &:last-child {
            margin-left: 19px;
            color: #999;
            position: relative;
            top: -1px;
            i {
              margin-right: 4px;
              display: inline-block;
              width: 16px;
              height: 16px;
              background: url("~/assets/img/Icons/ic_like_b_16x16@2x.png") no-repeat center/contain;
            }
            u {
              margin-top: 3px;
            }
          }
        }
      }
    }
    .add-comment { 
      h3 {
        font-family: 'PingFangSC-Semibold';
        font-size: 12px;
        color: #FB6248;
        margin: 13px 0;
      }
      p {
        font-size: 15px;
        line-height: 25px;
        color: #333;
        font-family: 'PingFang-SC-Medium';
        text-align: justify;
      }
    }
    .office-comment {
      margin-top: 15px;
      padding: 16px 10px;
      background: #fcfcfc;
      border: 1px solid #f1f1f1;
      p {
        text-align: justify;
        font-weight: lighter;
        color: #666;
        font-size: 13px;
        line-height: 23px;
        span {
          color: #333;
        }
      }
    }
  }
}
.u-reply {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(100%);
  transition: ease .5s transform;
  background: #fff;
  &.show {
    transform: none;
  }
}
</style>