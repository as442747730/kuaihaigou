<template>
  <div class="mine" ref="scrollElem">
    <header>
      <div class="hd-head">
        <div class="hd_l" @click="openMenu">
          <i v-if='OriNotifyNum !== 0'></i>
        </div>
        <div class="hd_c">我的</div>
        <div class="hd_r"></div>
      </div>
      <div class="hd-headimg" @click="toperson">
        <div class="hd_img">
          <img :src="userInfo.headimgurl || defaulthead" />
        </div>
      </div>
      <div class="hd-name">
        <div class="hd_world">
          <span>{{ userInfo.nickname }}</span>
          <user-lab :level='String(userInfo.userGradeNumber)' type='2' :profess="String(userInfo.professionTypeCode || '')" :official="String((userInfo.certCategory === 3 && userInfo.certStage === 2) ? 3 : '')" :selfmedia='String(userInfo.selfMediaType)'></user-lab>
        </div>
      </div>
      <div class="hd-sign">
        <p>{{ userInfo.signature }}</p>
      </div>
    </header>
    <div class="main">
      <div class="main-top">
        <div class="info">
          <div class="info-item">
            <p><span>{{ userInfo.buyNumberCount }}</span> 瓶</p>
            <p>已购(酒)</p>
          </div>
          <div class="info-item" @click="tofollow(1)">
            <p><span>{{ userInfo.attentionNumber }}</span></p>
            <p>关注</p>
          </div>
          <div class="info-item" @click="tofollow(2)">
            <p><span>{{ userInfo.fanNumber }}</span></p>
            <p>粉丝</p>
          </div>
        </div>
        <nav class="navlist">
          <a class="navitem ic_gwc" href="/order/cart">购物车</a>
          <a class="navitem ic_wdgz" href="/order/list">我的订单</a>
          <a class="navitem ic_wdhd" href="/community/mymunity">我的活动</a>
          <a class="navitem ic_wdhd" href="/mine/reseller">我的分销</a>
          <a class="navitem ic_wdsc" href="/mine/collect">我的收藏</a>
        </nav>
      </div>
      <div class="main-bottom">

        <!-- <div class="bottom-head">
          <div class="head_item" v-for="(headitem, index) in headitems" :class="{active: headactive === index}" @click="headFn(index)" :key="index">
            <p :class="{head_one: index === 0}">{{ headitem }}</p>
          </div>
        </div> -->
        <van-tabs v-model="headactive" :line-width="13" :line-height="3" color="#333333" title-inactive-color="#999999" title-active-color="#333333" @change="headFn">
          <van-tab title="我的文章"></van-tab>
          <van-tab title="酒坛诗社"></van-tab>
          <van-tab title="酒款点评"></van-tab>
        </van-tabs>

        <section class="bottom-content" v-if="headactive === 0">
          <!-- <u-article :artlist="artList" ></u-article> -->
          <div style="padding: 0 20px;">
            <ShareItem v-for="item in artList" :key="item.id" :item="item" />
          </div>
        </section>
        <section class="bottom-content" v-if="headactive === 1">
          <u-jarsclb :poetryList="poetrys"></u-jarsclb>
        </section>
        <section class="bottom-content" v-if="headactive === 2">
          <!-- 组建内部循环 每次传入数组只一项 -->
          <div class="content-wrap">
            <u-winelist></u-winelist>
            <div>
              <p>酒款评分:<span class="grade">79分</span></p>
              <p>品尝时间:<span>2019/10/11</span></p>
              <div class="comment-wrap">
                <p>酒款点评:</p>
                旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评旧款点评
              </div>
            </div>
          </div>
          
        </section>
        
        <template v-if='headactive === 0'>
          <div class='more-loading' v-show='artLoad'>
            <van-loading type="spinner" />
            <p>正在加载更多</p>
          </div>

          <div class="no-more" v-show='!artMore'>
            <p>没有更多内容了！</p>
          </div>
        </template>
        <template v-if="headactive === 1">
          <div class='more-loading' v-show='poesLoad'>
            <van-loading type="spinner" />
            <p>正在加载更多</p>
          </div>

          <div class="no-more" v-show='!poesMore'>
            <p>没有更多内容了！</p>
          </div>
        </template>

      </div>
    </div>
    <van-popup class="vanpopup" v-model="showmenu" position="left">
      <left-menu :notifyNum='notifyNum'></left-menu>
    </van-popup>
  </div>
</template>
<script>
// import uFooter from '~/components/footer'
import uArticle from '~/components/mine/Article'
import uJarsclb from '~/components/mine/Jarsclub'
import leftMenu from '~/components/Menu'
import userLab from '~/components/Usericon.vue'
import { userApi } from '~/api/users'
import ShareItem from '@/components/ShareItem'
import uWinelist from '~/components/winelist'

