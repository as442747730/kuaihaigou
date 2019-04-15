<template>
  <div class="u-comment-goods">
    <div>
      <div class="part" v-for="($v, $k) in commentData" :key="$k">

        <div class="part-body">
          <div @click='toReply($v)'>
            <div class="part-body-top">
              <a :href="'/user?uid=' + $v.personalInfoResp.id"><div class="avatar" :style="'background-image: url(' + ($v.personalInfoResp.headimgurl || defaulthead) + ')'"></div></a>
              <div class="user">
                <p class="nickname">
                  <a>{{ $v.personalInfoResp.nickname }}</a>
                </p>
                <user-lab :level='String($v.personalInfoResp.userGradeNumber)' type='1' :profess='String($v.personalInfoResp.category)'></user-lab>
              </div>
              <div class="hot" v-if="$v.ifPopular"></div>
            </div>
            <div class="part-body-center">{{ $v.content }}</div>
            <!-- 图片 -->
            <ul class="part-body-pro" v-if='getJSONArr($v.imgs).length !== 0'>
              <!-- <li class="pic-list" v-for="(imgItem, imgIndex) in getJSONArr($v.imgs)" @click='showBigImg(imgIndex, getJSONArr($v.imgs))' v-lazy:background-image="imgItem + '?imageView2/5/w/160/h/160'"></li> -->
              <li class="pic-list" v-for="(imgItem, imgIndex) in getJSONArr($v.imgs)" v-lazy:background-image="imgItem + '?imageView2/5/w/160/h/160'"></li>
            </ul>
            <!-- 商品来源 -->
            <div class="part-body-from">
              <div class="pro ib-middle" v-lazy:background-image='$v.cover'></div>
              <div class="desc ib-top">
                <p class="font_hight">{{ $v.goodsName }}</p>
                <b class="font_hight">¥{{ $v.actualPrice }}</b>
              </div>
            </div>
          </div>
          <div class="part-body-bottom">
            <span class="time">{{ changeTime($v.createdAt) }}</span>
            <div class="flex_tlCenter">
              <div class="reply" @click='toReply($v)'>回复({{ $v.replyNum }})</div>
              <div :class="['like', $v.ifLiked ? 'active' : '']" @click="handleCommentLike($v, $k)">{{ $v.likeNum }}</div>
            </div>
          </div>
          <!-- 追评 -->
          <div class="part-body-add" v-if='$v.review'>
            <h3 class="font_hight">用户{{ countTimeAgo($v.reviewTime, $v.createdAt) }}追评</h3>
            <p>{{ $v.review }}</p>
            <div class="pro" v-if='getJSONArr($v.reviewImgs).length !== 0'>
              <div v-for="($v2, $k2) in getJSONArr($v.reviewImgs)" class="pro-item" v-lazy:background-image="$v2" @click='showBigImg($k2, getJSONArr($v.reviewImgs))'></div>
            </div>
          </div>
          <!-- 官方评论 -->
          <div class="part-body-office" v-if='$v.officialReply'>
            <p>
              <span>快海购官方：</span>
              {{ $v.officialReply }}
            </p>
          </div>
        </div>

      </div>
    </div>

    <div class='more-loading' v-show='pageLoding'>
      <van-loading type="spinner" />
      <p>正在加载更多</p>
    </div>

    <div class="no-more" v-show='pageEmpty'>
      <p>没有更多内容了！</p>
    </div>

    <!-- 回复 -->
    <van-popup class='to-comment-wrap' v-model="replyShow" position="right" :overlay="true" get-container='.m-layout'>
      <comment-reply :masterinfo='masterInfo' :replyData='replyData' :islogin='islogin' @setReplyData='setReplyData' @renderData='renderData' />
    </van-popup>

  </div>
