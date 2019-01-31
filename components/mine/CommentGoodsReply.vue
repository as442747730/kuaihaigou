<template>
  <div class="u-articel-reply">
    <section class="u-detail_header">
      <van-nav-bar title="评论详情" left-arrow @click-left='onClickLeft'>
      </van-nav-bar>
    </section>

    <div class="u_comment" id='u_articel_reply'>
      <ul>
        <!-- 楼主 -->
        <li class="u_comment-list">
          <a v-if='masterinfo.personalInfoResp'><div class="header-img ib-middle" :style="'background: url(' + (masterinfo.personalInfoResp.headimgurl || defaulthead) + ') no-repeat center/cover'"></div></a>
          <div class="user-infor ib-middle">
            <a class="ib-middle">{{ masterinfo.personalInfoResp.nickname }}</a>
            <br>
            <u-usericon v-if='masterinfo.personalInfoResp' :level='String(masterinfo.personalInfoResp.userGradeNumber)' type='1' :profess='String(masterinfo.personalInfoResp.category)' />
          </div>
          <div class="hot" v-if="masterinfo.ifPopular"></div>
          <p class="desc" :class="{'mb-0': masterinfo.imgs}">{{ masterinfo.content ? masterinfo.content : masterinfo.question ? masterinfo.question : '此用户没有填写评论!' }}</p>
          <div class="pro" v-if='getJSONArr(masterinfo.imgs).length !== 0'>
            <div v-for="(item, index) in masterinfo.imgs" class="pro-item" :style="'background: url(' + item + ') no-repeat center/cover'" @click='showBigImg(index, masterinfo.imgs)'></div>            
          </div>
          <div class="from">
            <a :href="'/detail/' + masterinfo.goodsid">
              <div class="pro ib-middle" :style="'background: url(' + masterinfo.cover + ') no-repeat center/contain'"></div>
              <div class="desc ib-top">
                <p class="font_hight">{{ masterinfo.goodsName }}</p>
                <b class="font_hight">¥{{ masterinfo.actualPrice }}</b>
              </div>
            </a>
          </div>
        </li>
        <!-- 一般回复 -->
        <li class="u_comment-list" v-for="($v, $k) in replyData">
          <a v-if='$v.personalInfoResp'><div class="header-img ib-middle" :style="'background: url(' + ($v.personalInfoResp.headimgurl || defaulthead) + ') no-repeat center/cover'"></div></a>
          <div class="user-infor ib-middle">
            <template v-if='masterinfo.personalInfoResp.id === $v.parentUserId'>
              <a class="ib-middle">{{ $v.personalInfoResp.nickname || '' }}</a>
            </template>
            <div v-else-if='!$v.parentUsername' class="has-reply" >
              <a class="ib-middle">{{ $v.personalInfoResp.nickname }}</a>
            </div>
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
                <span @click='turnToEdit($v, 1)'>回复</span>
                <span @click='handleCommentLike($v, $k)'>
                  <i :class="['ib-middle', $v.ifLiked ? 'active' : '']"></i>
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

    <div class="u-articel-reply-form" id="replay" @click='turnToEdit(masterinfo, 0)'>
      <van-field class="ib-middle" v-model="replay" type="textarea" :placeholder="'回复:' + (masterinfo.personalInfoResp ? masterinfo.personalInfoResp.nickname : '')" rows="1" autosize maxlength="40" disabled />
    </div>

    <!-- 编辑框 -->
    <van-popup class='edit-wrap' v-model="editShow" position="right" :overlay="true">
      <van-nav-bar title="回复评论" left-arrow right-text='发送' @click-left='editShow = false' @click-right="send(method, masterinfo.id)"></van-nav-bar>
      <textarea class="textarea" :placeholder="'回复:' + editPerson" v-model='editContent'></textarea>
    </van-popup>
    
  </div>
</template>
<script>

import tools from '~/utils/tools'
import uUsericon from '~/components/Usericon'
import { ImagePreview } from 'vant'
import { memberCommentApi } from '~/api/comment'

