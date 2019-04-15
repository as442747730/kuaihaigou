<template>
  <div class="helps">
    <header class="head">
      <div class="head-top">
        <van-icon class="ht-l" name="arrow-left" />
        <div class="ht-c">帮助中心</div>
        <div class="ht-r"></div>
      </div>
      <div class="head-ask">Hi，亲爱的用户</div>
      <div class="head-tips">已为您定制了如下服务</div>
    </header>
    <section class="sec secone">
      <div class="sec-kf">
        <div class="kf-item">
          <div class="kf_icon kf_icon1"></div>
          <p>在线客服</p>
        </div>
        <div class="kf-item">
          <div class="kf_icon kf_icon2"></div>
          <p>电话客服</p>
        </div>
      </div>
      <div class="sec-head">帮助中心</div>
      <div class="sec-item1">
        <p class="item1_title">账户管理</p>
        <i class="ic_arrow"></i>
      </div>
      <div class="sec-item1">
        <p class="item1_title">购物指南</p>
        <i class="ic_arrow"></i>
      </div>
      <div class="sec-item1">
        <p class="item1_title">订单操作</p>
        <i class="ic_arrow"></i>
      </div>
    </section>
    <section class="sec">
      <div class="sec-head">服务支持</div>
      <div class="sec-item1">
        <p class="item1_title">售后政策</p>
        <i class="ic_arrow"></i>
      </div>
      <div class="sec-item1">
        <p class="item1_title">产品溯源</p>
        <i class="ic_arrow"></i>
      </div>
      <div class="sec-item1">
        <p class="item1_title">发票说明</p>
        <i class="ic_arrow"></i>
      </div>
    </section>
    <section class="sec">
      <div class="sec-head">线下门店</div>
      <div class="sec-item1">
        <p class="item1_title">快海购之家</p>
        <i class="ic_arrow"></i>
      </div>
      <div class="sec-item1">
        <p class="item1_title">服务网点</p>
        <i class="ic_arrow"></i>
      </div>
      <div class="sec-item1">
        <p class="item1_title">授权体验店</p>
        <i class="ic_arrow"></i>
      </div>
    </section>
    <section class="sec">
      <div class="sec-head">关于我们</div>
      <div class="sec-item1">
        <p class="item1_title">了解快海购</p>
        <i class="ic_arrow"></i>
      </div>
      <div class="sec-item1">
        <p class="item1_title">账户管理</p>
        <i class="ic_arrow"></i>
      </div>
      <div class="sec-item1">
        <p class="item1_title">购物清单</p>
        <i class="ic_arrow"></i>
      </div>
    </section>
    <section class="sec">
      <div class="sec-head">关注我们</div>
      <div class="sec-item1">
        <p class="item1_title">新浪微博</p>
        <i class="ic_arrow"></i>
      </div>
      <div class="sec-item1">
        <p class="item1_title">官方微信</p>
        <i class="ic_arrow"></i>
      </div>
      <div class="sec-item1">
        <p class="item1_title">天猫京东</p>
        <i class="ic_arrow"></i>
      </div>
    </section>
    <section class="sec seclast">
      <div class="sec-head">特色服务</div>
      <div class="sec-item1">
        <p class="item1_title">轻松赚稿费</p>
        <i class="ic_arrow"></i>
      </div>
      <div class="sec-item1">
        <p class="item1_title">线下活动</p>
        <i class="ic_arrow"></i>
      </div>
      <div class="sec-item1">
        <p class="item1_title">商家认证</p>
        <i class="ic_arrow"></i>
      </div>
    </section>
  </div>
</template>
<style lang="less" scoped>
.helps {
  width: 100vw;
  min-height: 100vh;
  background: #F5F5F5;
  font-size: 14px;

  .head {
    padding: 0 20px 40px;
    background: linear-gradient(137deg, rgba(0, 161, 240, 1) 0%, rgba(79, 237, 239, 1) 100%);
    -webkit-background: linear-gradient(137deg, rgba(0, 161, 240, 1) 0%, rgba(79, 237, 239, 1) 100%);

    &-top {
      width: 100%;
      height: 40px;
      .flex_between;

      .ht-l {
        font-size: 16px;
        font-weight: bold;
        color: #fff;
      }

      .ht-c {
        font-size: 17px;
        font-family: PingFangSC-Medium;
        color: rgba(255, 255, 255, 1);
      }

      .ht-r {
        width: 1px;
        height: 1px;
      }
    }

    &-ask {
      padding: 20px 0 5px;
      font-size: 17px;
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
    }

    &-tips {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
    }
  }

  .sec {
    padding: 0 20px;
    background: #fff;
    margin-top: 20px;


    &-head {
      display: flex;
      align-items: center;
      height: 45px;
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }

    &-item1 {
      height: 45px;
      border-top: 1PX solid @cor_border;
      .flex_between;

      .item1_title {
        font-size: 13px;
        font-family: PingFangSC-Medium;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
      }

      .ic_arrow {
        display: inline-flex;
        width: 7px;
        height: 10px;
        background: url('~assets/img/Icons/ic_more_right_gray_12x12@2x.png');
        .bg_cover;
      }
    }
  }

  .secone {
    margin-top: 0;
    padding-top: 75px;
    position: relative;

    .sec-kf {
      width: calc(100% - 40px);
      height: 90px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06);
      border-radius: 7px;
      position: absolute;
      top: -25px;
      left: 20px;
      .flex_around;

      .kf-item {
        .kf_icon {
          width: 21px;
          height: 21px;
          padding-bottom: 10px;
          margin: 0 auto;
          .bg_cover;
        }
        .kf_icon2 {
          background-image: url('~assets/img/Icons/ic_dianhuakefu_30x30@2x.png')
        }
        .kf_icon1 {
          background-image: url('~assets/img/Icons/ic_zaixiankefu_30x30@2x.png')
        }
        &>p {
          font-size: 12px;
          font-family: PingFangSC-Medium;
          color: rgba(51, 51, 51, 1);
          font-weight: bold;
          line-height: 17px;
        }
      }
    }
  }
  .seclast {
    padding-bottom: 20px;
  }
}
</style>