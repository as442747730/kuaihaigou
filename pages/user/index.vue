<template>
  <div class="m-page-user">
    <tab :uid='uid' :index='0'></tab>
    <div class="model-item">
      <a class="cur" :href="'/user?uid=' + uid">知识分享</a>
      <a :href="'/user/drink?uid=' + uid">酒坛诗社</a>
      <a href="javascript:void(0)" @click='selectShow = true'>{{ orderTxt }}</a>
    </div>

    <div class="u-share-articel">
      <div class="u-share-articel-item" v-for='($v, $k) in workData' :key='$k'>
        <a :href="'/knowledge/detail/' + $v.id + '?type=' + $v.articleType">
          <h3 class="font_hight">{{ $v.title }}</h3>
          <div class="time">{{ $v.createdAt }}</div>
          <div class="tips">
            <span class="tips_one">频道：{{ $v.channelName }}</span>
            <span>话题：{{ $v.topicName }}</span>
          </div>
          <!-- 文章 -->
          <div class="artcon" v-if='$v.articleType === 1' v-html='$v.summary'></div>
          <div class="imglist" v-if='$v.articleType === 1 && $v.imgsPaht'>
            <div v-for="(item, index) in $v.imgsPaht" :key="index" :class="['imgitem', $v.imgsPaht.length === 1 ? 'big' : '' , $v.imgsPaht.length % 3 === 0 ? 'small' : '', $v.imgsPaht.length === 8 ? 'small' : '', ($v.imgsPaht.length === 5 && index === 4) ? 'big' : '']" v-lazy:background-image='setImgUrl(item)'>
            </div>
            <div class="imgitem small" v-if="$v.imgsPaht.length === 8"></div>
          </div>
          <!-- 视频 -->
          <div class="video-box" v-if="$v.articleType === 2">
            <video class="video-player" controls :src="$v.videoPath"></video>
          </div>
          <div class="ctrls">
            <div class="ctrl">
              <img class="ib-middle" src="~/assets/img/Icons/ic_dianzan_g_18x18@2x.png" />
              <span class="ib-middle">{{ $v.likeNumber }}</span>
            </div>
            <div class="ctrl">
              <img class="ib-middle" src="~/assets/img/Icons/ic_pinglun_g_18x18@2x.png" />
              <span class="ib-middle">{{ $v.commentNumber }}</span>
            </div>
            <div class="ctrl">
              <img class="ib-middle" src="~/assets/img/Icons/ic_liulang_g_18x18@2x.png" />
              <span class="ib-middle">{{ $v.readNumber }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>

    <div class='more-loading' v-show='pageLoding'>
      <van-loading type="spinner" />
      <p>正在加载更多</p>
    </div>

    <div class="no-more" v-show='pageEmpty'>
      <p>没有更多内容了！</p>
    </div>

    <!-- 类别选择框 -->
    <van-popup v-model="selectShow" position="bottom">
      <van-picker ref="reasonPicker" :columns="orderList" show-toolbar @cancel="handleCancel" @confirm="handleSelect" />
    </van-popup>

  </div>
</template>

<script>
import { personApi } from '@/api/users'
// import api from '~/utils/request'
// import { userApi, personApi } from '@/api/users'
import Tab from '@/components/user/Tab.vue'

export default {
  name: '',

  layout: 'page-with-user',

  components: { Tab },

  head () {
    return {
      title: '个人主页',
      meta: [
        { hid: 'title', name: 'title', content: '个人主页' }
      ]
    }
  },

  async asyncData (req) {
    const { code, data } = await personApi.serverCreation(req.query.uid)
    if (code === 200) {
      let pageEmpty = false
      if (data) pageEmpty = data.total <= 5
      return {
        uid: req.query.uid || null,
        workData: data.array || {},
        pageEmpty: pageEmpty
      }
    }
  },

  data () {
    return {
      uid: null, // 用户id
      selectShow: false, // 类型选择
      orderList: [
        { sort: 1, text: '最新' },
        { sort: 2, text: '精彩绝伦' },
        { sort: 3, text: '评论最多' },
        { sort: 4, text: '经验/知识' },
        { sort: 5, text: '美食/周边' }
      ],
      orderTxt: '最新',

      page: 1, // 当前页
      pageLoding: false, // 加载ing
      pageEmpty: false, // 是否为空
      order: 1, // 排序 1、最新 2、精彩绝伦 3、评论最多
      channelNumber: 1, // 1、经验/知识 2、美食/周边

      workData: {}, // 知识分享列表

      userInfo: {}
    }
  },

  mounted () {
    console.log(this.workData)
    window.addEventListener('scroll', this.handleScroll(() => {
      this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      // 距离底部大约200像素
      if (scrollTop + this.windowHeight >= this.scrollHeight - 200 && !this.pageLoding && !this.pageEmpty) {
        this.page += 1
        this.getData(this.page)
      }
    }))
  },

  methods: {
    async getData (page, needClear = false) {
      console.log(2)
      this.pageLoding = true
      const { code, data } = await personApi.getWork(page, this.uid, this.order, this.channelNumber)
      if (code === 200 && data) {
        console.log(data)
        if (needClear) {
          this.workData = data.array
        } else {
          this.workData.push(...data.array)
        }
        this.pageEmpty = this.page * 5 >= data.total
      } else {
        this.pageEmpty = true
      }
      this.pageLoding = false
    },
    handleCancel () {
      this.selectShow = false
    },
    handleSelect (val) {
      this.orderTxt = val.text
      this.order = val.sort
      if (val.sort >= 4) {
        this.order = null
        this.channelNumber = val.sort === 4 ? 1 : 2
      }
      this.selectShow = false
      this.page = 1
      this.pageEmpty = false
      this.getData(this.page, true)
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
    },
    setImgUrl (url) {
      return url.indexOf('imageslim') !== -1 ? url.split('?')[0] + '?imageView2/5/w/480/h/480' : url + '?imageView2/5/w/480/h/480'
    }
  }
}
</script>

<style lang="less" scoped>
@import './common.less';
.u-share-articel-item {
  margin-bottom: 20px;
}
.model-item a{
  &:last-child {
    &:after {
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
</style>
