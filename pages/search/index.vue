<template>
  <div class="search">
    <div class="search-head">
      <div class="inputmdl">
        <form action="/" method="get" autocomplete="off" onsubmit="return false">
          <div class="inputmdl-in">
            <i class="icon_fdj"></i>
            <i class="icon_close" v-if="keywords" @click="keywords = ''"></i>
            <input v-model.trim="keywords" type="search" name='word' placeholder="请输入想查找的内容" @keyup.13="search" autocomplete="off" autocapitalize="off" >
          </div>
        </form>
        <div class="inputmdl-world" @click="toWinecenter">取消</div>
      </div>
      <nav class="navmdl">
        <div class="navmdl-item" :class="{active: navData.elIndex === index}" @click="elNavlist(index)" v-for="(navitem, index) in navData.list" :key="index">{{navitem}}</div>
        <div class="navmdl-logo" :class="{active: ctrlLogo}" ref="navmdlLogo" @click="handleSlide"></div>
      </nav>
    </div>
    <div class="search-result">
      <template v-if='keywords && searching'>
        <!-- 商品 -->
        <section class="goods" v-if="navDatanIndex === 0">
          <div class="goods-details">
            <div class="list-item" v-for="($v, $k) in searchData" :key="$k">
              <a class="item-wrap" :href="'/detail/' + $v.id">
                <div class="item_l">
                  <div :class="{ 'item_l-bk': true, 'sale-out': $v.stock === 876 }" :style="'background: url(' + $v.imgUrl + ') no-repeat center/contain'"></div>
                </div>
                <div class="item_r">
                  <h4>{{ $v.goodsName }}</h4>
                  <p v-if='$v.tagListJson'>
                    <span v-for='($v2, $k2) in customArray($v.tagListJson)' :key='$k2'>
                      <template v-if='$k2 === customArray($v.tagListJson).length - 1'>
                        {{ $v2 }}
                      </template>
                      <template v-else>
                        {{ $v2 + ' | ' }}
                      </template>
                    </span>
                  </p>
                  <div class="price">¥ {{ $v.actualPrice }}</div>
                </div>
              </a>
            </div>
          </div>
        </section>
        <!-- 名词解释 -->
        <section class="definitions" v-if="navDatanIndex === 1">
          <div class="definitions-list">
            <div class="definitions-list_item varity" v-for="($v, $k) in searchData" :key="$k">
              <a :href="'/noun/detail/' + $v.attrid + '?num=' + ($v.type - 4)">
                <h1 class="varity-head">{{ $v.chineseName }}</h1>
                <div class="varity-bk">
                  <div class="varity-bk_in" :style="'background: url(' + $v.bgimg + ') no-repeat center/cover'"></div>
                </div>
                <p class="varity-article">{{ $v.detail | fillArticle }}</p>
                <!-- <article class="varity-article">{{  }}</article> -->
                <footer class="varity-foot" style="border-top: 1px solid #ECECEC;">
                  <i class="icon_same ic_good ib-middle"></i>
                  <span class="num_same ib-middle">{{ $v.likeNum }}</span>
                  <i class="icon_same ic_collect marl ib-middle"></i>
                  <span class="num_same ib-middle">{{ $v.commentNum }}</span>
                  <i class="icon_same ic_look marl ib-middle"></i>
                  <span class="num_same ib-middle">{{ $v.browseNum }}</span>
                </footer>
              </a>
            </div>
          </div>
        </section>
        <!-- 知识分享 -->
        <section class="u-share-articel-item" v-if='navDatanIndex === 2'>
          <ShareItem v-for="(item, index) in searchData" :key="index" :item="item" />
        </section>
        <!-- 新闻资讯 -->
        <section class="news" v-if="navDatanIndex === 3">
          <div class="news-item" v-for="($v, $k) in searchData" :key="$k">
            <a :href="'/hotspot/detail/' + $v.id">
              <div class="news_head">
                <h1>{{ $v.title }}</h1>
                <div class="times">
                  <time>{{ $v.createdAt }}</time>
                </div>
                <p>
                  <span v-if="$v.classificationId >= 0">分类：{{circlenavList[$v.classificationId]}}</span>
                  <span>作者：{{ $v.author || '佚名' }}</span>
                  <span v-if='$v.sourceAuthor'>来源：{{ $v.sourceAuthor }}</span>
                </p>
              </div>
              <div class="news_main">
                <img :src="$v.imgPath" />
              </div>
              <article class="news_article">
                {{ $v.summary }}
              </article>
            </a>
          </div>
        </section>

        <div class='more-loading' v-show='pageLoding'>
          <van-loading type="spinner" />
          <p>正在加载更多</p>
        </div>

        <div class="no-more" v-show='pageEmpty'>
          <p>没有更多内容了！</p>
        </div>
      </template>

      <template v-else>
        <div class="search-index">
          <div class="goods-hot">
            <h3 class="hot-tip">热门搜索</h3>
            <ul class="hot-words">
              <li class="hot-words_item" v-for="($v2, $k2) in hotSerach">
                <span :class="[{w1: $k2 === 0}, {w2: $k2 === 1}, {w3: $k2 === 2}]">{{ $k2 + 1 }}.</span>
                <a :href="'/search?keyword=' + $v2.keyword + '&kid=' + $v2.id">{{ $v2.keyword }}</a>
              </li>
            </ul>
          </div>
          <div class="goods-history" v-if='localKeyword.length !== 0'>
            <h3 class="history-tip">
              <i class="icon_dustbin" @click='clearHistory'></i>
              历史搜索
            </h3>
            <ul class="history-list">
              <li class="history-list_item" v-for='(item, index) in localKeyword' :key='index'>
                <span @click='searchHistory(item)'>{{ item }}</span>
                <i class="icon_close" @click='clearSelect(index)'></i>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>

    <transition name="slide-bottom">
      <div class="drop-wrapper-option" v-if="openSlide">
        <div class="drop-wrapper-body">
          <div class='option-item' :class="{'active': item.value === slideActive}" v-for="(item, index) in setArr" :key="index" @click="elActive(item.value)">{{ item.label }}</div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="modal" v-show="openSlide"></div>
    </transition>
  
  </div>
