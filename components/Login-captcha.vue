<template>
  <div class="u-login-captcha">

    <ul class="u-login-captcha-wrapper">
      <li class="input-item">{{ captchaData[0] }}</li>
      <li class="input-item">{{ captchaData[1] }}</li>
      <li class="input-item">{{ captchaData[2] }}</li>
      <li class="input-item">{{ captchaData[3] }}</li>
      <li class="input-item">{{ captchaData[4] }}</li>
      <li class="input-item">{{ captchaData[5] }}</li>
    </ul>

  </div>
</template>
<script>
  export default {
    name: 'loginCaptcha',

    props: {
      captchaData: {
        type: String
      }
    },

    data () {
      return {
      }
    }

  }
</script>
<style lang="less" scoped>
.u-login-captcha {
  height: 100%;
  &-wrapper {
    height: 100%;
    display: flex;
    justify-content: space-between;
    .input-item {
      flex: 1;
      height: 22px;
      border-bottom: 1PX solid #e2e2e2;
      text-align: center;
      font-size: 16px;
      line-height: 22px;;
      padding-bottom: 15px;
      &:not(:last-child) {
        margin-right: 14px;
      }
    }
  }
}
</style>
