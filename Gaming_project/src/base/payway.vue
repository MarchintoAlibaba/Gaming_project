<template>
	<transition name="slide">
		<div class="payway">
			<div class="items">
				<router-link :to='paywayRouter'>
					<span>
						<img :src="paywayImg" :alt="payName">{{payName}}
					</span>
					<span>
						<i class="iconfont bz-you">&#xe657;</i>
					</span>
				</router-link>
			</div>
			<div class="msgbox">
				<i class="iconfont bz-tishi">&#xe606;</i>
				支付出现问题时，请尝试使用不同支付通道。
			</div>
		</div>
	</transition>
</template>
<script>
export default{
	name:'payway',
	props:{
		paywayImg:{
			default:'static/img/zfb.svg'
		},
		paywayRouter:{
			default:'/personal/deposit/alipay'
		},
		payName:{
			default:'支付宝-王成龙'
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.slide-enter-active,.slide-leave-active
	transition:all 0.3s
.slide-enter,.slide-leave-to
	transform:translate3d(100%,0,0)
.payway
	.items
		margin: 8px
		a
			display: flex
			justify-content: space-between
			align-items: center
			font-weight: lighter
			color: #fff
			margin-top: 8px
			padding: 10px 15px
			border-radius: 3px
			background: #202630
			box-shadow: 0 0 1px 0 hsla(0,0%,100%,.4)
			img
				display: inline-block
				width: 26px
				height: 26px
				vertical-align: middle
				margin-right: 10px
	.msgbox
		background: hsla(0,0%,100%,.06)
		margin: 20px 8px
		padding: 15px
		color: #03fcb3
		font-size: 13px
		font-weight: lighter
		i
			color: #03fcb3
			margin-right: 5px
.bz-you
	color:#ccc
</style>