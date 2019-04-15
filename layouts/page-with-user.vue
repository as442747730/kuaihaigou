<template>
  <div class="m-layout">
    
    <div class="u-user-common">
      <div class="bar">
        <van-nav-bar
          title="用户主页"
          left-arrow
          @click-left="onClickLeft"
        />
        <u></u>
      </div>
      <!-- <div class="part-top-pro" :style="'background: url('') no-repeat center/cover'"></div> -->
      <div class="part-top-pro" :style="'background: url(' + ( userInfo.headimgurl || defaulthead) + ') no-repeat center/cover'"></div>
      <div class="part-top-title">
        <h3 class="font_hight">
          <span class="ib-middle">{{ userInfo.nickname }}</span>
          <user-lab class="ib-middle" :level='String(userInfo.userGradeNumber)' type='2' :profess='String(userInfo.category)'></user-lab>
        </h3>
        <p>{{ userInfo.signature || '梦想还是要有的，万一实现了呢' }}</p>
      </div>
      <div class="part-top-box">
        <div class="part-top-left">
          <div class="part-top-item">
            <p class="count">{{ userInfo.buyNumber || 0 }} <span>瓶</span></p>
            <span class="label">已购(酒)</span>
          </div>
          <div class="part-top-item" @click='showLayer(1)'>
            <p class="count">{{ userInfo.attentionNumber || 0 }}</p>
            <span class="label">关注</span>
          </div>
          <div class="part-top-item" @click='showLayer(2)'>
            <p class="count">{{ userInfo.fanNumber || 0 }}</p>
            <span class="label">粉丝</span>
          </div>
        </div>
      </div>
      <div class="part-top-right">
        <div :class="['follow', userInfo.friendSystem ? 'dark' : '']" @click='clickSubscribe'>
          <van-icon class='ib-middle' :name="userInfo.friendSystem ? 'success' : 'cross'" />
          <span class='ib-middle'>
            {{ userInfo.friendSystem ? '已关注' : '关注' }}
          </span>
        </div>
      </div>
      <div class="depart-line"></div>
    </div>
    <nuxt/>
    <!-- 粉丝/关注弹层 -->
    <van-popup v-model="layerShow" position="right" :overlay="false">
      <fansFollow :lists='fansFollowData' :type='type' :uid='uid' :myId='myId' :islogin='islogin'></fansFollow>
    </van-popup>
  </div>
</template>
<script>

import { userApi, personApi } from '@/api/users'
import userLab from '@/components/Usericon'
import fansFollow from '@/components/user/FansFollow'
import wechatLogin from '~/utils/wechatLogin'
import 'vant/lib/icon/local.css'
import tools from '@/utils/tools'

