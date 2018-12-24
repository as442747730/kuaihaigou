<template>
  <div class="m-article-add">

    <div class="item-cell">
      <input v-model="title" class="input" placeholder="此处写下您的文章标题"></input>
    </div>

    <div class="item-cell">
      <Queditor></Queditor>
    </div>


  </div>
</template>

<script>
import Queditor from '@/components/QuillEditor.vue'

export default {
  name: '',

  layout: 'default',

  head () {
    return {
      title: '知识分享',
      meta: [
        { hid: 'title', name: 'title', content: '知识分享' }
      ]
    }
  },

  components: { Queditor },

  data () {
    return {
      title: ''
    }
  }
}
</script>

<style lang="less" scoped>
.m-article-add {
  min-height: 100vh;
  background: @cor_border;
  .item-cell {
    background: white;
    margin-bottom: 10px;
  }
  .input {
    font-size: 17px;
    padding: 20px;
    box-sizing: border-box;
  }

  .u-editor {
    .quill-editor {
      .ql-toolbar {
        border-top: none!important;
      }
      .ql-container {
      }
    }
  }
}
</style>
