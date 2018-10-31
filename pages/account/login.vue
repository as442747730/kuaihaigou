<template>
  <div class="m-login">

    <h2 class="m-login-title">{{ loginTypeText }}<div class="icon-close" @click='gotoIndex'></div></h2>

    <div class="u-login-input mb-30">
      <input v-model="phone" placeholder="请输入手机号码" type="phone"></input>
    </div>


    <!-- 手机号码登录 -->
    <section v-show="loginType === 1">
      <div class="u-login-input">
        <input v-model="password" placeholder="请输入登录密码" :type="pwdType"><i :class="['icon-input', pwdType === 'password' ? '' : 'hidden']" @click="togglePwd"></i></input>
      </div>

      <div class="m-login-handler">
        <!-- <a class="u-link active-status" href="">创建账号</a> -->
        <nuxt-link class="u-link active-status" to="/account/register">注册账号</nuxt-link>
        <nuxt-link class="u-link active-status" to="">忘记密码？</nuxt-link>
      </div>
    </section>

    <!-- 短信验证码登录 -->
    <section class="captcha-wrapper" v-show="loginType === 2">
      <div class="u-login-input noborder">
        <input v-model="captcha" placeholder="请输入验证码"></input>
        <captchaInput :captchaData="captcha"></captchaInput>
      </div>
      <div class="u-button small captcha-btn" v-show="!sending" @click="sendCaptcha">获取验证码</div>
      <div class="captcha-btn count" v-show="sending" >{{ captchaTxt }}</div>
    </section>


    <div class="m-login-submit">
      <div :class="['u-button', loginDisabled ? 'disabled' : '']" @click="login">登录</div>
      <span class="m-login-submit-captcha active-status" v-show="loginType === 1" @click="toggleLoginType(2)">验证码登录</span>
      <span class="m-login-submit-captcha active-status" v-show="loginType === 2" @click="toggleLoginType(1)">密码登录</span>
    </div>

    <div class="m-login-bottom">
      <p class="m-login-bottom-title">第三方账号直接登录</p>
      <div class="m-login-bottom-flex">
        <div class="m-login-bottom-flex-item weibo"></div>
        <div class="m-login-bottom-flex-item qq"></div>
        <div class="m-login-bottom-flex-item wechat"></div>
      </div>
    </div>

  </div>
</template>
<script>
import api from '~/utils/request'
import captchaInput from '~/components/Login-captcha.vue'

export default {
  name: 'login',
  layout: 'default',

  data () {
    return {
      loginType: 1, // 登录方式 1：手机号码登录， 2：验证码登录

      phone: '',
      password: '',
      captcha: '',

      pwdType: 'password',

      sending: false,
      captchaTxt: '60s'
    }
  },

  components: { captchaInput },

  watch: {
    captcha (val) {
      if (val.length > 6) {
        this.captcha = val.substring(0, 6)
      }
    }
  },
  computed: {
    loginTypeText () {
      return this.loginType === 1 ? '手机登录' : '验证码登录'
    },
    loginDisabled () {
      if (this.loginType === 1 && (!(/^1[34578]{1}\d{9}$/).test(this.phone) || this.password === '')) {
        return true
      }
      if (this.loginType === 2 && (!(/^1[34578]{1}\d{9}$/).test(this.phone) || this.captcha === '' || this.captcha.length !== 6)) {
        return true
      }
      return false
    }
  },

  methods: {
    toggleLoginType (val) {
      if (this.loginType === val) return
      this.loginType = val
      console.log(this.loginType)
    },

    togglePwd () {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
    },

    async sendCaptcha () {
      if (!(/^1[34578]{1}\d{9}$/).test(this.phone)) {
        return this.$toast.fail('请输入正确的手机号码')
      }
      const { code, data } = await api.clientPost('/api/code', { phone: this.phone, use: 3 })
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

    async login () {
      console.log(this.loginType)
      if (this.loginType === 1) {
        const { code, data } = await api.clientPost('/api/login', { phone: this.phone, password: this.password })
        console.log(code, data)
        if (code === 200) {
          this.$toast.success('登录成功')
          // window.locationl.href = ''
        } else {
          this.$toast(data)
        }
      } else if (this.loginType === 2) {
        console.log(123)
        const { code, data } = await api.clientPost('/api/loginWithcode', { phone: this.phone, code: this.captcha })
        if (code === 200) {
          this.$toast.success('登录成功')
          // window.locationl.href = ''
        } else {
          this.$toast(data)
        }
      }
    },

    gotoIndex () {
      window.location.href = '/'
    }
  }

}
</script>
<style lang="less" scoped>
.m-login {
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
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  &-submit {
    margin-top: 50px;
    &-captcha {
      display: inline-block;
      margin-top: 25px;
      font-size: 16px;
      color: #333333;
      margin-left: 50%;
      transform: translate(-50%, 0);
    }
  }
  &-bottom {
    margin-top: 110px;
    &-title {
      font-size: 14px;
      color: #cccccc;
      text-align: center;
    }
    &-flex {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      padding: 0 38px;
      &-item {
        width: 50px;
        height: 50px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        &.weibo {
          background-image: url(../../assets/img/login/icon-weibo.png);
        }
        &.qq {
          background-image: url(../../assets/img/login/icon-qq.png);
        }
        &.wechat {
          background-image: url(../../assets/img/login/icon-wechat.png);
        }
      }
    }
  }
}
</style>