<template>
	<div class="customer">
		<div class="main">
			<div class="top">
				<div class="top-top">
					<span class="customerHead"></span>
					免费在线客服
				</div>
				<a :href="customerService.onlineUrl" class="top-bottom">
					马上联系<i class="iconfont">&#xe657;</i>
				</a>
			</div>
			<div class="other">
				其他联系方式
			</div>
			<div class="erweima">
				<div>微信联系</div>
				<div class="img">
					<img v-lazy="customerService.wapUrl">
				</div>
				<div class="wechat">
					扫描二维码联系客服 小薇 {{customerService.wx}}
				</div>
			</div>
			<div class="copy-qq">
				<div class="left">
					QQ联系 小开心 {{customerService.qq}}
				</div>
				<div class="right" v-clipboard:copy="customerService.qq" v-clipboard:success="onCopy" v-clipboard:error="onError">
					复制QQ
				</div>
			</div>
			<div class="copy-qq">
				<div class="left">
					邮箱联系 {{customerService.email}}
				</div>
				<div class="right" v-clipboard:copy="customerService.email" v-clipboard:success="onCopy" v-clipboard:error="onError">
					复制邮箱
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'customerService',
	computed:{
		customerService(){
			 return this.$store.state.agentInfo || false;
		}
	},
	methods:{
		onCopy(e){
			this.$popup({
					hint:'复制成功',
					hintShow:true
				})
		},
		onError(e){
			this.$popup({
				hint:'复制失败,请点击重试',
				hintShow:true
			})
		},
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.customer
	position:fixed
	top:45px
	right:0
	bottom:0
	left:0
	z-index:1
	background:#000
	.main
		width:100%
		height:100%
		overflow-y:auto
		padding:10px
		.top
			padding-bottom:40.6%
			height:0
			background:url('/static/img/customer_service_bg@2x.png')
			background-size:100% 100%
			border-radius:6px
			display:flex
			flex-direction:column
			align-items:center
			text-align:center
			font-weight:500
			.top-top
				margin-top:9.3%
				color:#fff
				font-size:24px
				.customerHead
					display:inline-block
					width:25px
					height:27px
					background:url('/static/img/customer_service_white@2x.png')
					background-size:100% 100%
					vertical-align:-4px
			.top-bottom
				margin-top:6%
				width:142px
				line-height:38px
				background:#fff
				color:rgba(68,215,182,1)
				font-size:16px
				border-radius:19px
		.other
			color:rgba(196,197,203,1)
			font-size:$words-size-14
			line-height:40px
		.erweima
			height:200px
			border-radius:6px
			background: rgba(48,60,76,0.50);
			padding:10px 16px
			font-size:$words-size-14
			color:#C4C5CB
			.img
				margin-top:4px
				text-align:center
				img
					width:114px
					height:114px
			.wechat
				margin-top:14px
				text-align:center
		.copy-qq
			padding:0 16px
			height:45px
			margin-top:10px
			background:rgba(48,60,76,0.50)
			border-radius:6px
			display:flex
			justify-content:space-between
			line-height:45px
			.right
				color:$special-color
</style>