<template>
  <div class="bphone">
    <com-head :titleConfig="configtitle"></com-head>
    <div class="bphone-in">
      <div class="inps">
        <span class="inps-l">+86</span>
        <div class="inps-r">
          <van-field v-model="newphone" placeholder="请输入新手机号码" />
        </div>
      </div>
      <div class="btns">
      	<p class="btns_in" v-if="!nextstep">下一步</p>
      	<p class="btns_in active" v-else>下一步</p>
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
      configtitle: '手机号绑定',
      newphone: '',
      nextstep: false
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