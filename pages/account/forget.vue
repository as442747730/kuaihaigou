<template>
  <div class="m-forget">

    <h2 class="m-forget-title">{{ modifyTxt }}<div class="icon-close" @click='historyBack'></div></h2>

    <div class="u-login-input mb-10" v-if="type !== 'modify'">
      <input v-model="phone" placeholder="输入手机号码" type="phone"></input>
    </div>

    <div class="captcha-wrapper mb-10" v-if="type !== 'modify'">
      <div class="u-login-input noborder">
        <input v-model="captcha" placeholder="请输入验证码"></input>
        <captchaInput :captchaData="captcha"></captchaInput>
      </div>
      <div class="u-button small captcha-btn" v-show="!sending" @click="sendCaptcha">获取验证码</div>
      <div class="captcha-btn count" v-show="sending" >{{ captchaTxt }}</div>
    </div>

    <div class="u-login-input mb-10" v-if="type === 'modify'">
      <input v-model="orignPassword" placeholder="请输入原来的密码" :type="pwdTypeOrign"><i :class="['icon-input', pwdTypeOrign === 'password' ? '' : 'hidden']" @click="togglePwdOrign"></i></input>
    </div>

    <div class="u-login-input mb-50">
      <input v-model="password" placeholder="请输入新的密码" :type="pwdType"><i :class="['icon-input', pwdType === 'password' ? '' : 'hidden']" @click="togglePwd"></i></input>
    </div>

    <div :class="['u-button', registerDisabled ? 'disabled' : '']" @click="revise">确定</div>

  </div>
</template>
<script>
import api from '~/utils/request'
import { userApi } from '~/api/users'
import captchaInput from '~/components/Login-captcha.vue'

export default {
  name: 'forget',
  layout: 'default',

  components: { captchaInput },

  head () {
    return {
      title: this.modifyTxt,
      meta: [
        { hid: 'title', name: 'title', content: this.modifyTxt }
      ]
    }
  },

  async asyncData (req) {
    let modifyTxt = '找回密码'
    if (req.query.type === 'modify') {
      modifyTxt = '修改密码'
      const { code } = await userApi.serverPostInfo(req)
      if (code === 506) {
        req.redirect('/account/login')
      }
    }
    return { modifyTxt: modifyTxt, type: req.query.type || '' }
  },

  computed: {
    registerDisabled () {
      if (this.type !== 'modify') {
        if (!(/^1[34578]{1}\d{9}$/).test(this.phone) || this.captcha === '' || this.captcha.length !== 6 || this.password === '') {
          return true
        }
      } else {
        if (this.password === '' || this.orignPassword === '') {
          return true
        }
      }
      return false
    }
  },

  watch: {
    phone (val) {
      if (val.length === 1) {
        val = val.replace(/[^1-9]/g, '')
      } else {
        val = val.replace(/\D/g, '')
      }
      this.phone = val
    },
    captcha (val) {
      if (val.length === 1) {
        val = val.replace(/[^1-9]/g, '')
      } else {
        val = val.replace(/\D/g, '')
      }
      this.captcha = val
    }
  },

  data () {
    return {
      type: '',
      modifyTxt: '找回密码',

      phone: '',
      captcha: '',
      password: '',
      orignPassword: '',

      pwdType: 'password',
      pwdTypeOrign: 'password',
      captchaTxt: '60s',
      sending: false
    }
  },

  mounted () {
    console.log(this.type)
  },

  methods: {
    togglePwd () {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
    },

    togglePwdOrign () {
      this.pwdTypeOrign = this.pwdTypeOrign === 'password' ? 'text' : 'password'
    },

    async sendCaptcha () {
      if (!(/^1[34578]{1}\d{9}$/).test(this.phone)) {
        return this.$toast.fail('请输入正确的手机号码')
      }
      // use => 0：用于注册，1：用于找回密码，2用户修改手机号码，3手机验证码登陆
      const { code, data } = await api.clientPost('/api/code', { phone: this.phone, use: this.type === 'modify' ? 2 : 1 })
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

    async revise () {
      if (this.registerDisabled) return
      let fn = null
      if (this.type === 'modify') {
        // 修改密码
        fn = api.clientPost('/api/pwd', { oldPwd: this.orignPassword, newPwd: this.password, confirmPwd: this.password })
      } else {
        // 找回密码
        fn = api.clientPost('/api/repwd', { phone: this.phone, password: this.password, confirmPassword: this.password, code: this.captcha })
      }
      const { code, data } = await fn
      if (code === 200) {
        this.$toast.success('密码修改成功')
        window.location.href = '/account/login'
      } else {
        this.$toast.success(data)
      }
    },

    historyBack () {
      window.history.go(-1)
    }
  }
}
</script>
<style lang="less">
.m-forget {
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
  .mb-10 {
    margin-bottom: 10px;
  }
  .mb-50 {
    margin-bottom: 50px;
  }
  .u-login-input {
    position: relative;
    border-color: #f1f1f1;
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
.u-button {
  border-radius: 6px;
  &.disabled {
    background: #ccc;
    color: #fff;
  }
}
</style>