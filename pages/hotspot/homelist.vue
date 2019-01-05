<template>
  <div class="homelist">
    <div class="hothead">
      <div class="headitem active">本周最热</div>
      <div class="headitem">本月最热</div>
    </div>
    <div class="hotbox">
      <div class="box-item" v-for="n in 3">
        <div class="box-left"></div>
        <div class="box-right">
          <h3 class="r_head">英国米其林星级名厨国米其林</h3>
          <div class="r_time">2018-08-12</div>
          <p class="r_summary">红酒早前并不都是用玻璃瓶来装的，较早开始都是用橡木桶…</p>
        </div>
      </div>
    </div>
    <div class="hotcircle">
      <div class="navs items">
        <span class="item active">这些圈子都在看</span>
        <span class="item">国内资讯</span>
        <span class="item">国际资讯</span>
        <span class="item">展会信息</span>
      </div>
      <div class="banners">
        <div v-swiper:mySwiper1="bannerSwiper">
          <div class="bannerlist swiper-wrapper">
            <div class="banneritem swiper-slide" v-lazy:background-image="require('~/assets/img/001.jpg')"></div>
            <div class="banneritem swiper-slide" v-lazy:background-image="require('~/assets/img/banner-home@2x.png')"></div>
            <div class="banneritem swiper-slide" v-lazy:background-image="require('~/assets/img/001.jpg')"></div>
            <div class="banneritem swiper-slide" v-lazy:background-image="require('~/assets/img/banner-home@2x.png')"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="list-box">
      <div class="list">
        <div class="content">
          <div class="content-head">
            <p>拉菲传说：拉菲传奇和拉菲珍藏葡萄酒三者之间的区别</p>
          </div>
          <div class="content-time">2018-08-23 14:24:87</div>
          <div class="content-other">
            <span>作者：拉菲尼斯</span>
            <span>来源：红酒网</span>
          </div>
          <div class="imgs">
            <div class="imgone" v-lazy:background-image="require('~/assets/img/001.jpg')"></div>
          </div>
          <div class="article">红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。红酒世界会员商城第一时间上…</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.homelist {
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

      .box-left {
        width: 110px;
        height: 80px;
        border-radius: 6px;
        margin-right: 10px;
        background-image: url('~/assets/img/img_cebian01_110x80@2x.png');
        .bg_cover;
      }

      .box-right {
        .r_head {
          font-size: 14px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 14px;
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
        .bg_cover;

        &+.banneritem {
          margin-left: 10px;
        }
      }
    }

  }
  .list-box {
    padding-left: 20px;
    padding-right: 20px;
    .list {
      border-radius: 8px;
      border: 1PX solid #eaeaea;
      box-sizing: border-box;
      margin: 30px 0;
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
          background-image: url('~/assets/img/Icons/ic_time_g_14x14@2x.png');
          background-position: left center;
          background-repeat: no-repeat;
          background-size: 14px 14px;
        }

        &-other {
          display: flex;
          align-items: center;
          margin-top: 10px;

          &>span {
            font-size: 12px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);

            &+span {
              margin-left: 20px;
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
}
</style>
<script>
import TemList from '~/components/encys/template'
export default {
  data () {
    return {
      bannerSwiper: {
        speed: 800,
        slidesPerView: 'auto'
      }
    }
  },
  components: {
    TemList
  }
}
</script>