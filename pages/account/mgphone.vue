<template>
  <div class="phone">
    <com-head :titleConfig="configtitle"></com-head>
    <div class="phone-in">
    	<div class="in-bk">
    		<div class="bk_logo"></div>
    		<!-- <img src="~/assets/img/login/ic_shouji_165x165@2x.png" alt=""> -->
    	</div>
    	<div class="in-phone">您绑定的手机号：13873688000</div>
    	<div class="in-tip">手机号码修改成功后需要使用新的手机号码进行登录。</div>
    	<div class="in-btn">
    		<a class="btn_link">更换手机号</a>
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
      configtitle: '手机号管理'
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
				background-image: url('~/assets/img/login/ic_shouji_165x165@2x.png');
				.bg_cover;
			}
		}
		.in-phone{
			text-align: center;
			font-size:17px;
			font-family:PingFangSC-Medium;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		.in-tip {
			text-align: center;
			font-size:13px;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(153,153,153,1);
			padding: 15px 0 8px;
		}
		.in-btn {
			text-align: center;
			.btn_link {
				font-size:13px;
				font-family:PingFangSC-Semibold;
				font-weight:600;
				color:rgba(0,122,255,1);
				text-decoration: underline;
			}
		}
	}
</style>