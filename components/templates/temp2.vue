<template>
  <!-- 甄选 -->
  <div class="picklist">
    <div class="infos">
      <div class="infos-l" v-lazy:background-image="require('~/assets/img/img2.png')"></div>
      <div class="infos-r">
        <div class="head">拉菲珍宝红葡萄酒</div>
        <p class="tags">
          <span class="tagsub">750ml</span>
          <span class="tagsub">日常餐酒</span>
          <span class="tagsub">紧致单宁</span>
        </p>
        <div class="lables">
          <span class="label ic_year">2016年</span>
          <span class="label ic_address">法国／波尔多</span>
          <span class="label ic_variety">黑皮诺1</span>
          <span class="label ic_variety"></span>
          <span class="label ic_variety">黑皮诺3</span>
        </div>
        <div class="probars">
          <div class="word">复杂：30分</div>
          <div class="probar">
            <div class="probar_cors"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="articles">
      <h3 class="title">2017小拉菲，尝得到的一级庄韵味</h3>
      <p class="content">红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.picklist {
  // padding: 10px 20px;
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
            width: 30%;
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
    background: #EAEAEA;
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
</style>