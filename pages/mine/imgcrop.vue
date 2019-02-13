<template>
  <div class="imgcrop" ref="imgcrop"></div>
</template>
<script>
import axios from 'axios'
import { userApi } from '~/api/users'
import AlloyCrop from 'alloycrop'
import { Toast } from 'vant'
import { EXIF } from 'exif-js'
export default {
  asyncData (req) {
    let { imgsrc } = req.query
    return { imgsrc: imgsrc }
  },
  data () {
    return {
      imgsrc: '',
      imgwid: 200,
      imghig: 200,
      dataurl: ''
    }
  },
  mounted () {
    // 获取图片拍摄方向
    this.getImageInfo()
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
        that.dataurl = canvas.toDataURL('image/png')
        if (navigator.userAgent.match(/iphone/i)) {
          console.log('这是iphone设备')
          let image = new Image()
          image.src = that.dataurl
          image.onload = function () {
            let orientation = that.Orientation
            if (orientation !== '' && orientation !== 1) {
              console.log('orientation', orientation)
              switch (orientation) {
                case 6:
                  that.rotateImg(this, 'left', canvas)
                  break
                case 8:
                  that.rotateImg(this, 'right', canvas)
                  break
                case 3:
                  that.rotateImg(this, 'right', canvas)
                  that.rotateImg(this, 'right', canvas)
                  break
              }
              // that.testImg()
            }
            that.upload()
          }
        } else {
          that.upload()
        }
      },
      cancel: function () {
        mAlloyCrop.destroy()
        window.location.href = '/mine/person'
      }
    })
    console.log(mAlloyCrop)
  },
  methods: {
    getImageInfo () {
      let that = this
      let image = new Image()
      image.onload = function () {
        EXIF.getData(image, function () {
          that.Orientation = EXIF.getTag(this, 'Orientation')
          console.log(that.Orientation, 'Orientation')
        })
      }
      image.src = this.imgsrc
    },
    dataURLtoFile (base64, mimeType) {
      let bytes = window.atob(base64.split(',')[1])
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: mimeType })
    },
    async upload () {
      let that = this
      let base64 = this.dataurl
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
    },
    rotateImg (img, direction, canvas) {
      let minStep = 0
      let maxStep = 3
      if (img === null) return
      let height = img.height
      let width = img.width
      let step = 2
      if (step === null) {
        step = minStep
      }
      if (direction === 'right') {
        step++
        step > maxStep && (step = minStep)
      } else {
        step--
        step < minStep && (step = maxStep)
      }
      let degree = step * 90 * Math.PI / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          this.dataurl = canvas.toDataURL('image/png')
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          this.dataurl = canvas.toDataURL('image/png')
          break
        case 3:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          this.dataurl = canvas.toDataURL('image/png')
          break
      }
    },
    testImg () {
      let img = new Image()
      img.crossOrigin = 'Anonymous'
      let that = this
      img.onload = function () {
        let imgCrop = that.$refs.imgcrop
        imgCrop.appendChild(img)
      }
      img.src = this.dataurl
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