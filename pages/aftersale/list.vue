<template>
  <div class="m-aftersale-list" >
    <div class="search-wrapper">
      <div class="search-box" @click.self="search">
        <input v-model="keyword" type="text" class="input" placeholder="输入商品名称">
      </div>
      <div class="filter-box" @click="showFilter">筛选</div>
    </div>

    <van-pull-refresh class="van-pull" id="main-list" v-model="refershing" @refresh="refresh" >
      <div class="item-wrapper">

        <div class="item-li" v-for="item in list" :key="item.key">
          <div class="top">
            <p class="desc">申请号：{{ item.afterSaleIdentify }}</p>
            <p class="desc">申请时间：{{ item.createdAt }}</p>
            <span class="status">{{ statusTxt[item.status - 1] }}</span>
          </div>
          <div class="body">
            <div class="cover" v-lazy:background-image="item.cover"></div>
            <div class="info">
              <p class="title">{{ item.goodsName }}</p>
              <p class="desc">{{ item.skuName }}</p>
              <p class="desc">x{{ item.num }}</p>
              <div class="u-button small default inline" @click="getDetail(item.id)">查看详情</div>
            </div>
          </div>
        </div>

        <div class="loading-tip" >
          <div v-if="loading">
            <van-loading />加载中
          </div>
          <span v-if="!hasMore">已无更多内容</span>
        </div>

      </div>
    </van-pull-refresh>

    <transition name="slide-right">
      <after-filter v-show="filterShow" ref="ufilter" @getStatus="getFilterStatus"></after-filter>
    </transition>
    <transition name="fade">
      <div v-show="filterShow" class="modal" @click="hideFilter" ></div>
    </transition>

  </div>
</template>

<script>
import { afterSaleApi } from '~/api/order'
import api from '~/utils/request'
import AfterFilter from '~/components/evaluation/AfterFilter'

export default {
  name: 'aftersale',

  layout: 'default',

  components: { AfterFilter },

  head () {
    return {
      title: '售后记录',
      meta: [
        { hid: 'title', name: 'title', content: '售后记录' }
      ]
    }
  },

  async asyncData (req) {
    return api.serverGet('/api/afterSale/paginate', { page: 1, count: 10 }, req).then((res) => {
    // afterSaleApi.getAfterSaleList().then(res => {
      console.log(res.data)
      if (res.code === 506) {
        req.redirect('/account/login')
      }
      if (res.code === 200) {
        return { list: res.data.array }
      } else {
        req.redirect('/error')
      }
    })
  },

  // 1:商家确认中 2:等待寄回货物 3:等待接收货物 4:已收到货物，退款中 5:退款成功 6:拒绝退款 7:已关闭
  // 1：审核中 2：待寄回 3：待接收 4：退款中 5：已完成 6：已拒绝 7：已关闭
  data () {
    return {
      statusTxt: ['审核中', '待寄回', '待接收', '退款中', '已完成', '已拒绝', '已关闭'],
      refershing: false,
      loading: false,
      list: [],
      currentPage: 1,
      hasMore: true,

      keyword: '',
      searchKey: {},
      status: null,
      serviceType: null,
      filterShow: false
    }
  },

  mounted () {
    document.querySelector('#main-list').addEventListener('scroll', (e) => {
      // todo
      const bodyHeight = document.body.offsetHeight
      const listHeight = document.querySelector('.item-wrapper').offsetHeight
      const scrollHeight = document.querySelector('#main-list').scrollTop
      if (listHeight - bodyHeight - scrollHeight > 60) return
      if (!this.hasMore) return
      this.getMore()
    })
  },

  methods: {
    async fetchData (getmore = false) {
      const { code, data } = await afterSaleApi.getAfterSaleListClient({ page: this.currentPage, count: 10, status: this.status, serviceType: this.serviceType, ...this.searchKey })
      if (code === 200) {
        if (getmore) {
          this.list.push(...data.array)
        } else {
          this.list = data.array
        }
        this.hasMore = data.total > this.currentPage * 10
        this.keyword = this.searchKey.goodsName
      }
    },

    search () {
      this.$set(this.searchKey, 'goodsName', this.keyword)
      this.currentPage = 1
      this.fetchData()
    },

    async refresh () {
      this.refershing = true
      this.currentPage = 1
      await this.fetchData()
      this.refershing = false
    },

    async getMore () {
      this.loading = true
      this.currentPage += 1
      console.log('getMore')
      await this.fetchData(true)
      this.loading = false
    },

    getDetail (val) {
      window.location.href = `/aftersale/detail/${val}`
    },

    showFilter () {
      this.filterShow = true
    },
    hideFilter () {
      this.$refs.ufilter.clear({ status: this.status, serviceType: this.serviceType })
      this.filterShow = false
    },
    getFilterStatus (obj) {
      this.filterShow = false
      this.currentPage = 1
      this.status = obj.status
      this.serviceType = obj.serviceType
      this.fetchData()
    }
  }
}
</script>

<style lang="less" scoped>
.m-aftersale-list {
  height: 100vh;
  -webkit-overflow-scrolling: touch;
  background: @cor_border;
  display: flex;
  flex-direction: column;
  .search-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    background: white;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
    position: absolute;
    z-index: 1;
    .search-box {
      flex: 1;
      background: #FAFAFA;
      border-radius: 14px;
      height: 28px;
      margin-right: 22px;
      padding-left: 50px;
      padding-right: 16px;
      background-image: url(~/assets/img/aftersale/icon-search.png);
      background-position: 22px center;
      background-repeat: no-repeat;
      background-size: 16px 16px;
      font-size: 0;
      .input {
        width: 100%;
        height: 28px;
        font-size: 14px;
        background: transparent;
        &::placeholder {
          color: #DDDDDD;
        }
      }
    }
    .filter-box {
      // width: 20px;
      padding-top: 21px;
      // height: 30px;
      color: @cor_999;
      font-size: 9px;
      background-image: url(~/assets/img/aftersale/icon-filter.png);
      background-position: center top;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      white-space: nowrap;
    }
  }
  .van-pull {
    flex: 1;
    overflow: scroll;
  }
  .item-wrapper {
    padding-top: 73px;
    .item-li {
      font-size: 0;
      background: white;
      margin-bottom: 10px;
      .top {
        padding: 20px 70px 15px 20px;
        border-bottom: 1PX solid @cor_border;
        position: relative;
        .desc:first-child {
          margin-bottom: 10px;
        }
        .status {
          color: white;
          font-size: 12px;
          display: block;
          padding: 3px 4px;
          background: #FF3132;
          position: absolute;
          top: 20px;
          right: 20px;
          border-radius: 2px;
        }
      }
      .body {
        padding: 20px;
        display: flex;
        .cover {
          width: 90px;
          height: 100px;
          border: 1PX solid @cor_border;
          margin-right: 15px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
        .info {
          flex: 1;
          position: relative;
          .title {
            font-size: 15px;
            color: @cor_333;
            line-height: 25px;
            font-weight: bold;
          }
          .desc {
            margin-top: 10px;
            padding-right: 80px;
          }
          .u-button {
            position: absolute;
            bottom: 0px;
            right: 0px;
          }
        }
      }
      .desc {
        font-size: 13px;
        color: @cor_666;
      }
    }
  }
  .loading-tip {
    text-align: center;
    color: @cor_999;
    font-size: 12px;
    height: 50px;
    line-height: 50px;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0,0,0,0.6);
    width: 100%;
    height: 100vh;
  }
}
</style>
