<template>
	<div class="wechat">
		<div class="header">
			<nav-header :title="titleCenter" :titleSet="titleSet"></nav-header>
		</div>
		<payway :paywayRouter="paywayRouter" :paywayImg="paywayImg" :payName="payName"></payway>
	</div>
</template>
<script>
import navHeader from '@/base/navTitle'
import payway from '@/base/payway'
export default{
	name:'wechat',
	components:{
		navHeader,
		payway
	},
	data(){
		return{
			titleCenter:'选择支付通道',
			titleSet:false,
			paywayRouter:'/personal/deposit/wechat',
			paywayImg:'static/img/wx.svg',
			payName:'微信通道1'
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/variable'
@import '~@/assets/css/iconfont/iconfont'
.wechat
	position:fixed
	top:45px
	bottom:0
	left:0
	right:0
	background:$background-color
</style>