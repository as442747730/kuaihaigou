<template>
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
</template>
<style lang="less" scoped>
.list {
  border-radius: 8px;
  border: 1PX solid #eaeaea;
  box-sizing: border-box;
  width: 320px;

  &+.list {
    margin-left: 15px;
  }

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
        width: 280px;
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
          background-image: url(~/assets/img/knowledge/icon-like.png);
        }

        &.msg {
          background-image: url(~/assets/img/knowledge/icon-msg.png);
        }

        &.look {
          background-image: url(~/assets/img/knowledge/icon-view.png);
        }
      }
    }

    .more {
      width: 30px;
      height: 30px;
      background-image: url('~/assets/img/knowledge/icon-more.png');
      .bg_cover;
    }
  }
}
</style>