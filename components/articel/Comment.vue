<template>
  <div class="u-articel">
    <!-- 操作选项 -->
    <article-operation :ifLike='artLike' :ifCollect='artCollect' :type='type' :articelId='articelId' @setLike='setLike' @setCollect='setCollect' @handleComment='handleComment'></article-operation>

    <!-- 评论列表 -->
    <div class="comment-section">
      <p class="title">所有评论（{{ commentTotal }}条）</p>
      <div class="part" v-for="(item, index) in commentList" :key="item.id">

        <div class="part-body">
          <div class="part-body-top">
            <div class="avatar" :style="'background-image: url(' + (item.personalInfoResp.headimgurl || defaulthead) + ')'"></div>
            <div class="user">
              <p class="nickname">{{ item.personalInfoResp.nickname }}</p>
              <user-lab :level='String(item.personalInfoResp.userGradeNumber)' type='1' :profess='String(item.personalInfoResp.category)'></user-lab>
            </div>
            <div class="good" v-if="item.ifGod">神评论</div>
          </div>
          <div class="part-body-center">{{ item.content }}</div>
          <!-- 图片 -->
          <ul class="part-body-pro" v-if='item.imgs.length !== 0'>
            <li class="pic-list" v-for="(imgItem, imgIndex) in item.imgs" @click='showBigImg(imgIndex, item.imgs)'>
              <img v-lazy="imgItem">
            </li>
          </ul>
          <div class="part-body-bottom">
            <span class="time">{{ changeTime(item.createdAt) }}</span>
            <div class="flex_tlCenter">
              <div class="reply" @click='toReply(item)'>回复({{ item.replyNum }})</div>
              <div :class="['like', item.ifLiked ? 'active' : '']" @click="handleCommentLike(item, index)">{{ item.likeNum }}</div>
            </div>
          </div>
        </div>

        <div class="part-content" v-if='item.replyList'>
          <div class="part-content-box">

            <div class="reply-item" v-for="(p, k) in item.replyList">
              <div class="avatar-img" :style="'background-image: url(' + (p.personalInfoResp.headimgurl || defaulthead) + ')'"></div>
              <div class="reply-right">
                <p class="username" v-if='p.toUserId === item.personalInfoResp.id'>{{ p.personalInfoResp.nickname }}</p>
                <p class="username" v-else>{{ p.personalInfoResp.nickname }}<span>回复</span>{{ p.toUsername }}</p>
                <user-lab :level='String(p.personalInfoResp.userGradeNumber)' type='1' :profess='String(p.personalInfoResp.category)'></user-lab>
                <p class="reply-content">{{ p.content }}</p>
                <div class="reply-handler">
                  <span class="time">{{ changeTime(p.createdAt) }}</span>
                  <div class="flex_tlCenter">
                    <div :class="['like', p.ifLiked ? 'active' : '']" @click="handleCommentLike(p, k)">{{ p.likeNum }}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class='more-loading' v-show='pageLoding'>
      <van-loading type="spinner" />
      <p>正在加载更多</p>
    </div>

    <div class="no-more" v-show='pageEmpty'>
      <p>没有更多评论了！</p>
    </div>

    <!-- 返回顶部 -->
    <div class="to-top" :class="{'show': showBtn}">
      <van-icon name="upgrade" color="#03A00C8" @click="backToTop"></van-icon>
    </div>

    <!-- 回复 -->
    <van-popup class='to-comment-wrap' v-model="replyShow" position="right" :overlay="true">
      <articel-reply :masterinfo='masterInfo' :replyData='replyData' @setReplyData='setReplyData' @renderData='renderData' />
    </van-popup>

    <!-- 去评论弹框 -->
    <van-popup class='to-comment-wrap' v-model="commentShow" position="right" :overlay="true">
      <van-nav-bar title="评论内容" left-arrow right-text='发送' @click-left='back' @click-right="submitComment"></van-nav-bar>
      <textarea class="textarea" placeholder="请填写评论内容" v-model='commentContent'></textarea>
      <ImageHandler v-model="imgList"></ImageHandler>
    </van-popup>
  </div>
</template>
<script>
import tools from '~/utils/tools'
import articleOperation from '@/components/articel/Operation'
import userLab from '@/components/Usericon.vue'
import articelReply from '@/components/articel/Reply'
import ImageHandler from '~/components/evaluation/ImageHandler'
import { commentApi } from '~/api/comment'
import { ImagePreview } from 'vant'

