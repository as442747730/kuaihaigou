<template>
  <div class="m-konwledge-detail">

    <div class="author-section">
      <div class="avatar" :style="'background-image: url(' + (detailObj.userResp.headimgurl ? detailObj.userResp.headimgurl : require('~/assets/img/defaultImg.png') ) + ')'" @click="showAuthorInfo"></div>
      <div class="info">
        <div class="nickname">
          <span>{{ detailObj.userResp.nickname }}</span>
          <user-lab :level='String(detailObj.userResp.personalInfoResp.userGradeNumber)' type='1' :profess='String(detailObj.userResp.personalInfoResp.category)'></user-lab>
        </div>
        <p class="signature">{{ signature }}</p>
      </div>
      <div :class="['like', ifSubscribe ? 'dark' : '']" @click="clickSubscribe">
        <i :class="['btn-icon', ifSubscribe ? 'tick' : 'plus']" ></i>
        {{ ifSubscribe ? '已关注' : '关注'}}</div>
    </div>

    <div class="article-section">

      <div class="info-wrapper">
        <p class="title">{{ detailObj.title }}</p>
        <p class="desc">
          <span class="gut">频道：{{ detailObj.channelName }}</span>
          <span>话题：{{ detailObj.topicName }}</span>
        </p>
        <p class="desc date">{{ detailObj.createdAt }}</p>
      </div>

      <div class="content-wrapper" v-if="detailObj.articleType === 1" v-html="detailObj.content"></div>

      <div class="content-wrapper" v-if="detailObj.articleType === 2">
        <video controls :src="detailObj.videoPath"></video>
      </div>

    </div>

    <div class="reward-section">
      <div class="center"></div>
      <p class="center-desc">分享不易，鼓励一下吧~</p>
      <div class="reward-info">
        <p class="info-title">他收到过 <span>{{ detailObj.appreciateNumber }}</span> 人打赏</p>
        <div class="re-ul">
          <!-- todo -->
          <div class="re-li"></div>
        </div>
      </div>
    </div>

    <div class="comment-section">
      <p class="title">所有评论（{{ commentTotal }}条）</p>
      <div class="part" v-for="item in commentList" :key="item.id">

        <div class="part-body">
          <div class="part-body-top">
            <div class="avatar" :style="'background-image: url(' + item.personalInfoResp.headimgurl + ')'"></div>
            <div class="user">
              <p class="nickname">{{ item.personalInfoResp.nickname }}</p>
              <user-lab :level='String(item.personalInfoResp.userGradeNumber)' type='1' :profess='String(item.userResp.category)'></user-lab>
            </div>
            <div class="good" v-if="item.ifGod">神评论</div>
          </div>
          <div class="part-body-center">{{ item.content }}</div>
          <!-- todo 图片 -->
          <div class="part-body-bottom">
            <span class="time">{{ item.createdAt }}</span>
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
                  <span class="time">{{ p.createdAt }}</span>
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

    <div class="footer-section">
      <div class="btn-item" @click="handleLike"><img src="~/assets/img/knowledge/icon-like-black.png" :class="['icon-btn', ifLike ? 'active' : '']" alt="" >点赞</div>
      <div class="btn-item"><img src="~/assets/img/knowledge/icon-comment.png" class="icon-btn" alt="">评论</div>
      <div class="btn-item" @click="handleCollect"><img src="~/assets/img/knowledge/icon-star.png" :class="['icon-btn', ifCollect ? 'active' : '']" alt="">收藏</div>
    </div>

    <van-actionsheet
      v-model="tipShow"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
    />

    <transition name="fade">
      <u-author v-if="showInfo" :user="authObj" @click="showInfo = false"></u-author>
    </transition>
    <transition name="fade">
      <div class="modal" v-if="showInfo" @click="showInfo = false" @touchmove="prevenScroll"></div>
    </transition>

  </div>
</template>

<script>
import api from '~/utils/request'
import { knowApi } from '~/api/knowledge'
import userLab from '@/components/Usericon.vue'
import uAuthor from '@/components/knowledge/Author'

