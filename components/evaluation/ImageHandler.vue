<template>
  <div class="u-eva-img-handler">
    <!-- 商品评价页面的 图片上传 组件 -->
    <div class="image-wrapper">
      <Upload @on-success="handleUploadSuccess" v-if="imgList.length !== 5">
        <div class="upload-box">添加图片</div>
      </Upload>
      <div :class="['img-item', index > 2 && index === imgList.length - 1 ? 'gap' : '']" v-for="(item, index) in imgList" :key="index" v-lazy:background-image="item" @click="preview(index)">
        <span class="img-close-btn" @click.stop="removeImg(index)">
          <van-icon size="20px" color="#03A0CB" name="clear" />
        </span>
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
    }
  },

  methods: {
    handleUploadSuccess (data) {
      if (this.imgList.length >= 5) {
        return this.$toast('最多只可上传5张图片')
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

<style lang="less" scoped>
.u-eva-img-handler {
  .image-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    .img-item {
      width: 70px;
      height: 70px;
      border-radius: 5px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      transition: 0.2s;
      &.gap {
        margin-top: 20px;
      }
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
      background-image: url('~/assets/img/order/icon-add.png');
      background-size: 16px 16px;
      background-position: center 18px;
      background-repeat: no-repeat;
    }
  }
}
</style>