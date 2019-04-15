<template>
  <div class="hotlabel" ref="scrollElem">
    <div class="label-top">
      <span class="label_item">{{labels}}</span>
    </div>
    <div class="label-lists">
      <div class="label-list" v-if="newsList.length !== 0">
        <div class="list" v-for="(item, index) in newsList" :key="index" @click="todetail(item)">
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
              <img class="imgtwo" v-lazy="item.imgPath" />
            </div>
            <div class="article">{{item.summary}}</div>
          </div>
        </div>
      </div>
      <div class="load-more" v-if="hasScroll">{{moreData ? loadTxt : '已无更多热点'}}</div>
      <null-data v-if="newsList.length === 0"></null-data>
    </div>
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
      const labelId = req.params.id
      const params = {
        page: 1,
        count: 5,
        labelId: labelId
      }
      const { code, data } = await newApi.serverTags(params)
      if (code === 200) {
        const { array, page, totalPageNo } = data
        let _label = ''
        if (array.length > 0) {
          const labels = array[0].labels.find(v => v.id === labelId)
          _label = labels.labelName
        }
        let _moredata = page < totalPageNo
        return {
          curPage: page,
          totalPage: totalPageNo,
          transmit: params,
          newsList: array,
          labels: _label,
          moreData: _moredata
        }
      }
    },
    data () {
      return {
        curPage: 1,
        totalPage: 1,
        transmit: {},
        defaultTransmit: {},
        loadOk: true,
        moreData: true,
        hasScroll: false,
        loadTxt: '下拉加载更多',
        circlenavList: ['这些圈子都在看', '行业热点', '培训讲座', '企业招商'],
        newsList: [],
        labels: {}

      }
    },
    mounted () {
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
        const { code, data } = await newApi.clientTags(this.transmit)
        if (code === 200) {
          const { array, page, totalPageNo } = data
          this.curPage = page
          this.moreData = this.curPage < totalPageNo
          if (isMore) {
            this.newsList.push(...array)
          } else {
            this.newsList = array
          }
          this.loadTxt = '下拉加载更多'
        }
        this.loadOk = true
      },
      tolabel (label) {
        window.location.href = `/hotspot/label/${label.id}`
      },
      todetail (item) {
        window.location.href = `/hotspot/detail/${item.id}`
      }
    }
  }
</script>
<style lang="less" scoped>
.hotlabel {
  background: #F5F5F5;
  .label-top {
    padding: 15px 20px;
    background: #fff;
    display: flex;
    align-items: center;

    .label_item {
      display: inline-flex;
      align-items: center;
      padding: 0 10px;
      height: 23px;
      font-size: 12px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(3, 161, 205, 1);
      border: 1PX solid #03A1CD;
      border-radius: 20px;
      box-sizing: border-box;
    }
  }

  .label-lists {
    background: #fff;
    height: calc(100vh - 73px);
    overflow: auto;
    margin-top: 20px;
  }

  .label-list {
    padding: 0 20px;
    .list {
      border-radius: 8px;
      border: 1PX solid #eaeaea;
      box-sizing: border-box;
      margin: 20px 0;
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
            background-image: url('~assets/img/Icons/ic_time_g_14x14@2x.png');
            background-position: left center;
            background-repeat: no-repeat;
            background-size: 14px 14px;
          }
        }
      }

      .content {
        padding: 20px;

        &-head {
          height: 44px;
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
          background-image: url('~assets/img/Icons/ic_time_g_14x14@2x.png');
          background-position: left center;
          background-repeat: no-repeat;
          background-size: 14px 14px;
        }

        &-other {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          &>span {
            display: inline-flex;
            font-size: 12px;
            line-height: 14px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            max-width: 100%;
            box-sizing: border-box;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 20px;
            margin-top: 10px;
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
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 24px;

        }

        .imgs {
          margin-top: 10px;
          width: 100%;
          .imgtwo {
          	display: inline-block;
          	width: 100%;
          	height: auto;
          	border-radius: 10px;
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

      .bottoms {
        padding: 0 20px;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .btns {
          display: flex;
          align-items: center;

          .sub {
            line-height: 18px;
            padding-left: 21px;
            font-size: 12px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            background-position: left center;
            background-repeat: no-repeat;
            background-size: 18px 18px;

            &+.sub {
              margin-left: 25px;
            }

            &.good {
              background-image: url(~assets/img/knowledge/icon-like.png);
            }

            &.msg {
              background-image: url(~assets/img/knowledge/icon-msg.png);
            }

            &.look {
              background-image: url(~assets/img/knowledge/icon-view.png);
            }
          }
        }

        .more {
          width: 30px;
          height: 30px;
          background-image: url('~assets/img/knowledge/icon-more.png');
          .bg_cover;
        }
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
  }
}
</style>