</template>
<script>
import { searchApi } from '@/api/search'
import userLab from '@/components/Usericon.vue'
import ShareItem from '@/components/ShareItem'

export default {
  components: { userLab, ShareItem },

  head () {
    return {
      title: '搜索页',
      meta: [
        { hid: 'title', name: 'title', content: '搜索页' }
      ]
    }
  },

  async asyncData (req) {
    const { code: code1, data: data1 } = await searchApi.listSearchKeyword()
    const { code: code2, data: data2 } = await searchApi.serverGoods({ page: 1, count: 5, goodsName: req.query.keyword, sortedBy: 1, ifWine: true, ifSellOut: false, ifExclusive: false })
    if (req.query.kid) {
      await searchApi.updataKeyword(req.query.kid)
    }
    if (code1 === 200) {
      let searchData = []
      let pageEmpty = false
      if (code2 === 200) {
        searchData = data2.array
        pageEmpty = data2.total < 5
      }
      return {
        hotSerach: data1 || [],
        keywords: req.query.keyword,
        searching: !!req.query.keyword,
        searchData: searchData,
        pageEmpty: pageEmpty
      }
    }
  },

  data () {
    return {
      hotSerach: [], // 热门搜索

      keywords: '',

      navData: {
        list: ['商品', '名词解释', '知识分享', '新闻资讯'],
        elIndex: 0
      },
      navDatanIndex: 0,
      ctrlLogo: false,

      searchData: [],

      openSlide: false,
      slideActive: 1,
      searching: false,

      setArr: [],
      goodsArr: [
        { value: 1, label: '酒类' },
        { value: 2, label: '非酒类' }
      ], // 商品选择栏
      phraseArr: [
        { value: 1, label: '最新' },
        { value: 2, label: '评论最多' },
        { value: 3, label: '点赞最多' }
      ], // 名词解释
      knowArr: [
        { value: 1, label: '最新' },
        { value: 2, label: '最热门' },
        { value: 3, label: '评论最多' },
        { value: 4, label: '点赞最多' }
      ], // 知识分享
      newsArr: [
        { value: 1, label: '最新' },
        { value: 2, label: '最热门' },
        { value: 3, label: '评论最多' },
        { value: 4, label: '点赞最多' }
      ],
      channelName: ['经验/知识', '美食/周边'],
      circlenavList: ['这些圈子都在看', '行业热点', '培训讲座', '企业招商'],

      ifWine: true, // 是否红酒
      ifSellOut: false, // 是否售罄

      pageEmpty: false,
      page: 1, // 当前页
      pageLoding: false, // 加载ing,

      localKeyword: []
    }
  },

  watch: {
    keywords (val) {
      if (val === '') {
        this.searching = false
      }
    }
  },

  created () {
    this.setArr = this.goodsArr
    console.log(this.searching)
  },

  mounted () {
    const content = document.querySelector('.search-result')
    content.addEventListener('scroll', this.handleScroll(() => {
      this.eleHeight = content.clientHeight
      this.scrollHeight = content.scrollHeight
      let scrollTop = content.scrollTop
      // 距离底部大约200像素
      if (scrollTop + this.eleHeight >= this.scrollHeight - 200 && !this.pageLoding && !this.pageEmpty) {
        this.page += 1
        this.getData(this.page)
      }
    }))
    this.localKeyword = JSON.parse(localStorage.getItem('localKeyword')) || []
  },

  methods: {
    search () {
      // this.searching = true
      this.getData(this.page, true)
      // 设置历史记录
      this.setLocalStore(this.keywords)
    },
    async getData (page, needClear = false) {
      if (!this.keywords) return
      if (needClear) var toast1 = this.$toast.loading({ message: '数据获取中', duration: 0, mask: false })
      this.pageLoding = true
      let fn = null
      let param = {}
      switch (this.navData.elIndex) {
        case 0:
          param = {
            page: page,
            count: 5,
            goodsName: this.keywords, // 商品名称
            sortedBy: 1,
            ifWine: this.ifWine, // 是否红酒
            ifSellOut: this.ifSellOut, // 查看往期
            ifExclusive: false // 非认证
          }
          fn = searchApi.searchGoods(param)
          break
        case 1:
          param = {
            page: page,
            count: 10,
            title: this.keywords,
            sortedBy: this.sortedBy
          }
          fn = searchApi.searchBaiKe(param)
          break
        case 2:
          param = {
            page: page,
            count: 5,
            title: this.keywords,
            orderByNumber: this.sortedBy
          }
          fn = searchApi.searchShare(param)
          break
        case 3:
          param = {
            page: page,
            count: 5,
            title: this.keywords,
            orderByNumber: this.sortedBy
          }
          fn = searchApi.searchNews(param)
          break
      }
      const { code, data } = await fn
      if (code === 200) {
        if (needClear) {
          this.searchData = data.array
          toast1.clear()
        } else {
          this.searchData.push(...data.array)
        }
        this.searching = true
        this.pageEmpty = this.page * 5 >= data.total
      } else {
        this.pageEmpty = false
      }
      this.navDatanIndex = this.navData.elIndex
      this.pageLoding = false
    },
    toWinecenter () {
      // let id = tools.getUrlQues('id')
      // console.log('id', id)
      // if (id === 'others') {
      //   window.location.href = '/winecenter/others'
      // } else if (id === 'winecenter') {
      //   window.location.href = '/winecenter'
      // }
      window.location.href = '/'
    },
    elNavlist (index) {
      if (this.navData.elIndex === index) return
      this.pageEmpty = false
      this.ctrlLogo = false
      this.navData.elIndex = index
      this.sortedBy = 1
      this.slideActive = 1
      switch (index) {
        case 0:
          this.setArr = this.goodsArr
          break
        case 1:
          this.setArr = this.phraseArr
          break
        case 2:
          this.setArr = this.knowArr
          break
        case 3:
          this.setArr = this.newsArr
          break
      }
      this.openSlide = false
      this.page = 1
      this.getData(this.page, true)
    },
    handleSlide () {
      this.openSlide = !this.openSlide
      this.ctrlLogo = this.openSlide
    },
    closeLogo (val) {
      console.log('val', val)
      this.openSlide = false
      this.ctrlLogo = val
    },
    elActive (val) {
      if (this.slideActive === val) return
      this.slideActive = val
      this.sortedBy = val
      this.openSlide = false
      this.ctrlLogo = false
      this.page = 1
      // 如果是酒类
      if (this.navData.elIndex === 0) {
        if (val === 1) {
          this.ifWine = true
        } else {
          this.ifWine = false
        }
      }
      this.getData(this.page, true)
    },
    customArray (arr) {
      return JSON.parse(arr)
    },
    // 设置历史记录
    setLocalStore (val) {
      if (this.localKeyword.indexOf(val) !== -1 || !this.keywords) return
      this.setWord = val
      let cache = []
      if (this.localKeyword.length <= 5) {
        cache.unshift(this.keywords)
        this.localKeyword = cache.concat(this.localKeyword)
      } else {
        this.localKeyword.pop()
        this.localKeyword.unshift(this.keywords)
      }
      localStorage.setItem('localKeyword', JSON.stringify(this.localKeyword))
    },
    searchHistory (val) {
      this.keywords = val
      this.page = 1
      this.pageEmpty = false
      this.getData(this.page, true)
    },
    clearHistory () {
      this.localKeyword = []
      localStorage.setItem('localKeyword', JSON.stringify(this.localKeyword))
    },
    clearSelect (index) {
      this.localKeyword.splice(index, 1)
      localStorage.setItem('localKeyword', JSON.stringify(this.localKeyword))
    },
    formatHtml (str) {
      str = str.replace(/&nbsp;/g, '')
      str = str.replace('。', '')
      return str
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
    setImgUrl (url) {
      return url.indexOf('imageslim') !== -1 ? url.split('?')[0] + '?imageView2/5/w/480/h/480' : url + '?imageView2/5/w/480/h/480'
    }
  },

  filters: {
    fillArticle (str) {
      str = str.toString()
      /* eslint-disable */
      return str.replace(/<strong>.*?<\/strong>/g, '').replace(/<h\d.*?>.*<\/h\d>/g, '').replace(/<img .*?\/>/g, '').replace(/[<.*?>|<\/.*?\>|&nbsp;]/g, '').replace(/[\n|\s|\r|\\s|↵]/g, '').substr(0, 100)
      /* eslint-disable */
    }
  }
}
</script>
<style lang="less" scoped>
@font-face {
  font-family: DINEngschriftStd;
  src: url('~assets/font/DINEngschriftStd.otf');
}
.search {
  .u-restout;
  // padding-top: 80px;
  position: relative;

  &-head {
    border: 1PX solid #F5F5F5;
    // box-shadow: 0px -3px 7px 1px #000;
    z-index: 100;
    position: relative;
    background: #fff;
    .padlr20;
    .inputmdl {
      height: 48px;
      .flex_allCenter;

      &-in {
        width: 292px;
        height: 28px;
        line-height: 28px;
        border-radius: 14px;
        background: rgba(250, 250, 250, 1);
        text-indent: 50px;
        position: relative;
        .flex_tlCenter;

        &>input {
          width: calc(100% - 90px);
          background: rgba(250, 250, 250, 1);
          height: 100%;
          padding: 5px 0;
          box-sizing: border-box;
        }

        .icon_fdj {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-left: 22px;
          margin-right: 12px;
          background-image: url('~assets/img/Icons/ic_search_g_16x16@2x.png');
          .bg_contain;
        }

        .icon_close {
          padding: 10px;
          width: 14px;
          height: 14px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);

          &:after {
            content: '';
            width: 14px;
            height: 14px;
            background-image: url('~assets/img/Icons/ic_shanchu_g_14x14@2x.png');
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -7px;
            margin-left: -7px;
            .bg_contain;
          }
        }
      }

      &-world {
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        padding-left: 12px;
      }
    }

    .navmdl {
      padding: 10px 0;
      .flex_between;

      &-item {
        font-size: 15px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(182, 194, 199, 1);
        position: relative;

        &:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -10px;
          margin-left: -10px;
          width: 0;
          height: 3px;
          border-radius: 2px;
          background: @cor_333;
          transition: width ease .3s;
        }
      }

      .active {
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);

        &:after {
          width: 20px;
        }
      }

      &-logo {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url('~assets/img/Icons/ic_caidan_g_16x16@2x.png');
        transition: transform .2s;
        .bg_contain;
      }

      .navmdl-logo.active {
        transform: rotate(90deg);
      }
    }
  }

  &-result {
    height: ~'calc(100vh - 86px)';
    overflow: scroll;
    font-size: 0;

    .search-index {
      padding: 0 20px;
      .goods-hot {
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: 1PX solid #F5F5F5;
      }

      .hot {
        &-tip {
          padding: 15px 0;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
        }

        &-words {
          flex-wrap: wrap;
          .flex_between;

          &_item {
            margin: 15px 0;
            &>span {
              font-size: 16px;
              font-family: DINEngschriftStd;
              color: rgba(170, 170, 170, 1);
            }
            .w1 {
              color: #FB6248;
            }
            .w2 {
              color: #FEBA2C;
            }
            .w3 {
              color: #F2E220;
            }
            a {
              font-size: 16px;
              font-weight: bold;
              color: #333;
              margin-left: 5px;
              line-height: 1;
            }
          }
        }
      }

      .goods-history {
        .history-tip {
          padding: 15px 0;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);

          .icon_dustbin {
            float: right;
            width: 16px;
            height: 16px;
            background-image: url('~assets/img/Icons/ic_detele_b_16x16@2x.png');
            .bg_contain;
          }
        }

        .history-list {
          flex-wrap: wrap;
          margin-left: -15px;
          display: flex;

          &_item {
            font-size: 15px;
            color: rgba(195, 199, 205, 1);
            padding: 8px 34px 8px 10px;
            background: #F8F8F8;
            margin-left: 15px;
            margin-top: 10px;
            margin-bottom: 10px;
            border-radius: 4px;
            position: relative;

            .icon_close {
              content: '';
              position: absolute;
              top: 50%;
              right: 10px;
              width: 12px;
              height: 12px;
              margin-top: -6px;
              background-image: url('~assets/img/Icons/ic_off_g_14x14@2x.png');
              .bg_contain;
            }
          }
        }
      }
    }

    .goods {

      .goods-details {
        padding: 0 20px;
        .list {
          &-item {
            margin-top: 30px;
            margin-bottom: 30px;

            .item-wrap {
              display: flex;
            }

            .item_l {
              flex-shrink: 0;
              width: 120px;
              height: 120px;
              box-sizing: border-box;
              border-radius: 4px;
              border: 1PX solid #eaeaea;
              &-bk {
                width: 100%;
                height: 100%;
                position: relative;
                &.sale-out {
                  &:after {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    border-radius: 4px;
                    background-color: rgba(0,0,0,.4);
                    background-image: url('~assets/img/Icons/img-saleout.png');
                    background-size: 60px auto;
                    background-repeat: no-repeat;
                    background-position: center;
                  }
                }
              }
            }

            .item_r {
              padding-left: 15px;
              &>h4 {
                font-size: 15px;
                font-weight: bold;
                color: #333;
                line-height: 21px;
              }
              &>p {
                padding: 15px 0 30px 0;
                span {
                  color: #999;
                  font-size: 12px;
                  line-height: 1;
                }
              }
              .price {
                font-size: 17px;
                line-height: 1;
                font-family: Impact;
                color: #F99C00;
              }
            }
          }
        }

      }
    }

    .definitions {
      padding: 0 20px;
      &-list {
        &_item {
          margin-top: 30px;
          margin-bottom: 30px;
        }
      }
    }

    .lore {
      &-items {}

      &_item {
        margin-top: 30px;
        margin-bottom: 30px;
        border-radius: 8px;
        border: 1PX solid #EAEAEA;

        &-top {
          border-bottom: 1PX solid @cor_border;
          margin: 0 8px;
          padding: 20px 0 20px 20px;

          .vessel {
            .flex_between;

            &-l {
              width: 40px;
              height: 40px;
              border-radius: 20px;
            }

            &-r {
              width: calc(100% - 55px);
              height: 40px;

              &_head {
                font-size: 16px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
              }

              &>p {
                padding-top: 9px;
                font-size: 12px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
            }
          }
        }

        &-bottom {
          padding-top: 15px;
          .padlr20;

          &>h2 {
            font-size: 16px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
          }
        }

        &_tips {
          .u-mltip;
        }

        &_content {
          margin: 12px 0;
          background: #FBFBFB;
          height: 100px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #EAEAEA;
          .flex_between;

          .lt {
            width: 100px;
            height: 100px;
          }

          .lore_content_js {
            width: calc(100% - 100px);
            height: 100%;
            display: flex;
            align-items: center;

            &>p {
              padding-left: 10px;
              padding-right: 10px;
              height: 70px;
              font-size: 13px;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              color: rgba(153, 153, 153, 1);
              line-height: 23px;
              overflow: hidden;

            }
          }
        }
      }
    }

    .news {
      padding: 0 20px;
      &-item {
        margin: 27px 0;
        background: rgba(255, 255, 255, 1);
        border-radius: 8px;
        border: 1Px solid #EAEAEA;
        padding: 20px 20px 15px;

        .news_head {
          &>h1 {
            font-size: 16px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
          }

          .times {
            font-size: 12px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 12px;
            padding: 10px 0;
          }

          &>p {

            &>span {
              font-size: 12px;
              font-family: PingFang-SC-Regular;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 12px;
              margin-left: 20px;
            }

            &>span:first-child {
              margin-left: 0;
            }

          }

        }

        .news_main {
          padding: 10px 0;
          min-height: 120px;
          text-align: center;
          overflow: hidden;
          display: flex;
          align-items: center;

          &>img {
            display: inline-block;
            max-width: 100%;
            border-radius: 8px;
            vertical-align: middle;
          }
        }

        .news_article {
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 24px;
        }
      }
    }
  }

  // 下拉
  .drop-wrapper {
    &-option {
      width: 100%;
      position: fixed;
      z-index: 31;
      top: 80px;
      left: 0;
      background: white;
    }
    
    &-body {
      padding: 15px 0;
      .option-item {
        text-align: center;
        font-size: 13px;
        color: @cor_999;
        padding: 16px 0;
        &.active {
          color: @cor_333;
          font-weight: bold;
        }
      }
    }
  }
}

