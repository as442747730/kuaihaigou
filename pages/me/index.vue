<template>
  <div class="m-page-me">

    <div class="bar">
      <!-- <van-icon name="close" @click="menuShow = true" /> -->
    </div>

    <div class="part-top">
      <div class="part-top-item">
        <p class="count">1000<span>瓶</span></p>
        <span class="label">已购(酒)</span>
      </div>
      <div class="part-top-item">
        <p class="count">200</p>
        <span class="label">关注</span>
      </div>
      <div class="part-top-item">
        <p class="count">1.2w</p>
        <span class="label">粉丝</span>
      </div>
    </div>

    <div class="part-center">
      <div class="part-center-item" v-for="item in entrances" :key="item.key">
        <i :class="['item-icon', item.key]"></i>
        <span class="item-label">{{ item.name }}</span>
      </div>
    </div>

    <div class="tab-wrapper">
      <div :class="['tab-item', articleType === 'article' ? 'active' : '']">我的文章</div>
      <div :class="['tab-item', articleType === 'signin' ? 'active' : '']">酒坛诗社</div>
    </div>

    <transition name="fade">
      <div class="article-wrapper" v-show="articleType === 'article'">
        <van-pull-refresh v-model="loading" @refresh="refreshArtilce">
          <div class="article-item" v-for="item in articleList" :key="item.id">
            <p class="title">{{ item.title }}</p>
            <p class="date">{{ item.createdAt }}</p>
            <div class="desc">
              <p>频道：经验 | 心得 | 美食</p>
              <p>话题：红酒</p>
            </div>
            <p class="content">红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。红酒世界会员商城第一时间上…</p>
            <div class="img-wrapper">
              <div class="img-item" v-for="(item, index) in item.imgList" :key="index" :style="`background-image: url(${item})`"></div>
            </div>
            <div class="view-wrapper">
              <div class="view-item">
                <i class="view-icon like"></i><span class="view-num">{{ item.like }}</span>
              </div>
              <div class="view-item">
                <i class="view-icon msg"></i><span class="view-num">{{ item.comments }}</span>
              </div>
              <div class="view-item">
                <i class="view-icon view"></i><span class="view-num">{{ item.views }}</span>
              </div>
            </div>
          </div>
        </van-pull-refresh>

      </div>
    </transition>

    <transition name="fade">
      <div class="signin-wrapper" v-show="articleType === 'signin'">
        <div class="signin-item" v-for="item in signinList">
          <div class="date"></div>
          <div></div>
        </div>
      </div>
    </transition>

    <transition name="slide-left">
      <Menu v-show="menuShow"></Menu>
    </transition>
    <transition name="fade">
      <div v-show="menuShow" class="modal" @click="menuShow = false" ></div>
    </transition>

  </div>
</template>

<script>
import api from '~/utils/request'
import Menu from '@/components/Menu.vue'