export default {
  name: 'mineIndex',
  layout: 'page-with-tabbar',
  head () {
    return {
      title: '我的',
      meta: [
        { hid: 'title', name: 'title', content: '我的' }
      ]
    }
  },
  async asyncData (req) {
    const { code: detCode, data: detData } = await userApi.serverPostInfo(req)
    const { code: artCode, data: artData } = await userApi.serveGetAartical({ page: 1, count: 5 }, req)
    const { code: notiCode, data: notiData } = await userApi.serveGetNotifyNum(req)
    console.log(detCode)
    console.log(artCode)
    if (detCode === 506) {
      req.redirect('/account/login')
    } else if (detCode === 200 && artCode === 200) {
      let artMore = false
      let artList = []
      let total = 0
      let OriNotifyNum = 0
      if (notiCode === 200) {
        OriNotifyNum = notiData.total
      }
      if (artData) {
        artMore = artData.total > 5
        artList = artData.array
        total = artData.total
      }
      return {
        userInfo: detData,
        artList: artList,
        artMore: artMore,
        artLoad: artMore,
        artTotalPage: total,
        OriNotifyNum: OriNotifyNum
      }
    } else {
      req.redirect('/error')
    }
  },
  components: {
    ShareItem,
    uArticle,
    uJarsclb,
    leftMenu,
    userLab,
    uWinelist
  },
  data () {
    return {
      footIndex: 4,
      defaulthead: this.defaulthead,
      headactive: 0,
      userInfo: {
        nickname: '',
        buyNumberCount: 0,
        signature: '',
        headimgurl: ''
      },
      headitems: ['我的文章', '酒坛诗社'],
      artList: [], // 我的文章
      artTotalPage: 1,
      curArt: {
        page: 1,
        count: 5
      }, // 我的文章请求参数
      artLoad: false,
      artMore: false,
      poetrys: [], // 酒坛诗社
      poetTotalPage: 1,
      curPoes: {
        page: 1,
        count: 5
      }, // 酒坛诗社请求参数
      poesLoad: false,
      poesMore: true,
      showmenu: false, // 是否显示菜单栏

      // pageEmpty: false,
      // pageLoding: false,
      isFirst: true,
      ifFirst: true,
      notifyNum: 0,
      OriNotifyNum: 0
    }
  },
  mounted () {
    console.log(this.userInfo)
    window.addEventListener('scroll', () => {
      let winH = document.documentElement.clientHeight || document.body.clientHeight
      let elemBound = this.$refs.scrollElem.getBoundingClientRect()
      let _top = Math.abs(elemBound.top)
      let _height = elemBound.height
      let bottomH = _height - (_top + winH)
      if (bottomH <= 100) {
        if (this.headactive === 0) {
          if (this.artLoad && this.artMore) {
            if (this.artTotalPage > this.curArt.page * 5) {
              // this.artLoad = false
              this.curArt.page += 1
              this.getArts()
            } else {
              // this.pageEmpty = true
              // this.artMore = false
            }
          }
        } else {
          if (this.poesLoad && this.poesMore) {
            if (this.poetTotalPage > this.curPoes.page * 5) {
              this.poesLoad = false
              this.curPoes.page += 1
              this.getpoetry()
            } else {
              this.poesMore = false
              // this.pageEmpty = true
            }
          }
        }
      }
    })
  },
  methods: {
    headFn (index) {
      this.headactive = index
      if (index === 1 && this.isFirst) {
        this.getpoetry()
        this.isFirst = false
      }
    },
    tofollow (num) {
      window.location.href = '/mine/follow?num=' + num
    },
    toperson () {
      window.location.href = '/mine/person'
    },
    openMenu () {
      this.showmenu = !this.showmenu
      if (this.ifFirst) {
        this.getInfo()
        this.ifFirst = false
      }
    },
    async getArts () {
      this.artLoad = true
      // 获取文章
      let params = { ...this.curArt }
      const { code, data } = await userApi.getArticle(params)
      if (code === 200) {
        if (data && data.array) {
          this.artList.push(...data.array)
          this.artMore = this.artTotalPage > this.curArt.page * 5
        }
        this.artLoad = true
      }
      this.artLoad = false
    },
    async getpoetry () {
      // 酒坛诗社
      this.poesLoad = true
      let params = { ...this.curPoes }
      const { code, data } = await userApi.windPoetry(params)
      if (code === 200) {
        let { array, total } = data
        this.poetTotalPage = total
        let poeArr = []
        if (array) {
          poeArr = array.map(v => {
            let { content, createdAt } = v
            let date = new Date(createdAt)
            let yy = date.getFullYear()
            let mm = date.getMonth() + 1
            let dd = date.getDate()
            let yymm = yy + '/' + mm
            let checkSign = v.checkSign
            return { content, yymm, dd, checkSign }
          })
        }
        this.poetrys.push(...poeArr)
      }
      this.poesLoad = false
    },
    // 获取系统消息
    async getInfo () {
      const { code, data } = await userApi.getNotifyNum()
      if (code === 200) {
        this.notifyNum = data.total
        console.log(this.notifyNum)
      }
    }
  }
}
</script>
<style lang="less">
.van-tabs {
  box-sizing: border-box;
  .van-tabs__wrap {
    .van-tabs__nav {
      .van-tab {
        font-size: 13px;
        line-height: 1.3;
        padding-top: 14px;
        &.van-tab--active {
          font-weight: bold;
        }
      }
      .van-tabs__line {
        border-radius: 3px!important;
        margin-bottom: 5px;
      }
    }
  }
}
.mine {
  padding-bottom: 50px;
  background: #f1f1f1;

  header {
    width: 100%;
    background: -webkit-linear-gradient(-45deg, #4FEDEF, #00A1F0);
    background: -o-linear-gradient(-45deg, #4FEDEF, #00A1F0);
    background: -moz-linear-gradient(-45deg, #4FEDEF, #00A1F0);
    background: linear-gradient(-45deg, #4FEDEF, #00A1F0);

    .hd-head {
      padding: 5px 20px 0;
      height: 40px;
      .flex_between;

      .hd_l {
        width: 30px;
        height: 30px;
        background-image: url('~assets/img/Icons/ic_menu_w_30x30@2x.png');
        position: relative;
        .bg_cover;
        i {
          position: absolute;
          width: 8PX;
          height: 8PX;
          background: #ff3333;
          right: -2PX;
          top: 1PX;
          border-radius: 50%;
        }
      }

      .hd_c {
        font-size: 17px;
        font-family: PingFangSC-Medium;
        color: rgba(255, 255, 255, 1);
        // font-weight:500;
      }

      .hd_r {
        width: 30px;
        height: 30px;
        // background-image: url('~assets/img/Icons/ic_search_w_30x30@2x.png');
        .bg_cover;
      }
    }

    .hd-headimg {
      height: 130px;
      .flex_allCenter;

      .hd_img {
        width: 80px;
        height: 80px;
        border: 4PX solid #fff;
        border-radius: 50%;
        &>img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }

    .hd-name {
      font-size: 0;
      .flex_allCenter;
      .hd_world {
        font-size: 21px;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        box-sizing: border-box;
        max-width: 150px;
        position: relative;
        text-align: center;
        span {
          display: inline-block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .icons {
        width: 22px;
        height: 22px;
        margin-left: 7px;
        .bg_cover;
      }
    }

    .hd-sign {
      padding: 10px 20px 50px;
      p {
        font-size:13px;
        font-family:PingFang-SC-Medium;
        color:rgba(255,255,255,1);
        line-height:20px;
        text-align: center;
        .u-ellipsis;
      }
    }
  }

  .main {
    border-radius: 15px;
    position: relative;

    &-top {
      background-color: #fff;
      padding-top: 35px;
      margin-bottom: 10px;
      .info {
        width: 335px;
        height: 70px;
        padding: 14px 0;
        box-sizing: border-box;
        border-radius: 8px;
        position: absolute;
        top: -35px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        box-shadow: 0 5px 8px 0 rgb(249,249,249);
        .flex_around;

        &-item {
          &>p {
            font-size: 10px;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            margin: 10px 0;
            text-align: center;
            &>span {
              font-size: 19px;
              font-weight: bold;
              font-family: 'PingFangSC-Semibold';
              color: rgba(51, 51, 51, 1);
            }
          }
        }
      }

      .navlist {
        height: 100px;
        .flex_around;

        .navitem {
          font-size: 11px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          position: relative;
          padding-top: 42px;

          &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            width: 40px;
            height: 40px;
            margin-left: -20px;
            .bg_cover;
          }
        }

        .ic_gwc {
          &:before {
            background-image: url('~assets/img/detail/ic_gouwuche_40x40@2x.png');
          }
        }

        .ic_wdgz {
          &:before {
            background-image: url('~assets/img/detail/ic_dingdan_40x40@2x.png');
          }
        }

        .ic_wdhd {
          &:before {
            background-image: url('~assets/img/detail/ic_huodong_40x40@2x.png');
          }
        }

        .ic_wdsc {
          &:before {
            background-image: url('~assets/img/detail/ic_shoucang_40x40@2x.png');
          }
        }
      }
    }

    &-bottom {
      background-color: #fff;
      .bottom-head {
        height: 40px;
        background: #F5F5F5;
        .flex_between;

        .head_item {
          font-size: 14px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 14px;
          width: 50%;
          text-align: center;
          padding: 10px 0;

        }

        .head_item.active {
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
        }

        .head_one {
          width: 100%;
          border-right: 1px solid #DADADA;
          .flex_allCenter;
        }
      }

      .bottom-content {
        padding: 30px 0 10px;
        .content-wrap {
          padding: 0 10px;
          p {
            font-size: 12px;
            color: #aaa;
            padding-bottom: 10px;
            .grade {
              color: rgb(231, 123, 0);
            }
            span {
              margin-left: 10px;
              font-size: 12px;
              color: #000;
            }
          }
          .comment-wrap{
            font-size: 12px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
      }
    }
  }
  .vanpopup {
    width: 250px;
    height: 100vh;
  }
  .article-item .author-info {
    display: none!important;
  }
  .article-item .article-cover {
    border-radius: 4px!important;
  }
}
</style>