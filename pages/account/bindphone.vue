<template>
  <div class="bphone">
    <div class="bphone-in">
      <div class="inps">
        <span class="inps-l">+86</span>
        <div class="inps-r">
          <van-field v-model="newphone" placeholder="请输入新手机号码" />
        </div>
      </div>
      <div class="btns">
      	<p class="btns_in active" v-if="checkphone" @click="opKeyboard">下一步</p>
        <p class="btns_in" v-else>下一步</p>
      </div>
    </div>
    <key-board :getphone="newphone" :showkey="showkey" @okInp="updPhone"></key-board>
  </div>
</template>
<script>
import keyBoard from '~/components/Keyboard'
import { userApi } from '~/api/users'
export default {
  components: {
    keyBoard
  },
  data () {
    return {
      configtitle: '手机号绑定',
      newphone: '',
      nextstep: false,
      showkey: false
    }
  },
  computed: {
    checkphone () {
      // 校验手机号码
      if (!(/^1[34578]{1}\d{9}$/).test(this.newphone)) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    newphone (val) {
      if (val.length === 1) {
        val = val.replace(/[^1-9]/g, '')
      } else {
        val = val.replace(/\D/g, '')
      }
      this.newphone = val
    }
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
    okInput () {
      this.showkey = false
    },
    async updPhone (value) {
      let params = {
        phone: this.newphone,
        code: value
      }
      const { code, data } = await userApi.updatephone(params)
      console.log('code', code)
      if (code === 200) {
        this.showkey = false
        this.$toast('修改成功！')
        setTimeout(() => {
          window.location.href = '/account/login'
        }, 600)
      } else {
        this.$toast(data)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.bphone {
  &-in {
    padding: 0 20px;

    .inps {
      width: 100%;
      height: 60px;
      border-bottom: 1PX solid @cor_border;
      .flex_between;

      &-l {
        width: 30px;
        font-size: 17px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);

      }

      &-r {
        width: calc(100% - 40px);
        font-size: 15px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
	  .btns {
	    box-sizing: border-box;
	    padding-top: 50px;
	    .btns_in {
	      width: 100%;
	      height: 50px;
	      border-radius: 7px;
	      background: #CCCCCC;
	      font-size:15px;
				font-family:PingFangSC-Medium;
				font-weight:500;
				color:rgba(255,255,255,1);
	      .flex_allCenter;
	    }
	    .active {
	      background: #03A1CD;
	    }
	  }
  }

}
</style>