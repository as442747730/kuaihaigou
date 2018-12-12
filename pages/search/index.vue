<template>
  <div class="search" :class="{stopwineScroll: isRoll}">
    <div class="search-head">
      <div class="inputmdl">
        <div class="inputmdl-in">
          <i class="icon_fdj"></i>
          <i class="icon_close" v-if="keywords"></i>
          <input v-model="keywords" type="text" placeholder="输入商品关键词或用户名" />
        </div>
        <div class="inputmdl-world" @click="toWinecenter">取消</div>
      </div>
      <nav class="navmdl">
        <div class="navmdl-item" :class="{active: navData.elIndex === index}" @click="elNavlist(index)" v-for="(navitem, index) in navData.list" :key="index">{{navitem}}</div>
        <div class="navmdl-logo" :class="{active: ctrlLogo}" ref="navmdlLogo" @click="navLogo"></div>
      </nav>
    </div>
    <pureList ref="refSearch" :postObj="postSearch" postCls="mart86" @shut="closeLogo"></pureList>
    <div class="search-result">
      <!-- 商品 -->
      <section class="goods" v-if="navData.elIndex === 0">
        <div v-if="!keywords">
          <div class="goods-hot">
            <h3 class="hot-tip">热门搜索</h3>
            <ul class="hot-words">
              <li class="hot-words_item" v-for="(v, index) in 10">
                <span :class="[{w1: index === 0}, {w2: index === 1}, {w3: index === 2}]">{{index + 1}}.</span>
                拉菲珍宝红葡萄酒
              </li>
            </ul>
          </div>
          <div class="goods-history">
            <h3 class="history-tip">
              <i class="icon_dustbin"></i>
              历史搜索
            </h3>
            <ul class="history-list">
              <li class="history-list_item">
                干红
                <i class="icon_close"></i>
              </li>
              <li class="history-list_item">
                红葡萄酒
                <i class="icon_close"></i>
              </li>
              <li class="history-list_item">
                干白
                <i class="icon_close"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-details" v-else>
          <div class="list">
            <div class="list-item" v-for="(good, index) in 6" :key="index">
              <div class="item_l">
                <div class="item_l-bk" :style="'background: url(' + bkImg + ') no-repeat center/contain'"></div>
              </div>
              <div class="item_r">
                <h4>法国1982拉菲法国1982拉菲传奇Lafite</h4>
                <p>
                  <span>750ml</span>
                  <span>日常餐酒</span>
                  <span>紧致单宁</span>
                </p>
                <div class="price">¥ 399</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 名词解释 -->
      <section class="definitions" v-if="navData.elIndex === 1">
        <div class="definitions-list">
          <div class="definitions-list_item varity" v-for="(varity, index) in 4" :key="index">
            <h1 class="varity-head">品种：赤霞珠（Cabernet Sauvignon)</h1>
            <div class="varity-bk">
              <div class="varity-bk_in" :style="'background: url(' + bkImg2 + ') no-repeat center/contain'"></div>
            </div>
            <article class="varity-article">红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元…</article>
            <footer class="varity-foot">
              <i class="icon_same ic_good"></i>
              <span class="num_same">100</span>
              <i class="icon_same ic_collect marl"></i>
              <span class="num_same">100</span>
              <i class="icon_same ic_look marl"></i>
              <span class="num_same">100</span>
            </footer>
          </div>
        </div>
      </section>
      <!-- 知识分享 -->
      <section class="lore" v-if="navData.elIndex === 2">
        <div class="lore-items">
          <div class="lore_item" v-for="(item, index) in 5" :key="index">
            <div class="lore_item-top">
              <div class="vessel">
                <div class="vessel-l" :style="'background: url(' + Imgs + ') no-repeat center/contain'"></div>
                <div class="vessel-r">
                  <div class="vessel-r_head">一朵小粒欣</div>
                  <p>
                    <time>2018-08-23 14:24:87</time>
                  </p>
                </div>
              </div>
            </div>
            <div class="lore_item-bottom">
              <h2 class="lore_item_head">2017雄狮，Decanter 97分好评，帕克眼中实力一级庄</h2>
              <div class="lore_item_tips">
                频道：<span>经验</span><span>心得</span><span>美食</span>
                话题：红酒
              </div>
              <div class="lore_item_content">
                <div class="lt" :style="'background: url(' + bkImg2 + ') no-repeat center/cover'"></div>
                <div class="lore_content_js">
                  <p>红酒世界会员商城第一时间上架这款期酒，国内税前价为486元，香港商城价为610红酒世界会员商城第一时间上架这款期酒，国内税前价为486元，香港商城价为610</p>
                </div>
              </div>
              <footer class="varity-foot">
                <i class="icon_same ic_good"></i>
                <span class="num_same">100</span>
                <i class="icon_same ic_collect marl"></i>
                <span class="num_same">100</span>
                <i class="icon_same ic_look marl"></i>
                <span class="num_same">100</span>
                <i class="ic_ddd"></i>
              </footer>
            </div>
          </div>
        </div>
      </section>
      <!-- 新闻资讯 -->
      <section class="news" v-if="navData.elIndex === 3">
        <div class="news-item" v-for="(item, index) in 5" :key="index">
          <div class="news_head">
            <h1>拉菲传说：拉菲传奇和拉菲珍藏葡萄酒三者之间的区别</h1>
            <div class="times">
              <time>2018-08-23 14:24:87</time>
            </div>
            <p>
              <span>国际资讯</span>
              <span>作者：拉菲尼斯</span>
              <span>来源：红酒网</span>
            </p>
          </div>
          <div class="news_main">
            <img :src="bkImg2" />
          </div>
            <article class="news_article">
              红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。红酒世界会员商城第一时间上…
            </article>
          </div>
      </section>
    </div>
  </div>