</template>
<script>
import tools from '~/utils/tools'
import userLab from '~/components/Usericon.vue'
import commentReply from '~/components/mine/CommentGoodsReply'
import { ImagePreview } from 'vant'
import { memberCommentApi } from '~/api/comment'
export default {
  props: {
    isBottom: Boolean,
    type: Number,
    sortedBy: Number
  },

  components: {
    userLab,
    commentReply
  },

  data () {
    return {
      oriType: 0,
      islogin: true,
      commentData: [],

      pageEmpty: false,
      page: 1, // 当前页
      pageLoding: false, // 加载ing

      zanLoading: false,
      replyShow: false,
      masterInfo: [],
      replyData: []
    }
  },

  created () {
    this.oriType = this.type
  },

  watch: {
    isBottom (val) {
      if (val && !this.pageEmpty) {
        this.page += 1
        this.getData(this.page)
      }
    },
    oriType (val) {
      console.log(val)
      this.page = 1
      this.pageEmpty = false
      this.getData(this.page, true)
    },
    sortedBy (val) {
      this.page = 1
      this.pageEmpty = false
      this.getData(this.page, true)
    },
    $route (to, from) {
      if (to.hash === '') {
        this.replyShow = false
      } else if (to.hash === '#reply') {
        this.replyShow = true
      } else if (from.hash === '#reply') {
        this.replyShow = true
      }
    }
  },

  methods: {
    async getData (page, needClear = false) {
      const toast1 = this.$toast.loading({ message: '数据获取中', duration: 0, mask: false })
      this.pageLoding = true
      let obj = {
        page: page,
        count: 5,
        type: this.type,
        sortedBy: this.sortedBy
      }
      const { code, data } = await memberCommentApi.goodsComment(obj)
      if (code === 200) {
        if (needClear) {
          this.commentData = data.array
          this.$emit('setTotal', data.total)
        } else {
          this.commentData.push(...data.array)
        }
        this.pageEmpty = this.page * 5 >= data.total
      } else {
        this.pageEmpty = false
      }
      toast1.clear()
      this.pageLoding = false
    },
    // 回复
    async toReply (val) {
      const toast1 = this.$toast.loading('回复信息加载中')
      this.commentId = val.id
      let obj = {
        page: 1,
        count: 5,
        commentid: this.commentId
      }
      const { code, data } = await memberCommentApi.getCommentReply(obj)
      if (code === 200) {
        toast1.clear()
        this.replyShow = true
        this.replyData = data.array
        this.masterInfo = val
        console.log(this.masterInfo)
        window.location.hash = 'reply'
      }
    },
    setReplyData (val) {
      this.replyData.push(...val)
    },
    // 重载回复列表数据
    async renderData (val) {
      let obj = {
        page: 1,
        count: 5,
        commentid: this.commentId
      }
      const { code, data } = await memberCommentApi.getCommentReply(obj)
      if (code === 200) {
        this.replyData = data.array
        this.masterInfo.replyNum = data.total
      }
    },
    // 点赞
    async handleCommentLike (val, index) {
      if (this.zanLoading) return
      this.zanLoading = true
      let { id, ifLiked } = val
      const { code, data } = !ifLiked ? await memberCommentApi.comGood(id) : await memberCommentApi.comCancle(id)
      if (code === 200) {
        val.ifLiked = !ifLiked
        val.likeNum = data
        this.$toast(ifLiked ? '取消点赞成功' : '点赞成功')
        this.zanLoading = false
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
    changeTime (time) {
      time = new Date(time).getTime()
      return tools.timeago(time)
    },
    getJSONArr (strArr) {
      return JSON.parse(strArr)
    },
    countTimeAgo (now, setTime) {
      const getTime = new Date(now).getTime() - new Date(setTime).getTime()
      return Math.floor(getTime / (3600 * 24 * 1000)) === 0 ? '当天' : Math.floor(getTime / (3600 * 24 * 1000)) + '天后'
    }
  }
}
</script>
<style lang="less" scoped>
.u-comment-goods {
  .part {
    padding-left: 20px;
    margin-bottom: 10px;
    background: #fff;
    &:last-child {
      margin-bottom: 0;
    }
    .part-body {
      padding: 25px 20px 20px 0;
      &-top {
        display: flex;
        align-items: center;
        height: 45px;
        margin-bottom: 15px;
        .avatar {
          width: 45px;
          height: 45px;
          border-radius: 100%;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          margin-right: 10px;
        }
        .user {
          height: 45px;
          flex: 1;
          .nickname {
            max-width: 150px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            color: @cor_333;
            font-size: 15px;
            color: @cor_333;
          }
        }
        .hot {
          width: 54px;
          height: 20px;
          box-sizing: border-box;
          padding-top: 33px;
          background-image: url('~assets/img/ic_chaoai_35x35@2x.png');
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }
      }
      &-center {
        font-size: 15px;
        color: @cor_333;
        line-height: 25px;
        margin-bottom: 15px;
      }
      &-pro {
        display: flex;
      }
      &-from {
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
      .pic-list {
        border: 1px solid #eee;
        width: 68px;
        height: 68px;
        margin-right: 10px;
        margin-bottom: 15px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        &:last-child {
          margin-right: 0;
        }
      }
      &-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time {
          font-size: 12px;
          color: @cor_999;
        }
        .reply {
          font-size: 13px;
          color: @cor_333;
          font-weight: bold;
        }
        .like {
          margin-left: 20px;
          font-size: 13px;
          color: @cor_999;
          padding-left: 20px;
          background-image: url('~assets/img/knowledge/icon-like-black.png');
          background-repeat: no-repeat;
          background-position: left center;
          background-size: contain;
          &.active {
            background-image: url('~assets/img/knowledge/icon-like-blue.png');
          }
        }
      }
      &-add {
        border-top: 1px solid #f1f1f1;
        margin-top: 15px;
        h3 {
          font-size: 12px;
          color: #FB6248;
          margin: 13px 0;
        }
        p {
          font-size: 15px;
          line-height: 25px;
          color: #333;
          text-align: justify;
          margin-bottom: 10px;
        }
        .pro {
          &-item {
            width: 70px;
            height: 70px;
            display: inline-block;
            margin-right: 10px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
          }
        }
      }
      &-office {
        margin: 15px 0 0;
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
}
.to-comment-wrap {
  width: 100%;
  height: 100%;
}
</style>