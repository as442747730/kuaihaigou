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

    <div class="answer margin-20">
      <h2>疑问解答<span>（{{ qestNum }}条）</span></h2>
      <div class="u_comment u_answer">
        <ul>
          <li class="u_comment-list u_answer-list" v-for="(qest, index) in qestList" :key="index" :data-qest="qest">
            <div class="header-img ib-middle" :style="{ background: `url(${qest.headimgurl}) no-repeat center/cover`}"></div>
            <div class="user-infor ib-middle">
              <span class="ib-middle">{{ qest.username }}</span>
              <br>
              <div class="ib-middle">
                <i class="level" style="background-color: #ff8888"></i>
                <i class="prove" style="background-color: #f79dec"></i>
              </div>
            </div>
            <div class="like_type type1" style="background-color: #7ce4ff"></div>
            <p class="desc">{{ qest.desc }}</p>

            <div class="pro" v-if ="qest.imgList">
              <div v-for="(qestimg, $k) in qest.imgList" :key="$k" class="pro-item" :style="'background: url(' + qestimg + ') no-repeat center/cover'" @click='showBigImg($k, qest.imgList)'></div>
            </div>

            <div class="other">
              <div class="time">{{ qest.createdAt }}</div>
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
    <!-- 回复列表 -->
    <reply-list :replystr="replystr"></reply-list>
  </div>
</template>
<script>

import { ImagePreview } from 'vant'

import Img1 from '~/assets/img/bk1.png'

import Img2 from '~/assets/img/green_wine.jpg'

import Img3 from '~/assets/img/home/img_home_335x180@2x.png'

import { quizApi } from '~/api/quiz'
import replyList from './_replylist'

export default {
  name: 'u-question',
  props: {
    goodsid: String
  },
  components: {
    replyList: replyList
  },
  data () {
    return {
      getGoodId: this.goodsid,
      currentTotal: 3,
      qestList: [],
      qestNum: 0,
      replyshow: false,
      postdata: false,
      replystr: '1',
      testData: [{
        imgList: [Img1, Img2]
      }, {
        imgList: [Img3]
      }]
    }
  },
  async mounted () {
    let params = {
      page: 1,
      count: 3,
      total: this.currentTotal,
      goodsId: this.getGoodId
    }
    const {code, data} = await quizApi.getQuizlist(params)
    if (code === 200) {
      console.log('data', data)
      let { array, total } = data
      this.qestList = array
      this.qestNum = total
    }
  },
  methods: {
    showBigImg (index, val) {
      ImagePreview({
        images: val,
        startPosition: index,
        onClose () {
        }
      })
    },
    replyFn (event) {
      this.replystr = '2'
      console.log(this.replystr, 'replystr')
    },
    async fabulous (event) {
      // 点赞 / 取消点赞
      let { ifLiked, consultid } = event
      const { code, data } = !ifLiked ? await quizApi.consultLike(consultid) : await quizApi.consultDislike(consultid)
      if (code === 200) {
        this.$toast(data)
      } else {
        this.$toast(data)
      }
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
