<template>
  <div class="imgcrop">
    <!-- <img :src="defImg" style="display: none;">
    <div id="crop_result" style="text-align: center; padding-top: 30px; height: 230px; line-height: 300px;"></div> -->
    <button class="btn" id="crop_btn">Crop cricle</button>
  </div>
</template>
<script>
import AlloyFinger from 'alloyfinger'
import AlloyCrop from 'alloycrop'
import axios from 'axios'
import { Toast } from 'vant'
import defimg from '~/assets/img/img_shequhuodong_335x180@2x.png'
export default {
  data () {
    return {
      defImg: defimg
    }
  },
  mounted () {
    var cropBtn = document.querySelector('#crop_btn')
    // var cropResult = document.querySelector('#crop_result')
    var mAlloyCrop
    // function showToolPanel () {
    //   cropBtn.style.display = 'inline-block'
    //   cropResult.style.display = 'inline-block'
    // }
    // function hideToolPanel () {
    //   cropBtn.style.display = 'none'
    //   cropResult.style.display = 'none'
    // }
    let that = this
    let objbtn1 = new AlloyFinger(cropBtn, {
      tap: function () {
        // hideToolPanel()
        mAlloyCrop = new AlloyCrop({
          image_src: `${that.defImg}`,
          circle: true,
          width: 200,
          height: 200,
          output: 1,
          ok: function (base64, canvas) {
            // cropResult.appendChild(canvas)
            // cropResult.querySelector('canvas').style.borderRadius = '50%'
            mAlloyCrop.destroy()
            // showToolPanel()
            let dataurl = canvas.toDataURL('image/png')
            that.upload(dataurl)
          },
          cancel: function () {
            mAlloyCrop.destroy()
            // showToolPanel()
          }
        })
      }
    })
    console.log('objbtn1', objbtn1)
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
          // this.$emit('handleUploadSuccess', res.data.data)
          console.log(res.data)
        } else {
          Toast.fail(res.statusText)
          return res.statusText
        }
      })
    },
    async putBase64 (base64) {
      await this.getToken()
      var pic = base64
      var url = 'http://up-z2.qiniup.com/putb64/20264'
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(xhr.responseText)
        }
      }
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/octet-stream')
      xhr.setRequestHeader('Authorization', this.token)
      xhr.send(pic)
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

#crop_btn {
  color: white;
  background-color: #836FFF;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  width: 110px;
  text-align: center;
  border-radius: 2px;
}

button {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
}

#crop_circle_btn {
  color: white;
  background-color: #836FFF;
  height: 40px;
  line-height: 40px;
  width: 110px;
  text-align: center;
  border-radius: 2px;
  display: inline-block;
  margin-left: 20px;
}

#crop_circle_btn:active,
#crop_btn:active {
  background-color: #6854e4;
}
</style>