<template>
  <div class="m-knowledge">

    <tab-select ref="tabSelect" :topicList="topicLs" :channelId=channelId :topicId="topicId" :typeId="typeId" :varietyId="varietyId" :typeList="typeLs" :breedList="varietyLs" :total="total" @getFilterData="getFilterFetch"></tab-select>

    <van-pull-refresh class="van-pull" v-if="articleList.length > 0" v-model="refreshing" @refresh="geRefresh" :loading-text="'刷新中'">
      <div class="article-ul">
        <ShareItem v-for="item in articleList" :key="item.id" :item="item" />
      </div>
      <div class="load-more">{{ hasMore ? loadTxt : '已无更多文章' }}</div>

    </van-pull-refresh>

    <null-data v-else></null-data>


    <div class="to-top-btn" :class="{'show': showBtn}" @click="backToTop">
    </div>

  </div>
</template>

<script>
import api from '~/utils/request'
import { knowApi } from '~/api/knowledge'
import TabSelect from '@/components/knowledge/TabSelect.vue'
import userLab from '@/components/Usericon.vue'
import nullData from '~/components/nullData'
import ShareItem from '@/components/ShareItem'

export default {
  name: 'knowledge',

  layout: 'page-with-tabbar',

  components: { TabSelect, userLab, nullData: nullData, ShareItem },

  head () {
    return {
      title: '知识分享',
      meta: [
        { hid: 'title', name: 'title', content: '知识分享' }
      ]
    }
  },

  async asyncData (req) {
    return api.all([
      knowApi.getTopicList(req),
      knowApi.getTypeList(req),
      knowApi.getVariety(req),
      api.serverGet('/api/sk/paginate', { page: 1, count: 10, channelNumber: req.query.channelid || '', topicId: req.query.topicid || '', typeId: req.query.typeid || '', varietyId: req.query.varietyid || '', order: req.query.order }, req)
    ])
      .then(api.spread(function (res1, res2, res3, res4) {
        if (res1.code !== 200 || res2.code !== 200 || res3.code !== 200 || res4.code !== 200) {
          req.redirect('/error')
        }
        let articleArr = []
        let total = 0
        if (res4.data && res4.data.array) {
          articleArr = res4.data.array
          total = res4.data.total
        }
        let _channelid = req.query.channelid
        if (_channelid) {
          _channelid = Number(_channelid)
        }
        console.log(req.query.topicid, 'topicid')
        return {
          channelId: _channelid || null,
          topicId: req.query.topicid || '',
          typeId: req.query.typeid || null,
          varietyId: req.query.varietyid || null,
          order: +req.query.order || 1,
          topicLs: res1.data.map(n => { return { id: n.id, name: n.topicName } }),
          typeLs: res2.data.map(n => { return { id: n.id, name: n.typeName } }),
          varietyLs: res3.data.map(n => { return { id: n.id, name: n.varietyName } }),
          articleList: articleArr,
          total: total,
          hasMore: total > 10
        }
      }))
  },

  mounted () {
    this.$refs.tabSelect.setSelect({ channelId: this.channelId, topicId: this.topicId, typeId: this.typeId, varietyId: this.varietyId, order: this.order })
    if (this.articleList.length === 0) return
    document.addEventListener('WeiXinJsBridgeReady', () => {
      this.$nextTick(() => {
        let videos = this.$refs.refvideo
        videos.map(v => {
          v.play()
        })
      })
    })
    const v = this
    const pullEl = document.querySelector('.van-pull')
    const ulEl = document.querySelector('.article-ul')
    const bt = document.querySelector('.load-more')
    function throttle (fn, interval = 300) {
      let canRun = true
      return function () {
        if (!canRun) return
        canRun = false
        setTimeout(() => {
          fn.apply(this, arguments)
          canRun = true
        }, interval)
      }
    }
    pullEl.addEventListener('scroll', throttle(function (e) {
      if (pullEl.scrollTop > pullEl.offsetHeight) {
        v.showBtn = true
      } else {
        v.showBtn = false
      }
      if (bt.offsetHeight + ulEl.offsetHeight - (pullEl.scrollTop + pullEl.offsetHeight) < 100 && !v.getting && v.hasMore) {
        v.fetchData(true)
      }
    }))
  },

  data () {
    return {
      loadTxt: '下拉加载更多',

      topicLs: [],
      typeLs: [],
      varietyLs: [],
      total: 0,

      channelId: null,
      topicId: '',
      typeId: '',
      varietyId: '',
      order: 1,

      refreshing: false,

      hasMore: false,
      currentPage: 1,
      articleList: [],

      getting: false,
      showBtn: false
    }
  },

  methods: {
    async fetchData (getMore) {
      this.$toast.loading('加载中...')
      this.getting = true
      this.loadTxt = '加载中'
      if (getMore) {
        this.currentPage += 1
      }
      const { code, data } = await knowApi.getKnowList({ page: this.currentPage, count: 10, channelNumber: this.channelId, topicId: this.topicId, typeId: this.typeId, varietyId: this.varietyId, order: this.order })
      if (code === 200) {
        if (getMore) {
          this.articleList.push(...data.array)
        } else {
          this.articleList = data.array
        }
        this.total = data.total
        this.hasMore = this.currentPage * 10 < data.total
        this.$toast.clear()
        this.getting = false
        this.loadTxt = '下拉加载更多'
      }
    },
    getFilterFetch (val) {
      this.channelId = val.channelId
      this.topicId = val.topicId
      this.typeId = val.typeId
      this.varietyId = val.vareity
      this.order = val.order
      window.location.search = `?order=${this.order}` + (this.channelId ? `&channelid=${this.channelId}` : '') + (this.topicId ? `&topicid=${this.topicId}` : '') + (this.typeId ? `&typeid=${this.typeId}` : '') + (this.varietyId ? `&varietyid=${this.varietyId}` : '')
      // this.currentPage = 1
      // this.fetchData(false)
    },
    async geRefresh () {
      this.refreshing = true
      this.currentPage = 1
      await this.fetchData(false)
      this.refreshing = false
    },

    gotodetail (val) {
      window.location.href = `/knowledge/detail/${val.id}?type=${val.articleType}`
    },

    backToTop () {
      const e = document.querySelector('.van-pull')
      const step = (e.scrollTop / 500) * 15
      let t = setInterval(() => {
        if (e.scrollTop > 1) {
          e.scrollTop = e.scrollTop - step
        } else {
          clearInterval(t)
        }
      }, 15)
    },

    formatHtml (str) {
      str = str.replace(/&nbsp;/g, '')
      str = str.replace('。', '')
      return str
    }
  }
}
</script>

<style lang="less" scoped>
.m-knowledge {
  min-height: 100vh;
  background: @cor_border;
  -webkit-overflow-scrolling: touch;
  .van-pull {
    height: calc(100vh - 76px);
    box-sizing: border-box;
    overflow: scroll;
    transition: 0s ease;
    .article-ul {
      box-sizing: border-box;
      background: white;
      padding: 20px;
    }
    .load-more {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 12px;
      background: @cor_border;
      color: @cor_666;
      padding-bottom: 50px;
    }
  }

  .to-top-btn {
    width: 45px;
    height: 45px;
    position: fixed;
    right: 20px;
    bottom: calc(80px + constant(safe-area-inset-bottom));
    bottom: calc(80px + env(safe-area-inset-bottom));
    background-image: url('~assets/img/upgrade/icon-to-top.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    visibility: hidden;
    opacity: 0;
    transform: translateX(20px);
    transition: ease .6s;
    &.show {
      visibility: visible;
      opacity: 1;
      transform: none;
    }
  }
}
</style>
