<template>
  <div class="phone">
    <com-head :titleConfig="configtitle"></com-head>
    <div class="phone-in">
      <div class="in-bk">
        <div class="bk_logo"></div>
      </div>
      <div class="in-phone">您绑定的手机号：13873688000</div>
      <div class="in-tip">手机号码修改成功后需要使用新的手机号码进行登录。</div>
      <div class="in-btn">
        <a class="btn_link" @click="changephone">更换手机号</a>
      </div>
    </div>
    <van-dialog class="vand" v-model="cpmshow" :show-cancel-button="false" :show-confirm-button="false">
      <div class="vand">
        <div class="vand-title">
          请输入短信验证码
          <i class="ic_close" @click="closeFn"></i>
        </div>
        <ul class="vand-keys">
          <li class="keys-item" v-for="(key, index) in 6" :key="index">
            <input class="item_input" type="text" min="0" max="1" />
          </li>
        </ul>
        <div class="vand-tip1">短信验证码已发送至134 1477 5964</div>
        <div class="vand-tip1 vand-tip2" v-if="false">
          <span class="tip1_reset">59</span>
          秒后可重新发送
        </div>
        <div class="vand-tip1 vand-tip2" v-else>
          <span class="btnsend">重新发送</span>
        </div>
      </div>
    </van-dialog>
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
      configtitle: '手机号管理',
      cpmshow: false
    }
  },
  methods: {
    changephone () {
      this.cpmshow = true
    },
    closeFn () {
      this.cpmshow = false
    }
  }
}
</script>
<style lang="less" scoped>
.phone {
  .in-bk {
    padding: 50px 0 30px;
    text-align: center;

    .bk_logo {
      margin: 0 auto;
      width: 165px;
      height: 165px;
      // background: url('~/assets/img/login/ic_shouji_165x165@2x.png') center center no-repeat;
      background-image: url('~/assets/img/login/ic_shouji_165x165@2x.png');
      .bg_cover;
    }
  }

  .in-phone {
    text-align: center;
    font-size: 17px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .in-tip {
    text-align: center;
    font-size: 13px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    padding: 15px 0 8px;
  }

  .in-btn {
    text-align: center;

    .btn_link {
      font-size: 13px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(0, 122, 255, 1);
      text-decoration: underline;
    }
  }
}

.vand {
  &-title {
    padding-top: 26px;
    padding-bottom: 22px;
    text-align: center;
    position: relative;

    .ic_close {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 15px;
      right: 14px;
      background-image: url('~/assets/img/Icons/ic_off_g_24x24@2x.png');
      .bg_cover;
    }
  }

  &-keys {
    .flex_between;
    padding: 0 10px 23px;

    .keys-item {
      width: 41px;
      height: 41px;
      border-radius: 4px;
      border: 1px solid rgba(216, 216, 216, 1);
      overflow: hidden;
      .flex_between;
      .item_input {
        max-width: 100%;
        display: inline-flex;
        font-size:18px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
    }
  }

  &-tip1 {
    text-align: center;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    line-height: 18px;
    margin-bottom: 5px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);

    .tip1_reset {
      color: #333333;
    }
  }

  &-tip2 {
    padding-bottom: 14px;
  }

  .btnsend {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 122, 255, 1);
    line-height: 18px;
  }

}
</style>