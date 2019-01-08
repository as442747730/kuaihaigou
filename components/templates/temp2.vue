<template>
	<!-- 甄选 -->
	<div class="picklist">
		<div class="infos">
			<div class="infos-l"></div>
			<div class="infos-r">
				<div class="head">拉菲珍宝红葡萄酒</div>
				<p class="tags">
					<span class="tagsub">750ml</span>
					<span class="tagsub">日常餐酒</span>
					<span class="tagsub">紧致单宁</span>
				</p>
			</div>
		</div>
		<div class="articles"></div>
	</div>
</template>
<style lang="less" scoped>
	.picklist {
	  padding: 10px 20px;
	  border: 1PX solid #eaeaea;
		border-radius: 8px;
	  box-sizing: border-box;
	  .infos {
	    display: flex;
	  	&-l {
		  	width: 80px;
		  	height: 160px;
		  	background: pink;
		  	.bg_cover;
	  	}
	  	&-r {
		  	width: calc(100% - 80px);
		  	padding-left: 15px;
		  	box-sizing: border-box;
		  	.head {
		  		font-size:16px;
					font-family:PingFangSC-Semibold;
					font-weight:600;
					color:rgba(51,51,51,1);
					line-height: 22px;
		  	}
		  	.tags {
		  		font-size:12px;
					font-family:PingFang-SC-Regular;
					font-weight:400;
					color:rgba(153,153,153,1);
					padding-bottom: 15px;
					.tagsub {
						margin-top: 10px;

						& + .tagsub {
							margin-left: 5px;
							padding-left: 5px;
							position: relative;
							&:before {

							}
						}
					}
		  	}
	  	}
	  }
	}
</style>