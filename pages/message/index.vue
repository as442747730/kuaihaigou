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
    <section class="showcontents">
      <van-swipe-cell :right-width="100" v-for="(msg, index) in msgList" :key="index">
        <van-cell-group>
          <div class="showcontent">
            <div class="vessel">
              <div class="vessel-l">
                <div class="vessel-l_bk" :style="'background: url(' + Imgs + ') no-repeat center/contain'"></div>
              </div>
              <div class="vessel-r">
                <div class="vessel-r_top">
                  {{msg.author}}
                  <time>15:14</time>
                </div>
                <div class="vessel-r_bottom" v-if="msg.author !== '快海购官方小助手' && msg.author !== '北斗星辰'">
                  看了你写的文章，好棒哦！红酒还有这么
                </div>
                <div class="vessel-r_bottom" v-if="msg.author === '快海购官方小助手'">
                  <span class="red_import">[优惠活动]</span>
                  看了你写的文章，好棒哦！红酒还有这么
                </div>
                <div class="vessel-r_bottom" v-if="msg.author === '北斗星辰'">
                  <span class="red_import">[打赏通知]</span>
                  用户
                  <span>开心的铁球</span>
                  打赏了您
                  <span>500HI币。</span>
                </div>
              </div>
            </div>
          </div>
        </van-cell-group>
        <div slot="right" class="del_right" @click="rDelbtn(index)">
          删除
        </div>
      </van-swipe-cell>
    </section>
  </div>
</template>
<script>
import comHead from '~/components/com-head'
import Imgs from '~/assets/img/foot/ic_home_ele@2x.png'
export default {
  data () {
    return {
      Imgs: Imgs,
      msgList: [{author: '小叶麦田'}, {author: '小草清风'}, {author: '北斗星辰'}, {author: '快海购官方小助手'}, {author: '零下十八度'}, {author: '忆苦思甜'}]
    }
  },
  components: {
    comHead
  },
  methods: {
    rDelbtn (index) {
      this.msgList.splice(index, 1)
    }
  }
}
</script>
<style lang="less" scoped>
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

  .showcontents {
    padding-top: 10px;
    background: #F5F5F5;

    .del_right {
      background: #FB6248;
      width: 100px;
      height: 100%;
      line-height: 44px;
      font-size: 17px;
      font-family: PingFangSC-Semibold;
      color: rgba(255, 255, 255, 1);
      .flex_allCenter;
    }

    .showcontent {
      padding-top: 32px;
      padding-bottom: 30px;
      .padlr20;

      .vessel {
        width: 100%;
        .flex_between;

        &-l {
          width: 40px;

          &_bk {
            width: 40px;
            height: 40px;
            border-radius: 20px;
          }
        }

        &-r {
          width: calc(100% - 55px);

          &_top {
            padding-right: 40px;
            font-size: 15px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;

            &>time {
              float: right;
              margin-right: -40px;
              font-size: 11px;
              font-family: PingFangSC-Light;
              font-weight: 300;
              color: @cor_999;
            }
          }
          &_bottom {
            padding-top: 10px;
            font-size:13px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            .u-ellipsis;
            &>span {
              font-size:13px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color: @cor_333;
            }
            .red_import {
              color: #FB6248;
            }
          }
        }
      }
    }
  }
}
</style>