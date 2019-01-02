<template>
  <div class="u-reply">
    <section class="u-detail_header">
      <van-nav-bar title="评论详情" left-arrow @click-left='onClickLeft'>
        <van-icon name="fenxiang" slot="right" @click='report' />
      </van-nav-bar>
    </section>
    <div class="u_comment" :id="'u_comment_' + replyType">
      <ul>
        <!-- 楼主 -->
        <li class="u_comment-list">
          <div class="header-img ib-middle" v-if='masterinfo.personalInfoResp' :style="'background: url(' + (masterinfo.personalInfoResp.headimgurl || defaulthead) + ') no-repeat center/cover'"></div>
          <div class="user-infor ib-middle">
            <a class="ib-middle" v-if='masterinfo.personalInfoResp'>{{ masterinfo.personalInfoResp.nickname || '' }}</a>
            <a class="ib-middle" v-else>匿名用户</a>
            <br>
            <u-usericon v-if='masterinfo.personalInfoResp' :level='String(masterinfo.personalInfoResp.userGradeNumber)' type='1' :profess='String(masterinfo.personalInfoResp.category)' />
          </div>
          <div v-if='masterinfo.evaluationLevel >= 4' class="like_type type1">
            <i></i>
            <span>超爱</span>
          </div>
          <p class="desc">{{ masterinfo.content ? masterinfo.content : masterinfo.question ? masterinfo.question : '此用户没有填写评论!' }}</p>
        </li>
        <li class="u_comment-list" v-for="($v, $k) in (replyData.length === 0 ? replystr : replyData)">
          <div class="header-img ib-middle" v-if='$v.personalInfoResp' :style="'background: url(' + ($v.personalInfoResp.headimgurl || defaulthead) + ') no-repeat center/cover'"></div>
          <div class="user-infor ib-middle">
            <template v-if='!$v.parentUsername'>
              <a class="ib-middle" v-if='$v.personalInfoResp'>{{ $v.personalInfoResp.nickname || '' }}</a>
              <a class="ib-middle" v-else>匿名用户</a>
            </template>
            <div v-else class="has-reply">
              <a class="ib-middle">{{ $v.personalInfoResp.nickname }}</a>
              <b class="ib-middle">回复</b>
              <a class="ib-middle">{{ $v.parentUsername }}</a>
            </div>
            <br>
            <u-usericon v-if='$v.personalInfoResp' :level='String($v.personalInfoResp.userGradeNumber)' type='1' :profess='String($v.personalInfoResp.category)' />
          </div>

          <div class="user-content">
            <p class="desc">{{ $v.content ? $v.content : $v.reply ? $v.reply : '此用户没有填写评论!' }}</p>

            <div class="other">
              <div class="time">{{ changeTime($v.createdAt) }}</div>
              <div class="fr">
                <span v-if="replyType === 'comment'" @click='turnToEdit($v.replyid, $v.personalInfoResp.nickname)'>回复</span>
                <span @click='zan($v)'>
                  <i class="ib-middle"></i>
                  <u class="ib-middle">{{ $v.likeNum }}</u>
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class='more-loading' v-show='pageLoding'>
        <van-loading type="spinner" />
        <p>正在加载更多</p>
      </div>

      <div class="no-more" v-show='pageEmpty'>
        <p>没有更多评论了！</p>
      </div>
    </div>
    <div class="u-reply-form" id="replay" @click='turnToEdit(null, masterinfo.personalInfoResp.nickname)'>
      <van-field class="ib-middle" v-model="replay" type="textarea" :placeholder="'回复:' + (masterinfo.personalInfoResp ? masterinfo.personalInfoResp.nickname : '')" rows="1" autosize maxlength="40" disabled />
      <!-- <button class="ib-middle" @click="sayFn">回复</button> -->
    </div>
    <!-- 举报 -->
    <van-actionsheet class="report" v-model="showReport" :actions="actions" @select="onSelect" />
    <!-- 编辑框 -->
    <van-popup class='edit-wrap' v-model="editShow" position="right" :overlay="true">
      <van-nav-bar title="回复评论" left-arrow right-text='发送' @click-left='editShow = false' @click-right="send(method, masterinfo.id || masterinfo.consultid, replyType)"></van-nav-bar>
      <textarea class="textarea" :placeholder="'回复:' + editPerson" v-model='editContent'></textarea>
    </van-popup>
  </div>
