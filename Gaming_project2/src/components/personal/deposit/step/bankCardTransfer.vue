<template>
	<div class="bankCardTransfer">
		<payway :paywayRouter="paywayRouter" :paywayImg="paywayImg" :payName="payName"></payway>
	</div>
</template>
<script>
import navHeader from '@/base/navTitle'
import payway from '@/base/payway'
export default{
	name:'bankCardTransfer',
	components:{
		navHeader,
		payway
	},
	data(){
		return{
			titleCenter:'选择支付通道',
			titleSet:false,
			paywayRouter:'/personal/deposit/bankCardTransfer',
			paywayImg:'static/img/zxzf.svg',
			payName:'建设银行-黄安'
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/variable'
@import '~@/assets/css/iconfont/iconfont'
.bankCardTransfer
	position:fixed
	top:45px
	bottom:0
	left:0
	right:0
	background:$background-color
</style>