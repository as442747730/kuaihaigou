<template>
  <div class="detail_question">
    <div class="margin-20">
      <h2>常见问题</h2>
      <ul class="question-item">
        <li class="question-list" v-for="i in 8">
          <div class="pro ib-middle"></div>
          <div class="desc ib-middle">
            <p>查询订单</p>
            <span>快速查看订单详情 配送进度、确认收货等</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="u-detail_line"></div>

    <div class="answer">
      <div class="margin-20">
        <h2>疑问解答<span>（{{ qestNum }}条）</span></h2>
        <div class="u_comment u_answer">
          <ul>
            <li class="u_comment-list u_answer-list" v-for="(qest, index) in qestList" :key="index" :data-qest="qest">
              <div class="header-img ib-middle" :style="{ background: `url(${qest.personalInfoResp.headimgurl}) no-repeat center/cover`}"></div>
              <div class="user-infor ib-middle">
                <a class="ib-middle">{{ qest.personalInfoResp.nickname }}</a>
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
    <u-reply v-show='replyShow' :class="{'show': replyShowDelay}" :replystr='replystr' :masterinfo='masterInfo' replyType='answer' />
  </div>
</template>
<script>
import tools from '~/utils/tools'

// import { ImagePreview } from 'vant'

import { quizApi } from '~/api/quiz'

import uUsericon from '~/components/Usericon'
import uReply from './Replylist'

export default {
  name: 'u-question',
  props: {
    goodsid: String,
    scrollbottom: Boolean
  },
  components: {
    uUsericon,
    uReply
  },
  data () {
    return {
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
      pageLoding: true
    }
  },
  watch: {
    $route (to, from) {
      if (to.hash === '') {
        this.replyShowDelay = false
        document.body.classList = ''
      } else if (to.hash === '#replay') {
        this.replyShowDelay = true
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
    async getData (page) {
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
        this.qestList.push(...array)
        this.qestNum = total
        this.pageLoding = false
      }
    },
    async fabulous (event) {
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
      margin: 30px 0 22px;
      span {
        font-weight: normal;
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
    border-bottom: 1px solid #f1f1f1;
    &:first-child {
      margin-top: 0;
    }
    .other {
      padding-bottom: 0;
      border-bottom: 0;
    }
  }
}
</style>