</template>
<script>
import tools from '~/utils/tools'
import uUsericon from '~/components/Usericon'
import { goodsApi } from '~/api/goods'
import { quizApi } from '~/api/quiz'
export default {
  components: {
    uUsericon
  },
  props: {
    replyType: {
      Type: String,
      default: ''
    },
    masterinfo: {
      Type: Object,
      default: () => ({})
    },
    replystr: {
      Type: Array,
      default: []
    }
  },
  data () {
    return {
      defaulthead: this.defaulthead,

      replyData: this.replystr || [],

      listshow: false,
      showReport: false,
      replay: '',
      actions: [{
        name: '举报'
      }, {
        name: '取消'
      }],

      editShow: false, // 编辑层
      editPerson: '',
      editContent: '',
      isBottom: false,
      method: 'one',

      page: 1,
      pageLoding: false,
      pageEmpty: false
    }
  },
  watch: {
    $route (to, from) {
      if (to.hash === '#replay') {
        this.editShow = false
      } else if (to.hash === '#replay_edit') {
        this.editShow = true
      }
    },
    replystr (val) {
      this.replyData = JSON.parse(JSON.stringify(this.replystr))
      this.pageEmpty = false
      this.page = 1
      console.log('val', val)
    },
    isBottom (val) {
      if (val && !this.pageEmpty) {
        this.page = this.page + 1
        this.getData(this.page)
      }
    }
  },
  mounted () {
    let ele = document.getElementById('u_comment_' + this.replyType)
    ele.addEventListener('scroll', this.handleScroll(() => {
      this.eleHeight = ele.clientHeight
      this.scrollHeight = ele.scrollHeight
      let scrollTop = ele.scrollTop
      // 距离底部大约200像素
      if (scrollTop + this.eleHeight >= this.scrollHeight - 100) {
        this.isBottom = true
      } else {
        this.isBottom = false
      }
    }))
  },
  methods: {
    onClickLeft () {
      document.body.classList = ''
      window.location.hash = ''
      this.listshow = false
    },
    turnToEdit (replyid, editPerson) {
      console.log(replyid)
      if (replyid) {
        this.method = 'two'
        this.replyid = replyid
      } else {
        this.method = 'one'
      }
      this.editShow = true
      this.editPerson = editPerson
      window.location.hash = 'replay_edit'
    },
    report () {
      this.showReport = true
    },
    // 发送
    async send (method, id, replyType) {
      /*
        replyType -> 回复类型 疑问解答 / 商品评价
        method -> 回复楼主/层主
        commentid -> 根据replyType区分是 解答疑问 / 商品评价
      */
      let obj = {}
      let fn = null
      console.log(replyType)
      if (method === 'one') {
        console.log('回复楼主')
        // 回复楼主
        obj = {
          commentid: id,
          content: this.editContent
        }
      } else if (method === 'two') {
        console.log('回复层主')
        // 回复层主
        obj = {
          parentid: this.replyid,
          commentid: id,
          content: this.editContent
        }
      }
      if (replyType === 'answer') {
        let param = {
          consultid: id,
          answer: this.editContent
        }
        fn = quizApi.reply(param)
      } else if (replyType === 'comment') {
        fn = goodsApi.reply(obj)
      }
      const { code, data } = await fn
      if (code === 200) {
        this.$toast('回复成功')
        this.editContent = ''
        this.renderData()
      } else {
        this.$toast(data)
      }
    },
    // 点赞
    async zan (val) {
      console.log(val)
      let fn = null
      let msg = ''
      if (val.ifLiked) {
        // 取消点赞
        fn = goodsApi.unLikeComment(val.replyid)
        msg = '取消点赞成功'
      } else {
        fn = goodsApi.likeComment(val.replyid)
        msg = '点赞成功'
      }
      const { code, data } = await fn
      if (code === 200) {
        this.$toast(msg)
        val.ifLiked = !val.ifLiked
        val.likeNum = data
      }
    },
    // 重新加载数据
    async renderData () {
      let fn = null
      let param = {
        page: 1,
        count: 5
      }
      if (this.replyType === 'comment') {
        param.commentid = this.masterinfo.id
        fn = goodsApi.getCommentReply(param)
      } else if (this.replyType === 'answer') {
        param.consultid = this.masterinfo.consultid
        fn = quizApi.getReplylist(param)
      }
      const { code, data } = await fn
      if (code === 200) {
        this.replyData = data.array
        this.editShow = false
        this.pageEmpty = false
        this.page = 1
      }
    },
    async getData (page) {
      let fn = null
      this.pageLoding = true
      let param = {
        page: page,
        count: 5
      }
      if (this.replyType === 'comment') {
        param.commentid = this.masterinfo.id
        fn = goodsApi.getCommentReply(param)
      } else if (this.replyType === 'answer') {
        param.consultid = this.masterinfo.consultid
        fn = quizApi.getReplylist(param)
      }
      const { code, data } = await fn
      if (code === 200) {
        if (data.array.length === 0) {
          this.pageEmpty = true
        } else {
          this.replyData.push(...data.array)
        }
        this.pageLoding = false
        this.editShow = false
      }
    },
    // 举报
    onSelect (item) {
      if (item.name === '举报') {
        this.showReport = false
        this.$dialog.confirm({
          title: '确定举报此人吗'
        }).then(() => {
          this.$Toast('举报成功')
        }).catch(() => {})
      } else {
        this.showReport = false
      }
    },
    handleScroll (fn) {
      let Switch = true
      return function () {
        if (!Switch) return
        Switch = false
        setTimeout(() => {
          fn.apply(this, arguments)
          Switch = true
        }, 250)
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
.u-reply {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  border-box: box-sizing;
  transform: translateX(100%);
  transition: ease .5s transform;
  background: #fff;

  &.show {
    transform: none;
  }

  .u_comment {
    padding: 0;
    ul {
      padding: 0 20px;
    }
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

  &-form {
    position: absolute;
    z-index: 99;
    background: #fff;
    box-sizing: border-box;
    left: 0;
    bottom: 0;
    width: 100%;
    min-height: 60px;
    padding: 13px 20px;
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.08);
    .van-field {
      display: inline-block;
      padding: 6px 10px 6px 15px;
      width: 100%;
      height: 35px;
      // margin-right: 15px;
      box-sizing: border-box;
      background: #f5f5f5;
      border-radius: 4px;
      font-size: 13px;
    }
    textarea {
      color: #333;
    }
    button {
      width: 70px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      background: #F99C00;
      border-radius: 4px;
      color: #fff;
      font-size: 13px;
    }
  }

  .u_comment {
    overflow: scroll;
    height: calc(100vh - 108px)
  }

  .u_comment-list {
    &:first-child {
      margin-bottom: 20px;
      .desc {
        padding-bottom: 15px;
      }
    }
    &:not(:first-child) {
      &:after {
        display: none;
      }
      .user-infor {
        a {
          font-weight: normal;
          font-size: 13px;
          font-family: 'PingFangSC-Regular';
        }
        .has-reply {
          a {
            width: auto;
            max-width: 120px;
          }
          b {
            font-size: 13px;
            color: #333;
            margin: -3px 8px 0;
          }
        }
      }
      .desc {
        font-size: 13px;
      }
    }
    .user-content {
      padding-left: 54px;
      .other {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }
  }

  .edit-wrap {
    width: 100%;
    height: 100%;
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
}
.van-toast {
  z-index: 10001!important
}
</style>