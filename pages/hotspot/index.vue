<template>
  <div class="homelist" ref="scrollElem">
    <div class="hothead">
      <div class="headitem" :class="{active: hotweek}" @click="myhotFn(0)">本周最热</div>
      <div class="headitem" :class="{active: !hotweek}" @click="myhotFn(1)">本月最热</div>
    </div>
    <div class="hotbox">
      <div class="box-item" v-for="(item, index) in hotList" :key="index">
        <a :href="'/hotspot/detail/' + item.id">
          <div class="box-left" v-lazy:background-image="item.imgPath"></div>
          <div class="box-right">
            <h3 class="r_head">{{item.title}}</h3>
            <div class="r_time">{{item.createdAt}}</div>
            <p class="r_summary">{{item.summary}}</p>
          </div>
        </a>
      </div>
    </div>
    <div class="hotcircle">
      <div class="navs items">
        <span class="item" :class="{active: circleIndex === index}" v-for="(nav, index) in circlenavList" :key="index" @click="circleFn(index)">{{nav}}</span>
      </div>
      <div class="banners">
        <div v-swiper:mySwiper1="bannerSwiper">
          <div class="bannerlist swiper-wrapper">
            <div class="banneritem swiper-slide" v-for="(item, index) in bannerList" :key="index" v-lazy:background-image="item.bannerPath + '?imageView2/2/w/650/h/320'" @click="todetail(item, 0)">
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list-box" v-if="newList.length !== 0">
      <div
        class="list"
        v-for="(item, index) in newList"
        :key="index"
        @click="todetail(item)">
        <div class="content">
          <div class="content-head">
            <p>{{item.title}}</p>
          </div>
          <div class="content-time">{{item.createdAt}}</div>
          <div class="content-other">
            <span>作者：{{item.author || '佚名'}}</span>
            <!-- <span v-if="item.sourceAddress">来源：{{item.sourceAddress}}</span> -->
            <span v-if='item.sourceAddress || item.sourceAuthor'>来源：
              <a v-if='item.sourceAddress && item.sourceAuthor' :href="item.sourceAddress">{{ item.sourceAuthor }}</a>
              <a v-if='item.sourceAddress && !item.sourceAuthor' :href="item.sourceAddress">链接</a>
              <a v-if='!item.sourceAddress && item.sourceAuthor' href="javascript:void(0)">{{ item.sourceAuthor }}</a>
            </span>
            <span v-if="item.classificationId >= 0">分类：{{circlenavList[item.classificationId]}}</span>
          </div>
          <div class="content-labels">
            <span
              class="label"
              v-for="(lab, labIndex) in item.labels"
              @click.stop="tolabel(lab)"
              :key="labIndex">{{lab.labelName}}</span>
          </div>
          <div class="imgs">
            <div class="imgone" v-lazy:background-image="item.imgPath"></div>
          </div>
          <div class="article">{{item.summary}}</div>
        </div>
      </div>
      <div class="load-more" v-if="hasScroll">{{moreData ? loadTxt : '已无更多热点'}}</div>
    </div>
    <null-data v-else></null-data>
  </div>
