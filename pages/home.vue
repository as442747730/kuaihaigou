<template>
  <div class="m-home">
    <van-button type="default">按钮</van-button>
  </div>
</template>
<script>
import api from '../utils/request'

export default {
  name: 'home',
  layout: 'default',

  async asyncData (req) {
    return api.all([
      api.serverGet('/api-1', {}, req),
      api.serverGet('/api-2', {}, req)
    ])
      .then(api.spread(function (data1, data2) {
        console.log(data1, data2)
      })).catch(error => {
        req.redirect('/error')
      })
  },

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
  }

}
</script>
<style lang="less">
.m-home {
  display: block;
}
</style>