export default {
  name: '',

  layout: 'default',

  components: { userLab, uAuthor },

  head () {
    return {
      title: '知识分享',
      meta: [
        { hid: 'title', name: 'title', content: '知识分享' }
      ]
    }
  },

  async asyncData (req) {
    const url = +req.query.type === 1 ? '/api/sk/getArticle/' : '/api/sk/getVideo/'
    return api.all([
      api.serverGet(`${url}${req.params.id}`, { id: req.params.id }, req),
      knowApi.getComments({ page: 1, count: 5, articleId: req.params.id, type: 1 }, req)
    ])
      .then(api.spread(function (res1, res2) {
        if (res1.code === 200 && res2.code === 200) {
          console.log(res1.data)
          console.log(res2.data.array)
          const sgt = res1.data.userResp.personalInfoResp.signature || ''
          return {
            id: req.params.id,
            detailObj: res1.data,
            ifLkie: res1.data.checkIfLike,
            ifCollect: res1.data.checkIfCollect,
            commentList: res2.data.array,
            commentTotal: res2.data.total,
            signature: sgt,
            ifSubscribe: res1.data.userResp.checkAttention || false
          }
        }
      }))
  },

  data () {
    return {
      id: null,
      ifSubscribe: false, // 是否关注了作者

      actions: [{ name: '确定不再关注此人？', disabled: true }, { name: '确定' }],
      tipShow: false,

      signature: '',
      detailObj: {},
      commentList: [],
      commentTotal: 0,
      ifLike: false,
      ifCollect: false,

      showInfo: false,
      authObj: {}
    }
  },

  methods: {
    clickSubscribe () {
      if (this.ifSubscribe) {
        this.tipShow = true
        return
      }
      this.handleSubscribe()
    },
    async handleSubscribe () {
      const { code } = await knowApi.subscribeUser({ userId: this.detailObj.userResp.id })
      if (code === 506) {
        window.location.href = '/account/login'
      } else if (code === 200) {
        this.ifSubscribe = !this.ifSubscribe
        this.$toast.success(this.ifSubscribe ? '关注成功' : '已取消关注')
        this.tipShow = false
      }
    },
    onSelect () {
      this.handleSubscribe()
    },

    async showAuthorInfo () {
      const { code, data } = await knowApi.getAuthorInfo({ id: this.detailObj.userResp.id })
      if (code === 200) {
        this.authObj = data
        Object.assign(this.authObj, this.detailObj.userResp.personalInfoResp)
        this.authObj.ifFollow = this.detailObj.userResp.checkAttention
        this.showInfo = true
      }
    },
    prevenScroll (e) {
      e.preventDefault()
    },

    async handleLike () {
      const { code } = await knowApi.toggleLike(this.id)
      if (code === 506) {
        window.location.href = '/account/login'
      } else if (code === 200) {
        this.ifLkie = !this.ifLkie
      }
    },
    async handleCommentLike (val) {
      const method = val.ifLkie ? 'dislikeComment' : 'lkieComment'
      const { code } = knowApi[method](val.id)
      if (code === 506) {
        window.location.href = '/account/login'
      } else if (code === 200) {
        val.ifLkie = !val.ifLkie
      }
    },
    async handleCollect () {
      const method = this.ifCollect ? 'handleUnCollect' : 'handleCollect'
      const { code } = await knowApi[method]({ articleId: this.id, type: 1 })
      if (code === 506) {
        window.location.href = '/account/login'
      } else if (code === 200) {
        this.ifCollect = !this.ifCollect
      }
    }
  }
}
</script>

<style lang="less" scoped>
.m-konwledge-detail {
  background: white;
  padding-bottom: 50px;
  .author-section {
    display: flex;
    align-items: center;
    padding: 25px 0;
    margin: 0 20px;
    border-bottom: 1PX solid @cor_border;
    .avatar {
      width: 40px;
      height: 40px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 15px;
      border-radius: 100%;
    }
    .info {
      flex: 1;
      padding-right: 10px;
      .nickname {
        font-size: 16px;
        font-weight: bold;
        color: @cor_333;
        display: flex;
        align-items: center;
        span {
          margin-right: 5px;
        }
      }
      .signature {
        margin-top: 7px;
        font-size: 12px;
        color: @cor_999;
      }
    }
    .like {
      width: 80px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      color: white;
      background: #03A0CB;
      font-size: 13px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      &.dark {
        background: #CCCCCC;
      }
      .btn-icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        &.tick {
          background-image: url('~/assets/img/knowledge/icon-tick.png');
        }
        &.plus {
          background-image: url('~/assets/img/knowledge/icon-plus.png');
        }
      }
    }
  }
  .article-section {
    padding: 22px 20px 25px 20px;
    .title {
      font-size: 19px;
      color: @cor_333;
      font-weight: bold;
      line-height: 26px;
    }
    .desc {
      margin-top: 10px;
      font-size: 12px;
      color: @cor_999;
      &.date {
        padding-left: 18px;
        background-image: url(~/assets/img/me/icon-clock.png);
        background-position: left center;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .gut {
        margin-right: 20px;
      }
    }

    .info-wrapper {
      margin-bottom: 25px;
    }
    .content-wrapper {
      line-height: 25px;
      font-size: 15px;
      color: @cor_999;
      img {
        max-width: 100%!important;
        height: auto!important;
      }
    }
  }
  .reward-section {
    border-top: 1PX solid @cor_border;
    text-align: center;
    padding: 30px 0;
    .center {
      margin: 0 auto;
      width: 60px;
      height: 60px;
      background: @nice-blue;
      border-radius: 100%;
      background-image: url(~/assets/img/knowledge/icon-money.png);
      background-size: 27px 27px;
      background-position: center;
      background-repeat: no-repeat;
    }
    .center-desc {
      margin-top: 15px;
      text-align: center;
      font-size: 13px;
      color: @cor_999;
      margin-bottom: 15px;
    }
    .reward-info {
      background: #FCFCFC;
      padding: 20px 0;
      text-align: center;
      .info-title {
        font-size: 12px;
        color: @cor_999;
        span {
          color: @cor_333;
        }
      }
      .re-ul {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        .re-li {
          width: 16px;
          height: 16px;
          border-radius: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          & + .re-li {
            margin-left: 5px;
          }
        }
      }
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

  .footer-section {
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
        filter: grayscale(100%);
        &.active {
          filter: grayscale(0);
        }
      }
    }
  }
}
</style>