export default {

  data () {
    return {
      env: 0,
      uid: null,
      userInfo: {},

      defaulthead: this.defaulthead, // 默认头像

      layerShow: false,
      fansFollowData: [],
      type: 1,
      myId: null,
      islogin: false
    }
  },

  components: { userLab, fansFollow },

  watch: {
    $route (to, from) {
      if (to.hash === '') {
        this.layerShow = false
      } else if (to.hash === '#layer') {
        this.layerShow = true
      }
    }
  },

  mounted () {
    this.uid = tools.getUrlQues2('uid')
    if (!this.uid) window.location.href = '/missing'
    this.getUserInfo()
    // 判断浏览器信息
    this.env = tools.checkWechat() ? 1 : 0
  },

  methods: {
    async getUserInfo () {
      const { code: personCode, data: personData } = await personApi.personalInfo(this.uid)
      const { code: memberCode, data: memberData } = await userApi.userDetail()
      if (memberCode === 200) {
        this.myId = memberData.userId
        this.islogin = true
      } else if (memberCode === 506) {
        this.islogin = false
      }
      if (memberCode === 200 && memberData.userId === this.uid) {
        window.location.href = '/mine'
      }
      if (personCode === 200) {
        this.userInfo = personData
        console.log('user', this.userInfo)
      }
    },
    // 关注/取消关注
    async clickSubscribe () {
      const { code } = await personApi.subscribeUser(this.uid)
      if (code === 200) {
        this.userInfo.friendSystem = !this.userInfo.friendSystem
        this.userInfo.friendSystem ? this.userInfo.fanNumber += 1 : this.userInfo.fanNumber -= 1
        this.$toast.success(this.userInfo.friendSystem ? '关注成功' : '已取消关注')
      } else if (code === 506) {
        this.$toast('检测到您尚未登录，请先登录！')
        if (this.env === 1) {
          setTimeout(() => { wechatLogin.wxLoginWithNoCheck(window.location.href) }, 1000)
        } else {
          setTimeout(() => { window.location.href = '/account/login' }, 1000)
        }
      }
    },
    async showLayer (type) {
      this.type = type
      if (this.type === 1 && !this.userInfo.attentionNumber) return
      if (this.type === 2 && !this.userInfo.fanNumber) return
      window.location.hash = 'layer'
      const toast1 = this.$toast.loading({ mask: true, message: '信息获取中', duration: 0 })
      const { code, data } = await personApi.followFans({ page: 1, count: 5, number: this.type, id: this.uid })
      if (code === 200) {
        this.fansFollowData = data.array
        console.log(this.fansFollowData)
        toast1.clear()
        this.layerShow = true
      }
    },
    onClickLeft () {
      window.location.href = '/'
    }
  }

}
</script>
<style lang="less">
.u-user-common {
  .bar {
    height: 145px;
    position: relative;
    background: -webkit-linear-gradient(-45deg, #4FEDEF, #00A1F0);
    background: -o-linear-gradient(-45deg, #4FEDEF, #00A1F0);
    background: -moz-linear-gradient(-45deg, #4FEDEF, #00A1F0);
    background: linear-gradient(-45deg, #4FEDEF, #00A1F0);
    .van-nav-bar {
      background: transparent;
      &:after {
        display: none;
      }
      i, .van-nav-bar__title {
        color: #fff!important;
        font-weight: normal;
      }
    }
    .title {
      font-size: 16px;
      color: white;
    }
    u {
      width: 100%;
      height: 45px;
      background: url('~assets/img/upgrade/img-wave.png') no-repeat bottom/auto 35px;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
  .part-top {
    height: 90px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background: white;
    position: relative;
    top: -37px;
    border-bottom: 1PX solid @cor_border;
    display: flex;
    padding: 0 45px;
    justify-content: space-between;
    align-items: center;
    &-box {
      padding: 0 20px;
      margin-bottom: 20px;
      font-size: 0;
    }
    &-pro {
      width: 76px;
      height: 76px;
      border: 6px solid #fff;
      border-radius: 50%;
      box-sizing: border-box;
      overflow: hidden;
      display: block;
      margin: -35px auto 0;
      position: relative;
    }
    &-title {
      text-align: center;
      h3 {
        color: #333;
        margin-top: 9px;
        font-size: 19px;
        font-weight: bold;
        box-sizing: border-box;
        max-width: 150px;
        position: relative;
        display: inline-block;
        span {
          display: inline-block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .u-icon-type2 {
          white-space: nowrap;
          font-size: 0;
          top: 0;
        }
      }
      p {
        color: #bbb;
        font-size: 12px;
        margin: 19px 0 25px; 
      }
    }
    &-right {
      padding-bottom: 20px;
      .follow {
        width: 70px;
        height: 30px;
        border: 1px solid #03A1CD;
        color: #03A1CD;
        font-size: 0;
        border-radius: 15px;
        text-align: center;
        line-height: 28px;
        box-sizing: border-box;
        margin: 0 auto;
        &.dark {
          background: #ccc;
          color: #fff;
          border-color: #ccc;
        }
        i {
          font-size: 12px;
        }
        .van-icon-cross {
          transform: rotate(45deg);
        }
        span {
          font-size: 12px;
          margin-left: 3px;
        }
      }
    }
    &-item {
      text-align: center;
      font-size: 0;
      display: inline-block;
      width: 33.33%;
      .count {
        color: @cor_333;
        font-size: 19px;
        font-weight: bold;
        line-height: 1;
        padding-bottom: 7px;
        font-weight: bold;
        span {
          font-weight: normal;
          font-size: 10px;
          color: @cor_999;
        }
      }
      .label {
        color: @cor_999;
        font-size: 11px;
      }
    }
  }
}
.m-page-user {
  .tab-item {
    font-size: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    padding: 0 20px;
    &-list {
      color: #ccc;
      font-size: 13px;
      position: relative;
      padding: 18px 0 14px;
      &.cur {
        color: #333;
        &:after {
          content: '';
          position: absolute;
          width: 20px;
          height: 2px;
          background: #333;
          margin-top: -1px;
          margin-left: -10px;
          left: 50%;
          bottom: 0;
        }
      }
    }
  }
  .model-item {
    font-size: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    padding: 15px 40px;
    a {
      font-size: 13px;
      color: #666;
      &.cur {
        color: #333;
        font-weight: bolder;
      }
    }
  }
}
</style>
