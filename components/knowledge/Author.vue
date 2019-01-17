<template>
  <div class="u-author" @touchmove="preventTM">

    <div class="u-author-wrapper">
      <div class="top-bg"></div>
      <div class="u-author-wrapper-top">
        <div class="avatar" :style="'background-image: url(' + user.headimgurl + ')'"></div>
        <p class="nickname">
          <span>{{ user.nickname }}</span>
          <user-lab class="label" :level='String(user.userGradeNumber)' type='1' :profess='String(user.category)'></user-lab>
        </p>
        <p class="signa">{{ user.signature || '梦想还是要有的，万一实现了呢' }}</p>
        <div class="fans">
          <div class="fans-ins"><p>{{ user.attentionNumber }}</p>关注</div>
          <div class="fans-ins"><p>{{ user.fanNumber }}</p>粉丝</div>
          <div class="follow" :class="[checkFollow ? 'dark' : '']" @click="handleSubscribe">
            {{ checkFollow ? '已关注' : '关注' }}
          </div>
        </div>
        <div class="close" @click="closeComponent"></div>
      </div>
      <div class="u-author-wrapper-bottom">
        <a v-if='user.title' :href="'/knowledge/detail/' + user.id + '?type=' + user.articleType">
          <p class="article-title">{{ user.title }}</p>
          <div v-if="user.articleType === 1 && user.path" class="article-img" v-lazy:background-image="user.path"></div>
          <div class="video-box" v-if='user.videoPath'>
            <video :src="user.videoPath" @loadedmetadata="loadVideoData" class="video-img">
            </video>
            <div class="play">00:00 / {{ videoTime }}</div>
          </div>
        </a>

        <van-button class="btn-bottom" round size="large" @click='toUserPage'>进入用户主页</van-button>
      </div>
    </div>

  </div>
</template>

<script>
import { knowApi } from '~/api/knowledge'
import userLab from '@/components/Usericon.vue'

export default {
  name: '',

  components: { userLab },

  props: {
    user: Object
  },

  data () {
    return {
      videoTime: 0,
      checkFollow: this.user.ifFollow
    }
  },

  mounted () {
    console.log(this.user)
  },

  methods: {
    // 关注切换
    async handleSubscribe () {
      const { code } = await knowApi.subscribeUser({ userId: this.user.userId })
      if (code === 506) {
        window.location.href = '/account/login'
      } else if (code === 200) {
        this.checkFollow = !this.checkFollow
        this.$toast.success(this.checkFollow ? '关注成功' : '已取消关注')
        this.$emit('setFollow', this.checkFollow)
      }
    },
    preventTM (e) {
      e.preventDefault()
    },
    closeComponent () {
      this.$emit('closeInfo')
    },
    toUserPage () {
      window.location.href = '/user?uid=' + this.user.userId
    },

    formatVideoTime (v) {
      const m = Math.floor(v / 60)
      const s = v % 60
      return (m < 10 ? `0${m}` : m) + ':' + (s < 10 ? `0${s}` : s)
    },
    loadVideoData (e) {
      this.videoTime = this.formatVideoTime(Number(e.target.duration.toFixed(0)))
    }
  }
}
</script>

<style lang="less" scoped>
.u-author {
  &.show {
    .u-author-wrapper {
      opacity: 1;
      transform: none;
      visibility: visible;
    }
  }
  &-wrapper {
    margin: 0 5px 5px 5px;
    width: calc(100% - 10px);
    box-sizing: border-box;
    position: fixed;
    z-index: 21;
    bottom: 0;
    bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    visibility: hidden;
    opacity: 0;
    transform: translateY(10%);
    transition: ease .4s;
    .top-bg {
      width: 100%;
      height: 34px;
      background-image: url(~/assets/img/knowledge/bg-round.png);
      background-position: center bottom;
      background-repeat: no-repeat;
      background-size: contain;
      transform: translateY(1px);
    }
    &-top {
      padding: 20px 30px;
      position: relative;
      background: white;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      .avatar {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        margin: 0 auto;
        margin-top: -40px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      .nickname {
        margin-top: 13px;
        font-size: 16px;
        color: @cor_333;
        font-weight: bold;
        text-align: center;
        span {
          line-height: 22px;
          vertical-align: middle;
        }
        .label {
          position: absolute;
          margin-left: 5px;
        }
      }
      .signa {
        font-size: 12px;
        color: @cor_999;
        text-align: center;
        margin-top: 10px;
      }
      .fans {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .fans-ins {
          font-size: 13px;
          color: @cor_999;
          text-align: center;
          p {
            margin-bottom: 10px;
            font-size: 19px;
            color: @cor_333;
            font-family: DINPro;
            font-weight: bold;
          }
        }
        .follow {
          height: 35px;
          width: 80px;
          text-align: center;
          box-sizing: border-box;
          line-height: 35px;
          border: 1PX solid @nice-blue;
          color: @nice-blue;
          font-size: 13px;
          border-radius: 4px;
          &.dark {
            background: #ccc;
            color: #fff;
            border-color: #ccc;
          }
        }
      }
      .close {
        width: 26px;
        height: 26px;
        background-image: url(~/assets/img/knowledge/icon-close-round.png);
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        top: 15px;
        right: 15px;
      }
    }
    &-bottom {
      border-top: 1PX solid @cor_border;
      padding: 20px 25px 15px 25px;
      background: white;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      position: relative;
      .article-title {
        font-size: 15px;
        color: @cor_333;
        font-weight: bold;
        line-height: 25px;
        overflow : hidden;
        max-height: 48px;
        // text-overflow: ellipsis;
        // display:-webkit-box;
        // -webkit-line-clamp: 2;
        // -webkit-box-orient: vertical;
        margin: 0 10px 10px 10px;
      }
      .article-img {
        width: 100%;
        height: 200px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 5px;
        margin-bottom: 20px;
      }
      .video-box {
        position: relative;
        .video-img {
          width: 100%;
          max-height: 180px;
          margin-bottom: 20px;
        }
        .play {
          padding-top: 37px;
          background-image: url(~/assets/img/knowledge/icon-play.png);
          background-position: center top;
          background-size: 25px 25px;
          background-repeat: no-repeat;
          position: absolute;
          top: 32%;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-size: 13px;
          text-align: center;
        }
      }
      .btn-bottom {
        border: none;
        background: @nice-blue;
        color: white;
      }
    }
  }
}
</style>
