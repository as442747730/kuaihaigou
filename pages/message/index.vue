<template>
  <div class="message">
    <com-head titleConfig="消息中心"></com-head>
    <div class="topmdls">
      <div class="topmdl">
        <div class="topmdl-top top_bk1"></div>
        <div class="topmdl-bottom">系统消息</div>
      </div>
      <div class="topmdl">
        <div class="topmdl-top top_bk2"></div>
        <div class="topmdl-bottom">打赏通知</div>
      </div>
      <div class="topmdl">
        <div class="topmdl-top top_bk3"></div>
        <div class="topmdl-bottom">我的券</div>
      </div>
    </div>
    <section class="showcontent">
      <van-swipe-cell :right-width="100">
        <van-cell-group>
          <div class="mycontnet"></div>
        </van-cell-group>
        <div slot="right" class="myspan_right">
        	删除
        </div>
      </van-swipe-cell>
    </section>
  </div>
</template>
<script>
import comHead from '~/components/com-head'
export default {
  data () {
    return {}
  },
  components: {
    comHead
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/var.less';

.message {
  line-height: 1;
  font-size: 12px;

  .topmdls {
    padding-left: 40px;
    padding-right: 40px;
    padding: 20px 40px 30px;
    .flex_between;

    .topmdl {
      &-top {
        width: 40px;
        height: 40px;
        .bg_cover;
        margin: 0 auto;
      }

      &-bottom {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        padding-top: 14px;
      }

      .top_bk1 {
        background-image: url('~/assets/img/Icons/ic_xitongxiaoxi_40x40@2x.png');
      }

      .top_bk2 {
        background-image: url('~/assets/img/Icons/ic_dashangtongzhi_40x40@2x.png');
      }

      .top_bk3 {
        background-image: url('~/assets/img/Icons/ic_wodequan_40x40@2x.png');
      }
    }
  }

  .showcontent {
    padding-top: 10px;
    background: #F5F5F5;
    .myspan_right {
      background: #FB6248;
      width: 100px;
      height: 100%;
      line-height: 44px;
      font-size: 17px;
      font-family: PingFangSC-Semibold;
      color: rgba(255, 255, 255, 1);
      .flex_allCenter;
    }
    .mycontnet {
    	height: 100px;
    }
  }
}
</style>