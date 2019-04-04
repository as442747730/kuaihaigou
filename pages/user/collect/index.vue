<template>
  <div class="m-page-user">
    <tab :uid='uid' :index='1'></tab>
    <div class="model-item">
      <a class="cur" :href="'/user/collect?uid=' + uid">商品</a>
      <a :href="'/user/collectArticle?uid=' + uid">文章</a>
      <a href="javascript:void(0)" @click='selectShow = true'>{{ orderTxt }}</a>
    </div>
    
    <ul class="recommended-item">
      <li class="recommended-list" v-for="($v, $k) in collectData" :key="$k">
        <div class="pro">
          <a :href="'/detail/' + $v.goodsId">
            <img :src="$v.goodsImg">
          </a>
        </div>
        <div class="desc">
          <h3 class="font_hight">
            <a :href="'/detail/' + $v.goodsId">{{ $v.goodsName }}</a>
          </h3>
          <span>¥ {{ $v.actualPrice }}</span>
        </div>
      </li>
    </ul>

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
import Tab from '@/components/user/Tab.vue'

export default {
  name: '',

  layout: 'page-with-user',

  components: { Tab },

  head () {
    return {
      title: '个人主页_商品收藏',
      meta: [
        { hid: 'title', name: 'title', content: '个人主页_商品收藏' }
      ]
    }
  },

  async asyncData (req) {
    const { code, data } = await personApi.serverCollection({ page: 1, count: 5, ifSellOut: null, ifPopular: null, userId: req.query.uid })
    if (code === 200) {
      console.log(data)
      let pageEmpty = false
      pageEmpty = data.total <= 5
      return {
        uid: req.query.uid || null,
        collectData: data.array || {},
        pageEmpty: pageEmpty
      }
    }
  },

  data () {
    return {
      uid: null, // 用户id
      collectData: [],

      ifSellOut: null, // 售罄
      ifPopular: null, // 热门

      pageEmpty: false,
      page: 1, // 当前页
      pageLoding: false, // 加载ing

      selectShow: false, // 类型选择
      orderList: [
        { sort: 1, text: '全部' },
        { sort: 2, text: '热卖' },
        { sort: 3, text: '已售罄' }
      ],
      orderTxt: '全部'
    }
  },

  mounted () {
    console.log(this.collectData)
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
      const { code, data } = await personApi.otherCollection({ page: page, count: 5, ifSellOut: this.ifSellOut, ifPopular: this.ifPopular, userId: this.uid })
      if (code === 200) {
        if (needClear) {
          this.collectData = data.array
        } else {
          this.collectData.push(...data.array)
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
      switch (val.sort) {
        case 1:
          this.ifSellOut = null
          this.ifPopular = null
          break
        case 2:
          this.ifPopular = true
          this.ifSellOut = null
          break
        case 3:
          this.ifPopular = null
          this.ifSellOut = true
          break
      }
      this.page = 1
      this.selectShow = false
      this.pageEmpty = false
      this.getData(1, true)
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
.recommended {
  &-item {
    font-size: 0;
    padding: 0 20px;
    margin-top: 20px;
  }
  &-list {
    display: inline-block;
    width: 160px; 
    margin-right: 15px;
    margin-bottom: 20px;
    &:nth-child(2n) {
      margin-right: 0;
    }
    .pro {
      border: 1PX solid #eaeaea;
      height: 158px;
      text-align: center;
      line-height: 158px;
      overflow: hidden;
      img {
        display: inline-block;
        vertical-align: middle;
        max-width: 100%;
      }
    }
    .desc {
      text-align: left;
      h3 {
        color: #333;
        font-size: 13px;
        margin: 12px 0 10px;
        line-height: 18px;
        a {
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      p {
        color: #999;
        font-size: 12px;
        margin-bottom: 10px;
      }
      span {
        font-size: 15px;
        color: #FB6248;
        font-weight: bold;
      }
    }
  }
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
