<template>
	<div>
	  <article v-for="(x,index) in 4" :key="index">
	    <h1>2017雄狮，Decanter 97分好评，帕克眼中实力一级庄</h1>
	    <div class="time">2018-08-23 14:24:87</div>
	    <div class="tips">
	      <span>频道：经验 | 心得 | 美食</span>
	      <span>话题：红酒</span>
	    </div>
	    <p class="artcon">
	      红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。红酒世界会员商城第一时间上…
	    </p>
	    <div class="imglist">
	      <div class="imgitem" v-for="(n, index) in 3" :key="index"></div>
	    </div>
	    <div class="ctrls">
	      <div class="ctrl">
	        <img src="~/assets/img/Icons/ic_dianzan_g_18x18@2x.png" />
	        <span>100</span>
	      </div>
	      <div class="ctrl">
	        <img src="~/assets/img/Icons/ic_pinglun_g_18x18@2x.png" />
					<span>98</span>
	      </div>
	      <div class="ctrl">
	        <img src="~/assets/img/Icons/ic_liulang_g_18x18@2x.png" />
	      	<span>20389</span>
	      </div>
	    </div>
	  </article>
	</div>
</template>
<style lang="less" scoped>
article {
  background: #FBFBFB;
  border-radius: 8px;
  min-height: 50px;
  border: 1PX solid #EAEAEA;
  padding: 15px 20px 20px;
  overflow: hidden;
  margin-bottom: 30px;

  &>h1 {
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }

  .time {
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 12px;
    margin: 10px 0;
    position: relative;
    padding-left: 20px;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 14px;
      height: 14px;
      margin-top: -7px;
      background-image: url('~/assets/img/Icons/ic_time_g_14x14@2x.png');
      .bg_cover;
    }
  }

  .tips {
    font-size: 12px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 12px;
    margin: 10px 0;
  }

  .artcon {
    margin: 10px 0;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
  }

  .imglist {
    margin: 10px 0;
    .flex_between;

    .imgitem {
      width: 88px;
      height: 88px;
      border-radius: 8px;
      background: #60aff5;
    }
  }

  .ctrls {
    display: flex;
    margin-left: -25px;

    .ctrl {
      margin-left: 25px;

      &>img {
      	display: inline-flex;
        width: 18px;
        height: 18px;
      }

      &>span {
      	padding-left: 3px;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>