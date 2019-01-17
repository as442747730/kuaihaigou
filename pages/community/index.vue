<template>
  <div class="comindex">
    <div class="navbox">
      <div class="navitem" :class="{active: index === navIndex}" v-for="(item, index) in navList" :key="index">{{item.status}}</div>
    </div>
    <div class="thembox">
      <div :class="['thembox-item', {active: exptheme}]" @click="themFn">全部主题</div>
      <div :class="['thembox-item', {active: expstatus}]" @click="statusFn">不限状态</div>
    </div>
    
    <transition name="slide-bottom">
      <div class="drop-wrapper-option" v-if="exptheme">
        <div class="drop-wrapper-body">
          <div :class="['option-item']" v-for="(n, index) in 5" :key="index">活动主题A</div>
        </div>
      </div>
    </transition>

     <transition name="slide-bottom">
      <div class="drop-wrapper-option" v-if="expstatus">
        <div class="drop-wrapper-body">
          <div :class="['option-item']" v-for="(item, index) in stateArr" :key="index">{{item.status}}</div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="modal" v-show="exptheme || expstatus"></div>
    </transition>

    <section class="secbox">
      <div class="seclist">
        <div class="actlist" v-for="(item, index) in 5" :key="index" @click="toDetail">
          <div class="actlist-bk">
            <span class="theme">官方<br>活动</span>
            <span class="status sign">报名中</span>
            <!-- <span class="status carry">进行中</span> -->
          </div>
          <div class="actlist-head">
            <span class="head">第38期 | 红酒之夜</span>
            <span class="subhead">2018快海购红酒沙龙2018快海购红酒沙龙2018快海购红酒沙龙2018快海购红酒沙龙</span>
          </div>
          <div class="actlist-same">活动时间：2018年7月8日-2018年7月9日</div>
          <div class="actlist-same">活动地点：广州市天河区珠江新城四季酒店68层2号展厅</div>
        </div>
      </div>
      <null-data v-if="comList.length > 0"></null-data>
    </section>
  </div>
</template>
<script>
import nullData from '~/components/nullData'
import { munityApi } from '~/api/community'
export default {
  components: {
    nullData
  },
  async asyncData (req) {
    let params = {
      page: 1,
      count: 5
    }
    const { code, data } = await munityApi.serverActiveList(params, req)
    if (code === 200) {
      console.log(data)
    }
  },
  data () {
    return {
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
      navIndex: 0,
      tranmit: {},
      comList: [],
      // drop option
      exptheme: false,
      expstatus: false

    }
  },
  methods: {
    themFn () {
      this.exptheme = !this.exptheme
      this.expstatus = false
    },
    statusFn () {
      this.expstatus = !this.expstatus
      this.exptheme = false
    },
    toDetail () {
      window.location.href = './community/detail/123'
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
        background-image: url('~/assets/img/Icons/ic_xiala_g_line_12x12.png');
      }
      &.active {
        color: #333333;
      }

    }
  }

  .secbox {
    padding: 0 20px;
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
    background: #fff;
    .actlist {
      margin-top: 20px;
      margin-bottom: 20px;

      &-bk {
        height: 180px;
        border-radius: 10px;
        background-image: url('~/assets/img/img_shequhuodong_335x180@2x.png');
        .bg_cover;

        .theme {
          float: left;
          margin-left: 10px;
          font-size: 13px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 16px;
          padding: 3px 5px;
          background: rgba(0, 0, 0, .4);
          position: relative;

          &:before {
            position: absolute;
            left: 0;
            bottom: -6px;
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 6px 20px;
            border-color: transparent transparent transparent rgba(0, 0, 0, .4);
          }

          &:after {
            position: absolute;
            right: 0;
            bottom: -6px;
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 20px 6px 0;
            border-color: transparent rgba(0, 0, 0, .4) transparent transparent;
          }
        }

        .status {
          float: right;
          margin-top: 10px;
          margin-right: 10px;
          font-size: 14px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 14px;
          padding: 7px 10px;
          border-radius: 4px;
        }

        .sign {
          background: #FF3333;
        }

        .carry {
          background: #F99C00;
        }
      }

      &-head {
        margin-top: 13px;
        margin-bottom: 10px;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        font-family: PingFangSC-Semibold;

        .head {
          margin-right: 5px;
          font-weight: 600;
        }

        .subhead {
          font-size: 14px;
        }
      }

      &-same {
        margin-top: 5px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>