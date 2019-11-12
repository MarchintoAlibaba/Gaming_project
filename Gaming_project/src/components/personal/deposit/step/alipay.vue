<template>
	<div class="alipay">
		<div class="header">
			<nav-header :title="titleCenter" :titleSet="titleSet"></nav-header>
		</div>
		<payway :paywayRouter="paywayRouter" :paywayImg="paywayImg" :payName="payName"></payway>
		<router-view></router-view>
	</div>
</template>
<script>
import navHeader from '@/base/navTitle'
import payway from '@/base/payway'
export default{
	name:'alipay',
	components:{
		navHeader,
		payway
	},
	data(){
		return{
			titleCenter:'选择支付通道',
			titleSet:false,
			paywayRouter:'/personal/deposit/alipay/001',
			paywayImg:'static/img/zfb.svg',
			payName:'支付宝-王成龙'
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/variable'
@import '~@/assets/css/iconfont/iconfont'
.alipay
	position:fixed
	top:45px
	bottom:0
	left:0
	right:0
	background:$background-color
</style>