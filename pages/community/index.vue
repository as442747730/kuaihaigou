<template>
  <div class="comindex">
    <van-nav-bar title="我的活动" left-arrow @click-left="historyBack">
    </van-nav-bar>
    <div class="navbox">
      <div class="navitem" :class="{active: item.id === navIndex}" v-for="(item, index) in navList" @click="hrefFn(item)" :key="index">{{item.status}}</div>
    </div>
    <div class="thembox">
      <div :class="['thembox-item', {active: exptheme}]" @click="themFn">全部主题</div>
      <div :class="['thembox-item', {active: expstatus}]" @click="statusFn">不限状态</div>
    </div>
    
    <transition name="slide-bottom">
      <div class="drop-wrapper-option" v-if="exptheme">
        <div class="drop-wrapper-body">
          <div :class="['option-item', {active: item.id === elthemeId}]" v-for="(item, index) in themeArr" :key="index" @click="elTheme(item.id)">{{item.theme}}</div>
        </div>
      </div>
    </transition>

     <transition name="slide-bottom">
      <div class="drop-wrapper-option" v-if="expstatus">
        <div class="drop-wrapper-body">
          <div :class="['option-item', {active: item.id === elstateId}]" v-for="(item, index) in stateArr" :key="index" @click="elActive(item.id)">{{item.status}}</div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="modal" v-show="exptheme || expstatus"></div>
    </transition>

    <section class="secbox" ref="scrollElem">
      <div class="seclist" ref="scrollChild" v-if="activeList.length > 0">
        <div class="actlist" v-for="(item, index) in activeList" :key="index" @click="toDetail(item.id)">
          <div class="actlist-bk" v-lazy:background-image="item.cover">
            <span class="theme" v-if="item.themeType === 1">官方<br>活动</span>
            <span class="theme" v-if="item.themeType === 2">合作<br>活动</span>
            <span class="theme" v-if="item.themeType === 3">酒会<br>酒展</span>

            <span class="status sign" v-if="item.status === 1">报名中</span>
            <span class="status sign" v-if="item.status === 2">报名已结束</span>
            <span class="status carry" v-if="item.status === 3">进行中</span>
            <span class="status ends" v-if="item.status === 4">已结束</span>

            <p class="period">第{{ item.period }}期 | {{ item.theme }}</p>
          </div>
          <div class="actlist-head">
            <p class="subhead">{{item.title}}</p>
          </div>
          <div class="actlist-same">活动时间：{{item._strTime}}</div>
          <div class="actlist-same text-limit">活动地点：{{item._dz}}</div>
        </div>
      </div>
      <div class="load-more" v-if="hasScroll">{{moreData ? loadTxt : '已无更多活动'}}</div>
      <null-data tips="暂无您想要的活动" v-if="activeList.length === 0"></null-data>

      <a class="apply-add" href="/community/apply">
        <div class="apply_icon" ></div>
        <span class="apply_word">申请</span>
      </a>
    </section>
  </div>
