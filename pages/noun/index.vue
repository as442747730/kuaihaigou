<template>
  <div class="noun">
    <com-head titleConfig="名词解释">
      <div class="search"></div>
    </com-head>
    <div class="top">
      <div class="topnav">
        <div
          class="item"
          v-for="(nav, index) in navList"
          :class="{active: navIndex === index}"
          @click="elNavs(index)"
          :key="index">
          <span>{{nav.name}}</span>
          <i class="ic_sj"></i>
        </div>
      </div>
      <div class="topinfo">
        <h2>赤霞珠（Cabernet Sauvignon）</h2>
        <p>作者：快海购运营团队</p>
        <div class="btn">
          <span>名词解释</span>
        </div>
      </div>
    </div>
    <div class="lynav">
      <div class="lynav_item active">品种介绍</div>
      <div class="lynav_item">品种图片（54）</div>
    </div>
    <section class="introduce">
      <div class="introduce-item">
        <span>品种名 :</span>
        <p>
          赤霞珠（Cabernet Sauvignon）
        </p>
      </div>
      <div class="introduce-item">
        <span>中文别名 :</span>
        <p>
          卡本内·苏维翁、解百纳
        </p>
      </div>
      <div class="introduce-item">
        <span>原产地:</span>
        <p>
          法国
        </p>
      </div>
      <div class="introduce-item">
        <span>种植区域 :</span>
        <p>
          法国、美国、意大利、西班牙、澳大利亚、智利、南非、新西兰、东欧、俄罗斯、中国
        </p>
      </div>
      <div class="introduce-item">
        <span>典型香气:</span>
        <p>
          黑加仑、黑醋栗、黑樱桃、青椒、薄荷；烟熏、香草、咖啡、雪松等橡木带来的风味；陈年树叶、动物皮毛和矿物的香气
        </p>
      </div>
    </section>
    <div class="foot">
      <span class="tipword">名词简介</span>
      <p>
        <span> 查看更多 ></span>
      </p>
    </div>
  </div>
</template>
<script>
import comHead from '~/components/com-head'
export default {
  components: {
    comHead
  },
  data () {
    return {
      navList: [{name: '葡萄品种'}, {name: '产区'}, {name: '酒庄'}],
      navIndex: null
    }
  },
  methods: {
    elNavs (index) {
      if (this.navIndex === index) {
        this.navIndex = null
      } else {
        this.navIndex = index
      }
    }
  }
}
</script>
</script>
<style lang="less" scoped>
.noun {

  // 搜索按钮
  .search {
    position: absolute;
    top: 0;
    right: 20px;
    width: 30px;
    height: 100%;

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -15px;
      width: 30px;
      height: 30px;
      background-image: url('~/assets/img/Icons/ic_search_b_30x30@2x.png');
      .bg_cover;
    }
  }

  // 上部
  .top {
    .topnav {
      height: 40px;
      border-bottom: 1PX solid #F5F5F5;
      .flex_around;

      .item {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        height: 13px;
        .flex_between;

        .ic_sj {
          margin-left: 5px;
          width: 8px;
          height: 5px;
          opacity: .5;
          transform: rotate(0);
          transition: .2s;
          background-image: url('~/assets/img/Icons/ic_triangle_bt_12x12@2x.png');
          .bg_cover;
        }
      }

      .item.active {
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);

        .ic_sj {
          opacity: 1;
          transform: rotate(180deg);
          background-image: url('~/assets/img/Icons/ic_triangle_bt_12x12@2x.png');
        }
      }
    }

    .topinfo {
      .padlr20;
      padding-top: 20px;
      padding-bottom: 15px;

      &>h2 {
        font-size: 19px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 19px;

      }

      &>p {
        padding: 10px 0;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 12px;
      }

      .btn {
        &>span {
          padding: 4px 4px 4px 6px;
          background: rgba(89, 195, 225, 1);
          border-radius: 2px;
          color: #fff;
          font-size: 12px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
        }
      }
    }
  }

  // 左右两栏切换
  .lynav {
    height: 40px;
    background: #F5F5F5;
    .flex_between;

    &_item {
      width: 50%;
      font-size: 14px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 14px;
      text-align: center;
    }

    &_item:first-child {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -7px;
        width: 1PX;
        height: 14px;
        background: #CCCCCC;
      }
    }

    &_item.active {
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
  }

  // 介绍
  .introduce {
    padding-top: 15px;
    .padlr20;

    &-item {
      margin: 10px 0;
      padding-left: 75px;
      font-size: 14px;

      &>span {
        float: left;
        margin-left: -75px;
        font-family: PingFang-SC-Regular;
        color: rgba(153, 153, 153, 1);
        font-weight: 400;
        display: inline-block;
        width: 70px;
        line-height: 24px;
        .u-ellipsis;
      }

      &>p {
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;

      }
    }
  }

  // 查看更多
  .foot {
    padding-top: 10px;
    background: #F5F5F5;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 44px;

    .tipword {
      position: absolute;
      left: 20px;
      bottom: 3px;
      font-size: 16px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 16px;
      height: 16px;
      // background: linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
      background-image: -webkit-linear-gradient(bottom, #c2c0c3, #e6e6e8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
    }

    &>p {
      background: #fff;
      height: 44px;
      font-size: 13px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(3, 161, 205, 1);
      .flex_allCenter;
    }
  }
}
</style>