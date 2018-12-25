<template>
  <div class="mine" ref="scrollElem">
    <header>
      <div class="hd-head">
        <div class="hd_l" data-val="123" @click="openMenu"></div>
        <div class="hd_c">我的</div>
        <div class="hd_r"></div>
      </div>
      <div class="hd-headimg" @click="toperson">
        <div class="hd_img">
          <img :src="userInfo.headimgurl || defaulthead" />
        </div>
      </div>
      <div class="hd-name">
        <p class="hd_world">{{ userInfo.nickname }}</p>
        <i class="icons ic_level"></i>
        <i class="icons ic_cms"></i>
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
          <a class="navitem ic_gwc" href="#">购物车</a>
          <a class="navitem ic_wdgz" href="/order/list">我的订单</a>
          <a class="navitem ic_wdhd" href="#">我的活动</a>
          <a class="navitem ic_wdsc" href="#">我的收藏</a>
        </nav>
      </div>
      <div class="main-bottom">
        <div class="bottom-head">
          <div class="head_item" v-for="(headitem, index) in headitems" :class="{active: headactive === index}" @click="headFn(index)" :key="index">
            <p :class="{head_one: index === 0}">{{ headitem }}</p>
          </div>
        </div>
        <section class="bottom-content" v-if="headactive === 0">
          <u-article :artlist="artList"></u-article>
        </section>
        <section class="bottom-content" v-else>
          <u-jarsclb :poetryList="poetrys"></u-jarsclb>
        </section>
      </div>
    </div>
    <van-popup class="vanpopup" v-model="showmenu" position="left">
      <left-menu></left-menu>
    </van-popup>
  </div>
</template>
<script>
// import uFooter from '~/components/footer'
import uArticle from '~/components/mine/Article'
import uJarsclb from '~/components/mine/Jarsclub'
import leftMenu from '~/components/Menu'
import { userApi } from '~/api/users'
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
    if (detCode === 506) {
      req.redirect('/account/login')
    } else if (detCode === 200) {
      return { userInfo: detData }
    } else {
      req.redirect('/error')
    }
  },
  components: {
    uArticle,
    uJarsclb,
    leftMenu
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
        count: 10
      }, // 我的文章请求参数
      artLoad: true,
      artMore: true,
      poetrys: [], // 酒坛诗社
      poetTotalPage: 1,
      curPoes: {
        page: 1,
        count: 10
      }, // 酒坛诗社请求参数
      poesLoad: true,
      poesMore: true,
      showmenu: false // 是否显示菜单栏
    }
  },
  created () {
    this.getArts()
  },
  mounted () {
    window.addEventListener('scroll', () => {
      let winH = document.documentElement.clientHeight || document.body.clientHeight
      let elemBound = this.$refs.scrollElem.getBoundingClientRect()
      let _top = Math.abs(elemBound.top)
      let _height = elemBound.height
      let bottomH = _height - (_top + winH)
      if (bottomH <= 100) {
        if (this.headactive === 0) {
          if (this.artLoad && this.artMore) {
            if (this.artTotalPage > this.curArt.page) {
              this.artLoad = false
              this.curPoes.page += 1
              this.getArts()
            } else {
              this.artMore = false
            }
          }
        } else {
          if (this.poesLoad && this.poesMore) {
            if (this.poetTotalPage > this.curPoes.page) {
              this.poesLoad = false
              this.curPoes.page += 1
              this.getpoetry()
            } else {
              this.poesMore = false
            }
          }
        }
      }
    })
  },
  methods: {
    headFn (index) {
      this.headactive = index
      if (index === 1) {
        this.getpoetry()
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
    },
    async getArts () {
      // 获取文章
      let params = { ...this.curArt }
      const { code, data } = await userApi.getArticle(params)
      if (code === 200) {
        if (data && data.array) {
          this.artList.push(...data.array)
        }
        this.artLoad = true
      }
    },
    async getpoetry () {
      // 酒坛诗社
      let params = { ...this.curPoes }
      const { code, data } = await userApi.windPoetry(params)
      if (code === 200) {
        let { array, totalPageNo } = data
        this.poetTotalPage = totalPageNo
        let poeArr = array.map(v => {
          let { content, createdAt } = v
          let date = new Date(createdAt)
          let yy = date.getFullYear()
          let mm = date.getMonth() + 1
          let dd = date.getDate()
          let yymm = yy + '/' + mm
          return { content, yymm, dd }
        })
        this.poetrys.push(...poeArr)
        this.artLoad = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.mine {
  padding-bottom: 50px;

  header {
    width: 100%;
    background: -webkit-linear-gradient(-45deg, #4FEDEF, #00A1F0);
    background: -o-linear-gradient(-45deg, #4FEDEF, #00A1F0);
    background: -moz-linear-gradient(-45deg, #4FEDEF, #00A1F0);
    background: linear-gradient(-45deg, #4FEDEF, #00A1F0);

    .hd-head {
      padding: 0 20px;
      height: 40px;
      .flex_between;

      .hd_l {
        width: 30px;
        height: 30px;
        background-image: url('~/assets/img/Icons/ic_menu_w_30x30@2x.png');
        .bg_cover;
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
        background-image: url('~/assets/img/Icons/ic_search_w_30x30@2x.png');
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
      .flex_allCenter;
      .hd_world {
        padding-left: 60px;
        padding-right: 2px;
        font-size: 21px;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
      .icons {
        width: 22px;
        height: 22px;
        margin-left: 7px;
        .bg_cover;
      }
      .ic_level {
        background-image: url('~/assets/img/Icons/ic_membership_level2_22x22@1.png');
      }
      .ic_cms {
        background-image: url('~/assets/img/Icons/ic_cms_cs_22x22@2x.png');
      }
    }

    .hd-sign {
      padding: 20px 20px 50px;
      p {
        font-size:12px;
        font-family:PingFang-SC-Medium;
        color:rgba(255,255,255,1);
        line-height:20px;
        text-align: center;
        .u-ellipsis;
      }
    }
  }

  .main {
    margin-top: -20px;
    background: #fff;
    border-radius: 15px;

    &-top {
      .info {
        padding: 10px 0 20px;
        border-bottom: 1PX solid @cor_border;
        .flex_around;

        &-item {
          &>p {
            font-size: 13px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            margin: 10px 0;
            text-align: center;

            &>span {
              font-size: 19px;
              font-family: DINPro-BlackCondensed;
              font-weight: normal;
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
            background-image: url('~/assets/img/detail/ic_gouwuche_40x40@2x.png');
          }
        }

        .ic_wdgz {
          &:before {
            background-image: url('~/assets/img/detail/ic_dingdan_40x40@2x.png');
          }
        }

        .ic_wdhd {
          &:before {
            background-image: url('~/assets/img/detail/ic_huodong_40x40@2x.png');
          }
        }

        .ic_wdsc {
          &:before {
            background-image: url('~/assets/img/detail/ic_shoucang_40x40@2x.png');
          }
        }
      }
    }

    &-bottom {
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
        padding: 30px 20px 10px;
      }
    }
  }
  .vanpopup {
    width: 250px;
    height: 100vh;
  }
}
</style>