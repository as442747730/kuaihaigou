<template>
	<div class="homelist">
		<div class="hothead">
			<div class="headitem active">本周最热</div>
			<div class="headitem">本月最热</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.homelist {
    .hothead {
    	height: 40px;
    	background: #F5F5F5;
    	.headitem {
    		display: inline-block;
    		width: 50%;
    		line-height: 40px;
    		text-align: center;
  			font-size:14px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(102,102,102,1);
    		& + .headitem {
    			position: relative;
    			&:before {
	    			content: '|';
	    			position: absolute;
	    			top: 50%;
	    			left: 0;
	    			color: #ccc;
	    			transform: translateY(-50%);
    			}
    		}
    		&.active {
    			font-family:PingFangSC-Semibold;
					font-weight:600;
					color:rgba(51,51,51,1);
    		}
    	}
    }
	}
</style>