<template>
  <div class="detail_question">
    <div class="margin-20">
      <h2>常见问题</h2>
      <ul class="question-item">
        <li class="question-list" v-for="i in queslist">
          <a target="_blank" :href="i.url">
            <div class="pro ib-middle" :style="'background:url(' + i.imgurl + ') no-repeat center/contain'"></div>
            <div class="desc ib-middle">
              <p>{{ i.title }}</p>
              <span>{{ i.content }}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <div class="u-detail_line"></div>

    <div class="answer">
      <div class="margin-20">
        <h2>
          疑问解答
          <span>（{{ qestNum }}条）</span>
          <i class="to-ask" :class="{'tp-5': qestList.length === 0}" @click='toAsk'></i>
        </h2>
        <div class="u_comment u_answer">
          <ul>
            <li class="u_comment-list u_answer-list" v-for="(qest, index) in qestList" :key="index">
              <a :href="'/user?uid=' + qest.personalInfoResp.id"><div class="header-img ib-middle" :style="{ background: `url(${qest.personalInfoResp.headimgurl || defaulthead}) no-repeat center/cover`}"></div></a>
              <div class="user-infor ib-middle">
                <a class="ib-middle" :href="'/user?uid=' + qest.personalInfoResp.id">{{ qest.personalInfoResp.nickname }}</a>
                <br>
                <u-usericon v-if='qest.personalInfoResp' :level='String(qest.personalInfoResp.userGradeNumber)' type='1' :profess='String(qest.personalInfoResp.category)' />
              </div>
              <div class="like_type type1" style="background-color: #7ce4ff"></div>
              <p class="desc">{{ qest.question }}</p>

              <!-- <div class="pro" v-if ="qest.imgList">
                <div v-for="(qestimg, $k) in qest.imgList" :key="$k" class="pro-item" :style="'background: url(' + qestimg + ') no-repeat center/cover'" @click='showBigImg($k, qest.imgList)'></div>
              </div> -->

              <div class="other">
                <div class="time">{{ changeTime(qest.createdAt) }}</div>
                <div class="fr">
                  <span @click="replyFn(qest)">回复({{ qest.replyNum || 0}})</span>
                  <span @click="fabulous(qest)">
                    <i class="ib-middle"></i>
                    <u class="ib-middle">{{ qest.likeNum}}</u>
                  </span>
                </div>
              </div>
              <!-- 官方回复 -->
              <div class="office-comment" v-if="qest.official">
                <p>
                  <span>{{ qest.official.userName }}：</span>
                  {{ qest.official.desc }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class='more-loading' v-show='pageLoding'>
        <van-loading type="spinner" />
        <p>正在加载更多</p>
      </div>

      <div class="no-more" v-show='pageEmpty'>
        <p>没有更多疑问了！</p>
      </div>

    </div>
    <!-- 回复列表 -->
    <u-reply v-show='replyShow' :class="{'show': replyShowDelay}" :replystr='replystr' :islogin='islogin' :env='env' :masterinfo='masterInfo' replyType='answer' />

    <!-- 提问编辑框 -->
    <van-popup class='ques-wrap' v-model="quesShow" position="right" :overlay="true">
      <van-nav-bar title="提问疑问" left-arrow right-text='发送' @click-left='quesShow = false' @click-right="submitQues"></van-nav-bar>
      <textarea class="textarea" placeholder="请提出您的疑问" v-model='quesContent'></textarea>
    </van-popup>
  </div>
</template>
<script>
import tools from '~/utils/tools'

import wechatLogin from '~/utils/wechatLogin'

import { quizApi } from '~/api/quiz'

import uUsericon from '~/components/Usericon'
import uReply from './Replylist'

export default {
  name: 'u-question',
  props: {
    goodsid: String,
    scrollbottom: Boolean,
    queslist: Array,
    islogin: Boolean,
    env: Number
  },
  components: {
    uUsericon,
    uReply
  },
  data () {
    return {
      defaulthead: this.defaulthead,

      getGoodId: this.goodsid,
      qestList: [],
      qestNum: 0,
      replyshow: false,
      postdata: false,
      replystr: [],

      replyShow: false,
      replyShowDelay: false,
      masterInfo: {},

      // 分页
      page: 1,
      pageEmpty: false,
      pageLoding: true,

      // 疑问解答编辑
      quesShow: false,
      quesContent: '',
      sendLoading: false
    }
  },
  watch: {
    $route (to, from) {
      if (to.hash === '') {
        this.replyShowDelay = false
        this.quesShow = false
        document.body.classList = ''
      } else if (to.hash === '#replay') {
        this.replyShowDelay = true
      } else if (to.hash === '#toQues') {
        this.quesShow = true
      }
    },
    scrollbottom (val) {
      console.log(val)
      if (val && !this.pageEmpty) {
        this.page = this.page + 1
        this.getData(this.page)
      }
    }
  },
  mounted () {
    this.getData(1)
  },
  methods: {
    // showBigImg (index, val) {
    //   ImagePreview({
    //     images: val,
    //     startPosition: index,
    //     onClose () {
    //     }
    //   })
    // },
    // 去提问
    toAsk () {
      if (!this.islogin) {
        this.$toast('请先登录！')
        if (this.env === 1) {
          let wl = window.location
          setTimeout(function () { wechatLogin.wxLoginWithNoCheck(wl.origin + wl.pathname) }, 500)
        } else {
          setTimeout(function () { window.location.href = '/account/login' }, 500)
        }
        return
      }
      this.quesShow = true
      window.location.hash = 'toQues'
    },
    async submitQues () {
      if (!this.sendLoading) {
        this.sendLoading = true
        let param = {
          goodsid: this.getGoodId,
          question: this.quesContent
        }
        const { code, data } = await quizApi.consult(param)
        if (code === 200) {
          this.$toast('提问成功')
          this.getData(1, true)
          setTimeout(() => {
            this.quesShow = false
            window.location.hash = ''
            this.sendLoading = false
          }, 500)
        } else {
          this.$toast(data)
          this.sendLoading = false
        }
      }
    },
    async replyFn (val) {
      const toast1 = this.$toast.loading('回复信息加载中')
      let param = {
        page: 1,
        count: 5,
        consultid: val.consultid
      }
      const { code, data } = await quizApi.getReplylist(param)
      if (code === 200) {
        console.log(val)
        this.replystr = data.array
        this.masterInfo = val
        document.body.classList = 'hidden'
        window.location.hash = 'replay'
        this.replyShow = true
        toast1.clear()
        setTimeout(() => {
          this.replyShowDelay = true
        }, 60)
      }
      // this.replystr = '2'
      console.log(this.replystr, 'replystr')
    },
    async getData (page, clear = false) {
      this.pageLoding = true
      let params = {
        page: page,
        count: 5,
        goodsId: this.getGoodId
      }
      const {code, data} = await quizApi.getQuizlist(params)
      if (code === 200) {
        let { array, total } = data
        if (array.length === 0) {
          this.pageEmpty = true
        }
        if (clear) {
          this.qestList = array
        } else {
          this.qestList.push(...array)
        }
        this.qestNum = total
        this.pageLoding = false
      }
    },
    async fabulous (event) {
      if (!this.islogin) {
        this.$toast('请先登录！')
        if (this.env === 1) {
          let wl = window.location
          setTimeout(function () { wechatLogin.wxLoginWithNoCheck(wl.origin + wl.pathname) }, 500)
        } else {
          setTimeout(function () { window.location.href = '/account/login' }, 500)
        }
        return
      }
      // 点赞 / 取消点赞
      let { ifLiked, consultid } = event
      let msg = !ifLiked ? '点赞成功' : '取消点赞成功'
      const { code, data } = !ifLiked ? await quizApi.consultLike(consultid) : await quizApi.consultDislike(consultid)
      if (code === 200) {
        this.$toast(msg)
        event.ifLiked = !event.ifLiked
        event.likeNum = data
      } else {
        this.$toast(data)
      }
    },
    changeTime (time) {
      time = new Date(time).getTime()
      return tools.timeago(time)
    }
  }
}
</script>
<style lang="less">
.detail_question {
  font-size: 0;
  h2 {
    margin: 20px 0;
    font-size: 15px;
    font-family: 'PingFangSC-Semibold';
    font-weight: bold;
    color: #333;
  }
  .question-item {
    margin-bottom: 10px;
  }
  .answer {
    h2 {
      position: relative;
      margin: 30px 0 22px;
      span {
        font-weight: normal;
      }
      i {
        // position: absolute;
        position: fixed;
        z-index: 99;
        // right: 0;
        right: 24px;
        top: 484px;
        // top: -5px;
        width: 45px;
        height: 45px;
        background: url('~assets/img/detail/ic_wen_blue_45x45@2x.png') no-repeat center/contain;
        box-shadow: 0px 0px 20px 0px rgba(3, 161, 205, 0.55);
        border-radius: 50%;
        background-color: #59c3e1;
        // &.tp-5 {
        //   top: -18px;
        // }
      }
    }
  }
}
.question-list {
  display: inline-block;
  width: 158px;
  margin-right: 19px;
  margin-bottom: 20px;
  &:nth-child(2n) {
    margin-right: 0;
  }
  .pro {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ECEBEB;
    margin-right: 5px;
  }
  .desc {
    width: 100px;
    p {
      font-size: 13px;
      color: #333;
      font-weight: bold;
      font-family: 'PingFangSC-Semibold';
      margin-bottom: 5px;
    }
    span {
      font-size: 10px;
      color: #999;
      line-height: 14px;
    }
  }
}

.u_answer {
  padding: 0;
  &-list {
    padding-bottom: 20px;
    &:first-child {
      margin-top: 0;
    }
    .other {
      padding-bottom: 0;
      border-bottom: 0;
    }
  }
}

.ques-wrap {
  width: 100%;
  height: 100%;
  z-index: 10000!important;
  .van-nav-bar__text {
    color: #03A1CD!important;
    font-size: 13px;
    font-family: 'PingFangSC-Semibold';
  }
  .textarea {
    width: 100%;
    min-height: 40vh;
    font-size: 14px;
    color: #333;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
