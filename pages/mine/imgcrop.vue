<template>
  <div class="imgcrop"></div>
</template>
<script>
import axios from 'axios'
import { userApi } from '~/api/users'
import AlloyCrop from 'alloycrop'
import { Toast } from 'vant'
export default {
  asyncData (req) {
    let { imgsrc } = req.query
    return { imgsrc: imgsrc }
  },
  data () {
    return {
      imgsrc: '',
      imgwid: 200,
      imghig: 200
    }
  },
  mounted () {
    // 裁剪
    let that = this
    let mAlloyCrop = new AlloyCrop({
      image_src: `${that.imgsrc}`,
      circle: true,
      width: that.imgwid,
      height: that.imghig,
      output: 2,
      ok_text: '确定',
      cancel_text: '取消',
      ok: function (base64, canvas) {
        mAlloyCrop.destroy()
        let dataurl = canvas.toDataURL('image/png')
        that.upload(dataurl)
      },
      cancel: function () {
        mAlloyCrop.destroy()
        window.location.href = '/mine/person'
      }
    })
    console.log(mAlloyCrop)
  },
  methods: {
    dataURLtoFile (base64, mimeType) {
      let bytes = window.atob(base64.split(',')[1])
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: mimeType })
    },
    async upload (base64) {
      let that = this
      await this.getToken()
      let data = new FormData()
      let blob = this.dataURLtoFile(base64, 'image/png')
      data.append('file', blob, Date.now() + '.png')
      data.append('token', this.token)
      return axios({
        method: 'post',
        url: 'http://up-z2.qiniup.com',
        data: data,
        headers: { 'Content-Type': 'multipart/form-data; charset=UTF-8' }
      }).then((res) => {
        if (res.status === 200) {
          Toast.clear()
          console.log(res.data)
          let { url } = res.data.data
          that.editHead(url)
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
    async editHead (val) {
      const { code, data } = await userApi.updateHeadImg(val)
      if (code === 200) {
        window.location.href = '/mine/person'
      } else {
        this.$toast(data)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.imgcrop {
  width: 100%;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: black;
  text-align: center;
  font-size: 14px;
}
</style>