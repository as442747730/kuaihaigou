<template>

  <div class="u-upload" >
    <van-uploader :after-read="handleRead" accept="image/*" multiple >
      <slot></slot>
    </van-uploader>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: '',

  data () {
    return {
      token: ''
    }
  },

  methods: {
    // 获取 token ，待优化：做成全局，过期重新获取（1h）
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

    async handleRead (file) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        message: '上传中...'
      })

      const f = file
      let img = new Image()
      img.src = f.content

      let Fi = this.dataURLtoFile(f.content, f.file.name)
      Fi = { content: f.content, file: Fi }
      this.upload(Fi)
    },

    // base64转file
    dataURLtoFile (dataurl, filename) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    // 图片上传
    async upload (file) {
      await this.getToken()
      let data = new FormData()
      data.append('file', file.file)
      data.append('token', this.token)
      axios({
        method: 'post',
        url: 'http://up-z2.qiniup.com',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data; charset=UTF-8' }
      }).then((res) => {
        if (res.status === 200) {
          this.$emit('handleUploadSuccess', res.data.data)
          this.$toast.clear()
        } else {
          this.$toast.fail(res.statusText)
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
.u-upload {
  display: inline-block;
}
</style>
