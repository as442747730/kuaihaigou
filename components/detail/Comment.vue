<template>
  <article class="u-goods-comment">
    <div class="detail_comment-tab">
      <ul>
        <li @click='commentShow = true' :class="{'cur': commentShow}">客户评价</li>
        <li @click='commentShow = false' :class="{'cur': !commentShow}">客户提问</li>
      </ul>
    </div>
    <!-- 评价 -->
    <transition name='nav-fade' mode="out-in">
      <div class="detail_comment" v-show='commentShow'>
        <div class="detail_comment-satisfy">
          <div class="how-much">
            <em class="ib-middle">{{ viewdata.satisfactionNum }}</em>
            <span class="ib-middle">人购买后满意</span>
            <div class="bar">
              <i class="bar-now" :style="'width:' + viewdata.satisfactionDegree + '%'"></i>
              <p>满意度{{ viewdata.satisfactionDegree }}%</p>
              <div class="fake-p" :style="'width:' + viewdata.satisfactionDegree + '%'">
                <p>满意度{{ viewdata.satisfactionDegree }}%</p>
              </div>
            </div>
          </div>
        </div>

        <div class="u-detail_line"></div>

        <div class="detail_comment-type">
          <ul>
            <li @click='filter(1)' :class="{'cur': checkActive === 1}">优先内容<span>({{ commentNum.hasContentNum || 0 }})</span></li>
            <li @click='filter(2)' :class="{'cur': checkActive === 2}">带图片<span>({{ commentNum.hasImgNum || 0 }})</span></li>
            <li @click='filter(0)' :class="{'cur': checkActive === 0}">全部<span>({{ commentNum.totalNum || 0 }})</span></li>
          </ul>
        </div>

        <div class="u_comment">
          <ul>
            <li class="u_comment-list" v-for="($v, $k) in commentData">
              <a :href="$v.personalInfoResp ? '/user?uid=' + $v.personalInfoResp.id : 'javascript: void(0)'"><div class="header-img ib-middle" v-if='$v.personalInfoResp' :style="'background: url(' + ($v.personalInfoResp.headimgurl || defaulthead) + ') no-repeat center/cover'"></div></a>
              <div class="user-infor ib-middle">
                <a class="ib-middle" v-if='$v.personalInfoResp' :href="'/user?uid=' + $v.personalInfoResp.id">{{ $v.personalInfoResp.nickname || '' }}</a>
                <a class="ib-middle" v-else>匿名用户</a>
                <br>
                <u-usericon v-if='$v.personalInfoResp' :level='String($v.personalInfoResp.userGradeNumber)' type='1' :profess='String($v.personalInfoResp.category)' />
              </div>
              <div v-if='$v.ifPopular' class="like_type type1">
                <i></i>
                <!-- <span>超爱</span> -->
              </div>
              <p class="desc">{{ $v.content || '此用户没有填写评论!' }}</p>

              <div class="pro">
                <div v-for="($v2, $k2) in getJSONArr($v.imgs)" class="pro-item" :style="'background: url(' + $v2 + ') no-repeat center/cover'" @click='showBigImg($k2, getJSONArr($v.imgs))'></div>
              </div>

              <div class="other" :class="{'bord-1': $v.review}">
                <div class="time">{{ changeTime($v.createdAt) }}</div>
                <div class="fr">
                  <span @click='reply($v.id, $v)'>回复({{ $v.replyNum }})</span>
                  <span @click='zan($v, $v.id, $v.ifLiked)'>
                    <i class="ib-middle"></i>
                    <u class="ib-middle">{{ $v.likeNum }}</u>
                  </span>
                </div>
              </div>

              <!-- 追评 -->
              <div class="add-comment" v-if='$v.review'>
                <h3>用户{{ countTimeAgo($v.reviewTime, $v.createdAt) }}追评</h3>
                <p>{{ $v.review }}</p>
                <div class="pro">
                  <div v-for="($v3, $k3) in getJSONArr($v.reviewImgs)" class="pro-item" :style="'background: url(' + $v3 + ') no-repeat center/cover'" @click='showBigImg($k3, getJSONArr($v.reviewImgs))'></div>
                </div>
              </div>

              <!-- 官方回复 -->
              <div class="office-comment" v-if='$v.officialReply'>
                <p>
                  <span>快海购官方：</span>
                  {{ $v.officialReply }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div class='more-loading' v-show='pageLoding'>
          <van-loading type="spinner" />
          <p>正在加载更多</p>
        </div>

        <div class="no-more" v-show='pageEmpty'>
          <p>没有更多评价了！</p>
        </div>

        <!-- 回复 -->
        <u-reply v-show='replyShow' :class="{'show': replyShowDelay}" :replystr='replystr' :masterinfo='masterInfo' replyType='comment' :islogin='islogin' />

      </div>
    </transition>
    <!-- 提问 -->
    <transition name='nav-fade' mode="out-in">
      <u-question :goodsid="goodsid" :queslist="viewdata.frequeList" v-if='!commentShow' :scrollbottom="scrollbottom" />
    </transition>
  </article>
</template>
<script>
import uQuestion from './Question'
import uReply from './Replylist'

import { ImagePreview } from 'vant'

import { goodsApi } from '~/api/goods'

import tools from '~/utils/tools'

import uUsericon from '~/components/Usericon'

export default {
  name: 'u-comment',
  props: {
    goodsid: String,
    viewdata: Object,
    scrollbottom: Boolean,
    islogin: Boolean
  },
  components: {
    uQuestion,
    uUsericon,
    uReply
  },

  data () {
    return {
      checkActive: 1,
      commentShow: true,

      replyShow: false,
      replyShowDelay: false,
      placeholder: '向已买过的人提问，4-40字',
      replay: '',

      showReport: false,
      actions: [{
        name: '举报'
      }, {
        name: '取消'
      }],

      // 默认头像
      defaulthead: this.defaulthead,
      commentData: [],
      commentNum: {},

      page: 1,
      pageLoding: true,
      pageEmpty: false,
      hasContent: true, // 优先内容
      hasImg: false, // 优先图片

      // 回复内容
      replystr: [],
      masterInfo: {}
    }
  },

  created () {
    this.getComment(1, false, this.hasContent)
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
      if (val && !this.pageEmpty) {
        this.page = this.page + 1
        this.getComment(this.page, false, this.hasContent, this.hasImg)
      }
    }
  },

  methods: {
    // 获取评价数据
    async getComment (page, needRender = false, hasContent = false, hasImg = false) {
      this.pageLoding = true
      let param = {
        page: page,
        count: 5,
        hasContent: hasContent,
        hasImg: hasImg,
        goodsId: this.goodsid
      }
      const { code, data } = await goodsApi.getComment(param)
      if (code === 200) {
        if (data.array.length === 0) {
          this.pageEmpty = true
        } else {
          this.pageEmpty = false
        }
        this.commentNum = data.extras
        // 是否需要重渲染数据
        this.commentData = needRender ? data.array : this.commentData.concat(data.array)
        this.pageLoding = false
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
    // 回复
    async reply (commentid, val) {
      const toast1 = this.$toast.loading('回复信息加载中')
      let param = {
        page: 1,
        count: 5,
        commentid: commentid
      }
      const { code, data } = await goodsApi.getCommentReply(param)
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
    },
    // 点赞
    async zan (val, id, ifLike) {
      if (!this.islogin) {
        this.$toast('请先登录！')
        setTimeout(() => {
          window.location.href = '/account/login'
        }, 500)
        return
      }
      console.log(ifLike)
      let likeFn = ifLike ? goodsApi.unlike(id) : goodsApi.like(id)
      const { code, data } = await likeFn
      if (code === 200) {
        let msg = ifLike ? '取消点赞成功' : '点赞成功'
        this.$toast(msg)
        this.$set(val, 'likeNum', data)
        this.$set(val, 'ifLiked', !ifLike)
      } else {
        this.$toast(data)
      }
    },
    onClickLeft () {
      document.body.classList = ''
      window.location.hash = ''
      this.replyShowDelay = false
    },
    // 切换内容
    filter (val) {
      this.checkActive = val
      this.pageEmpty = false
      this.page = 1
      switch (val) {
        case 0:
          // 全部
          this.hasImg = false
          this.hasContent = false
          this.getComment(1, true)
          break
        case 1:
          // 优先内容
          this.hasContent = true
          this.getComment(1, true, true)
          break
        case 2:
          // 带图片
          this.hasImg = true
          this.getComment(1, true, false, true)
          break
      }
    },
    report () {
      this.showReport = true
    },
    // 举报
    onSelect (item) {
      if (item.name === '举报') {
        this.showReport = false
        this.$dialog.confirm({
          title: '确定举报此人吗'
        }).then(() => {
          // on confirm
          this.$Toast('举报成功')
        }).catch(() => {
          // on cancel
        })
      } else {
        this.showReport = false
      }
    },
    changeTime (time) {
      time = new Date(time).getTime()
      return tools.timeago(time)
    },
    countTimeAgo (now, setTime) {
      const getTime = new Date(now).getTime() - new Date(setTime).getTime()
      return Math.floor(getTime / (3600 * 24 * 1000)) === 0 ? '当天' : Math.floor(getTime / (3600 * 24 * 1000)) + '天后'
    },
    getJSONArr (strArr) {
      return JSON.parse(strArr)
    }
  }
}
</script>
<style lang="less">
.u-goods-comment {
  font-size: 0;
}
.detail_comment {
  &-tab {
    padding: 13px 0;
    background: #F5F5F5;
    li {
      box-sizing: border-box;
      font-size: 14px;
      width: 50%;
      display: inline-block;
      vertical-align: middle;
      font-family: 'PingFang-SC-Regular';
      border-right: 1PX solid #ccc;
      text-align: center;
      color: #666;
      &:last-child {
        border-right: 0;
      }
      &.cur {
        font-weight: bold;
        color: #333;
        font-family: 'PingFangSC-Semibold'
      }
    }
  }
  &-satisfy {
    .how-much {
      padding: 20px;
      em {
        font-weight: bold;
        font-family: 'Impact';
        font-size: 17px;
        color: #F99C00;
      }
      span {
        font-family: 'PingFang-SC-Medium';
        font-size: 11px;
        margin-left: 5px;
      }
      .bar {
        width: 335px;
        height: 20px;
        background: rgba(239,249,252,1);
        border-radius: 10px;
        position: relative;
        line-height: 20px;
        overflow: hidden;
        margin-top: 12px;
        font-size: 11px;
        font-weight: 600;
        text-align: center;
        &-now {
          position: absolute;
          height: 100%;
          left: 0;
          top: 0;
          background: #59C3E1;
          border-radius: 10px;
        }
        p {
          font-family: 'PingFangSC-Semibold';
          color: #59C3E1;
          position: relative;
          z-index: 1;
        }
        .fake-p {
          position: absolute;
          height: 100%;
          left: 0;
          top: 0;
          color: #fff;
          z-index: 2;
          border-radius: 10px;
          overflow: hidden;
          p {
            position: absolute;
            width: calc(10rem - 40px);
            color: #fff;
          }
        }
      }
    }
  }
  &-type {
    padding: 15px 20px;
    border-bottom: 1PX solid #f5f5f5;
    li {
      display: inline-block;
      width: 98px;
      height: 28px;
      line-height: 29px;
      border-radius: 4px;
      border: 1PX solid #eee;
      margin: 0 5px;
      font-size: 13px;
      font-family: 'PingFang-SC-Medium';
      font-weight: bold;
      text-align: center;
      color: #999;
      &:last-child {
        margin-right: 0;
      }
      span {
        display: inline-block;
        font-size: 12px;
      }
      &.cur {
        color: #333;
        border-color: #000;
      }
    }
  }
}
.u_comment {
  padding: 0 20px;
  // overflow: hidden;
  &-list {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      height: 1PX;
      background: #eee;
      width: 355px;
      bottom: 0;
    }
    &:first-child {
      margin-top: 30px;
    }
    margin-bottom: 30px;
    .header-img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
    }
    .user-infor {
      a {
        font-size: 15px;
        color: #333;
        font-family: 'PingFangSC-Semibold';
        font-weight: bold;
        margin-bottom: 5px;
        width: 200px;
        display: inline-block;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .like_type {
      float: right;
      overflow: hidden;
      text-align: center;
      i{
        display: inline-block;
        width: 54px;
        height: 20px;
        background: url('~/assets/img/ic_chaoai_35x35@2x.png') no-repeat center/contain;
      }
      span {
        margin-top: 4px;
        display: block;
        text-align: center;
        color: #999;
        font-size: 11px;
      }
    }
    .desc {
      color: #333;
      font-family: 'PingFang-SC-Medium';
      line-height: 25px;
      text-align: justify;
      margin: 13px 0;
      font-size: 15px;
    }
    .pro-item {
      width: 72px;
      height: 72px;
      margin-right: 15px;
      margin-bottom: 15px;
      display: inline-block;
      &:last-child {
        margin-right: 0;
      }
    }
    .other {
      padding-bottom: 22px;
      &.bord-1 {
        border-bottom: 1PX solid #f1f1f1;
      }
      .time {
        font-size: 12px;
        color: #999;
        display: inline-block;
      }
      .fr {
        margin-top: -5px;
        &>span {
          display: inline-block;
          vertical-align: middle;
          font-family: 'PingFangSC-Medium';
          font-size: 13px;
          font-weight: bold;
          &:last-child {
            margin-left: 19px;
            color: #999;
            position: relative;
            top: -1PX;
            i {
              margin-right: 4px;
              display: inline-block;
              width: 16px;
              height: 16px;
              background: url("~/assets/img/Icons/ic_like_b_16x16@2x.png") no-repeat center/contain;
            }
            u {
              margin-top: 3px;
            }
          }
        }
      }
    }
    .add-comment { 
      h3 {
        font-family: 'PingFangSC-Semibold';
        font-size: 12px;
        color: #FB6248;
        margin: 13px 0;
      }
      p {
        font-size: 15px;
        line-height: 25px;
        color: #333;
        font-family: 'PingFang-SC-Medium';
        text-align: justify;
        margin-bottom: 10px;
      }
    }
    .office-comment {
      margin-top: 15px;
      padding: 16px 10px;
      background: #fcfcfc;
      border: 1PX solid #f1f1f1;
      p {
        text-align: justify;
        font-weight: lighter;
        color: #666;
        font-size: 13px;
        line-height: 23px;
        span {
          color: #333;
        }
      }
    }
  }
}
.u-reply {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  border-box: box-sizing;
  transform: translateX(100%);
  transition: ease .5s transform;
  background: #fff;
  width: 100%;
  height: 100%;
  &.show {
    transform: none;
  }
  &-wrap {
    padding: 20px;
    .reply-common {
      border-bottom: 1PX solid #f1f1f1; 
      .header-img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
      }
      .user-infor {
        span {
          font-size: 15px;
          color: #333;
          font-family: 'PingFangSC-Semibold';
          font-weight: bold;
          margin-bottom: 5px;
        }
        &>div {
          i {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            overflow: hidden;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            display: inline-block;
            margin-right: 5px;
          }
        }
      }
      .like_type {
        float: right;
        background: red;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
      }
      .desc {
        color: #333;
        font-family: 'PingFang-SC-Medium';
        line-height: 25px;
        text-align: justify;
        margin: 13px 0 20px;
        font-size: 15px;
      }
    }
    // 层主
    .layer-master {
      margin: 20px 0 0;
      box-sizing: border-box;
      height: calc(100vh - 295px);
      // height: 372px;
      overflow-x: hidden;
      overflow-y: scroll;
      border-bottom: 0;
      &-item {
        padding-bottom: 20px;
        &:last-child {
          padding-bottom: 0;
        }
      }
      .header-img {
        width: 40px;
        height: 40px;
      }
      .user-infor {
        span {
          font-size: 14px;
          font-weight: normal;
        }
      }
      .desc {
        padding-left: 58px;
        font-size: 14px;
        line-height: 19px;
      }
      .other {
        padding-left: 58px;
        padding-bottom: 22px;
        .time {
          font-size: 12px;
          color: #999;
          display: inline-block;
        }
        .fr {
          margin-top: -4px;
          &>span {
            display: inline-block;
            vertical-align: middle;
            font-family: 'PingFangSC-Medium';
            font-size: 12px;
            font-weight: bold;
            &:last-child {
              margin-left: 19px;
              color: #999;
              position: relative;
              top: -1PX;
              i {
                margin-right: 4px;
                display: inline-block;
                width: 16px;
                height: 16px;
                background: url("~/assets/img/Icons/ic_like_b_16x16@2x.png") no-repeat center/contain;
              }
              u {
                margin-top: 3px;
              }
            }
          }
        }
      }
    }
  }
}
.report {
  z-index: 10001!important;
}
</style>