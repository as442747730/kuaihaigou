<template>
	<div class="hotspot-detail">
		<div class="details">
			<h1 class="head">拉菲传说：拉菲传奇和拉菲珍藏葡萄酒三者之间的区别</h1>
			<div class="infos">
				<div class="infos-sub">
					作者：<span class="sub_child">Gorskl</span>
				</div>
				<div class="infos-sub">来源：红酒网</div>
				<div class="infos-sub">分类：国际资讯</div>
			</div>
			<div class="labels">
				<span class="labels_item">期酒</span>
				<span class="labels_item">厂区之争</span>
				<span class="labels_item">疯狂的拉菲</span>
			</div>
			<div class="summery">摘要：近日，波尔多二级庄巴顿城堡发布其2017年正牌酒期价格，这款酒在红酒世界会员商城国内税前价格未486元，香港商城价为610港元。</div>
			<article class="article">
				红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。红酒世界会员商城第一时间上红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。红酒世界会员商城第一时间上红酒世界会员商城第一时间上架这款期酒，其国内税前价为486元，香港商城价为610港元。 在2017这一颇具挑战性的年份，巴顿城堡无惧恶劣天气，表现抢眼。2017年巴顿城堡红葡萄酒。红酒世界会员商城第一时间上…
			</article>
			<div class="picture">
				<img class="picture_img" v-lazy="require('~/assets/img/001.jpg')" />
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
 .details {
 	  font-size: 14px;
 	  padding-left: 20px;
 	  padding-right: 20px;
 	  padding-bottom: 20px;
 	  .head {
 	  	padding: 30px 0 10px;
 	  	font-size:19px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:rgba(51,51,51,1);
			line-height:26px;
			overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
 	  }
 	  .infos {
 	  	display: flex;
 	  	align-items: center;
 	  	padding-top: 10px;
 	  	&-sub {
 	  		font-size:12px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color: #999999;
				line-height:12px;
				& + .infos-sub {
					margin-left: 20px;
				}
				.sub_child {
				  color: #999999;
				}
 	  	}
 	  }
 	  .labels {
 	  	margin-left: -10px;
 	  	&_item {
 	  		margin-top: 10px;
 	  		display: inline-block;
 	  		font-size:12px;
				font-family:PingFang-SC-Regular;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:12px;
				padding: 5px 10px;
				border-radius: 20px;
				border: 1PX solid #999999;
				margin-left: 10px;
 	  	}
 	  }
 	  .summery {
 	  	margin-top: 20px;
 	  	padding: 20px;
 	  	font-size:15px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(102,102,102,1);
			line-height:25px;
			background: #FCFCFC;
			border: 1PX solid #F1F1F1;
			border-radius: 4px;
 	  }
 	  .article {
 	  	margin-top: 20px;
 	  	font-size:15px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(153,153,153,1);
			line-height:25px;
 	  }
 	  .picture {
 	  	margin-top: 20px;
 	  	width: 100%;
 	  	&_img {
 	  		display: inline-block;
 	  		width: 100%;
 	  		height: auto;
 	  		border-radius: 10px;
 	  	}
 	  }
 }
	
</style>