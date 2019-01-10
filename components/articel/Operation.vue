<!-- 
  处理操作行为，所有文章页面均通用（知识分享、热点、文章甄选、百科）
  * 文章类型 -> type
  * 点赞 -> ifLike
  * 收藏 -> ifCollect
  * 评论 -> 
-->
<template>
  <div class="u-operation">
    <div class="btn-item" @click="handleLike">
      <img v-show='!ifLike' src="~/assets/img/knowledge/icon-like-black.png" class='icon-btn' alt="" >
      <img v-show='ifLike' src="~/assets/img/knowledge/icon-like-blue.png" class='icon-btn' alt="" >
      点赞
    </div>
    <div class="btn-item" @click='toComment'>
      <img src="~/assets/img/knowledge/icon-comment.png" class="icon-btn" alt="">
      去评论
    </div>
    <div class="btn-item" @click="handleCollect">
      <img src="~/assets/img/knowledge/icon-star.png" :class="['icon-btn', ifCollect ? 'active' : '']" alt="">
      收藏
    </div>
  </div>
</template>
<script>
import { knowApi } from '~/api/knowledge'
export default {
  name: 'u-operation',

  props: {
    ifLike: Boolean,
    ifCollect: Boolean,
    type: String,
    articelId: String
  },

  data () {
    return {
      likeLoding: false,
      collectLoading: false,
      commentShow: false
    }
  },

  mounted () {
  },

  methods: {
    async handleLike () {
      if (this.likeLoding) return
      this.likeLoding = true
      let params = {
        articleId: this.articelId,
        type: this.type
      }
      let fn = this.ifLike ? knowApi.artCancle(params) : knowApi.artGood(params)
      const { code } = await fn
      if (code === 506) {
        this.$toast('请先登录')
        this.likeLoding = false
      } else if (code === 200) {
        this.$toast(this.ifLike ? '取消点赞成功' : '点赞成功')
        this.$emit('setLike', !this.ifLike)
        this.likeLoding = false
      }
    },
    async handleCollect () {
      if (this.collectLoading) return
      this.collectLoading = true
      let params = {
        articleId: this.articelId,
        type: this.type
      }
      const method = this.ifCollect ? 'artCollectCancle' : 'artCollect'
      const { code } = await knowApi[method](params)
      if (code === 506) {
        this.$toast('请先登录')
        this.collectLoading = false
      } else if (code === 200) {
        this.$toast(this.ifCollect ? '取消收藏成功' : '收藏成功')
        this.$emit('setCollect', !this.ifCollect)
        this.collectLoading = false
      }
    },
    toComment () {
      this.$emit('handleComment', !this.commentShow)
    }
  }
}
</script>
<style lang="less" scoped>
.u-operation {
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
  background: white;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  z-index: 1;
  .btn-item {
    flex: 1;
    height: 18px;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    color: @cor_333;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-btn {
      width: 14px;
      height: 14px;
      margin-right: 7px;
    }
    &:last-child {
      .icon-btn {
        filter: grayscale(100);
      }
      .active {
        filter: grayscale(0%);
      }
    }
  }
}
</style>
