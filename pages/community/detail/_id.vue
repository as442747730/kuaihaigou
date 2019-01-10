<template>
  <div class="comDetail">
    <div class="specific">
      <div class="specific-bk" v-lazy:background-image="require('~/assets/img/img_shequhuodong_335x180@2x.png')"></div>
      <div class="specific-head">
       <!--  <span class="head">第38期 | 红酒之夜</span>
        <span class="subhead">吉佳乐世家酒庄——拉菲的品质，平民的价格。帕克满分酒次数远高于世界顶级酒庄吉吉</span> -->
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.comDetail {
  font-size: 14px;

  .specific {
  	padding: 20px 20px 30px;
  	background: #fff;
    &-bk {
      height: 180px;
      border-radius: 10px;
      .bg_cover;
    }

    &-head {
      margin-top: 13px;
      margin-bottom: 10px;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
      font-family: PingFangSC-Semibold;

      .head {
        margin-right: 5px;
        font-weight: 600;
      }
    }
  }

}
</style>