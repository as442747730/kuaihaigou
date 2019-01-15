<template>
  <div class="u-user-common">
    <!-- <div class="part-top-pro" :style="'background: url('') no-repeat center/cover'"></div> -->
    <div class="part-top-pro"></div>
    <div class="part-top-item-box">
      <div class="part-top-item">
        <p class="count">1000<span>瓶</span></p>
        <span class="label">已购(酒)</span>
      </div>
      <div class="part-top-item">
        <p class="count">200</p>
        <span class="label">关注</span>
      </div>
      <div class="part-top-item">
        <p class="count">1.2w</p>
        <span class="label">粉丝</span>
      </div>
    </div>
  </div>
</template>
<script>
import api from '~/utils/request'
import { userApi, personApi } from '@/api/users'
export default {
  name: 'u-user-common',

  async asyncData (req) {
    return api.all([
      personApi.serverUserInfo(+req.query.uid, null, req), // 获取uid所有者的个人信息
      userApi.serverPostInfo() // 获取已登陆用户的个人信息
    ])
      .then(api.spread(function (res1, res2) {
        let uid = +req.query.uid
        console.log(res1)
        if (res1.code === 200) {
          console.log(res1.data)
          if (res2.code === 200) {
            if (res2.data.userId === uid) req.redirect('/mine')
          }
          return {
            userInfo: res1.data
          }
        }
      }))
  },

  props: {
  },

  data () {
    return {
      userInfo: {}
    }
  },

  mounted () {
    console.log('userInfo', this.userInfo)
  },

  methods: {
  }

}
</script>
<style lang="less">
.u-user-common {
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
    &-item {
      text-align: center;
      font-size: 0;
      .count {
        color: @cor_333;
        font-size: 19px;
        font-family: DINPro;
        padding-bottom: 10px;
        span {
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
