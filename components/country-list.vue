<template>
	<div class="countrys">
	
		<header>
	
			<h1>
	
				<span class="icon_del" @click="delCountry"></span> 国家产区
	
			</h1>
	
		</header>
	
		<section>
	
			<div class="sec-l rollList">
	
				<ul class="countrylist">
	
					<li :class="{active: index===1}" v-for="(country, index) in countries" :key="index">{{country}}</li>
	
				</ul>
	
			</div>
	
			<div class="sec-r rollList">
	
				<ul class="areaList">
	        <li class="one">所有产区</li>
					<li v-for="(area, index) in produceAreas" :key="index">{{area}}</li>
				</ul>
	
			</div>
	
		</section>
	
		<footer>
	
			<div class="btn">重置</div>
	
			<div class="btn active">确认</div>
	
		</footer>
	
	</div>
</template>
<script>
	export default {
	
		data() {
	
			return {
	
				countries: ['所有国家', '法国', '德国', '西班牙', '葡萄牙', '澳大利亚', '阿根廷', '新西兰', '保加利亚', '意大利'],
	
				produceAreas: ['阿尔萨斯（Alsace）', '卢瓦尔河谷（Loire Valley）', '波尔多（Bordeaux）', '普罗旺斯（Provence）', '阿尔萨斯（Alsace）']
	
			}
	
		},
		methods: {
			delCountry() {
				this.$emit('delCountry')
			}
		}
	
	}
</script>

<style lang="less" scoped>
	@import '../assets/css/var.less';
	
	.countrys {
	
		position: fixed;
	
		top: 0;
	
		left: 0;
	
		width: 100%;
	
		height: 100vh;
	
		z-index: 110;
	
		background: #fff;
	
		overflow: hidden;
	
		&>header {
	
			padding: 8px 12px;
			border-bottom: 1px solid #F1F1F1;
	
			&>h1 {
	
				font-size: 17px;
	
				font-family: PingFangSC-Medium;
	
				font-weight: 500;
	
				color: @cor_333;
	
				text-align: center;
	
				height: 30px;
	
				line-height: 30px;
	
				.icon_del {
	
					float: left;
	
					width: 30px;
	
					height: 30px;
	
					background-image: url('../assets/img/Icons/ic_off_g_30x30.png');
	
					.bg_cover;
	
				}
	
			}
	
		}
	
		&>section {
	
			height: calc(100vh - 96px);
	
			background: #fff;
	
			.rollList {
	
				height: 100%;
	
				-webkit-overflow-scrolling: touch;
	
				overflow: auto;
	
			}
	
			.sec-l,
	
			.sec-r {
	
				float: left;
	
			}
	
			.sec-l {
	
				width: 128px;
	
				background: #F5F5F5;
	
				.countrylist {
	
					&>li {
	
						height: 45px;
	
						line-height: 45px;
	
						overflow: hidden;
	
						text-align: center;
	
						font-size: 13px;
	
						font-family: PingFang-SC-Medium;
	
						font-weight: 500;
	
						color: #999999;
	
					}
	
					.active {
	
						font-family: PingFangSC-Semibold;
	
						font-weight: 600;
	
						background: #fff;
	
					}
	
				}
	
			}
	
			.sec-r {
	
				width: calc(100vw - 128px);
				
				.areaList {
					&>li {
						margin: 15px 0;
						padding: 6px 0;
						font-size:13px;
						font-family:PingFang-SC-Medium;
						font-weight:500;
						color: @cor_999;
						text-align: center;
					}
					.one {
					  font-family:PingFangSC-Medium;
						font-weight:500;
						color: @cor_333;
					}
				}
			}
		}
	
		&>footer {
	
			position: absolute;
	
			bottom: 0;
	
			left: 0;
	
			background: #fff;
	
			width: 100%;
	
			height: 50px;
	
			z-index: 100;
	
			box-shadow: 3px 3px 5px #636262;
	
			.flex_between;
	
			.btn {
	
				width: 50%;
	
				height: 100%;
	
				font-size: 15px;
	
				font-family: PingFangSC-Medium;
	
				font-weight: 500;
	
				.flex_allCenter;
	
				color: #03A1CD;
	
			}
	
			.active {
	
				background: #03A1CD;
	
				color: #fff;
	
			}
	
		}
	
	}
</style>

