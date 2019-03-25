<template>
  <div class="m-poetry-edit">
    <van-nav-bar title="酒坛诗社" left-arrow right-text='发布' @click-left='backHome' @click-right="send"></van-nav-bar>
    <textarea class="textarea" placeholder="写点东西签个到吧～有可能在首页显示哦～" v-model='editContent' :maxlength="100"></textarea>
  </div>
</template>

<script>
import { poetApi } from '~/api/poets'
import { userApi } from '~/api/users'

export default {

  layout: 'default',

  head () {
    return {
      title: '酒坛诗社',
      meta: [
        { hid: 'title', name: 'title', content: '酒坛诗社' }
      ]
    }
  },

  async asyncData (req) {
    return userApi.serverPostInfo(req).then((res) => {
      console.log(res)
      if (res.code === 506) {
        req.redirect('/account/login')
      }
    })
  },

  data () {
    return {
      editContent: ''
    }
  },

  mounted () {
    this.prevLink = document.referrer || window.location.href
    if (this.prevLink === window.location.href) {
      this.prevLink = '/member'
    }
  },

  methods: {
    async send () {
      if (this.editContent === '') {
        this.$toast('请填写内容')
        return
      }
      const { code } = await poetApi.createUserSign(this.editContent)
      if (code === 200) {
        this.$toast('发布成功')
        setTimeout(() => {
          window.location.href = this.prevLink
        }, 500)
      }
    },
    backHome () {
      window.location.href = '/home'
    }
  }
}
</script>

<style lang="less" scoped>
.m-poetry-edit {
  width: 100%;
  height: 100vh;
  background: #fff;
  .van-nav-bar__text {
    color: #03A1CD!important;
    font-size: 13px;
    font-family: 'PingFangSC-Semibold';
  }
  .textarea {
    width: 100%;
    min-height: 40vh;
    font-size: 14px;
    color: #333;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
