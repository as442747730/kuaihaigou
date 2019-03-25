<template>
  <div class="selection">
    <com-head titleConfig='甄选文章'></com-head>
    <div class="newhots">
      <div class="newhot" :class="{active: sortedNum === '1'}" @click="sortedBy(1)">
        <p class="newp">最新</p>
      </div>
      <div class="newhot" :class="{active: sortedNum === '2'}" @click="sortedBy(2)">
        <p>最热</p>
      </div>
    </div>
    <section class="section" ref="scrollElem">
      <div class="list" ref="scrollChild" v-if="pickList.length > 0">
        <div class="picklist" v-for="(item, index) in pickList" :key="index" @click="detFn(item)">
          <div class="infos" v-if="item.goodsMinimalResp">
            <div class="infos-l" v-lazy:background-image="item.goodsMinimalResp.cover"></div>
            <div class="infos-r">
              <div class="head">{{item.goodsMinimalResp.goodsName}}</div>
              <p class="tags">
                <span class="tagsub" v-for="(tags, tagIndex) in item.goodsMinimalResp.tagList" :key="tagIndex">{{tags}}</span>
              </p>
              <div class="lables">
                <span class="label ic_year">{{item.goodsMinimalResp.year}}</span>
                <span class="label ic_address" v-if="item.goodsMinimalResp.area">{{item.goodsMinimalResp.country}} / {{item.goodsMinimalResp.area}}</span>
                <span class="label ic_address" v-else>{{item.goodsMinimalResp.country}}</span>
                <span class="label ic_variety">{{item.goodsMinimalResp.variety}}</span>
              </div>
              <div class="probars">
                <div class="word">复杂：{{item.goodsMinimalResp.complexity}}分</div>
                <div class="probar">
                  <div class="probar_cors" ref="ubars" :data-bar="item.goodsMinimalResp.complexity"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="articles">
            <h3 class="title">{{ item.title }}</h3>
            <p class="content">{{ item.summary }}</p>
          </div>
        </div>
      </div>
      <div class="load-more" v-if="hasScroll">{{moreData ? loadTxt : '已无更多资讯'}}</div>
      <null-data v-if="pickList.length === 0"></null-data>
    </section>
  </div>
</template>
<script>
import { selectApi } from '~/api/selection'
import tools from '~/utils/tools'
import nullData from '~/components/nullData'
import comHead from '~/components/com-head'

