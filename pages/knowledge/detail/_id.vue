<template>
  <div class="m-konwledge-detail">
    <van-nav-bar title='知识分享' left-arrow @click-left='back'>
    </van-nav-bar>

    <div class="author-section">
      <div class="avatar" :style="'background-image: url(' + (detailObj.userResp.headimgurl ? detailObj.userResp.headimgurl : require('~/assets/img/defaultImg.png') ) + ')'" @click="showAuthorInfo"></div>
      <div class="info">
        <div class="nickname">
          <span>{{ detailObj.userResp.nickname }}</span>
          <user-lab :level='String(detailObj.userResp.personalInfoResp.userGradeNumber)' type='1' :profess='String(detailObj.userResp.personalInfoResp.category)'></user-lab>
        </div>
        <p class="signature">{{ signature }}</p>
      </div>
      <div :class="['like', ifSubscribe ? 'dark' : '']" @click="clickSubscribe" v-if='!isAuthor'>
        <i :class="['btn-icon', ifSubscribe ? 'tick' : 'plus']" ></i>
        {{ ifSubscribe ? '已关注' : '关注'}}
      </div>
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
      <div class="center" @click='payOpen'></div>
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

    <!-- 打赏 -->
    <pay-reward :payShow='payShow' :articelId='id' :userid='detailObj.userResp.id' @payClose='payClose'></pay-reward>

    <!-- 支付结果 -->
    <van-dialog v-model="resultWindow" :show-confirm-button="false" :closeOnClickOverlay='false' >
      <div class="result-wrap">
        <van-icon name='cross' @click='closeResult' />
        <template v-if='hasPayed'>
          <div class="pro">
            <img src="~/assets/img/order/ic_zhifuchenggong_130x90@2x.png">
          </div>
          <div class="desc">
            <h3>打赏成功</h3>
            <p>您的打赏金额将会到达作者账户中。</p>
          </div>
        </template>
        <template v-else>
          <div class="pro">
            <img src="~/assets/img/order/ic_zhifuzhibai_130x90@2x.png">
          </div>
          <div class="desc">
            <h3>打赏失败</h3>
            <p>请尝试重新打赏</p>
          </div>
        </template>
        <div class="u-button" @click='closeResult'>
          我知道了
        </div>
      </div>
    </van-dialog>

    <!-- 不再关注 -->
    <van-actionsheet
      v-model="tipShow"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
    />

    <!-- 个人信息 -->
    <u-author :class="{'show': setClass}" v-if="showInfo" :user="authObj" @closeInfo='closeInfo' @setFollow='setFollow'></u-author>
    <!-- 蒙层 -->
    <transition name="fade">
      <div class="modal" v-if="showInfo" @click="closeInfo" @touchmove="prevenScroll"></div>
    </transition>

  </div>
</template>

<script>
import api from '~/utils/request'
import { rewardApi } from '@/api/reward'
import { knowApi } from '~/api/knowledge'
import tools from '@/utils/tools'
import userLab from '@/components/Usericon.vue'
import uAuthor from '@/components/knowledge/Author'
import articelComment from '@/components/articel/Comment'
import payReward from '@/components/Pay-reward'

