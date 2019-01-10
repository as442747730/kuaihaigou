<template>
  <div class="comindex">
    <div class="navbox">
      <div class="navitem" :class="{active: index === navIndex}" v-for="(item, index) in navList" :key="index">{{item.status}}</div>
    </div>
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
        {status: '未开始', id: '1'},
        {status: '进行中', id: '2'},
        {status: '已结束', id: '3'}
      ],
      navIndex: 0,
      tranmit: {},
      comList: []
    }
  },
  methods: {
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
  background: #F0F2F5;

  .navbox {
    display: flex;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    background: #fff;

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

  .secbox {
    padding: 0 20px;
    height: calc(100vh - 50px);
    overflow: auto;

  }

  .seclist {
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