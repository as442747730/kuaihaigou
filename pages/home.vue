<template>
  <div class="m-home">
    <header>
      <h1>首页</h1>
      <input class="search" type="text">
    </header>
    <van-button type="default" round>按钮</van-button>
    <div class="u-button" @click="gotoLogin">按钮</div>

    <div class="u-login-input">
      <input placeholder="请输入密码"></input>
    </div>
  </div>
</template>
<script>
import api from '../utils/request'

export default {
  name: 'home',
  layout: 'default',

  // async asyncData (req) {
  //   return api.all([
  //     api.serverGet('/api-1', {}, req),
  //     api.serverGet('/api-2', {}, req)
  //   ])
  //     .then(api.spread(function (data1, data2) {
  //       console.log(data1, data2)
  //     })).catch(error => {
  //       req.redirect('/error')
  //     })
  // },

  // async asyncData (req) {
  //   return api.serverGet('/api').then((res) => {
  //     if (res.code !== 200) {
  //       // todo 失败回调
  //     }
  //     return { text: res.data.text }
  //   })
  // },

  data() {
    return {
      text: ''
    }
  },

  methods: {
    gotoLogin () {
      window.location.href = '/account/login'
    }
  }

}
</script>
<style lang="less">
.m-home {
  display: block;
  header {
    padding: 0 20px;
    margin: 49px 0 24px;
    border-bottom: 1px solid #f5f5f5;
    h1 {
      display: inline-block;
      vertical-align: middle;
      font-size: 26px;
      color: #333;
    }
    .search {
      display: inline-block;
      width: 243px;
      height: 35px;
      background: #fafafa;
      margin-left: 30px;
    }
  }
}
</style>
