<template>
  <div class="comindex">
    <div class="navbox">
      <div
        class="navitem"
        :class="{active: index === navIndex}"
        v-for="(item, index) in navList"
        :key="index">{{item}}</div>
    </div>
    <section class="secbox">
    	<div class="seclist">
    		<temp-test></temp-test>
    	</div>
    	<null-data v-if="comList.length > 0"></null-data>
    </section>
  </div>
</template>
<script>
import nullData from '~/components/nullData'
import tempTest from '~/components/templates/temp3'
export default {
  components: {
    nullData,
    tempTest
  },
  data () {
    return {
      navList: ['全部活动', '未开始', '进行中', '已结束'],
      navIndex: 0,
      comList: []
    }
  }
}
</script>
<style lang="less" scoped>
.comindex {
	height: 100vh;
	font-size: 14px;
	background: #F0F2F5;
  .navbox {
    display: flex;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    .navitem {
    	padding: 10px 20px;
    	position: relative;
    	font-size:13px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(153,153,153,1);
    	&:after {
    		position: absolute;
    		bottom: 0;
    		left: 50%;
    		margin-left: -8px;
    		content: "";
    		width: 0;
    		height: 3PX;
    		border-radius: 2PX;
    		background: #333333;
    		transform: width .2s;
    	}
    	&.active {
    		font-family:PingFangSC-Medium;
				font-weight:500;
				color:rgba(51,51,51,1);
				&:after {
					width: 16px;
				}
    	}
    }
  }
  .secbox {
  	padding: 0 20px;
  	height: calc(100vh - 50px);
  	overflow: auto;
  }
}
</style>