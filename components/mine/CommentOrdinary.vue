<template>
  <div class="u-ordinary">
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
              <div class="good" v-if="$v.ifGod">神评论</div>
            </div>
            <div class="part-body-center">{{ $v.content }}</div>
            <!-- 图片 -->
            <ul class="part-body-pro" v-if='$v.imgs.length !== 0'>
              <!-- <li class="pic-list" v-for="(imgItem, imgIndex) in $v.imgs" @click='showBigImg(imgIndex, $v.imgs)' v-lazy:background-image="imgItem + '?imageView2/5/w/160/h/160'"></li> -->
              <li class="pic-list" v-for="(imgItem, imgIndex) in $v.imgs" v-lazy:background-image="imgItem + '?imageView2/5/w/160/h/160'"></li>
            </ul>
            <!-- 文章来源 -->
            <div class="part-body-from">
              <p>
                <span class="ib-middle">评论文章</span>
                <a class="ib-middle" :data-href="getHref($v)">《{{ $v.title }}》</a>
              </p>
            </div>
          </div>
          <div class="part-body-bottom">
            <span class="time">{{ changeTime($v.createdAt) }}</span>
            <div class="flex_tlCenter">
              <div class="reply" @click='toReply($v)'>回复({{ $v.replyNum }})</div>
              <div :class="['like', $v.ifLiked ? 'active' : '']" @click="handleCommentLike($v, $k)">{{ $v.likeNum }}</div>
            </div>
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
import commentReply from '@/components/articel/Reply'
import { ImagePreview } from 'vant'
import { memberCommentApi, commentApi } from '~/api/comment'
export default {

  props: {
    commentGet: Array,
    pageEmptyGet: Boolean,
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
      islogin: true,
      commentData: [],

      pageEmpty: false,
      page: 1, // 当前页
      pageLoding: false, // 加载ing

      zanLoading: false,
      replyShow: false,
      masterInfo: [],
      replyData: [],
      oriType: 1
    }
  },

  watch: {
    isBottom (val) {
      console.log(val)
      if (val && !this.pageEmpty) {
        this.page += 1
        this.getData(this.page)
      }
    },
    type (val) {
      this.oriType = val
    },
    oriType (val) {
      this.page = 1
      this.pageEmpty = false
      this.getData(this.page, true)
    },
    sortedBy (val) {
      this.page = 1
      this.pageEmpty = false
      if (val !== 1) {
        this.getData(this.page, true)
      }
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

  async created () {
    this.oriType = this.type
    this.commentData = this.commentGet
    if (this.commentGet.length === 0 && this.oriType === 1) {
      this.page = 1
      this.pageEmpty = false
      this.getData(this.page, true)
    }
    this.pageEmpty = this.pageEmptyGet
  },
  methods: {
    async getData (page, needClear = false) {
      if (needClear) {
        var toast1 = this.$toast.loading({ message: '数据获取中', duration: 0, mask: false })
      }
      this.pageLoding = true
      let obj = {
        page: page,
        count: 5,
        type: this.oriType,
        sortedBy: this.sortedBy
      }
      const { code, data } = await memberCommentApi.oriCommentGet(obj)
      if (code === 200) {
        if (needClear) {
          this.commentData = data.array
          this.$emit('setTotal', data.total)
          toast1.clear()
        } else {
          this.commentData.push(...data.array)
        }
        this.pageEmpty = this.page * 5 >= data.total
      } else {
        this.pageEmpty = false
      }
      this.pageLoding = false
    },
    // 回复
    async toReply (val) {
      const toast1 = this.$toast.loading('回复信息加载中')
      this.commentId = val.id
      let obj = {
        page: 1,
        count: 5,
        commentId: this.commentId
      }
      const { code, data } = await commentApi.getRelyList(obj)
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
        commentId: this.commentId
      }
      const { code, data } = await commentApi.getRelyList(obj)
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
      const { code, data } = ifLiked ? await commentApi.comCancle(id) : await commentApi.comGood(id)
      if (code === 200) {
        val.ifLiked = !ifLiked
        val.likeNum = data
        this.$toast(ifLiked ? '取消点赞成功' : '点赞成功')
        this.zanLoading = false
      }
    },
    getHref (event) {
      // 被评论的文章类型(1:知识分享 2:新闻咨询 3:甄选内容 4:百科品种 5:百科产区 6:百科酒庄）
      let { type, articleId, attrid } = event
      let href = ''
      switch (type) {
        case 1:
          href = '/knowledge/detail/' + articleId + '?type=' + type
          break
        case 2:
          href = '/hotspot/detail/' + articleId
          break
        case 3:
          href = '/selection/detail/' + articleId
          break
        case 4:
          href = '/noun/detail/' + attrid + '?num=0'
          break
        case 5:
          href = '/noun/detail/' + attrid + '?num=1'
          break
        case 6:
          href = '/noun/detail/' + attrid + '?num=2'
          break
      }
      event.url = href
      return href
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
    }
  }
}
</script>
<style lang="less" scoped>
.u-ordinary {
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
        .good {
          width: 30px;
          height: 45px;
          box-sizing: border-box;
          padding-top: 33px;
          font-size: 10px;
          background-image: url(~/assets/img/knowledge/icon-good.png);
          background-position: center top;
          background-repeat: no-repeat;
          background-size: contain;
          color: @cor_999;
          white-space: nowrap;
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
        padding-bottom: 15px;
        margin-bottom: 15px;
        color: #666;
        font-size: 13px;
        border-bottom: 1PX solid @cor_border;
        a {
          color: #03A1CD;
          max-width: 260px;
          .u-ellipsis
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
          background-image: url('~/assets/img/knowledge/icon-like-black.png');
          background-repeat: no-repeat;
          background-position: left center;
          background-size: contain;
          &.active {
            background-image: url('~/assets/img/knowledge/icon-like-blue.png');
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