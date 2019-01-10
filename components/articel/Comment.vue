<template>
  <div class="u-articel">
    <!-- 操作选项 -->
    <article-operation :ifLike='ifLike' :ifCollect='ifCollect' :type='type' :articelId='articelId' @setLike='setLike' @setCollect='setCollect' @handleComment='handleComment'></article-operation>

    <!-- 评论列表 -->
    <div class="comment-section">
      <p class="title">所有评论（{{ commentTotal }}条）</p>
      <div class="part" v-for="item in commentList" :key="item.id">

        <div class="part-body">
          <div class="part-body-top">
            <div class="avatar" :style="'background-image: url(' + item.personalInfoResp.headimgurl + ')'"></div>
            <div class="user">
              <p class="nickname">{{ item.personalInfoResp.nickname }}</p>
              <user-lab :level='String(item.personalInfoResp.userGradeNumber)' type='1' :profess='String(item.personalInfoResp.category)'></user-lab>
            </div>
            <div class="good" v-if="item.ifGod">神评论</div>
          </div>
          <div class="part-body-center">{{ item.content }}</div>
          <div class="part-body-bottom">
            <span class="time">{{ changeTime(item.createdAt) }}</span>
            <div class="flex_tlCenter">
              <div class="reply ">回复({{ item.replyNum }})</div>
              <div :class="['like', item.ifLiked ? 'active' : '']" @click="handleCommentLike(item)">{{ item.likeNum }}</div>
            </div>
          </div>
        </div>

        <div class="part-content">
          <div class="part-content-box">

            <div class="reply-item" v-for="p in item.replyList">
              <div class="avatar-img" :style="'background-image: url(' + p.headimgurl + ')'"></div>
              <div class="reply-right">
                <p class="username">{{ p.nickname }}<span>回复</span>{{ p.toUsername }}</p>
                <user-lab :level='String(p.userGradeNumber)' type='1' :profess='String(p.category)'></user-lab>
                <p class="reply-content">{{ p.content }}</p>
                <div class="reply-handler">
                  <span class="time">{{ changeTime(p.createdAt) }}</span>
                  <div class="flex_tlCenter">
                    <div class="reply ">回复({{ p.replyNum }})</div>
                    <div :class="['like', p.ifLiked ? 'active' : '']" @click="handleCommentLike(p)">{{ p.likeNum }}</div>
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
import ImageHandler from '~/components/evaluation/ImageHandler'
import { commentApi } from '~/api/comment'

export default {
  name: 'u-comment',

  props: {
    detailData: Object,
    type: String,
    articelId: String
  },

  components: {
    articleOperation,
    ImageHandler,
    userLab
  },

  data () {
    return {
      ifLike: this.detailData.checkIfLike, // 是否点赞
      ifCollect: this.detailData.checkIfCollect, // 是否收藏
      commentShow: false, // 去评论弹框
      commentContent: '', // 评论内容
      imgList: [], // 评论上传的图片

      commentList: [], // 评论列表
      commentTotal: 0, // 评论总条数

      page: 1, // 当前页数
      pageEmpty: false, // 没有更多内容
      pageLoding: true,
      isBottom: false // 滚动到底部
    }
  },

  watch: {
    $route (to, from) {
      if (to.hash === '') {
        this.commentShow = false
      } else if (to.hash === '#comment') {
        this.commentShow = true
      }
    },
    isBottom (val) {
      console.log(val)
      if (val && !this.pageEmpty) {
        this.page = this.page + 1
        this.getData(this.page)
      }
    }
  },

  mounted () {
    this.getData(this.page)
    window.addEventListener('scroll', this.handleScroll(() => {
      this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
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
    async getData (page, needRender = false) {
      this.pageLoding = true
      let params = {
        page: page,
        count: 5,
        articleId: this.articelId,
        type: this.type
      }
      const { code, data } = await commentApi.getComments(params)
      if (code === 200) {
        console.log(data)
        this.commentTotal = data.total
        if (data.array.length === 0) {
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
        // todo
      }
    },
    setLike (val) {
      this.ifLike = val
    },
    setCollect (val) {
      this.ifCollect = val
    },
    handleComment (val) {
      this.commentShow = val
      window.location.hash = 'comment'
      console.log(this.commentShow)
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
        margin-bottom: 10px;
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
    .part-content {
      padding: 20px 20px 20px 0;
      &-box {
        padding: 15px 15px 20px 15px;
        border: 1PX solid @cor_border;
        background: #FCFCFC;
        border-radius: 2px;
        .reply-item {
          display: flex;
          & + .reply-item {
            margin-top: 20px;
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
              span {
                color: @cor_333;
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
