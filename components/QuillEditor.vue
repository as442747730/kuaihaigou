<template>
  <div class="u-editor">
    <!-- <Upload @on-success="test">
      <p id="up" style="font-size: 12px;">upload</p>
    </Upload> -->
    <form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti">
      <input style="display: none" id="up" type="file" name="file" accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg()" />
    </form>

    <quill-editor :options="editorOption" ref="QuillEditor"
      :content='content'
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
      @ready="onEditorReady($event)" />
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// import Upload from '@/components/Upload'
import axios from 'axios'
import { Toast } from 'vant'

export default {
  name: '',

  props: {
    content: {
      type: String,
      default: ''
    }
  },

  computed: {
    editor () {
      return this.$refs.QuillEditor.quill
    }
  },

  // components: { Upload },

  mounted () {
    console.log(this.editor)
  },

  data () {
    return {
      addImgRange: 0,

      editorOption: {
        modules: {
          toolbar: {
            container: [
              'bold',
              'underline',
              { 'color': [] },
              { 'align': [] },
              { 'size': ['small', false, 'large', 'huge'] },
              'image'
            ],
            handlers: {
              'image': this.imgHandler
            }
          }
        },
        placeholder: '此处输入文章正文'
      }
    }
  },

  methods: {
    imgHandler () {
      document.getElementById('up').click()
    },
    async uploadImg () {
      Toast.loading({ mask: false, forbidClick: true, message: '上传中...', duration: 0 })
      var vm = this
      var formData = new FormData(document.getElementById('uploadFormMulti'))
      try {
        const url = await vm.uploadImgReq(formData) // 自定义的图片上传函数

        if (url != null && url.length > 0) {
          var value = url
          vm.addImgRange = vm.editor.getSelection()
          // value = value.indexOf('http') !== -1 ? value : 'http:' + value
          vm.editor.insertEmbed(vm.addImgRange !== null ? vm.addImgRange.index : 0, 'image', value, 'user')
          vm.editor.setSelection(vm.addImgRange.index + 1)
          vm.$emit('uploadSuccess', value)
        } else {
          Toast.fail('图片上传失败')
        }
        document.getElementById('uploadFormMulti').value = ''
      } catch (err) {
        document.getElementById('uploadFormMulti').value = ''
      }
    },

    async uploadImgReq (formdata) {
      await this.getToken()
      formdata.append('token', this.token)
      return axios({
        method: 'post',
        url: 'http://up-z2.qiniup.com',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data; charset=UTF-8' }
      }).then((res) => {
        if (res.status === 200) {
          Toast.clear()
          return res.data.data.url
        } else {
          Toast.fail(res.statusText)
          return res.statusText
        }
      })
    },

    getToken () {
      return axios({
        method: 'get',
        url: '/api/upload/getPublicToken',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      }).then((res) => {
        if (res.status === 200) {
          this.token = res.data.data.token
        }
      })
    },

    onEditorChange ({ editor, html, text }) {
      // this.content = html
      // console.log(html)
      this.$emit('handleChange', html)
    },
    onEditorFocus () {},
    onEditorReady () {},
    onEditorBlur () {}
  }
}
</script>

<style lang="less">
.u-editor {
  .quill-editor {
    img {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
