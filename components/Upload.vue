<template>

  <div class="u-upload" >
    <van-uploader :after-read="handleRead" accept="image/*" :multiple="ifMult" >
      <slot></slot>
    </van-uploader>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'

export default {
  name: '',

  data () {
    return {
      token: ''
    }
  },

  props: {
    max: {
      type: Number,
      default: 5
    },
    ifMult: {
      type: Boolean,
      default: true
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
      if (Array.isArray(file) && file.length > this.max) {
        return Toast.fail(`最多只可上传${this.max}张图片`)
      }

      Toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        message: '上传中...'
      })

      if (file.constructor === Object) {
        this.upload(file).then(res => {
          this.$emit('on-success', res.url)
        })
      } else if (Array.isArray(file)) {
        Promise.all([...file.map(n => this.upload(n))]).then(res => {
          res.forEach(n => {
            this.$emit('on-success', n.url)
          })
        })
      }
    },

    // handleFile (file) {
    //   const f = file
    //   let img = new Image()
    //   img.src = f.content

    //   let Fi = this.dataURLtoFile(f.content, f.file.name)
    //   Fi = { content: f.content, file: Fi }
    //   this.upload(Fi)
    // },

    // base64转file
    // dataURLtoFile (dataurl, filename) {
    //   let arr = dataurl.split(',')
    //   let mime = arr[0].match(/:(.*?);/)[1]
    //   let bstr = atob(arr[1])
    //   let n = bstr.length
    //   let u8arr = new Uint8Array(n)
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n)
    //   }
    //   return new File([u8arr], filename, { type: mime })
    // },
    // 图片上传
    async upload (file) {
      await this.getToken()
      let data = new FormData()
      data.append('file', file.file)
      data.append('token', this.token)
      return axios({
        method: 'post',
        url: 'http://up-z2.qiniup.com',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data; charset=UTF-8' }
      }).then((res) => {
        if (res.status === 200) {
          Toast.clear()
          // this.$emit('handleUploadSuccess', res.data.data)
          return res.data.data
        } else {
          Toast.fail(res.statusText)
          return res.statusText
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
.u-upload {
  font-size: 0;
  display: inline-block;
}
</style>
