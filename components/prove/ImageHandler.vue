<template>
  <div class="u-eva-img-handler">
    <!-- 认证模块  多图上传 组件 -->
    <div class="image-wrapper">
      <Upload @on-success="handleUploadSuccess" v-if="imgList.length !== maxNum" :max="maxNum">
        <div class="upload-box">点击上传</div>
      </Upload>
      <div class="img-item" v-for="(item, index) in imgList" :key="index" @click="preview(index)">
        <span class="img-close-btn" @click.stop="removeImg(index)">
          <van-icon size="20px" color="#03A0CB" name="clear" />
        </span>
        <img v-lazy="item.url">
      </div>
      <!-- 用来占位的 -->
      <div class="holder" v-if="imgList.length === 1"></div>
      <div class="holder" v-if="imgList.length <= 2"></div>
    </div>
  </div>
</template>

<script>
import Upload from '~/components/UploadProve'
import { ImagePreview } from 'vant'

export default {
  name: 'uImghandler',

  components: { Upload },

  data () {
    return {

    }
  },

  model: {
    prop: 'imgList',
    event: 'parent-event'
  },

  props: {
    imgList: {
      type: Array,
      default: []
    },
    maxNum: {
      type: Number,
      default: 5
    }
  },

  methods: {
    handleUploadSuccess (data) {
      if (this.imgList.length >= this.maxNum) {
        return this.$toast(`最多只可上传${this.maxNum}张图片`)
      }
      this.imgList.push(data)
      this.$emit('parent-event', this.imgList)
    },
    preview (index) {
      ImagePreview({
        images: this.imgList.map(v => v.url),
        startPosition: index
      })
    },
    removeImg (index) {
      this.imgList.splice(index, 1)
      this.$emit('parent-event', this.imgList)
    },
    getJSONArr (strArr) {
      return JSON.parse(strArr)
    }
  }
}
</script>

<style lang="less">
.u-eva-img-handler {
  .image-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    .img-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 160px;
      height: 110px;
      border-radius: 5px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      transition: 0.2s;
      margin-bottom: 15px;
      border: 1PX solid #eee;
      box-sizing: border-box;
      .img-close-btn {
        position: absolute;
        z-index: 10;
        left: -7px;
        top: -5px;
        width: 20px;
        height: 20px;
        display: block;
        border-radius: 100%;
        background: white;
        font-size: 0;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .u-upload {
      margin-bottom: 15px;
    }
    .holder {
      width: 160px;
    }
    .upload-box {
      width: 160px;
      height: 110px;
      box-sizing: border-box;
      border-radius: 5px;
      background: #fafafa;
      padding-top: 65px;
      text-align: center;
      font-size: 11px;
      color: #666;
      background-image: url('~/assets/img/prove/ic_upload.png');
      background-size: 34px 26px;
      background-position: center 30px;
      background-repeat: no-repeat;
      border: 1px solid #D9D9D9;
    }
  }
}
</style>