export default {
  name: '',

  layout: 'default',

  head () {
    return {
      title: '我的',
      meta: [
        { hid: 'title', name: 'title', content: '我的' }
      ]
    }
  },

  components: { Menu },

  data () {
    return {
      menuShow: false,
      articleType: 'article',

      loading: false,

      entrances: [{ name: '购物车', key: 'cart' }, { name: '我的订单', key: 'order' }, { name: '我的活动', key: 'activity' }, { name: '我的收藏', key: 'collection' }],

      articleList: [{ id: 1, title: '2017雄狮，Decanter 97分好评，帕克眼中实力一级庄', createdAt: '2018-08-23 14:24:87', imgList: [require('@/assets/img/green_wine.jpg'), require('@/assets/img/green_wine.jpg'), require('@/assets/img/green_wine.jpg')], like: 100, comments: 29, views: 2743694 }],
      signinList: [{}, {}, {}]
    }
  },

  methods: {
    async refreshArtilce () {
      this.loading = true
      const { code, data } = api.clientGet('', {})
      if (code === 200) {
        this.articleList = data.array
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.m-page-me {
  .bar {
    height: 250px;
    background-image: linear-gradient(to bottom right, #09A0ED, #39D9EE);
    .title {
      font-size: 16px;
      color: white;
    }
  }
  .part-top {
    height: 90px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background: white;
    position: relative;
    top: -37px;
    border-bottom: 1PX solid @cor_border;
    display: flex;
    padding: 0 45px;
    justify-content: space-between;
    align-items: center;
    &-item {
      text-align: center;
      font-size: 0;
      .count {
        color: @cor_333;
        font-size: 19px;
        font-family: DINPro;
        padding-bottom: 10px;
        span {
          font-size: 10px;
          color: @cor_999;
        }
      }
      .label {
        color: @cor_999;
        font-size: 13px;
      }
    }
  }
  .part-center {
    margin-top: -37px;
    display: flex;
    padding-top: 22px;
    padding-bottom: 26px;
    &-item {
      width: 25%;
      text-align: center;
      font-size: 0;
      .item-icon {
        display: block;
        width: 40px;
        height: 40px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin: 0 auto;
        margin-bottom: 4px;
        &.cart {
          background-image: url('~@/assets/img/me/icon-cart.png');
        }
        &.order {
          background-image: url('~@/assets/img/me/icon-order.png');
        }
        &.activity {
          background-image: url('~@/assets/img/me/icon-activity.png');
        }
        &.collection {
          background-image: url('~@/assets/img/me/icon-collection.png');
        }
      }
      .item-label {
        font-size: 11px;
        color: @cor_666;
      }
    }
  }
  .tab-wrapper {
    height: 40px;
    background: @cor_border;
    display: flex;
    align-items: center;
    .tab-item {
      font-size: 14px;
      color: @cor_666;
      flex: 1;
      text-align: center;
      &.active {
        font-weight: bold;
        color: @cor_333;
      }
      &:first-child {
        border-right: 1PX solid @cor_666;
      }
    }
  }
  .article-wrapper {
    padding: 30px 20px;
    .article-item {
      border: 1PX solid #EAEAEA;
      border-radius: 10px;
      padding: 15px 20px 20px 20px;
      &:not(:last-child) {
        margin-bottom: 30px;
      }
      .title {
        font-size: 16px;
        color: @cor_333;
        font-weight: bold;
        line-height: 22px;
      }
      .date {
        margin-top: 9px;
        font-size: 12px;
        line-height: 14px;
        padding-left: 18px;
        color: @cor_999;
        background-image: url('~@/assets/img/me/icon-clock.png');
        background-repeat: no-repeat;
        background-position: left center;
        background-size: 14px 14px;
      }
      .desc {
        margin-top: 10px;
        font-size: 12px;
        color: @cor_999;
        display: flex;
        p:nth-child(2) {
          padding-left: 20px;
        }
      }
      .content {
        margin-top: 15px;
        font-size: 14px;
        color: @cor_999;
        line-height: 24px;
      }
      .img-wrapper {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .img-item {
          width: 88px;
          height: 88px;
          border-radius: 8px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
      .view-wrapper {
        margin-top: 20px;
        display: flex;
        .view-item {
          &:not(:last-child) {
            margin-right: 24px;
          }
          .view-icon {
            display: inline-block;
            width: 18px;
            height: 18px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            vertical-align: middle;
            margin-right: 3px;
            &.like {
              background-image: url('~@/assets/img/me/icon-like.png');
            }
            &.msg {
              background-image: url('~@/assets/img/me/icon-message.png');
            }
            &.view {
              margin-right: 5px;
              background-image: url('~@/assets/img/me/icon-view.png');
            }
          }
          .view-num {
            vertical-align: middle;
            font-size: 12px;
            line-height: 18px;
            color: @cor_999;
          }
        }
      }
    }
  }
  .signin-wrapper {
    .signin-item {
      padding: 25px 20px;
      display: flex;
      &:not(:last-child) {
        border-bottom: 1PX solid @cor_border;
      }
      .date {
        width: 65px;
        height: 73px;
        border-radius: 6px;
        background-image: linear-gradient(to right bottom, #3AEADF, #12AEEE);
      }
    }
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