export default {
  head () {
    return {
      title: '甄选文章',
      meta: [
        { hid: 'title', name: 'title', content: '甄选文章' }
      ]
    }
  },
  components: {
    nullData,
    comHead
  },
  async asyncData (req) {
    let { sortedBy } = req.query
    const params = {
      page: 1,
      count: 5,
      sortedBy: sortedBy
    }
    const selectFn = selectApi.serverPagelist(params, req)
    const { code: selectCode, data: selectData } = await selectFn
    if (selectCode === 200) {
      const { array, page, totalPageNo } = selectData
      const ismore = page < totalPageNo
      console.log(array)
      return {
        curPage: page,
        totalPage: totalPageNo,
        transmit: params,
        moreData: ismore,
        pickList: array,
        sortedNum: sortedBy
      }
    }
  },
  data () {
    return {
      curPage: 1,
      totalPage: 1,
      transmit: {},
      loadOk: true,
      moreData: true, // 有更多数据
      hasScroll: false, // 是否有滚动
      loadTxt: '下拉加载更多',
      pickList: [],
      sortedNum: '1'
    }
  },
  mounted () {
    console.log(this.pickList)
    this.$nextTick(() => {
      let bars = this.$refs.ubars
      if (Array.isArray(bars)) {
        bars.map(v => {
          v.style.width = v.getAttribute('data-bar') + '%'
        })
      }
    })
    let scrollElem = this.$refs.scrollElem
    let scrollChild = this.$refs.scrollChild
    let allH = scrollElem.clientHeight
    let sctop = scrollElem.offsetTop
    scrollElem.addEventListener('scroll', tools.throttel(() => {
      let { height, top } = scrollChild.getBoundingClientRect()
      let _top = Math.abs(top)
      let bottomH = height - (_top + sctop + allH)
      this.hasScroll = true
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
      } else {
        this.curPage = 1
      }
      Object.assign(this.transmit, { page: this.curPage })
      const { code, data } = await selectApi.clientPagelist(this.transmit)
      if (code === 200) {
        const { array, page, totalPageNo } = data
        this.curPage = page
        this.totalPage = totalPageNo
        this.moreData = page < totalPageNo
        if (isMore) {
          this.picklist.push(...array)
        } else {
          this.pickList = array
          console.log('array', array)
        }
      }
    },
    sortedBy (num) {
      // this.sortedNum = num
      // this.transmit = {
      //   page: 1,
      //   count: 5,
      //   sortedBy: num
      // }
      // this.fetchData(false)
      window.location.href = '/selection?sortedBy=' + num
    },
    detFn (item) {
      window.location.href = `/selection/detail/${item.id}`
    }
  }
}
</script>
<style lang="less" scoped>
.selection {
  font-size: 14px;
  height: 100vh;

  .newhots {
    display: flex;
    align-items: center;
    border-bottom: 1PX solid #eaeaea;
    height: 40px;
    box-sizing: border-box;
    .newhot {
      position: relative;
      display: flex;
      align-items: center;
      width: 50%;
      height: 100%;
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      text-align: center;
      color: rgba(102, 102, 102, 1);
      box-sizing: border-box;

      &:after {
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -10px;
        content: '';
        width: 0;
        height: 2PX;
        background: rgba(51, 51, 51, 1);
        border-radius: 1PX;
        transition: .2s;
      }

      &.active {
        color: rgba(51, 51, 51, 1);

        &:after {
          width: 20px;
        }
      }

      &>p {
        width: 100%;
        text-align: center;
      }

      .newp {
        border-right: 1PX solid #eaeaea;
      }
    }
  }

  .section {
    height: calc(100vh - 40px);
    overflow: auto;
    .list {
      padding: 0 20px;
      .picklist {
        margin-top: 20px;
        margin-bottom: 20px;
        border: 1PX solid #eaeaea;
        border-radius: 8px;
        box-sizing: border-box;
        overflow: hidden;

        .infos {
          display: flex;
          padding: 10px 20px;

          &-l {
            width: 80px;
            height: 160px;
            .bg_cover;
          }

          &-r {
            width: calc(100% - 80px);
            flex-grow: 1;
            padding-left: 15px;
            box-sizing: border-box;

            .head {
              font-size: 16px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: rgba(51, 51, 51, 1);
              line-height: 22px;
            }

            .tags {
              font-size: 12px;
              font-family: PingFang-SC-Regular;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              margin-top: 10px;

              .tagsub {
                margin-top: 10px;

                &+.tagsub {
                  margin-left: 5px;
                  padding-left: 5px;
                  position: relative;

                  &:before {}
                }
              }
            }

            .lables {
              padding-top: 5px;
              margin-left: -7px;
              display: flex;
              align-items: center;
              flex-wrap: wrap;

              .label {
                padding-left: 30px;
                padding-right: 6px;
                margin-top: 10px;
                margin-left: 7px;
                line-height: 24px;
                background: rgba(222, 243, 249, 1);
                border-radius: 12px;
                font-size: 12px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(3, 161, 205, 1);
                background-repeat: no-repeat;
                background-position: left center;
                background-size: 24px 24px;

                &:empty {
                  margin: 0;
                  padding: 0;
                }
              }

              .ic_year {
                background-image: url('~/assets/img/Icons/ic_time_24x24.png');
              }

              .ic_address {
                background-image: url('~/assets/img/Icons/ic_position_24x24.png');
              }

              .ic_variety {
                background-image: url('~/assets/img/Icons/ic_grape_24x24.png');
              }
            }

            .probars {
              display: flex;
              margin-top: 20px;

              .word {
                font-size: 12px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                line-height: 12px;
                margin-right: 10px;
              }

              .probar {
                width: 117px;
                flex-grow: 1;
                height: 10px;
                background: rgba(215, 242, 230, 1);
                border-radius: 6px;
                position: relative;

                &_cors {
                  position: absolute;
                  width: 0;
                  height: 10px;
                  background: rgba(0, 230, 127, 1);
                  border-radius: 6px;
                  transition: width .2s;
                }
              }
            }
          }
        }

        .articles {
          background: #FBFBFB;
          border-top: 1PX solid #eaeaea;
          padding: 15px 20px 10px;

          .title {
            font-size: 16px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            padding-bottom: 10px;
          }

          .content {
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