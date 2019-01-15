<template>
  <div class="m-layout">
    
    <div class="u-user-common">
      <div class="bar">
        <i></i>
        <!-- <van-icon name="close" @click="menuShow = true" /> -->
      </div>
      <!-- <div class="part-top-pro" :style="'background: url('') no-repeat center/cover'"></div> -->
      <div class="part-top-pro" :style="'background: url(' + ( userInfo.headimgurl || defaulthead) + ') no-repeat center/cover'"></div>
      <div class="part-top-title">
        <h3 class="font_hight">
          {{ userInfo.nickname }}
          <user-lab :level='String(userInfo.userGradeNumber)' type='1' :profess='String(userInfo.category)'></user-lab>
        </h3>
        <p>{{ userInfo.signature }}</p>
      </div>
      <div class="part-top-box">
        <div class="part-top-left ib-middle">
          <div class="part-top-item">
            <p class="count">{{ userInfo.buyNumber || 0 }} <span>瓶</span></p>
            <span class="label">已购(酒)</span>
          </div>
          <div class="part-top-item">
            <p class="count">{{ userInfo.attentionNumber || 0 }}</p>
            <span class="label">关注</span>
          </div>
          <div class="part-top-item">
            <p class="count">{{ userInfo.fanNumber || 0 }}</p>
            <span class="label">粉丝</span>
          </div>
        </div>
        <div class="part-top-right ib-middle">
          <div class="follow">
            <van-icon name="plus" />
            <span>关注</span>
          </div>
        </div>
      </div>
      <div class="depart-line"></div>
    </div>
    <nuxt/>
  </div>
</template>
<script>

import { userApi, personApi } from '@/api/users'
import userLab from '@/components/Usericon.vue'
import tools from '@/utils/tools'

export default {

  data () {
    return {
      uid: null,
      userInfo: {},

      defaulthead: this.defaulthead // 默认头像
    }
  },

  components: { userLab },

  mounted () {
    this.uid = tools.getUrlQues('uid')
    this.getUserInfo()
  },

  methods: {
    async getUserInfo () {
      const { code: personCode, data: personData } = await personApi.personalInfo(this.uid)
      const { code: memberCode, data: memberData } = await userApi.userDetail()
      if (memberCode === 200 && memberData.userId === this.uid) {
        window.location.href = '/mine'
      }
      if (personCode === 200) {
        this.userInfo = personData
        console.log('user', this.userInfo)
      }
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
    .title {
      font-size: 16px;
      color: white;
    }
    i {
      width: 100%;
      height: 35px;
      background: url('~/assets/img/user/img_wave_375x35@2x.png') no-repeat center/cover;
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
      margin-bottom: 25px;
    }
    &-pro {
      width: 110px;
      height: 110px;
      border: 6px solid #fff;
      border-radius: 50%;
      box-sizing: border-box;
      overflow: hidden;
      display: block;
      margin: -75px auto 0;
      position: relative;
    }
    &-title {
      text-align: center;
      h3 {
        font-size: 21px;
        color: #333;
      }
      p {
        color: #bbb;
        font-size: 12px;
        margin: 15px 0 25px; 
      }
    }
    &-right {
      .follow {
        width: 80px;
        height: 35px;
        border: 1px solid #03A1CD;
        color: #03A1CD;
        font-size: 13px;
        border-radius:4px;
        text-align: center;
        line-height: 35px;
        box-sizing: border-box;
      }
    }
    &-left {
      margin-right: 20px;
      width: 70%;
    }
    &-item {
      text-align: center;
      font-size: 0;
      display: inline-block;
      width: 33.33%;
      .count {
        color: @cor_333;
        font-size: 19px;
        font-family: DINPro;
        padding-bottom: 10px;
        font-weight: bold;
        span {
          font-weight: normal;
          font-size: 10px;
          color: @cor_999;
        }
      }
      .label {
        color: @cor_999;
        font-size: 13px;
      }
    }
  }
}
</style>
