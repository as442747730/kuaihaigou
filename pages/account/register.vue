<template>
  <div class="m-register">

    <h2 class="m-register-title">{{ pageTitle }}<div class="icon-close" @click='historyBack'></div></h2>

    <div class="u-login-input mb-30">
      <input v-model="phone" placeholder="请输入手机号码" type="phone"></input>
    </div>

    <div class="captcha-wrapper mb-30">
      <div class="u-login-input noborder">
        <input v-model="captcha" placeholder="请输入验证码"></input>
        <captchaInput :captchaData="captcha"></captchaInput>
      </div>
      <div class="u-button small captcha-btn" v-show="!sending" @click="sendCaptcha">获取验证码</div>
      <div class="captcha-btn count" v-show="sending" >{{ captchaTxt }}</div>
    </div>

    <div class="u-login-input">
      <input v-model="password" placeholder="请输入登录密码" :type="pwdType"><i :class="['icon-input', pwdType === 'password' ? '' : 'hidden']" @click="togglePwd"></i></input>
    </div>

    <p class="m-register-handler">已有账号！<a href="/account/login" class="u-link">去登录</a></p>

    <div :class="['u-button', registerDisabled ? 'disabled' : '']" @click="register">确定</div>

    <p class="m-register-bottom">注册代表您已同意<a href="" class="u-link">《用户服务协议》</a></p>


  </div>
</template>
<script>
import api from '~/utils/request'
import captchaInput from '~/components/Login-captcha.vue'

export default {
  name: 'register',
  layout: 'default',

  components: { captchaInput },

  computed: {
    registerDisabled () {
      if (!(/^1[34578]{1}\d{9}$/).test(this.phone) || this.captcha === '' || this.captcha.length !== 6 || this.password === '') {
        return true
      }
      return false
    }
  },

  data () {
    return {
      pageTitle: '注册账号',

      phone: '',
      captcha: '',
      password: '',

      pwdType: 'password',
      captchaTxt: '60s',
      sending: false
    }
  },

  methods: {
    togglePwd () {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
    },

    async sendCaptcha () {
      if (!(/^1[34578]{1}\d{9}$/).test(this.phone)) {
        return this.$toast.fail('请输入正确的手机号码')
      }
      // use => 0：用于注册，1：用于找回密码，2用户修改手机号码，3手机验证码登陆
      const { code, data } = await api.clientPost('/api/code', { phone: this.phone, use: 0 })
      if (code === 200) {
        this.$toast('已发送验证码')
        let t = null
        const v = this
        let count = 60
        this.sending = true
        t = setInterval(() => {
          if (count < 2) {
            v.captchaTxt = '获取验证码'
            v.sending = false
            clearInterval(t)
            return
          }
          count -= 1
          v.captchaTxt = count + 's'
        }, 1000)
      } else {
        this.$toast(data)
      }
    },

    async register () {
      if (this.registerDisabled) return
      const { code, data } = await api.clientPost('/api/reg', { phone: this.phone, password: this.password, code: this.captcha })
      if (code === 200) {
        this.$toast.success('注册成功')
        window.location.href = '/account/login'
      } else {
        this.$toast(data)
      }
    },

    historyBack () {
      window.history.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.m-register {
  background: white;
  min-height: 100vh;
  padding: 60px 30px 20px 30px;
  box-sizing: border-box;
  &-title {
    font-size: 26px;
    position: relative;
    margin-bottom: 45px;
    .icon-close {
      width: 26px;
      height: 26px;
      background-image: url(../../assets/img/login/icon-close.png);
      background-position: center;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .mb-30 {
    margin-bottom: 30px;
  }
  .u-login-input {
    position: relative;
    .icon-input {
      display: block;
      width: 26px;
      height: 26px;
      background-image: url(../../assets/img/login/icon-show.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      position: absolute;
      right: 0;
      top: 15px;
      &.hidden {
        background-image: url(../../assets/img/login/icon-hide.png);
      }
    }
  }
  .captcha-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .u-login-input {
      margin-right: 10px;
      flex: 1;
      position: relative;
      overflow: hidden;
      input {
        width: 200%;
        position: absolute;
        right: 0;
        background: transparent;
        color: transparent;
      }
    }
    .captcha-btn {
      width: 90px;
      &.count {
        width: 90px;
        height: 30px;
        background: #F2F3F5;
        font-size: 12px;
        color: #97989A;
        line-height: 30px;
        text-align: center;
        border-radius: 15px;
      }
    }
  }
  &-handler {
    margin-top: 20px;
    margin-bottom: 50px;
    font-size: 14px;
    color: #9D9D9F;
    text-align: right;
  }
  &-bottom {
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
    color: #666666;
  }
}
</style>