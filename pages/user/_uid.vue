<template>
  <div class="m-page-user">
    <ul class="tab-item">
      <li class="tab-item-list cur">
        <a href="#">Ta的作品</a>
      </li>
      <li class="tab-item-list">
        <a href="#">Ta的收藏</a>
      </li>
      <li class="tab-item-list">
        <a href="#">给Ta的打赏</a>
      </li>
    </ul>
    <div class="model-item">
      <a href="#" class="cur">知识分享</a>
      <a href="#">酒坛诗社</a>
      <a href="javascript:void(0)" @click='selectShow = true'>{{ orderTxt }}</a>
    </div>

    <div class="u-share-articel">
      <div class="u-share-articel-item" v-for='($v, $k) in workData' :key='$k'>
        <h3 class="font_hight">{{ $v.title }}</h3>
        <div class="time">{{ $v.createdAt }}</div>
        <div class="tips">
          <span class="tips_one">频道：{{ $v.channelName }}</span>
          <span>话题：{{ $v.topicName }}</span>
        </div>
        <div class="artcon" v-html='$v.summary'></div>
        <div class="imglist" v-if='$v.articleType === 1 && $v.imgsPaht'>
          <div v-for="(item, index) in $v.imgsPaht" :key="index" :class="['imgitem', $v.imgsPaht.length === 1 ? 'big' : '' , $v.imgsPaht.length % 3 === 0 ? 'small' : '', $v.imgsPaht.length === 8 ? 'small' : '', ($v.imgsPaht.length === 5 && index === 4) ? 'big' : '']" v-lazy:background-image='item'>
          </div>
          <div class="imgitem small" v-if="$v.imgsPaht.length === 8"></div>
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
import Menu from '@/components/Menu.vue'

export default {
  name: '',

  layout: 'page-with-user',

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
      if (data) pageEmpty = data.total <= 2
      return {
        uid: req.query.uid || null,
        workData: data.array || {},
        pageEmpty: pageEmpty
      }
    }
  },

  components: { Menu },

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
      this.pageLoding = true
      const { code, data } = await personApi.getWork(page, this.uid, this.order, this.channelNumber)
      if (code === 200 && data) {
        console.log(data)
        if (needClear) {
          this.workData = data.array
        } else {
          this.workData.push(...data.array)
        }
        this.pageEmpty = this.page * 2 >= data.total
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
    }
  }
}
</script>

<style lang="less" scoped>
.m-page-user {
  .tab-item {
    font-size: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    padding: 0 20px;
    &-list {
      color: #ccc;
      font-size: 13px;
      position: relative;
      padding: 18px 0 14px;
      &.cur {
        color: #333;
        &:after {
          content: '';
          position: absolute;
          width: 20px;
          height: 2px;
          background: #333;
          margin-top: -1px;
          margin-left: -10px;
          left: 50%;
          bottom: 0;
        }
      }
    }
  }
  .model-item {
    font-size: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    padding: 15px 40px;
    a {
      font-size: 13px;
      color: #666;
      &.cur {
        color: #333;
      }
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
  }
}
.u-share-articel {
  margin-top: 20px;
  padding: 0 20px;
  &-item {
    background: #fff;
    border-radius: 8px;
    min-height: 50px;
    border: 1PX solid #EAEAEA;
    padding: 15px 20px 20px;
    overflow: hidden;
    margin-bottom: 30px;

    &>h3 {
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      max-height: 48px;
      overflow: hidden;
      text-align: justify;
    }

    .time {
      font-size: 12px;
      color: #999;
      margin: 12px 0;
      position: relative;
      padding-left: 20px;

      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 14px;
        height: 14px;
        margin-top: -8px;
        background-image: url('~/assets/img/Icons/ic_time_g_14x14@2x.png');
        .bg_cover;
      }
    }

    .tips {
      font-size: 12px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 12px;
      margin: 10px 0;
      &_one {
        margin-right: 10px;
      }
    }

    .artcon {
      margin: 10px 0;
      font-size: 14px;
      color: #999;
      line-height: 24px;
      text-align: justify;
      &>p {
        width: 100%;
      }
      img {
        display: inline-block;
        max-width: 100%;
      }
    }

    .imglist {
      margin: 10px 0;
      flex-wrap: wrap;
      .flex_between;

      .imgitem {
        border-radius: 8px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        overflow: hidden;
        width: 140px;
        height: 140px;
        margin-bottom: 18px;
        &.big {
          width: 100%;
          height: 150px;
        }
        &.small {
          width: 88px;
          height: 88px;
        }
      }
    }

    .ctrls {
      display: flex;
      margin-left: -25px;
      font-size: 0;

      .ctrl {
        margin-left: 25px;

        &>img {
          display: inline-flex;
          width: 18px;
          height: 18px;
        }

        &>span {
          padding-left: 3px;
          font-size: 12px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
}
</style>
