<style lang="less" scoped>
.follow {
  font-size: 12px;

  &-items {
    padding-left: 20px;

    .follow-item {
      display: flex;
      padding-right: 20px;
      padding: 25px 20px 25px 0;
      justify-content: space-between;
      border-top: 1PX solid @cor_border;

      &:first-child {
        border-top: none;
      }

      .item-l {
        width: 60px;
        height: 60px;
        background: #ccc;
        border-radius: 50%;
      }

      .item-r {
        width: 80px;

        .item-gz {
          width: 80px;
          height: 35px;
          background: #ccc;
          border-radius: 5px;
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          .flex_allCenter;

          .gz_level {
            width: 12px;
            height: 12px;
            margin-right: 4px;
            .bg_cover;
          }

          .wgz_level {
            background-image: url('~/assets/img/Icons/ic_plus_w_12x12@2x.png')
          }

          .ygz_level {
            background-image: url('~/assets/img/Icons/ic_tick_w_12x12@2x.png')
          }
        }
      }

      .item-c {
        width: calc(100% - 140px);
        padding: 0 25px 0 15px;
        box-sizing: border-box;

        &_name {
          display: flex;
          font-size: 15px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 15px;
          align-items: center;
          margin-bottom: 8px;

          .ic-name {
            display: inline-flex;
            width: 21px;
            height: 21px;
            .bg_cover;
          }

          .ic-member {
            margin-left: 8px;
            background-image: url('~/assets/img/Icons/ic_membership_level2_22x22@2x.png');
          }

          .ic-cms {
            margin-left: 6px;
            background-image: url('~/assets/img/Icons/ic_cms_cs_22x22@2x.png');
          }
        }

        &_sign {
          font-size: 12px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(187, 187, 187, 1);
          line-height: 12px;
          margin-bottom: 10px;
          .u-ellipsis;
        }

        &_count {
          font-size: 12px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 12px;

          .mar_l {
            margin-left: 15px;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="follow">
    <com-head :titleConfig="configtitle"></com-head>
    <div class="follow-items">
      <div class="follow-item" v-for="n in 10">
        <div class="item-l"></div>
        <div class="item-c">
          <div class="item-c_name">
            <p>小叶麦田</p>
            <p>
              <i class="ic-name ic-member"></i>
              <i class="ic-name ic-cms"></i>
            </p>
          </div>
          <div class="item-c_sign">
            <p>这不是一个一般的用户签名这不是一个一般的用户签名</p>
          </div>
          <div class="item-c_count">
            <span>创作 243</span>
            <span class="mar_l">粉丝 3438</span>
          </div>
        </div>
        <div class="item-r">
          <div class="item-gz item-wgz" v-if="followStatus === 0">
            <div class="gz_level wgz_level"></div>
            <p>关注</p>
          </div>
          <div class="item-gz item-ygz" v-else-if="followStatus === 1">
            <div class="gz_level ygz_level"></div>
            <p>已关注</p>
          </div>
          <div class="item-gz item-xhgz" v-else>相互关注</div>
        </div>
      </div>
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
      configtitle: '我的关注',
      followStatus: 0
    }
  }
}
</script>