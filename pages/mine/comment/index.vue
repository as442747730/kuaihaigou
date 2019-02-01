<template>
  <div class="u-comment">
    <com-head titleConfig="我的评论"></com-head>
    <div class="tab">
      <span :class="{'cur': tabIndex === 1}" @click='handleTab(1)'>知识分享</span>
      <span :class="{'cur': tabIndex === 2}" @click='handleTab(2)'>行业热点</span>
      <span :class="{'cur': tabIndex === 3}" @click='handleTab(3)'>热门甄选</span>
      <span :class="{'cur': tabIndex === 4}" @click='handleTab(4)'>红酒百科</span>
      <span :class="{'cur': tabIndex === 5}" @click='handleTab(5)'>商品评论</span>
    </div>
    <div class="select">
      <span>{{ total }}条</span>
      <span @click='selectShow = true'>{{ selectTxt }}</span>
    </div>
    <div class="u-comment-result">

      <component v-bind:is="view" :commentGet='commentSend' :pageEmpty='pageEmptySend' :isBottom='isBottom' :type='tabIndex' :sortedBy='sort' @setTotal='setTotal'></component>

    </div>

    <!-- 类别选择框 -->
    <van-popup v-model="selectShow" position="bottom">
      <van-picker ref="reasonPicker" :columns="orderList" show-toolbar @cancel="handleCancel" @confirm="handleSelect" />
    </van-popup>

  </div>
</template>
<script>
import comHead from '~/components/com-head'
import { memberCommentApi } from '~/api/comment'
import goodsComment from '~/components/mine/CommentGoods'
import ordinary from '~/components/mine/CommentOrdinary'
export default {

  components: {
    goodsComment,
    ordinary,
    comHead
  },

  head () {
    return {
      title: '我的评论',
      meta: [
        { hid: 'title', name: 'title', content: '我的评论' }
      ]
    }
  },

  async asyncData (req) {
    const { code, data } = await memberCommentApi.commentlist({ page: 1, count: 5, type: 1, sortedBy: 1 }, req)
    if (code === 506) {
      req.redirect('/account/login')
    } else if (code === 200) {
      let pageEmpty = false
      pageEmpty = data.total <= 5
      return {
        total: data.total,
        commentSend: data.array,
        pageEmptySend: pageEmpty
      }
    }
  },

  data () {
    return {
      tabIndex: 1,
      sort: 1,

      view: 'ordinary',

      selectTxt: '最新发布',

      option1: [
        { value: 1, text: '最新发布' },
        { value: 2, text: '点赞最多' },
        { value: 3, text: '神评论' }
      ],
      option2: [
        { value: 1, text: '最新发布' },
        { value: 2, text: '点赞最多' },
        { value: 3, text: '热门评论' }
      ],

      orderList: [],

      total: 0,
      commentSend: [],

      pageEmptySend: false,
      isBottom: false,
      selectShow: false
    }
  },

  mounted () {
    this.orderList = this.option1
    const content = document.querySelector('.u-comment-result')
    content.addEventListener('scroll', this.handleScroll(() => {
      this.eleHeight = content.clientHeight
      this.scrollHeight = content.scrollHeight
      let scrollTop = content.scrollTop
      // 距离底部大约200像素
      if (scrollTop + this.eleHeight >= this.scrollHeight - 200) {
        this.isBottom = true
      } else {
        this.isBottom = false
      }
    }))
  },
  methods: {
    setTotal (val) {
      this.total = val
    },
    handleTab (val) {
      this.tabIndex = val
      this.commentSend = []
      if (val === 5) {
        this.view = 'goodsComment'
        this.orderList = this.option2
        this.selectTxt = this.option2[0].text
        this.sort = 1
      } else {
        this.view = 'ordinary'
        this.orderList = this.option1
        this.selectTxt = this.option1[0].text
        this.sort = 1
      }
    },
    handleCancel () {
      this.selectShow = false
    },
    handleSelect (val) {
      this.selectTxt = val.text
      this.sort = val.value
      this.selectShow = false
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
.u-comment {
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
  .tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px 14px;
    background: #fff; 
    span {
      font-size: 13px;
      color: #999;
      position: relative;
      &.cur {
        color: #333;
        font-weight: bold;
        font-family: 'PingFang-SC-Medium';
        &:after {
          position: absolute;
          content: '';
          width: 20px;
          height: 2PX;
          background: #333;
          margin-left: -10px;
          left: 50%;
          bottom: -14px;
        }
      }
    }
  }
  .select {
    background: #F5F5F5;
    padding: 10px 20px;
    color: #999;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      &:last-child:after {
        content: '\F007';
        font: normal normal normal 14px/1 "vant-icon";
        color: #999;
        display: inline-block;
        position: relative;
        left: 5px;
        top: 2px;
        transform: rotate(-90deg);
      }
    }
  }
  &-result {
    overflow: scroll;
    height: ~'calc(100vh - 125px)'
  }
}
</style>