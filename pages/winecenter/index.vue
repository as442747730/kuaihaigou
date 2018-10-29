<template>
  <div class="winecenter">
  	<div class="winecenter-head">
	  	<div class="top">
				<div class="top_l">
					<span class="icon_switch"></span>
					<span class="world"
					  v-if="isNovice"
					  @click="swtichNovice">切换高手界面</span>
					<span class="world"
					  v-else
					  @click="swtichNovice">切换新手界面</span>
				</div>
				<div class="top_r">
					<i class="icon_search"></i>
					<i class="icon_buy"></i>
				</div>
	  	</div>
	  	<div class="screen">
	  		<div class="screen-item active">国家产区</div>
	  		<div class="screen-item">价格类型</div>
	  		<div class="screen-item">场景特色</div>
	  		<div class="screen-item">推荐排序</div>
	  	</div>
	  	<div class="elmdl">
	  		<div class="elmdl-item">
	  			<span>等级</span>
	  		</div>
	  		<div class="elmdl-item">
	  			<span>葡萄品种</span>
	  		</div>
	  		<div class="elmdl-item">
	  			<span>其他筛选</span>
	  		</div>
	  	</div>
  	</div>
  	<div class="winecenter-content">
  		<section
  		  class="novice"
  		  v-if="isNovice"
  		  v-for="(item, index) in 5"
  		  :key="index">
  			<div class="com-item">
  				<div class="item_l">
  					<div class="item_l_bk" :style="'background: url(' + bkImg1 + ') no-repeat center/cover'"></div>
  				</div>
  				<div class="item_r">
  					<h3>法国1982拉菲法国1982拉菲传奇Lafite</h3>
  					<p>750ml | 日常餐酒 | 紧致单宁</p>
  					<div class="itemr-info">
  						<span class="info_item icon_time">2016</span>
  						<span class="info_item icon_address">法国／波尔多</span>
  						<span class="info_item icon_variety">黑皮诺</span>
  					</div>
  					<div class="u-bars">
  						<div class="bars">
  							<div class="bars-left">复杂：30分</div>
  							<div class="bars-right">
  								<span class="bars-right_top w30"></span>
  							</div>
  						</div>
  					</div>
  					<div class="itemr-price">
  						<span class="t_price">¥ 399</span>
  						<del class="m_price">市场价：¥ 499</del>
  					</div>
  				</div>
  			</div>
  		</section>
  		<section
  		  class="killer"
  		  v-else>
  			<div class="com-item">
  				<div class="item_l">
  					<div class="item_l_bk" :style="'background: url(' + bkImg2 + ') no-repeat center/cover'"></div>
  				</div>
  				<div class="item_r">
  					<h3>美国1982拉菲美国1982拉菲传奇Lafite</h3>
  					<p>750ml | 日常餐酒 | 紧致单宁</p>
  					<div class="u-bars">
  						<div class="bars">
  							<div class="bars-left">酒精度：14.5</div>
  							<div class="bars-right">
  								<span class="bars-right_top w30"></span>
  							</div>
  						</div>
  					</div>
  					<div class="u-bars">
  						<div class="bars">
  							<div class="bars-left">果香：75分</div>
  							<div class="bars-right">
  								<span class="bars-right_top w30"></span>
  							</div>
  						</div>
  					</div>
  					<div class="u-bars">
  						<div class="bars">
  							<div class="bars-left">酸度：65分</div>
  							<div class="bars-right">
  								<span class="bars-right_top w30"></span>
  							</div>
  						</div>
  					</div>
  					<div class="u-bars">
  						<div class="bars">
  							<div class="bars-left">复杂：30分</div>
  							<div class="bars-right">
  								<span class="bars-right_top w30"></span>
  							</div>
  						</div>
  					</div>
  					<div class="itemr-price">
  						<span class="t_price">¥ 399</span>
  						<del class="m_price">市场价：¥ 499</del>
  					</div>
  				</div>
  			</div>
  		</section>
  	</div>
  </div>
</template>
<script>
	import testImg1 from '../../assets/img/img.png'
	import testImg2 from '../../assets/img/img2.png'
	export default {
		data() {
			return {
			  bkImg1: testImg1,
			  bkImg2: testImg2,
			  isNovice: true   // 是否为新手
			}
		},
		methods: {
			swtichNovice() {
				this.isNovice = !this.isNovice
			}
		}
	}
