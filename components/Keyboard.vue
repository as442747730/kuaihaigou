<template>
  <div>
    <van-dialog class="vand" v-model="showkey" :show-cancel-button="false" :show-confirm-button="false">
      <div class="vand" :data-val="sendFn">
        <div class="vand-title">
          请输入短信验证码
          <i class="ic_close" @click="closeFn"></i>
        </div>
        <van-password-input :value="passwordvalue" @focus="onFocus" />
        <div class="vand-tip1 vand-tip3">短信验证码已发送至{{getphone}}</div>
        <div class="vand-tip1 vand-tip2" v-if="!sendAgain">
          <span class="tip1_reset">{{allTime}}</span>
          秒后可重新发送
        </div>
        <div class="vand-tip1 vand-tip2" @click="sendYzm" v-else>
          <span class="btnsend">重新发送</span>
        </div>
      </div>
    </van-dialog>
    <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" />
  </div>
</template>
<script>
export default {
  props: {
    getphone: {
      type: String,
      default: ''
    },
    showkey: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      passwordvalue: '',
      showKeyboard: false,
      allTime: 10,
      sendAgain: false
    }
  },
  computed: {
    sendFn () {
      if (this.showkey) {
        this.reduceSec()
      }
    }
  },
  methods: {
    onFocus () {
      this.showKeyboard = true
    },
    onInput (key) {
      this.passwordvalue = (this.passwordvalue + key).slice(0, 6)
      if (this.passwordvalue.length === 6) {
        this.$emit('okInp', this.passwordvalue)
        this.showKeyboard = false
      }
    },
    onDelete () {
      this.passwordvalue = this.passwordvalue.slice(0, this.passwordvalue.length - 1)
    },
    closeFn () {
      this.showKeyboard = false
      this.sendAgain = false
      this.$emit('okInp')
      this.passwordvalue = ''
    },
    reduceSec () {
      let timer = setInterval(() => {
        this.allTime -= 1
        if (this.allTime <= 0) {
          this.sendAgain = true
          window.clearInterval(timer)
        }
      }, 1000)
    },
    sendYzm () {
      // 重新发送验证码
      this.sendAgain = false
      this.allTime = 10
      this.reduceSec()
    }
  }
}
</script>
<style lang="less" scoped>
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
      background-image: url('~assets/img/Icons/ic_off_g_24x24@2x.png');
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
        font-size: 18px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
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