export default {
  name: '',

  layout: 'default',

  components: { userLab, uAuthor, articelComment, payReward },

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
      api.serverGet(`${url}${req.params.id}`, { id: req.params.id }, req), // 获取详情
      api.serverPost('/api/user/detail', null, req) // 获取登陆者信息
    ])
      .then(api.spread(function (res1, res2) {
        if (res1.code === 200) {
          const sgt = res1.data.userResp.personalInfoResp.signature || '梦想还是要有的，万一实现了呢'
          const isLogin = res2.code === 200
          const isAuthor = isLogin && res1.data.userResp.id === res2.data.userId
          return {
            id: req.params.id,
            detailObj: res1.data,
            ifLike: res1.data.checkIfLike,
            ifCollect: res1.data.checkIfCollect,
            signature: sgt,
            ifSubscribe: res1.data.userResp.checkAttention || false,
            isLogin: isLogin,
            isAuthor: isAuthor
          }
        }
      }))
  },

  data () {
    return {
      id: null, // 文章id
      isLogin: false, // 是否登录
      isAuthor: false, // 观看此文章的是否作者本人
      ifSubscribe: false, // 是否关注了作者

      actions: [{ name: '确定不再关注此人？', disabled: true }, { name: '确定' }],
      tipShow: false,

      signature: '',
      commentTotal: 0,
      ifLike: false,
      ifCollect: false,

      showInfo: false,
      setClass: false,
      authObj: {},

      payShow: false, // 打开支付选项
      resultWindow: false,
      hasPayed: null,
      configtitle: '知识分享'
    }
  },

  async mounted () {
    console.log(this.detailObj)
    // 有rewardId，调用支付状态检测
    let getReward = tools.getUrlQues('rewardId')
    if (getReward) {
      const { code, data } = await rewardApi.checkPayOrNot(getReward)
      if (code === 200) {
        if (data.hasPayed) {
          this.hasPayed = data.hasPayed
          this.resultWindow = true
          this.amount = data.rewardAmount
        }
      }
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
    // 关注、取消关注
    async handleSubscribe () {
      const { code } = await knowApi.subscribeUser({ userId: this.detailObj.userResp.id })
      if (code === 506) {
        window.location.href = '/account/login'
      } else if (code === 200) {
        this.ifSubscribe = !this.ifSubscribe
        this.$toast.success(this.ifSubscribe ? '关注成功' : '已取消关注')
        this.detailObj.userResp.checkAttention = this.ifSubscribe
        this.tipShow = false
      }
    },
    onSelect () {
      this.handleSubscribe()
    },
    async showAuthorInfo () {
      this.showInfo = true
      setTimeout(() => {
        this.setClass = true
      }, 100)
      Object.assign(this.authObj, this.detailObj.userResp.personalInfoResp, this.detailObj.userResp.sharingKnowledgeContentUserResps[0])
      this.authObj.ifFollow = this.detailObj.userResp.checkAttention
      this.authObj.userId = this.detailObj.userId
      // const { code, data } = await knowApi.getAuthorInfo({ id: this.detailObj.userResp.id })
      // if (code === 200) {
      //   this.authObj = data
      //   Object.assign(this.authObj, this.detailObj.userResp.personalInfoResp)
      //   this.authObj.ifFollow = this.detailObj.userResp.checkAttention
      //   this.authObj.videoPath = this.detailObj.videoPath || ''
      //   this.showInfo = true
      //   setTimeout(() => {
      //     this.setClass = true
      //   }, 100)
      // }
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
    payOpen () {
      if (!this.isLogin) {
        this.$toast('请先登录！')
        setTimeout(function () { window.location.href = '/account/login' }, 500)
        return false
      }
      if (this.isAuthor) return this.$toast('自己不能给自己打赏！')
      this.payShow = true
    },
    // 关闭支付
    payClose () {
      this.payShow = false
    },
    // 关闭支付通知
    closeResult () {
      this.resultWindow = false
    },
    // 打开个人信息
    openInfo () {
      this.showInfo = true
      setTimeout(() => {
        this.setClass = true
      }, 100)
    },
    // 关闭个人信息
    closeInfo () {
      this.setClass = false
      setTimeout(() => {
        this.showInfo = false
      }, 200)
    },
    // 个人信息弹窗取消关注
    setFollow (val) {
      console.log(val)
      this.ifSubscribe = val
      this.detailObj.userResp.checkAttention = val
      this.authObj.ifFollow = val
      val ? this.detailObj.userResp.personalInfoResp.fanNumber += 1 : this.detailObj.userResp.personalInfoResp.fanNumber -= 1
      val ? this.authObj.fanNumber += 1 : this.authObj.fanNumber -= 1
    },
    back () {
      window.location.href = '/knowledge'
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
          max-width: 120px;
          margin-right: 5px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
  .result-wrap {
    padding: 40px 45px 22px;
    text-align: center;
    position: relative;
    .pro {
      width: 130px;
      height: 90px;
      display: inline-block;
      img {
        max-width: 100%;
      }
    }
    .desc {
      h3 {
        margin: 25px 0 15px;
        font-size: 17px;
        color: #333;
      }
      p {
        color: #999;
        font-size: 13px;
      }
    }
    .u-button {
      display: inline-block;
      margin-top: 30px;
      width: 133px;
      height: 42px;      
    }
    i {
      position: absolute;
      right: 10px;
      top: 10px;
      color: #333;
      font-size: 24px;
    }
  }
}
</style>
