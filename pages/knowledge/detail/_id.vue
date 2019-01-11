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
        <div class="re-ul" v-if='detailObj.appreciateNumber !== 0'>
          <!-- todo -->
          <div class="re-li"></div>
        </div>
      </div>
    </div>

    <!--
      文章评论
      type -> 文章类型
      articelId -> 文章id
      ifLike -> 是否喜欢
      ifCollect -> 是否收藏
    -->
    <articel-comment type='1' :articelId='id' :ifLike='ifLike' :ifCollect='ifCollect'></articel-comment>

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
import articelComment from '@/components/articel/Comment'

export default {
  name: '',

  layout: 'default',

  components: { userLab, uAuthor, articelComment },

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
      api.serverGet(`${url}${req.params.id}`, { id: req.params.id }, req)
      // knowApi.getComments({ page: 1, count: 5, articleId: req.params.id, type: 1 }, req)
    ])
      .then(api.spread(function (res1, res2) {
        if (res1.code === 200) {
          console.log('res1.data', res1.data)
          // console.log(res2.data.array)
          const sgt = res1.data.userResp.personalInfoResp.signature || ''
          return {
            id: req.params.id,
            detailObj: res1.data,
            ifLike: res1.data.checkIfLike,
            ifCollect: res1.data.checkIfCollect,
            // commentList: res2.data.array,
            // commentTotal: res2.data.total,
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
      // detailObj: {},
      // commentList: [],
      commentTotal: 0,
      ifLike: false,
      ifCollect: false,

      showInfo: false,
      authObj: {}
    }
  },

  mounted () {
    console.log(this.detailObj)
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
    async handleCommentLike (val) {
      const method = val.ifLkie ? 'dislikeComment' : 'lkieComment'
      const { code } = knowApi[method](val.id)
      if (code === 506) {
        window.location.href = '/account/login'
      } else if (code === 200) {
        val.ifLkie = !val.ifLkie
      }
    },
    prevenScroll (e) {
      e.preventDefault()
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
      text-align: justify;
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
      font-size: 14px;
      color: @cor_999;
      img {
        max-width: 100%!important;
        height: auto!important;
        margin: 5px 0;
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
}
</style>
