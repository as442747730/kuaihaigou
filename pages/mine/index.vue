<template>
  <div class="mine">
    <header>
      <div class="hd-head">
        <div class="hd_l"></div>
        <div class="hd_c">我的</div>
        <div class="hd_r"></div>
      </div>
      <div class="hd-headimg" @click="toperson">
        <div class="hd_img">
          <img :src="userInfo.userInfo" />
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
            <p><span>{{ userInfo.buyNumber }}</span> 瓶</p>
            <p>已购(酒)</p>
          </div>
          <div class="info-item" @click="tofollow(1)">
            <p><span>200</span></p>
            <p>关注</p>
          </div>
          <div class="info-item" @click="tofollow(2)">
            <p><span>1.2w</span></p>
            <p>粉丝</p>
          </div>
        </div>
        <nav class="navlist">
          <a class="navitem ic_gwc" href="#">购物车</a>
          <a class="navitem ic_wdgz" href="#">我的订单</a>
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
        <section class="bottom-content">
          <component :is="iscomp"></component>
        </section>
      </div>
    </div>
    <left-menu v-if="showmenu"></left-menu>
    <u-footer :postIndex="footIndex"></u-footer>
  </div>
</template>
<script>
import uFooter from '~/components/footer'
import uArticle from '~/components/mine/Article'
import uJarsclb from '~/components/mine/Jarsclub'
import leftMenu from '~/components/Menu'
import { userApi } from '~/api/users'
export default {
  head () {
    return {
      title: '我的购物车',
      meta: [
        { hid: 'title', name: 'title', content: '我的购物车' }
      ]
    }
  },
  components: {
    uFooter,
    uArticle,
    uJarsclb,
    leftMenu
  },
  data () {
    return {
      footIndex: 4,
      iscomp: 'uArticle',
      comps: ['uArticle', 'uJarsclb'],
      headitems: ['我的文章', '酒坛诗社'],
      headactive: 0,
      userInfo: {
        nickname: '',
        buyNumber: 0,
        signature: '',
        headimgurl: ''
      },
      showmenu: false
    }
  },
  // async asyncData (req) {
  //   let detfn = userApi.asyUserDetail(req)
  //   const { detCode, detData } = await detfn
  //   if (detCode === 200) {
  //     let { nickname, buyNumber, signature, headimgurl } = detData
  //     let userInfo = { nickname, buyNumber, signature, headimgurl }
  //     console.log('userInfo', userInfo)
  //     return { userInfo }
  //   }
  // },
  async mounted () {
    let detfn = userApi.asyUserDetail()
    const { code: detCode, data: detData } = await detfn
    console.log(detCode, 'detCode')
    if (detCode === 200) {
      let { nickname, buyNumber, signature, headimgurl } = detData
      let userInfo = { nickname, buyNumber, signature, headimgurl }
      this.userInfo = { ...userInfo }
    }
  },
  methods: {
    headFn (index) {
      this.headactive = index
      this.iscomp = this.comps[index]
    },
    tomyInfo () {
      this.$router.push('/mine/person')
    },
    tofollow (num) {
      let Que = {
        path: '/mine/follow',
        query: { num: num }
      }
      this.$router.push(Que)
    },
    toperson () {
      this.$router.push('/mine/person')
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
}
</style>