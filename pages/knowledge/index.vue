<template>
  <div class="m-knowledge">

    <tab-select ref="tabSelect" :topicList="topicLs" :typeList="typeLs" :breedList="varietyLs" :total="total" @getFilterData="getFilterFetch"></tab-select>

    <van-pull-refresh class="van-pull" v-model="refreshing" @refresh="geRefresh" :loading-text="'刷新中'">
      <div class="article-ul">

        <div class="article-item" v-for="item in articleList" :key="item.id">
          <div class="author-info">
            <div class="avatar" :style="'background-image: url(' + (item.userResp.headimgurl ? item.userResp.headimgurl : require('~/assets/img/defaultImg.png')) + ')'"></div>
            <div class="info">
              <div class="nickname">
                <span>{{ item.userResp.nickname }}</span>
                <user-lab :level='String(item.userResp.userGradeNumber)' type='1' :profess='String(item.userResp.category)'></user-lab>
              </div>
              <p class="date">{{ item.userResp.createdAt }}</p>
            </div>
          </div>
          <div class="content" @click="gotodetail(item)">
            <p class="content-title" style="-webkit-box-orient: vertical;">{{ item.title }}</p>
            <p class="content-desc">
              <span>频道：{{ item.channelName }}</span>
              <span>话题：{{ item.topicName }}</span>
            </p>

            <div class="content-box">
              <!-- 文章 -->
              <p v-if="item.articleType === 1" class="content-article" style="-webkit-box-orient: vertical;" v-html="item.summary"></p>
              <div class="imgs" v-if="item.articleType === 1 && item.imgsPaht">
                <div :class="['img', item.imgsPaht.length === 1 ? 'big' : '' , item.imgsPaht.length % 3 === 0 ? 'small' : '', item.imgsPaht.length === 8 ? 'small' : '', (item.imgsPaht.length === 5 && index === 4) ? 'big' : '']" v-lazy:background-image="m" v-for="(m, index) in item.imgsPaht" :key="index"></div>
                <div class="img small" v-if="item.imgsPaht.length === 8"></div>
              </div>
              <!-- 视频 -->
              <div class="video-box" v-if="item.articleType === 2">
                <video class="video-player" controls :src="item.videoPath"></video>
              </div>
            </div>

            <div class="content-bottom">
              <div class="left">
                <span class="sub like">{{ item.likeNumber }}</span>
                <span class="sub msg">{{ item.commentNumber }}</span>
                <span class="sub view">{{ item.readNumber }}</span>
              </div>
              <!-- !!! TODO !!! -->
              <div class="more"></div>
            </div>
          </div>
        </div>

      </div>

      <div class="load-more">{{ hasMore ? loadTxt : '已无更多文章' }}</div>

    </van-pull-refresh>

    <div class="to-top" v-if="showBtn">
      <van-icon name="upgrade" color="#03A00C8" @click="backToTop"></van-icon>
    </div>

  </div>
</template>

<script>
import api from '~/utils/request'
import { knowApi } from '~/api/knowledge'
import TabSelect from '@/components/knowledge/TabSelect.vue'
import userLab from '@/components/Usericon.vue'

export default {
  name: 'knowledge',

  layout: 'page-with-tabbar',

  components: { TabSelect, userLab },

  head () {
    return {
      title: '知识分享',
      meta: [
        { hid: 'title', name: 'title', content: '知识分享' }
      ]
    }
  },

  mounted () {
    this.$refs.tabSelect.setSelect({ channelId: this.channelId, topicId: this.topicId, typeId: this.typeId, varietyId: this.varietyId, order: this.order })

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
        console.log(res4.data.array)
        return {
          channelId: req.query.channelid || null,
          topicId: req.query.topicid || null,
          typeId: req.query.typeid || null,
          varietyId: req.query.varietyid || null,
          order: +req.query.order || 1,
          topicLs: res1.data.map(n => { return { id: n.id, name: n.topicName } }),
          typeLs: res2.data.map(n => { return { id: n.id, name: n.typeName } }),
          varietyLs: res3.data.map(n => { return { id: n.id, name: n.varietyName } }),
          articleList: res4.data.array,
          total: res4.data.total,
          hasMore: res4.data.total > 10
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
      topicId: null,
      typeId: null,
      varietyId: null,
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
      this.currentPage = 1
      this.fetchData(false)
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
      padding: 20px 20px 20px 20px;
      .article-item {
        border-radius: 8px;
        border: 1PX solid #EAEAEA;
        padding: 20px 20px 20px 0;
        .author-info {
          padding-left: 20px;
          padding-bottom: 20px;
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
              background-image: url(~/assets/img/me/icon-clock.png);
              background-position: left center;
              background-size: 14px 14px;
              background-repeat: no-repeat;
            }
          }
        }
        .content {
          padding-top: 20px;
          padding-left: 20px;
          &-title {
            font-size: 16px;
            color: @cor_333;
            font-weight: bold;
            line-height: 22px;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          &-desc {
            margin-top: 10px;
            font-size: 12px;
            color: @cor_999;
            span:first-child {
              margin-right: 20px;
            }
          }
          &-box {
            margin-top: 15px;
          }
          &-article {
            font-size: 14px;
            color: @cor_999;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
          }
          .video-box {
            position: relative;
            .video-player {
              width: 100%;
              height: auto;
              border-radius: 5px;
            }
          }
          .imgs {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .img {
              // 默认140px
              width: 140px;
              height: 140px;
              border-radius: 5px;
              background-position: center;
              background-size: cover;
              background-repeat: no-repeat;
              margin-bottom: 15px;
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
          &-bottom {
            margin-top: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left {
              display: flex;
              align-items: center;
              .sub {
                padding-left: 21px;
                font-size: 12px;
                line-height: 18px;
                color: @cor_999;
                background-position: left center;
                background-repeat: no-repeat;
                background-size: 18px 18px;
                & + .sub {
                  margin-left: 25px;
                }
                &.like {
                  background-image: url(~/assets/img/knowledge/icon-like.png);
                }
                &.msg {
                  background-image: url(~/assets/img/knowledge/icon-msg.png);
                }
                &.view {
                  background-image: url(~/assets/img/knowledge/icon-view.png);
                }
              }
            }
            .more {
              width: 30px;
              height: 30px;
              background-image: url(~/assets/img/knowledge/icon-more.png);
              background-position: center;
              background-size: contain;
              background-repeat: no-repeat;
            }
          }
        }
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
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
  .to-top {
    width: 36px;
    height: 36px;
    box-sizing: border-box;
    background: white;
    border-radius: 100%;
    position: fixed;
    bottom: 80px;
    right: 25px;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.1);
  }
}
</style>
