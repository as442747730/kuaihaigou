<template>
  <div class="m-login">

    <h2 class="m-login-title">{{ loginTypeText }}<div class="icon-close" @click='gotoIndex'></div></h2>

    <div class="u-login-input mb-30">
      <input v-model="phone" placeholder="请输入手机号码" type="tel" />
    </div>


    <!-- 手机号码登录 -->
    <section v-show="loginType === 1">
      <div class="u-login-input">
        <input v-model="password" placeholder="请输入登录密码" :type="pwdType"><i :class="['icon-input', pwdType === 'password' ? '' : 'hidden']" @click="togglePwd"></i></input>
      </div>

      <div class="m-login-handler">
        <!-- <a class="u-link active-status" href="">创建账号</a> -->
        <a class="u-link active-status" href="/account/register">创建账号</a>
        <a class="u-link active-status" href="/account/forget">忘记密码？</a>
      </div>
    </section>

    <!-- 短信验证码登录 -->
    <section class="captcha-wrapper" v-show="loginType === 2">
      <div class="u-login-input noborder">
        <input v-model="captcha" placeholder="请输入验证码" type="tel" />
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

    <div class="m-login-bottom" v-if='env !== 1'>
      <p class="m-login-bottom-title">第三方账号直接登录</p>
      <div class="m-login-bottom-flex">
        <div class="m-login-bottom-flex-item weibo" @click="loginClient('wb')"></div>
        <div class="m-login-bottom-flex-item qq" @click="loginClient('qq')"></div>
        <!-- <div class="m-login-bottom-flex-item wechat"></div> -->
      </div>
    </div>

  </div>
</template>
<script>
import api from '~/utils/request'
import { userApi } from '~/api/users'
import { accountApi } from '~/api/account'
import captchaInput from '~/components/Login-captcha.vue'
import tools from '~/utils/tools'

export default {
  name: 'login',
  layout: 'default',

  head () {
    return {
      title: '登录页',
      meta: [
        { hid: 'title', name: 'title', content: '登录页' }
      ]
    }
  },

  async asyncData (req) {
    const { code } = await userApi.serverPostInfo(req)
    const ua = req.req.headers['user-agent']
    let env = 0
    if (/MicroMessenger/.test(ua)) {
      // 检测用户环境是否为微信浏览器,0为非微信,1为微信
      env = 1
    }
    let loginStatus = req.query.status || null // 用于检测微信端授权登陆
    // 1-> 未绑定或未注册 2 -> 已绑定
    if (code === 200) {
      req.redirect('/mine')
      return {
        env: env,
        islogin: true,
        loginStatus: loginStatus
      }
    } else if (code === 506) {
      return {
        env: env,
        islogin: false,
        loginStatus: loginStatus
      }
    } else {
      req.redirect('/error')
    }
  },

  data () {
    return {
      loginStatus: null,
      env: 0,
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
      // if (val.length > 6) {
      //   this.captcha = val.substring(0, 6)
      // }
      if (val.length === 1) {
        val = val.replace(/[^1-9]/g, '')
      } else {
        val = val.replace(/\D/g, '')
      }
      this.captcha = val
      console.log(this.captcha)
    },
    phone (val) {
      if (val.length === 1) {
        val = val.replace(/[^1-9]/g, '')
      } else {
        val = val.replace(/\D/g, '')
      }
      this.phone = val
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

  async mounted () {
    this.prevLink = document.referrer || window.location.href
    if ((this.prevLink === window.location.href) || (this.prevLink === 'http://' + window.location.host + '/account/register') || (this.prevLink === 'http://' + window.location.host + '/account/bindphone') || (this.prevLink === 'http://' + window.location.host + '/account/mgnumber')) {
      this.prevLink = 'http://' + window.location.host + '/mine'
    }
    if (this.prevLink === 'http://' + window.location.host + '/account/forget' || this.prevLink === 'http://' + window.location.host + '/account/forget?type=modify') {
      this.prevLink = 'http://' + window.location.host
    }
    // 判断微信环境
    if (tools.checkWechat()) {
      if (!this.loginStatus) {
        // 未授权
        const { code, data } = await accountApi.loginWithWxJs({ returnUrl: window.location.href })
        if (code === 200) {
          sessionStorage.setItem('key', 'allow')
          window.location.href = data.authorizeJsUrl
        }
      } else if (+this.loginStatus === 1) {
        // 已授权，但未注册或者绑定
        const valida = sessionStorage.getItem('key') // 保险,验证有用户是否正常访问了上级页面,以防止绕过验证直接登录
        if (valida !== 'allow') {
          window.location.href = '/account/login'
          return
        }
        this.$dialog.confirm({
          title: '提示',
          message: '当前微信账号未绑定任何账号<br>您可以选择',
          confirmButtonText: '绑定已有账号',
          cancelButtonText: '注册新账号'
        }).then(() => {
          this.$dialog.close()
        }).catch(() => {
          window.location.href = '/account/register'
        })
      }
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
          this.$toast('登录成功')
          setTimeout(() => {
            window.location.replace(this.prevLink)
          }, 500)
        } else {
          this.$toast(data)
        }
      } else if (this.loginType === 2) {
        console.log(123)
        const { code, data } = await api.clientPost('/api/loginWithcode', { phone: this.phone, code: this.captcha })
        if (code === 200) {
          this.$toast('登录成功')
          setTimeout(() => {
            window.location.replace(this.prevLink)
          }, 500)
        } else {
          this.$toast(data)
        }
      }
    },

    gotoIndex () {
      window.location.href = '/'
    },

    loginClient (method) {
      switch (method) {
        case 'qq':
          window.location.href = '/api/authorize/qq?returnUrl=' + this.prevLink
          break
        case 'wb':
          window.location.href = '/api/authorize/wb?returnUrl=' + this.prevLink
          break
      }
    }
  }

}
</script>
<style lang="less">
.m-login {
  background: white;
  height: 100vh;
  min-height: 610px;
  max-height: 640px;
  padding: 30px 30px 20px 30px;
  box-sizing: border-box;
  position: relative;
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
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 50px;
    padding: 0rem 0.8rem;
    box-sizing: border-box;
    &-title {
      font-size: 14px;
      color: #cccccc;
      text-align: center;
    }
    &-flex {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      padding: 0 76px;
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
.van-dialog__cancel {
  color: #1989fa;
}
.van-dialog__message {
  text-align: center;
}
</style>