.varity {
  background: #FBFBFB;
  border-radius: 8px;
  border: 1PX solid #EAEAEA;
  .padlr15;

  &-head {
    padding: 15px 0;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-bk {
    width: 100%;
    height: 150px;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;

    &_in {
      width: 100%;
      height: 150px;
      max-width: 305px;
    }
  }

  &-article {
    font-size: 14px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 24px;
    margin: 10px 0;
  }

  &-foot {
    width: 100%;
    height: 45px;
    position: relative;
    .flex_tlCenter;

    .icon_same {
      width: 18px;
      height: 18px;
      .bg_cover;
    }

    .marl {
      margin-left: 23px;
    }

    .ic_good {
      background-image: url('~assets/img/Icons/ic_dianzan_g_18x18@2x.png');
    }

    .ic_collect {
      background-image: url('~assets/img/Icons/ic_pinglun_g_18x18@2x.png');
    }

    .ic_look {
      background-image: url('~assets/img/Icons/ic_liulang_g_18x18@2x.png');
    }

    .ic_ddd {
      position: absolute;
      top: 50%;
      right: 10px;
      width: 30px;
      height: 30px;
      margin-top: -15px;
      float: right;
      background-image: url('~assets/img/Icons/头部icon_30x30_ic_more_g_30x30@2x.png');
      .bg_cover;
    }

    .num_same {
      font-size: 12px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-left: 3px;
    }

  }
}

.u-share-articel {
  margin-top: 20px;
  padding: 0 20px;
  &-list {
    background: #fff;
    border-radius: 8px;
    min-height: 50px;
    border: 1PX solid #EAEAEA;
    padding: 20px 20px;
    overflow: hidden;
    margin-bottom: 20px;
    .author-info {
      padding-bottom: 20px;
      margin-bottom: 15px;
      border-bottom: 1PX solid #EAEAEA;
      display: flex;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        overflow: hidden;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 15px;
      }
      .info {
        .nickname {
          font-size: 16px;
          font-weight: bold;
          color: @cor_333;
          display: flex;
          align-items: center;
          span {
            display: block;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-right: 5px;
          }
        }
        .date {
          margin-top: 6px;
          font-size: 12px;
          color: @cor_999;
          padding-left: 18px;
          background-image: url(~assets/img/me/icon-clock.png);
          background-position: left center;
          background-size: 14px 14px;
          background-repeat: no-repeat;
        }
      }
    }
  }
  &-item {
    padding: 0 20px;
    margin-top: 20px;

    h3 {
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      max-height: 46px;
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
        background-image: url('~assets/img/Icons/ic_time_g_14x14@2x.png');
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
      font-weight: lighter;
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

    .video-box {
      position: relative;
      .video-player {
        width: 100%;
        max-height: 180px;
        border-radius: 5px;
        margin: 5px 0;
      }
    }
  }
}
</style>