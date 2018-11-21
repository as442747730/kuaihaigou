<template>
  <article class="u-goods-comment">
    <div class="detail_comment-tab">
      <ul>
        <li @click='commentShow = true' :class="{'cur': commentShow}">客户评价</li>
        <li @click='commentShow = false' :class="{'cur': !commentShow}">客户提问</li>
      </ul>
    </div>
    <!-- 评价 -->
    <transition name='nav-fade' mode="out-in">
      <div class="detail_comment" v-show='commentShow'>
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
              <van-icon name="fenxiang" slot="right" @click='report' />
            </van-nav-bar>
          </section>

          <div class="u-reply-wrap">
            <div class="floor-host reply-common">
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
            </div>
            <div class="layer-master reply-common">
              <div class="layer-master-item" v-for='($v, $k) in 4'>
                <div class="header-img ib-middle" style="background-color: #88c3ff"></div>
                <div class="user-infor ib-middle">
                  <span class="ib-middle">王小乐leshi</span>
                  <br>
                  <div class="ib-middle">
                    <i class="level" style="background-color: #ff8888"></i>
                    <i class="prove" style="background-color: #f79dec"></i>
                  </div>
                </div>
                <p class="desc">酒是好酒{{ $k }}，只是我不会品，但是包装好看啊，不信你看。</p>
                <div class="other">
                  <div class="time">2018-10-26</div>
                  <div class="fr">
                    <span @click='reply()'>回复</span>
                    <span>
                      <i class="ib-middle"></i>
                      <u class="ib-middle">1</u>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="u-reply-form" id="replay">
            <van-field
              @focus="da"
              class="ib-middle"
              v-model="replay"
              type="textarea"
              :placeholder="placeholder"
              rows="1"
              autosize
              maxlength="40"
            />
            <button class="ib-middle">回复</button>
          </div>
          <!-- 举报 -->
          <van-actionsheet
            class="report"
            v-model="showReport"
            :actions="actions"
            @select="onSelect"
          />
        </div>
      </div>
    </transition>
    <!-- 提问 -->
    <transition name='nav-fade' mode="out-in">
      <u-question v-show='!commentShow' />
    </transition>
  </article>
</template>
<script>
import uQuestion from './_question'

import { ImagePreview } from 'vant'

import Img1 from '~/assets/img/bk1.png'

import Img2 from '~/assets/img/green_wine.jpg'

import Img3 from '~/assets/img/home/img_home_335x180@2x.png'

export default {
  name: 'u-comment',

  components: {
    uQuestion
  },

  data () {
    return {
      // TabIndex: 1,
      commentShow: true,

      replyShow: false,
      replyShowDelay: false,
      placeholder: '向已买过的人提问，4-40字',
      replay: '',

      showReport: false,
      actions: [{
        name: '举报'
      }, {
        name: '取消'
      }],

      testData: [{
        imgList: [Img1, Img2]
      }, {
        imgList: [Img3]
      }]
    }
  },

  mounted () {
  },

  watch: {
    $route (to, from) {
      if (to.hash === '') {
        this.replyShowDelay = false
        document.body.classList = ''
      }
    }
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
      document.body.classList = 'hidden'
      window.location.hash = 'replay'
      this.replyShow = true
      setTimeout(() => {
        this.replyShowDelay = true
      }, 60)
    },
    onClickLeft () {
      document.body.classList = ''
      window.location.hash = ''
      this.replyShowDelay = false
    },
    da () {
      // setTimeout(() => {
      //   alert(document.body.clientHeight)
      // }, 1000)
    },
    report () {
      this.showReport = true
    },
    onSelect (item) {
      if (item.name === '举报') {
        this.showReport = false
        this.$dialog.confirm({
          title: '确定举报此人吗'
        }).then(() => {
          // on confirm
          this.$Toast('举报成功')
        }).catch(() => {
          // on cancel
        })
      } else {
        this.showReport = false
      }
    }
  }
}
</script>
<style lang="less">
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
      border-right: 1PX solid #ccc;
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
    border-bottom: 1PX solid #f5f5f5;
    li {
      display: inline-block;
      width: 98px;
      height: 28px;
      line-height: 29px;
      border-radius: 4px;
      border: 1PX solid #eee;
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
      border-bottom: 1PX solid #f1f1f1;
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
            top: -1PX;
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
      border: 1PX solid #f1f1f1;
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
  border-box: box-sizing;
  transform: translateX(100%);
  transition: ease .5s transform;
  background: #fff;
  &.show {
    transform: none;
  }
  &-wrap {
    padding: 20px;
    .reply-common {
      border-bottom: 1PX solid #f1f1f1; 
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
        margin: 13px 0 20px;
        font-size: 15px;
      }
    }
    // 层主
    .layer-master {
      margin: 20px 0 0;
      box-sizing: border-box;
      height: calc(100vh - 295px);
      // height: 372px;
      overflow-x: hidden;
      overflow-y: scroll;
      border-bottom: 0;
      &-item {
        padding-bottom: 20px;
        &:last-child {
          padding-bottom: 0;
        }
      }
      .header-img {
        width: 40px;
        height: 40px;
      }
      .user-infor {
        span {
          font-size: 14px;
          font-weight: normal;
        }
      }
      .desc {
        padding-left: 58px;
        font-size: 14px;
        line-height: 19px;
      }
      .other {
        padding-left: 58px;
        padding-bottom: 22px;
        .time {
          font-size: 12px;
          color: #999;
          display: inline-block;
        }
        .fr {
          margin-top: -4px;
          &>span {
            display: inline-block;
            vertical-align: middle;
            font-family: 'PingFangSC-Medium';
            font-size: 12px;
            font-weight: bold;
            &:last-child {
              margin-left: 19px;
              color: #999;
              position: relative;
              top: -1PX;
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
    }
  }
}
.u-reply-form {
  // position: fixed;
  z-index: 99;
  background: #fff;
  box-sizing: border-box;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 60px;
  padding: 13px 20px;
  box-shadow:0px 0px 8px 0px rgba(0,0,0,0.08);
  .van-field {
    display: inline-block;
    padding: 6px 10px 6px 15px;
    width: 245px;
    height: 35px;
    margin-right: 15px;
    box-sizing: border-box;
    background: #f5f5f5;
    border-radius: 4px;
    font-size: 13px;
  }
  textarea {
    color: #333;
    // padding: 10px 0;
  }
  button {
    width: 70px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #F99C00;
    border-radius: 4px;
    color: #fff;
    font-size: 13px;
  }
}
.report {
  z-index: 10001!important;
}
</style>