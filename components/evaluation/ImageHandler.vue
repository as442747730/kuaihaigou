<template>
  <div class="u-eva-img-handler">
    <!-- 商品评价 售后申请 页面的 图片上传 组件 -->
    <div class="image-wrapper">
      <Upload @on-success="handleUploadSuccess" v-if="imgList.length !== maxNum" :max="maxNum">
        <div class="upload-box">添加图片</div>
      </Upload>
      <div class="img-item" v-for="(item, index) in imgList" :key="index" @click="preview(index)" v-lazy:background-image='item'>
        <span class="img-close-btn" @click.stop="removeImg(index)">
          <van-icon size="20px" color="#03A0CB" name="clear" />
        </span>
        <!-- <img v-lazy="item"> -->
      </div>
      <!-- 用来占位的 -->
      <div class="holder" v-if="imgList.length === 1"></div>
      <div class="holder" v-if="imgList.length <= 2"></div>
    </div>
  </div>
</template>

<script>
import Upload from '~/components/Upload'
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
        images: this.imgList,
        startPosition: index
      })
    },
    removeImg (index) {
      this.imgList.splice(index, 1)
      this.$emit('parent-event', this.imgList)
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
    .u-upload {
      margin-bottom: 15px;
    }
    .img-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 70px;
      border-radius: 5px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      transition: 0.2s;
      margin-bottom: 15px;
      .img-close-btn {
        position: absolute;
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
    .holder {
      width: 70px;
    }
    .upload-box {
      width: 70px;
      height: 70px;
      box-sizing: border-box;
      border-radius: 5px;
      background: @cor_border;
      padding-top: 42px;
      text-align: center;
      font-size: 11px;
      color: #C7C7C7;
      background-image: url('~assets/img/order/icon-add.png');
      background-size: 16px 16px;
      background-position: center 18px;
      background-repeat: no-repeat;
    }
  }
}
</style>