</template>
<script>
import nullData from '~/components/nullData'
import tools from '~/utils/tools'
import { munityApi } from '~/api/community'
export default {
  head () {
    return {
      title: '社区活动',
      meta: [
        { hid: 'title', name: 'title', content: '社区活动' }
      ]
    }
  },
  components: {
    nullData
  },
  async asyncData (req) {
    let _themes = null
    const navstatus = req.query.status
    if (navstatus && navstatus !== '0') _themes = navstatus
    const params = {
      page: 1,
      count: 5,
      themeType: _themes
    }
    const defparams = Object.assign({}, params)
    const themeType = navstatus
    const listfn = munityApi.serverActiveList(params, req)
    const themeFn = munityApi.serverTheme(themeType, req)
    // 异步
    const { code: listCode, data: listData } = await listfn
    const { code: themeCode, data: themeData } = await themeFn
    let _thems = []
    let _actList = []
    if (listCode === 200 && themeCode === 200) {
      const { array, page, totalPageNo } = listData
      const ismore = page < totalPageNo
      _actList = array.map(v => {
        // 处理地址
        let { province, city, district, address } = v
        const _province = tools.getStrIndex(province)
        const _city = tools.getStrIndex(city)
        const _district = tools.getStrIndex(district)
        const _dz = _province + _city + _district + address
        let { createdAt, endTime } = v
        // 处理时间
        const _strTime = tools.concatDate(createdAt, endTime)
        v._dz = _dz
        v._strTime = _strTime
        return v
      })
      // 主题
      _thems = themeData
      const nolimt = { theme: '不限主题', id: '404' }
      _thems.unshift(nolimt)
      return {
        curPage: page,
        totalPage: totalPageNo,
        moreData: ismore,
        navIndex: navstatus,
        themeArr: _thems,
        activeList: _actList,
        transmit: params,
        defTransmit: defparams
      }
    }
  },
  data () {
    return {
      configtitle: '社区活动',
      curPage: 1,
      totalPage: 1,
      loadOk: true,
      moreData: true, // 有更多数据
      hasScroll: false, // 是否有滚动
      loadTxt: '下拉加载更多',
      transmit: {},
      defTransmit: {},
      navList: [
        {status: '全部活动', id: '0'},
        {status: '官方活动', id: '1'},
        {status: '合作活动', id: '2'},
        {status: '酒会酒展', id: '3'}
      ],
      stateArr: [
        {status: '不限状态', id: '0'},
        {status: '活动报名中', id: '1'},
        {status: '报名已结束', id: '2'},
        {status: '活动进行中', id: '3'},
        {status: '活动已结束', id: '4'}
      ],
      elstateId: '0',
      themeArr: [],
      elthemeId: '404',
      activeList: [],
      navIndex: '0',
      // drop option
      exptheme: false,
      expstatus: false

    }
  },
  mounted () {
    // 滚动加载
    let scrollElem = this.$refs.scrollElem
    let scrollChild = this.$refs.scrollChild
    let allH = scrollElem.clientHeight
    let sctop = scrollElem.offsetTop
    scrollElem.addEventListener('scroll', tools.throttel(() => {
      let { height, top } = scrollChild.getBoundingClientRect()
      let _top = Math.abs(top)
      let bottomH = height - (_top + sctop + allH)
      // console.log('bottomH', bottomH)
      if (bottomH <= 100 && this.loadOk && this.moreData) {
        this.loadOk = false
        this.fetchData(true)
      }
    }))
  },
  methods: {
    async fetchData (isMore) {
      this.loadTxt = '加载中...'
      if (isMore) {
        this.curPage += 1
        this.hasScroll = true
      } else {
        this.curPage = 1
        this.hasScroll = false
      }
      Object.assign(this.transmit, { page: this.curPage })
      const { code, data } = await munityApi.clientActList(this.transmit)
      if (code === 200) {
        const { array, page, totalPageNo } = data
        this.curPage = page
        this.totalPage = totalPageNo
        this.moreData = page < totalPageNo
        let _actList = array.map(v => {
        // 处理地址
          let { province, city, district, address } = v
          const _province = tools.getStrIndex(province)
          const _city = tools.getStrIndex(city)
          const _district = tools.getStrIndex(district)
          const _dz = _province + _city + _district + address
          let { createdAt, endTime } = v
          // 处理时间
          const _strTime = tools.concatDate(createdAt, endTime)
          v._dz = _dz
          v._strTime = _strTime
          return v
        })
        if (isMore) {
          this.activeList.push(..._actList)
        } else {
          this.activeList = _actList
        }
        this.loadOk = true
      }
    },
    historyBack () {
      window.history.go(-1)
    },
    hrefFn (item) {
      console.log('item', item)
      window.location.href = '/community?status=' + item.id
    },
    themFn () {
      this.exptheme = !this.exptheme
      this.expstatus = false
    },
    elTheme (id) {
      this.exptheme = false
      this.expstatus = false
      this.elthemeId = id
      if (id === '404') id = null
      let themeObj = { themeId: id }
      Object.assign(this.transmit, themeObj)
      this.fetchData(false)
    },
    statusFn () {
      this.expstatus = !this.expstatus
      this.exptheme = false
    },
    elActive (id) {
      this.exptheme = false
      this.expstatus = false
      this.elstateId = id
      let statusObj = { status: id }
      Object.assign(this.transmit, statusObj)
      this.fetchData(false)
    },
    toDetail (id) {
      window.location.href = './community/detail/' + id + '?page=1'
    }
  }
}
</script>
<style lang="less" scoped>
.comindex {
  height: 100vh;
  font-size: 14px;
  background: #fff;

  .navbox {
    display: flex;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    z-index: 40;
    position: relative;

    .navitem {
      padding: 10px 20px;
      position: relative;
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);

      &:after {
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -8px;
        content: "";
        width: 0;
        height: 3PX;
        border-radius: 2PX;
        background: #333333;
        transform: width .2s;
      }

      &.active {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);

        &:after {
          width: 16px;
        }
      }
    }
  }


  .thembox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 32px;
    background: #F5F5F5;
    z-index: 40;
    position: relative;
    &-item {
      font-size:13px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(153,153,153,1);
      padding-right: 16px;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        width: 16px;
        height: 12px;
        transform: translateY(-50%);
        background-size: 12px 12px;
        background-repeat: no-repeat;
        background-position: right center;
        background-image: url('~assets/img/Icons/ic_xiala_g_line_12x12.png');
      }
      &.active {
        color: #333333;
      }

    }
  }

  .secbox {
    height: calc(100vh - 82px);
    overflow: auto;
  }

  .drop-wrapper-option {
    width: 100%;
    position: fixed;
    z-index: 31;
    top: 82px;
    left: 0;
    background: white;
    .drop-wrapper-body {
      padding: 16px 0;
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
  .modal {
    position: fixed;
    top: 82px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    background: rgba(0,0,0,.6);
    width: 100%;
    height: 100vh;
  }

  .seclist {
    padding: 0 20px;
    background: #fff;
    .actlist {
      margin-top: 20px;
      margin-bottom: 20px;
      padding-bottom: 20px;
      box-shadow:0px 2px 14px 0px rgba(231,231,231,1);
      border-radius: 4px;

      &-bk {
        height: 180px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        position: relative;
        overflow: hidden;
        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,.3);
          z-index: 1;
        }
        .bg_cover;
        .theme {
          position: absolute;
          top: 10px;
          left: 15px;
          z-index: 2;
          font-size: 12px;
          font-weight: bold;
          color: rgba(255,255,255,1);
          line-height: 16px;
          padding: 3PX 5PX;
          background: rgba(0,0,0,.5);
          border-radius: 2px;
        }
        .status {
          display: inline-block;
          padding: 0 8px;
          min-width: 50px;
          max-width: 80px;
          height: 20px;
          box-sizing: border-box;
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
          font-size: 12px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
          text-align: center;
          border-radius: 4px;
        }
        .sign {
          background: #FF3333;
        }
        .carry {
          background: #FB6248;
        }
        .ends {
          background: #999999;
        }
        .period {
          font-size: 19px;
          line-height: 1;
          font-weight: bold;
          color: #fff;
          position: absolute;
          bottom: 15px;
          left: 15px;
          z-index: 2;
        }
      }

      &-head {
        padding: 0 15px;
        margin-top: 13px;
        margin-bottom: 10px;
        overflow: hidden;
        .subhead {
          color: #333;
          font-weight: bold;
          font-size: 16px;
          line-height: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      &-same {
        padding: 0 15px;
        margin-top: 9px;
        font-size: 12px;
        line-height: 1;
        color: #999;
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
  .apply-add {
    position: fixed;
    z-index: 3;
    right: 36px;
    bottom: calc(20px + constant(safe-area-inset-bottom));
    bottom: calc(20px + env(safe-area-inset-bottom));
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #03A1CD;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .apply_icon {
      width: 14px;
      height: 14px;
      background-image: url('~assets/img/Icons/ic_plus_w_12x12@2x.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
    .apply_word {
      font-size:12px;
      line-height: 1;
      font-weight:bold;
      padding-top: 5px;
      color: #fff;
    }
  }
}
</style>