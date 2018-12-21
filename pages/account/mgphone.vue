<template>
  <div class="phone">
    <com-head :titleConfig="configtitle"></com-head>
    <div class="phone-in">
      <div class="in-bk">
        <div class="bk_logo"></div>
      </div>
      <div class="in-phone">您绑定的手机号：{{getphone}}</div>
      <div class="in-tip">手机号码修改成功后需要使用新的手机号码进行登录。</div>
      <div class="in-btn">
        <a class="btn_link" @click="opKeyboard">更换手机号</a>
      </div>
    </div>
    <key-board :getphone="getphone" :showkey="showkey" @okInp="okInput"></key-board>
  </div>
</template>
<script>
import comHead from '~/components/com-head'
import keyBoard from '~/components/Keyboard'
import { userApi } from '~/api/users'
export default {
  components: {
    comHead,
    keyBoard
  },
  data () {
    return {
      configtitle: '手机号管理',
      cpmshow: false,
      getphone: '',
      passwordvalue: '',
      showKeyboard: false,
      showkey: false
    }
  },
  created () {
    this.getphone = this.$route.query.phone
  },
  methods: {
    async opKeyboard () {
      this.showkey = true
      let params = {
        phone: this.newphone,
        use: 2
      }
      const { code, data } = await userApi.getPhoneCode(params)
      if (code === 200) {
        this.showkey = true
      } else {
        this.$toast(data)
      }
    },
    okInput (val) {
      this.updPhone(val)
    },
    async updPhone (value) {
      let params = {
        phone: '18924141161',
        code: value
      }
      const { code, data } = await userApi.updatephone(params)
      if (code === 200) {
        this.showkey = false
        window.location.href = '/account/bindphone'
      } else {
        this.$toast(data)
      }
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
  &-tip3 {
    margin-top: 10px;
  }

  .btnsend {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 122, 255, 1);
    line-height: 18px;
  }
}
.van-number-keyboard {
  z-index: 3000 !important;
}
</style>