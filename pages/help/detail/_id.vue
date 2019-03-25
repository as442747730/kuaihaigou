<template>
  <div class="help-content">
    <h3 class="font_hight help-content-title">
      {{ title }}
    </h3>
    <div class="content" v-html='content'>
    </div>
  </div>
</template>

<script>
import { helpApi } from '@/api/help'
export default {
  name: '',
  layout: 'default',

  components: {
  },

  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'title', name: 'title', content: this.title }
      ]
    }
  },

  async asyncData (req) {
    const { code, data } = await helpApi.getContent(req.params.id) // 帮助中心列表
    if (code === 200) {
      console.log(data)
      return {
        title: data.helpName,
        content: data.text
      }
    } else {
      req.redirect('/error')
    }
  },

  data () {
    return {
      title: '',
      content: ''
    }
  },

  methods: {
  }
}
</script>

<style lang="less">
.help-content {
  h3 {
    font-size: 19px;
    color: #333;
    padding: 0 20px;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f5f5f5;
  }
  .content {
    font-size: 14px;
    color: #999;
    line-height: 22px;
    padding: 0 20px;
    margin-top: 20px;
    img {
      max-width: 100%;
      height: auto;
    }
    word-break: break-all;
  }
}
</style>
