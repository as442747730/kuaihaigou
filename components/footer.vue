<template>
  <div class="adapter-ipx">
    <div class="footer" :class="{'blur': $store.state.blurOpen}">
      <span
        :postIndex="postIndex"
        class="footer-icon"
        @click="toPage(foot.path)"
        v-for="(foot, index) in footList"
        :class="{ cur: postIndex === foot.path }"
        :key="index">
        <i :class="clsList[index]"></i>
        <span class="footer-txt" v-if="index !== 2">{{ foot.name }}</span>
      </span>

    </div>

    <div class="u-publish" :class="{'show': $store.state.blurOpen}">
      <div class="u-publish-box">
        <div class="u-publish-item" @click='jumpArticel'>
          <i></i>
          <span>发文章</span>
        </div>
        <div class="u-publish-item" @click='jumpMedia'>
          <i></i>
          <span>短视频</span>
        </div>
        <div :style="ifSignin ? 'opacity: 0.4' : ''" class="u-publish-item" @click='jumpDrink'>
          <i></i>
          <span>酒坛诗社</span>
        </div>
      </div>
      <div class="icon-close" @click='closeBlur'></div>
      <div class="close-mask" @click='closeBlur'></div>
    </div>

  </div>
</template>
<script>
import { poetApi } from '~/api/poets'
import wechatLogin from '~/utils/wechatLogin'
import tools from '~/utils/tools'

export default {
  name: 'u-footer',

  // props: ['postIndex'],
  props: {
    postIndex: {
      type: String,
      default: '/home'
    }
  },
  data () {
    return {
      clsList: ['footer-icon-index', 'footer-icon-xjzx', 'footer-icon-add', 'footer-icon-zsfx', 'footer-icon-my'],
      footList: [
        { name: '首页', path: '/home' },
        { name: '选酒中心', path: '/winecenter' },
        { name: 'add' },
        { name: '知识分享', path: '/knowledge' },
        { name: '我的', path: '/mine' }
      ],

      publishShow: false, // 发布文章界面
      ifSignin: false
    }
  },
  async mounted () {
    const { code, data } = await poetApi.adjustSign()
    if (code === 200) {
      this.ifSignin = data.ifSign
    }
  },
  methods: {
    toPage (path) {
      if (!path) {
        // todo 发布文章入口
        this.canvalToBGblur()
        return
      }
      if (path === '/mine' && tools.checkWechat()) {
        // 如果是微信环境，并且用户点击了‘我的’选项
        wechatLogin.wxLogin()
        return
      }
      window.location.href = path
    },
    canvalToBGblur () {
      this.publishShow = !this.publishShow
      this.$store.commit('SET_BLUR', this.publishShow)
    },
    closeBlur () {
      this.publishShow = false
      this.$store.commit('SET_BLUR', this.publishShow)
    },
    jumpArticel () {
      window.location.href = '/knowledge/add?type=1'
    },
    jumpMedia () {
      window.location.href = '/knowledge/add?type=2'
    },
    async jumpDrink () {
      if (this.ifSignin) {
        return
      }
      const { code, data } = await poetApi.adjustSign()
      if (code === 200) {
        let { ifSign } = data
        if (ifSign) {
          this.$toast('今天已经签到了')
        } else {
          window.location.href = '/poetryedit'
        }
      } else if (code === 506) {
        this.$toast('请先登录！')
        if (tools.checkWechat()) {
          // 微信
          setTimeout(function () { wechatLogin.wxLoginWithNoCheck() }, 500)
        } else {
          setTimeout(function () { window.location.href = '/account/login' }, 500)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.footer {
  font-size: 0;
  border-top: 1PX solid #eee;
  display: flex;
  width: 100%;
  height: 49px;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  z-index: 20;
  .footer-icon {
    display: block;
    text-align: center;
    color: #333;
    &.cur {
      .footer-txt {
        color: #093C79;
      }
    }
    i {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    &-index {
      background-image: url('~/assets/img/foot/ic_home_nor@2x.png');
    }
    &-xjzx {
      background-image: url('~/assets/img/foot/ic_mall_nor@2x.png');
    }
    &-add {
      width: 43px!important;
      height: 33px!important;
      background-image: url('~/assets/img/foot/icon_ic_fabu_43x33@2x.png');
    }
    &-zsfx {
      background-image: url('~/assets/img/foot/ic_applets_nor@2x.png');
    }
    &-my {
      background-image: url('~/assets/img/foot/ic_us_nor@2x.png');
    }
  }
  .footer-icon.cur {
    .footer-icon {
      &-index {
        background-image: url('~/assets/img/foot/ic_home_ele@2x.png');
      }
      &-xjzx {
        background-image: url('~/assets/img/foot/ic_mall_ele@2x.png');
      }
      &-zsfx {
        background-image: url('~/assets/img/foot/ic_applets_ele@2x.png');
      }
      &-my {
        background-image: url('~/assets/img/foot/ic_us_ele@2x.png');
      }
    }
  }
  .footer-txt {
    display: block;
    font-size: 10px;
    line-height: 1;
    color: #C7CCD7;
  }
}
.u-publish {
  z-index: 22;
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 45px;
  top: 0vh;
  left: 0;
  visibility: hidden;
  opacity: 0;
  transition: ease .3s;
  background: rgba(255, 255, 255, 0.5);
  &.show {
    opacity: 1;
    visibility: visible;
    .u-publish-item {
      opacity: 1;
      transform: none;
    }
  }
  &-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: flex-end;
    width: 100%;
    padding-bottom: 90px;
    position: relative;
    z-index: 3;
  }
  &-item {
    transform: translateY(60px);
    opacity: 0;
    transition: opacity .2s, transform ease .3s;
    &:first-child {
      transition-delay: 50ms;
      i {
        background: url('~/assets/img/knowledge/icon-article.png') no-repeat center/contain;
      }
    }
    &:nth-child(2) {
      transition-delay: 100ms;
      i {
        background: url('~/assets/img/knowledge/icon-video.png') no-repeat center/contain;
      }
    }
    &:nth-child(3) {
      transition-delay: 150ms;
      i {
        background: url('~/assets/img/knowledge/icon-club.png') no-repeat center/contain;
      }
    }
    i {
      display: inline-block;
      width: 55px;
      height: 55px;
    }
    span {
     color: #666;
     font-size: 14px;
     display: block;
     text-align: center;
     margin-top: 10px;
    }
  }
  .icon-close {
    position: absolute;
    z-index: 4;
    width: 26px;
    height: 26px;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%;);
    background: url('~/assets/img/knowledge/icon-close-single.png') no-repeat center/contain;
  }
  .close-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2;
  }
}
</style>
