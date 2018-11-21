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
      <h2>疑问解答<span>（102条）</span></h2>
      <div class="u_comment u_answer">
        <ul>
          <li class="u_comment-list u_answer-list" v-for="($v, $k) in testData">
            <div class="header-img ib-middle" style="background-color: #88c3ff"></div>
            <div class="user-infor ib-middle">
              <span class="ib-middle">王小乐leshi</span>
              <br>
              <div class="ib-middle">
                <i class="level" style="background-color: #ff8888"></i>
                <i class="prove" style="background-color: #f79dec"></i>
              </div>
            </div>
            <div class="like_type type1" style="background-color: #7ce4ff"></div>
            <p class="desc">酒是好酒，只是我不会品，但是包装好看啊，不信你看。</p>

            <div class="pro">
              <div v-for="($v2, $k2) in $v.imgList" class="pro-item" :style="'background: url(' + $v2 + ') no-repeat center/cover'" @click='showBigImg($k2, $v.imgList)'></div>
            </div>

            <div class="other">
              <div class="time">2018-10-26</div>
              <div class="fr">
                <span>回复(10)</span>
                <span>
                  <i class="ib-middle"></i>
                  <u class="ib-middle">1</u>
                </span>
              </div>
            </div>

            <!-- 官方回复 -->
            <div class="office-comment">
              <p>
                <span>快海购官方：</span>
                感谢您对我们快海购的支持，本着客户至上的原则，我们会努力做好每一个细节，愿我们的红酒能够给您的生活增添色彩，期待您的再次光临，祝您生活愉快！
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

import { ImagePreview } from 'vant'

import Img1 from '~/assets/img/bk1.png'

import Img2 from '~/assets/img/green_wine.jpg'

import Img3 from '~/assets/img/home/img_home_335x180@2x.png'

export default {
  name: 'u-question',

  data () {
    return {
      testData: [{
        imgList: [Img1, Img2]
      }, {
        imgList: [Img3]
      }]
    }
  },

  mounted () {
  },

  methods: {
    showBigImg (index, val) {
      ImagePreview({
        images: val,
        startPosition: index,
        onClose () {
        }
      })
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