export default {
  name: 'u-reply',

  components: {
    uUsericon
  },

  props: {
    masterinfo: {
      Type: Object,
      default: () => ({})
    },
    replyData: {
      Type: Array,
      default: []
    },
    islogin: Boolean
  },

  data () {
    return {
      defaulthead: this.defaulthead, // 默认头像
      page: 1,
      pageLoding: false,
      pageEmpty: false,
      sendLoading: false,

      zanLoading: false,

      replay: '',
      editShow: false,
      method: 0,
      editContent: '',
      editPerson: '',
      isBottom: false
    }
  },

  watch: {
    $route (to, from) {
      if (to.hash === '#reply') {
        this.editShow = false
        this.page = 1
        this.pageEmpty = false
      } else if (to.hash === '#replay_edit') {
        this.editShow = true
      }
    },
    isBottom (val) {
      if (val && !this.pageEmpty) {
        this.page = this.page + 1
        this.getData(this.page)
      }
    }
  },

  mounted () {
    let ele = document.getElementById('u_articel_reply')
    ele.addEventListener('scroll', this.handleScroll(() => {
      this.eleHeight = ele.clientHeight
      this.scrollHeight = ele.scrollHeight
      let scrollTop = ele.scrollTop
      // 距离底部大约200像素
      if (scrollTop + this.eleHeight >= this.scrollHeight - 200) {
        this.isBottom = true
      } else {
        this.isBottom = false
      }
    }))
  },

  methods: {
    async getData (page) {
      this.pageLoding = true
      let obj = {
        page: page,
        count: 5,
        commentid: this.masterinfo.id
      }
      const { code, data } = await memberCommentApi.getCommentReply(obj)
      if (code === 200) {
        if (data.array.length === 0) {
          this.pageEmpty = true
        } else {
          this.$emit('setReplyData', data.array)
        }
        this.pageLoding = false
        this.editShow = false
      }
    },
    showBigImg (index, val) {
      ImagePreview({
        images: val,
        startPosition: index,
        onClose () {
        }
      })
    },
    turnToEdit (val, method) {
      console.log(val)
      // this.commentId = this.masterinfo.id
      // this.toUserId = val.personalInfoResp.id
      this.replyid = val.replyid
      this.method = method
      this.editShow = true
      this.editPerson = val.personalInfoResp.nickname
      window.location.hash = 'replay_edit'
    },
    async send (method, id) {
      /*
        回复对象
        0 -> 楼主
        1 -> 层主
      */
      if (this.sendLoading) return
      this.sendLoading = true
      let params = {}
      if (method === 0) {
        params = {
          commentid: id,
          content: this.editContent
        }
      } else {
        params = {
          parentid: this.replyid,
          commentid: id,
          content: this.editContent
        }
      }
      console.log(params)
      if (this.editContent === '') {
        this.$toast('回复内容不能为空')
        this.sendLoading = false
        return false
      }
      const { code } = await memberCommentApi.addComment(params)
      if (code === 200) {
        this.$toast('发表成功！')
        this.editContent = ''
        this.page = 1
        this.pageEmpty = false
        this.$emit('renderData', true)
        window.history.back()
      }
      this.sendLoading = false
    },
    // 点赞
    async handleCommentLike (val, index) {
      if (this.zanLoading) return
      this.zanLoading = true
      let { replyid, ifLiked } = val
      const { code, data } = ifLiked ? await memberCommentApi.ordCancle(replyid) : await memberCommentApi.ordGood(replyid)
      if (code === 200) {
        val.ifLiked = !ifLiked
        val.likeNum = data
        this.$toast(ifLiked ? '取消点赞成功' : '点赞成功')
        this.zanLoading = false
      }
    },
    onClickLeft () {
      window.location.hash = ''
    },
    changeTime (time) {
      time = new Date(time).getTime()
      return tools.timeago(time)
    },
    getJSONArr (strArr) {
      return JSON.parse(strArr)
    },
    handleScroll (fn) {
      let Switch = true
      return function () {
        if (!Switch) return
        Switch = false
        setTimeout(() => {
          fn.apply(this, arguments)
          Switch = true
        }, 150)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.u-articel-reply {
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
}
.u_comment {
  font-size: 0;
  overflow: scroll;
  height: calc(100vh - 2.88rem);
  &>ul {
    padding: 0 20px;
  }
  &-list {
    position: relative;
    margin-bottom: 30px;
    &:after {
      content: '';
      position: absolute;
      height: 1PX;
      background: #eee;
      width: 355px;
      bottom: 0;
    }
    &:first-child {
      margin: 30px 0 20px;
      overflow: hidden;
      & > .desc {
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
            margin: -6px 8px 0;
          }
        }
      }
      .desc {
        font-size: 13px;
      }
    }
    .hot {
      float: right;
      width: 54px;
      height: 20px;
      box-sizing: border-box;
      background-image: url('~/assets/img/ic_chaoai_35x35@2x.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .user-content {
      padding-left: 54px;
      .other {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }

    .from {
      background: #FCFCFC;
      border: 1px solid #F1F1F1;
      position: relative;
      margin-bottom: 17px;
      .pro {
        width: 90px;
        height: 90px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
      .desc {
        margin: 0;
        padding: 15px;
        font-size: 15px;
        color: #333;
        width: ~'calc(100% - 90px)';
        box-sizing: border-box;
        p {
          line-height: 18px;
        }
        b {
          position: absolute;
          bottom: 15px;
          left: 105px;
        }
      }
    }
    
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
        width: 30px;
        height: 30px;
        border-radius: 50%;
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
              &.active {
                background: url("~/assets/img/knowledge/icon-like-blue.png") no-repeat center/contain;
              }
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
.mb-0 {
  margin-bottom: 0!important
}
</style>