</script>
<style lang="less" scoped>
  @import '../../assets/css/var.less';
  .padlr20 {
		padding-left: 20px;
		padding-right: 20px;
  }
	.winecenter {
		background: #fff;
		line-height: 1;
		font-size: 12px;
		&-head {
			.padlr20;
			padding-top: 10px;
			padding-bottom: 15px;
			border-bottom: 1px solid #F5F5F5;
		}
		&-content {
			.padlr20;
		}
	}
	.top {
		.flex_between;
    &_l {
			height:28px;
			background:rgba(222,243,249,1);
			border-radius:14px;
			display: flex;
    	align-items: center;
    	padding-left: 3px;

			&> span {
				font-size:11px;
				font-family:PingFangSC-Semibold;
				font-weight:600;
				color:rgba(3,161,205,1);
			}
			.icon_switch {
				width: 22px;
				height: 22px;
				.bg_cover;
				background-image: url('../../assets/img/Icons/ic_qiehuan_blue_22x22.png');
			}
			.world {
				padding: 0 10px 0 8px;
				color: @nice-blue;
			}
    }
    &_r {
    	width: 70px;
    	.flex_between;
    	&>i {
    		width: 30px;
    		height: 30px;
    	}
    	.icon_search {
    		.bg_cover;
    		background-image: url('../../assets/img/Icons/ic_search_b_30x30.png');
    	}
    	.icon_buy{
    		.bg_cover;
    		background-image: url('../../assets/img/Icons/ic_shop_b_30x30.png');
    	}
    }
	}
	.screen {
		.flex_between;
		padding: 20px 0;
		&-item {
			font-size:13px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color: @cor_999;
			line-height:13px;
			position: relative;
			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: -13px;
				margin-top: -2px;
				width: 8px;
				height: 5px;
				.bg_cover;
				background-image: url('../../assets/img/Icons/ic_triangle_gu_12x121.png');
			}
		}
		.active {
			color: @cor_333;
			font-family:PingFangSC-Medium;
      font-weight:500;
			&:after {
				background-image: url('../../assets/img/Icons/ic_triangle_bt_12x12.png');
			}
		}
	}
	.elmdl {
	  .flex_between;
		&-item {
			.flex_allCenter;
			width: 100px;
			height: 30px;
			background: #F8F8F8;
			border-radius: 15px;
			&> span {
				font-size:13px;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(153,153,153,1);
				position: relative;
				padding-right: 20px;
				&:after {
					content: '';
					width: 12px;
					height: 12px;
					position: absolute;
					top: 50%;
					right: 0;
					margin-top: -6px;
					.bg_cover;
					background-image: url('../../assets/img/Icons/ic_xiala_g_line_12x12.png');
				}
			}
		}
	}

	// 选酒公共
	.com-item {
		.flex_between;
		margin: 20px 0;
		.item_l {
			width: 120px;
			height: 213px;
			border-radius:4px;
			border:1px solid #EAEAEA;
			&_bk {
				margin-top: 6px;
				width: 100%;
				height: 202px;
				.bg_cover;
			}
		}
		.item_r {
			width: 195px;
			min-height: 213px;
			&>h3 {
				font-size:15px;
				font-family:PingFangSC-Medium;
				font-weight:500;
				color:rgba(51,51,51,1);
				line-height:21px;
			}
			&>p {
				padding: 10px 0;
				font-size:12px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:12px;
			}
			.itemr-price {
				.t_price {
					display: inline-block;
					font-size:17px;
					font-family:Impact;
					color: #F99C00;
				}
				.m_price {
					display: inline-block;
					padding-left: 10px;
					font-size:12px;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color: @cor_999;
				}
			}
		}
	}
	// 新手选酒
	.novice {
		padding-bottom: 5px;
		.itemr-info {
			margin-left: -7px;
			padding-bottom: 10px;
			&>span {
				display: inline-block;
				height:24px;
				line-height: 24px;
				background:#DEF3F9;
				border-radius:12px;
				padding-left: 25px;
				padding-right: 5px;
				vertical-align: middle;
				margin-top: 10px;
				position: relative;
				font-size:12px;
				font-family:PingFangSC-Semibold;
				font-weight:600;
				color: #03A1CD;
				margin-left: 7px;
				&:before {
					content: '';
					width: 24px;
					height: 24px;
					position: absolute;
					top: 50%;
					left: 0;
					margin-top: -12px;
					.bg_cover;
				}
			}
			.icon_time {
				&:before {
				  background-image: url('../../assets/img/Icons/ic_time_24x24.png');
				}
			}
			.icon_address {
				&:before {
				  background-image: url('../../assets/img/Icons/ic_position_24x24.png');
				}
			}
			.icon_variety {
				&:before {
				  background-image: url('../../assets/img/Icons/ic_grape_24x24.png');
				}
			}
		}
		.itemr-price {
			padding-top: 4px;
		}
	}
	.killer {
		padding-bottom: 5px;
	}
</style>