</template>
<script>
import bkImg from '~/assets/img/green_wine.jpg'
import bkImg2 from '~/assets/img/bk1.png'
import Imgs from '~/assets/img/foot/ic_home_ele@2x.png'
import tools from '~/utils/tools.js'
import pureList from '~/components/cpms/pureList'
export default {
  head () {
    return {
      title: '我的购物车',
      meta: [
        { hid: 'title', name: 'title', content: '我的购物车' }
      ]
    }
  },
  data () {
    return {
      isRoll: false,
      keywords: '',
      bkImg: bkImg,
      bkImg2: bkImg2,
      Imgs: Imgs,
      navData: {
        list: ['商品', '名词解释', '知识分享', '新闻资讯'],
        elIndex: 0
      },
      ctrlLogo: false,
      postSearch: {
        list: ['最新', '最热门', '评论最多', '点赞最多'],
        elIndex: 3
      },
      listSearch: ['最新', '最热门', '评论最多', '点赞最多']
    }
  },
  components: {
    pureList
  },
  methods: {
    toWinecenter () {
      let id = tools.getUrlQues('id')
      console.log('id', id)
      if (id === 'others') {
        window.location.href = '/winecenter/others'
      } else if (id === 'winecenter') {
        window.location.href = '/winecenter'
      }
    },
    elNavlist (index) {
      this.navData.elIndex = index
    },
    navLogo () {
      this.ctrlLogo = !this.ctrlLogo
      this.isRoll = this.ctrlLogo
      let ele = this.$refs.refSearch
      this.isRoll ? ele.addClass() : ele.resetFn()
    },
    closeLogo () {
      this.isRoll = false
      this.ctrlLogo = false
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  .u-restout;

  &-head {
    border: 1PX solid #F5F5F5;
    .padlr20;
    .cpmzIndex;

    .inputmdl {
      height: 48px;
      .flex_allCenter;

      &-in {
        width: 292px;
        height: 28px;
        border-radius: 14px;
        background: rgba(250, 250, 250, 1);
        text-indent: 50px;
        position: relative;
        .flex_tlCenter;

        &>input {
          width: calc(100% - 90px);
          background: rgba(250, 250, 250, 1);
        }

        .icon_fdj {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-left: 22px;
          margin-right: 12px;
          background-image: url('~/assets/img/Icons/ic_search_g_16x16@2x.png');
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
            background-image: url('~/assets/img/Icons/ic_shanchu_g_14x14@2x.png');
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
        background-image: url('~/assets/img/Icons/ic_caidan_g_16x16@2x.png');
        transition: transform .2s;
        .bg_contain;
      }

      .navmdl-logo.active {
        transform: rotate(90deg);
      }
    }
  }

  &-result {
    .padlr20;

    .goods {

      &-hot {
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
            font-size: 16px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: #333333;
            margin: 15px 0;
            padding-left: 20px;
            position: relative;

            &>span {
              position: absolute;
              top: 50%;
              left: -5px;
              font-size: 16px;
              font-family: DINEngschriftStd;
              color: rgba(170, 170, 170, 1);
              transform: translateY(-50%);
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
          }
        }

      }

      &-history {
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
            background-image: url('~/assets/img/Icons/ic_detele_b_16x16@2x.png');
            .bg_contain;
          }
        }

        .history-list {
          flex-wrap: wrap;
          margin-left: -15px;
          display: flex;

          &_item {
            font-size: 15px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
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
              background-image: url('~/assets/img/Icons/ic_off_g_14x14@2x.png');
              .bg_contain;
            }
          }
        }
      }

      .goods-details {
        .list {
          &-item {
            display: flex;
            margin-top: 30px;
            margin-bottom: 30px;

            .item_l {
              width: 120px;
              height: 120px;
              border-radius: 4px;
              border: 1PX solid #eaeaea;

              .flex_allCenter;

              &-bk {
                width: 114px;
                height: 116px;
              }
            }

            .item_r {
              padding-left: 15px;
              .flex_tlMiddle;

              &>h4 {
                font-size: 15px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                line-height: 21px;
              }

              &>p {
                .u-mltip;
              }

              .price {
                font-size: 17px;
                font-family: Impact;
                color: rgba(249, 156, 0, 1);

              }
            }
          }
        }

      }
    }

    .definitions {
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
}

.varity {
  background: #FBFBFB;
  border-radius: 8px;
  border: 1PX solid #EAEAEA;
  .padlr20;

  &-head {
    padding: 15px 0 10px;
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
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
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
    padding: 10px 0;
    border-bottom: 1PX solid #ECECEC;
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
      background-image: url('~/assets/img/Icons/ic_dianzan_g_18x18@2x.png');
    }

    .ic_collect {
      background-image: url('~/assets/img/Icons/ic_pinglun_g_18x18@2x.png');
    }

    .ic_look {
      background-image: url('~/assets/img/Icons/ic_liulang_g_18x18@2x.png');
    }

    .ic_ddd {
      position: absolute;
      top: 50%;
      right: 10px;
      width: 30px;
      height: 30px;
      margin-top: -15px;
      float: right;
      background-image: url('~/assets/img/Icons/头部icon_30x30_ic_more_g_30x30@2x.png');
      .bg_cover;
    }

    .num_same {
      font-size: 12px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }

  }
}
</style>