export default {
  name: 'u-comment',

  props: {
    type: String,
    articelId: String,
    ifLike: Boolean, // 是否喜欢
    ifCollect: Boolean // 是否收藏
  },

  components: {
    articleOperation,
    ImageHandler,
    userLab,
    articelReply
  },

  data () {
    return {
      artLike: this.ifLike,
      artCollect: this.ifCollect,

      commentShow: false, // 去评论弹框
      commentContent: '', // 评论内容
      imgList: [], // 评论上传的图片

      commentList: [], // 评论列表
      commentTotal: 0, // 评论总条数
      defaulthead: this.defaulthead, // 默认头像

      page: 1, // 当前页数
      pageEmpty: false, // 没有更多内容
      pageLoding: true,
      isBottom: false, // 滚动到底部
      showBtn: false, // 显示返回顶部按钮

      zanLoading: false,
      sendLoading: false,

      replyShow: false, // 展开回复页面
      masterInfo: {}, // 缓存的楼主信息，用于回复页面显示
      replyData: {} // 回复信息
    }
  },

  watch: {
    $route (to, from) {
      if (to.hash === '') {
        this.commentShow = false
        this.replyShow = false
      } else if (to.hash === '#comment') {
        this.commentShow = true
      } else if (to.hash === '#reply') {
        this.replyShow = true
      }
    },
    isBottom (val) {
      if (val && !this.pageEmpty) {
        this.page = this.page + 1
        this.getData(this.page)
      }
    },
    articelId (val) {
      this.getData(this.page, true, val)
      console.log(val)
    }
  },

  mounted () {
    this.getData(this.page)
    window.addEventListener('scroll', this.handleScroll(() => {
      this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      if (scrollTop > this.windowHeight) {
        this.showBtn = true
      } else {
        this.showBtn = false
      }
      // 距离底部大约200像素
      if (scrollTop + this.windowHeight >= this.scrollHeight - 200) {
        this.isBottom = true
      } else {
        this.isBottom = false
      }
    }))
  },

  methods: {
    // 获取评论内容
    async getData (page, needRender = false, articelId = this.articelId) {
      this.pageLoding = true
      let params = {
        page: page,
        count: 5,
        articleId: articelId,
        type: this.type
      }
      const { code, data } = await commentApi.getComments(params)
      if (code === 200) {
        console.log(data)
        this.commentTotal = data.total
        if (data.array.length < 5) {
          this.pageEmpty = true
        } else {
          this.pageEmpty = false
        }
        if (needRender) {
          // 重新渲染数据
          this.commentList = data.array
        } else {
          this.commentList.push(...data.array)
        }
        this.pageLoding = false
      }
    },
    // 发送评论
    async submitComment () {
      /**
       * type（1:知识分享 2:新闻咨询 3:甄选内容 4:百科品种 5:百科产区 6:百科酒庄
       **/
      if (this.sendLoading) return
      this.sendLoading = true
      let params = {
        articleId: this.articelId,
        content: this.commentContent,
        imgs: this.imgList,
        type: this.type
      }
      console.log(params)
      const { code, data } = await commentApi.createComent(params)
      if (code === 200) {
        console.log(data)
        this.getData(1, true)
        this.sendLoading = false
        window.location.hash = ''
        this.page = 1
        this.pageEmpty = false
      }
    },
    // 评论点赞
    async handleCommentLike (val, index) {
      if (this.zanLoading) return
      this.zanLoading = true
      let { id, ifLiked } = val
      const { code, data } = ifLiked ? await commentApi.comCancle(id) : await commentApi.comGood(id)
      if (code === 200) {
        val.ifLiked = !ifLiked
        val.likeNum = data
        this.$toast(ifLiked ? '取消点赞成功' : '点赞成功')
        this.zanLoading = false
      }
    },
    // 查看回复
    async toReply (val) {
      const toast1 = this.$toast.loading('回复信息加载中')
      this.commentId = val.id
      let obj = {
        page: 1,
        count: 5,
        commentId: this.commentId
      }
      const { code, data } = await commentApi.getRelyList(obj)
      if (code === 200) {
        console.log(data)
        toast1.clear()
        this.replyShow = true
        this.replyData = data.array
        this.masterInfo = val
        window.location.hash = 'reply'
      }
    },
    // 获取子组件回复内容
    setReplyData (val) {
      this.replyData.push(...val)
    },
    // 重载回复列表数据
    async renderData (val) {
      let obj = {
        page: 1,
        count: 5,
        commentId: this.commentId
      }
      const { code, data } = await commentApi.getRelyList(obj)
      if (code === 200) {
        this.replyData = data.array
      }
    },
    // 查看大图
    showBigImg (index, val) {
      ImagePreview({
        images: val,
        startPosition: index,
        onClose () {
        }
      })
    },
    setLike (val) {
      this.artLike = val
    },
    setCollect (val) {
      this.artCollect = val
    },
    // 打开评论弹框
    handleComment (val) {
      this.commentShow = val
      window.location.hash = 'comment'
    },
    back () {
      window.history.go(-1)
      this.commentShow = false
    },
    changeTime (time) {
      time = new Date(time).getTime()
      return tools.timeago(time)
    },
    handleScroll (fn) {
      let Switch = true
      return function () {
        if (!Switch) return
        Switch = false
        setTimeout(() => {
          fn.apply(this, arguments)
          Switch = true
        }, 150)
      }
    },
    backToTop () {
      const e = document.documentElement || document.body
      const step = (e.scrollTop / 500) * 15
      let t = setInterval(() => {
        if (e.scrollTop > 1) {
          e.scrollTop = e.scrollTop - step
        } else {
          clearInterval(t)
        }
      }, 15)
    }
  }
}
</script>
<style lang="less" scoped>
.u-articel {
}
.to-comment-wrap {
  position: fixed;
  width: 100vw;
  height: 100vh;
  .van-nav-bar__text {
    color: #03A1CD!important;
    font-size: 13px;
    font-family: 'PingFangSC-Semibold';
  }
  .textarea {
    width: 100%;
    height: 30vh;
    overflow: scroll;
    font-size: 14px;
    color: #333;
    padding: 20px;
    box-sizing: border-box;
  }
}
.comment-section {
  border-top: 10PX solid @cor_border;
  padding: 20px 0 20px 20px;
  background: #fff;
  .title {
    font-size: 15px;
    color: @cor_333;
    font-weight: bold;
  }
  .part {
    .part-body {
      border-bottom: 1PX solid @cor_border;
      padding: 25px 20px 20px 0;
      &-top {
        display: flex;
        align-items: center;
        height: 45px;
        margin-bottom: 15px;
        .avatar {
          width: 45px;
          height: 45px;
          border-radius: 100%;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          margin-right: 10px;
        }
        .user {
          height: 45px;
          flex: 1;
          .nickname {
            color: @cor_333;
            font-size: 15px;
            color: @cor_333;
          }
        }
        .good {
          width: 30px;
          height: 45px;
          box-sizing: border-box;
          padding-top: 33px;
          font-size: 10px;
          background-image: url(~/assets/img/knowledge/icon-good.png);
          background-position: center top;
          background-repeat: no-repeat;
          background-size: contain;
          color: @cor_999;
          white-space: nowrap;
        }
      }
      &-center {
        font-size: 15px;
        color: @cor_333;
        line-height: 25px;
        margin-bottom: 15px;
      }
      &-pro {
        display: flex;
      }
      .pic-list {
        border: 1px solid #eee;
        width: 68px;
        height: 68px;
        margin-right: 10px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:last-child {
          margin-right: 0;
        }
        img {
          max-width: 100%;
          height: auto;
        }
      }
      &-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time {
          font-size: 12px;
          color: @cor_999;
        }
        .reply {
          font-size: 13px;
          color: @cor_333;
          font-weight: bold;
        }
        .like {
          margin-left: 20px;
          font-size: 13px;
          color: @cor_999;
          padding-left: 20px;
          background-image: url('~/assets/img/knowledge/icon-like-black.png');
          background-repeat: no-repeat;
          background-position: left center;
          background-size: contain;
          &.active {
            background-image: url('~/assets/img/knowledge/icon-like-blue.png');
          }
        }
      }
    }
    .part-content {
      padding: 20px 20px 20px 0;
      &-box {
        padding: 15px 15px 20px 15px;
        border: 1PX solid @cor_border;
        background: #FCFCFC;
        border-radius: 2px;
        font-size: 0;
        .reply-item {
          display: flex;
          & + .reply-item {
            margin-top: 30px;
          }
          .avatar-img {
            width: 40px;
            height: 40px;
            margin-right: 10px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 100%;
          }
          .reply-right {
            flex: 1;
            .username {
              font-size: 13px;
              color: @cor_666;
              margin-bottom: 5px;
              max-width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              span {
                color: @cor_333;
                display: inline-block;
                margin: 0 3px; 
              }
            }
            .reply-content {
              font-size: 13px;
              color: @cor_333;
              line-height: 19px;
              margin: 15px 0;
            }
            .reply-handler {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .time {
                font-size: 12px;
                color: @cor_999;
              }
              .reply {
                font-size: 13px;
                color: @cor_333;
                font-weight: bold;
              }
              .like {
                margin-left: 20px;
                font-size: 13px;
                color: @cor_999;
                padding-left: 20px;
                background-image: url(~/assets/img/knowledge/icon-like-black.png);
                background-repeat: no-repeat;
                background-position: left center;
                background-size: contain;
                &.active {
                  background-image: url(~/assets/img/knowledge/icon-like-blue.png);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
  .u-eva-img-handler {
    padding: 0 20px;
  }
</style>