</template>
<script>
  import { newApi } from '~/api/news'
  import tools from '~/utils/tools'
  import nullData from '~/components/nullData'
  export default {
    head () {
      return {
        title: '行业热点',
        meta: [
          { hid: 'title', name: 'title', content: '行业热点' }
        ]
      }
    },
    components: {
      nullData
    },
    async asyncData (req) {
      const hottest = true
      const classificationId = 0
      const firstpage = 1
      const params = {
        count: 3,
        page: firstpage,
        classificationId: classificationId
      }
      const hotFn = newApi.serverHot(hottest, req)
      const banFn = newApi.serverBanner(classificationId, req)
      const listFn = newApi.serverPage(params, req)
      return Promise.all([hotFn, banFn, listFn]).then(([hotReq, banReq, listReq]) => {
        if (hotReq.code !== 200 || banReq.code !== 200 || listReq.code !== 200) {
          req.redirect('/error')
        } else {
          let { totalPageNo, array } = listReq.data
          const moreData = firstpage < totalPageNo
          return {
            hotList: hotReq.data,
            bannerList: banReq.data,
            newList: array,
            totalPage: totalPageNo,
            curPage: firstpage,
            moreData: moreData,
            circleIndex: classificationId,
            transmit: params
          }
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    data () {
      return {
        hotweek: true,
        hotList: [],
        bannerList: [],
        newList: [],
        circlenavList: ['这些圈子都在看', '行业热点', '培训讲座', '企业招商'],
        circleIndex: 0,
        curPage: 1,
        totalPage: 1,
        transmit: {},
        loadOk: true,
        moreData: true, // 有更多数据
        hasScroll: false, // 是否有滚动
        loadTxt: '下拉加载更多',
        bannerSwiper: {
          speed: 800,
          slidesPerView: 'auto'
        }
      }
    },
    mounted () {
      console.log(this.bannerList)
      // 滚动
      window.addEventListener('scroll', tools.throttel(() => {
        let winH = document.documentElement.clientHeight || document.body.clientHeight
        let elemBound = this.$refs.scrollElem.getBoundingClientRect()
        let _height = elemBound.height
        let _top = Math.abs(elemBound.top)
        let bottomH = _height - (_top + winH)
        if (bottomH <= 100 && this.loadOk && this.moreData) {
          this.loadOk = false
          this.fetchData(true)
        }
      }))
    },
    methods: {
      async fetchData (isMore) {
        // banner newList
        // this.$toast.loading('加载中...')
        this.loadTxt = '加载中'
        if (isMore) {
          this.curPage += 1
          this.hasScroll = true
        } else {
          this.curPage = 1
          this.hasScroll = false
        }
        Object.assign(this.transmit, { page: this.curPage })
        const banFn = newApi.clientBanner(this.circleIndex)
        const listFn = newApi.clientPage(this.transmit)
        Promise.all([banFn, listFn]).then(([banReq, listReq]) => {
          if (banReq.code === 200 && listReq.code === 200) {
            this.bannerList = banReq.data
            let { page, array, totalPageNo } = listReq.data
            this.curPage = page
            this.moreData = this.curPage < totalPageNo
            if (isMore) {
              this.newList.push(...array)
            } else {
              this.newList = array
            }
            this.loadTxt = '下拉加载更多'
          }
          this.loadOk = true
        })
      },
      async hotData () {
        // 最热
        const { code, data } = await newApi.clientHot(this.hotweek)
        if (code === 200) {
          this.hotList = data
        }
      },
      myhotFn (num) {
        if (num === 0) {
          this.hotweek = true
        } else if (num === 1) {
          this.hotweek = false
        }
        this.hotData()
      },
      circleFn (index) {
        this.circleIndex = index
        let objCir = {
          classificationId: this.circleIndex
        }
        Object.assign(this.transmit, objCir)
        this.fetchData()
      },
      tolabel (label) {
        window.location.href = `/hotspot/label/${label.id}`
      },
      todetail (item, type = 1) {
        console.log('item', item)
        let detailId
        if (type === 0) {
          detailId = item.newsId
        } else {
          detailId = item.id
        }
        window.location.href = `/hotspot/detail/${detailId}`
      }
    }
  }
</script>
<style lang="less" scoped>
.homelist {
  overflow: hidden;
  .hothead {
    height: 40px;
    background: #F5F5F5;

    .headitem {
      display: inline-block;
      width: 50%;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);

      &+.headitem {
        position: relative;

        &:before {
          content: '|';
          position: absolute;
          top: 50%;
          left: 0;
          color: #ccc;
          transform: translateY(-50%);
          font-family: PingFangSC-Semibold;
          font-weight: 600;
        }
      }

      &.active {
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
    }
  }

  .hotbox {
    background: #fff;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;

    .box-item {
      margin: 20px 0;
      display: flex;
      justify-content: flex-start;
      a {
        display: flex;
        width: 100%;
      }

      .box-left {
        width: 110px;
        height: 80px;
        min-width: 110px;
        max-width: 110px;
        flex-grow: 0;
        border-radius: 6px;
        margin-right: 10px;
        .bg_cover;
      }

      .box-right {
        flex-grow: 1;
        width: calc(100% - 110px);
        .r_head {
          font-size: 14px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .r_time {
          font-size: 12px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 12px;
          margin-top: 7px;
          margin-bottom: 10px;
        }

        .r_summary {
          font-size: 12px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  .hotcircle {
    padding-left: 20px;

    .items {
      padding-right: 20px;

      .item {
        display: inline-block;
        position: relative;
        padding-top: 16px;
        padding-bottom: 15px;
        font-size: 13px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 13px;

        &+.item {
          margin-left: 25px;
        }

        &:after {
          content: '';
          position: absolute;
          bottom: 8px;
          left: 50%;
          width: 0;
          height: 3px;
          border-radius: 2px;
          background: #333333;
          margin-left: -7px;
          transition: .2;
        }

        &.active {
          &:after {
            width: 14px;
          }
        }
      }
    }

    .banners {
      padding-top: 13px;

      .banneritem {
        width: 325px;
        height: 160px;
        position: relative;
        p {
          text-align: left;
          color: #fff;
          font-size: 14px;
          position: absolute;
          bottom: 0px;
          padding: 0 20px;
          line-height: 22px;
          height: 48px;
          background: rgba(0, 0, 0, .3);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .bg_cover;

        &+.banneritem {
          margin-left: 15px;
        }
        &:last-child {
          margin-right: 30px;
        }
      }
    }

  }
  .list-box {
    .list {
      border-radius: 8px;
      border: 1PX solid #eaeaea;
      margin: 30px 20px;
      box-sizing: border-box;
      .users {
        padding: 0 20px;
        height: 80px;
        display: flex;
        align-items: center;
        border-bottom: 1PX solid @cor_border;

        .avater {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 17px;
          .bg_cover;
        }

        .infos {
          .person {
            display: flex;
            align-items: center;
            height: 30px;

            &>p {
              font-size: 16px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: rgba(51, 51, 51, 1);
            }
          }

          .time {
            font-size: 12px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            height: 14px;
            line-height: 14px;
            padding-left: 18px;
            background-image: url('~/assets/img/Icons/ic_time_g_14x14@2x.png');
            background-position: left center;
            background-repeat: no-repeat;
            background-size: 14px 14px;
          }
        }
      }

      .content {
        padding: 20px 20px 0;

        &-head {
          display: flex;
          align-items: center;

          &>p {
            font-size: 16px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        &-time {
          margin-top: 10px;
          line-height: 14px;
          height: 14px;
          font-size: 12px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          padding-left: 18px;
          background-image: url('~/assets/img/Icons/ic_time_g_14x14@2x.png');
          background-position: left center;
          background-repeat: no-repeat;
          background-size: 14px 14px;
        }

        &-other {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          &>span {
            font-size: 12px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            max-width: 110px;
            box-sizing: border-box;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 20px;
            margin-top: 10px;
            line-height: 14px;
            & + span + span {
              padding-right: 0;
            }
          }
        }

        &-labels {
          display: flex;
          .label {
            font-size:12px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:12px;
            border-radius:20px;
            border:1PX solid rgba(204,204,204,1);
            padding: 5px 10px;
            margin-top: 10px;
            & + .label {
              margin-left: 15px;
            }
          }
        }

        .article {
          margin-top: 15px;
          margin-bottom: 20px;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 24px;

        }

        .imgs {
          margin-top: 10px;
          height: 150px;
          .imgone {
            width: 100%;
            height: 150px;
            border-radius: 5px;
            .bg_cover;
          }
        }

        .video-box {
          position: relative;
          margin-top: 10px;
          margin-bottom: 15px;

          .video-player {
            width: 100%;
            // height: 130px;
            height: auto;
            border-radius: 5px;
          }
        }
      }
      
    }

  }

  .load-more {
    line-height: 50px;
    background: #F5F5F5;
    text-align: center;
    font-size: 12px;
    background: #F5F5F5;
    color: #666;
  }
}
</style>