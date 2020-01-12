<template>
	<div class="footer">
		<router-link tag="a" to="/" class="home-a">
			<i class="home"></i>
			<span>主页</span>
		</router-link>
		<router-link tag="a" to="/promotions">
			<i class="promotions"></i>
			<span>优惠</span>
		</router-link>
		<router-link tag="a" to="/guess">
			<i class="guess"></i>
			<span>竞猜</span>
		</router-link>
		<router-link tag="a" to="/news">
			<i class="news"></i>
			<span>资讯</span>
		</router-link>
		<router-link tag="a" to="/personal" @click.native='checklogin'>
			<i class="personal"></i>
			<span>我的</span>
		</router-link>
	</div>
</template>
<script>
export default{
	name:"footerPages",
	methods:{
		checklogin(){
			if(!localStorage.getItem('accessToken')){
				this.$router.push('/login');
			}
		}
	}
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/variable'
.footer
	height:48px
	width:100%
	position:fixed
	bottom:0
	background:$background-color
	&:before
		background: #222
		transform-origin: 0 0
		transform: scaleY(.5)
		top: 0
		pointer-events: none
		position: absolute
		content: ""
		height: 1px
		left: 0
		right: 0
.footer a
		float:left
		width:20%
		height:100%
		text-align:center
		display:flex
		justify-content:space-around
		flex-direction: column
		align-items:center
.footer 
	a 
		i
			display:inline-block
			height:22px
			width:22px
			position:relative
			top:3px
			background-size:100%
		span
			font-size:$words-size-12
		i.home
			background-image:url("../assets/images/Icon_home_grey@2x.png")
		i.promotions
			background-image:url('../assets/images/Icon_discounts_grey@2x.png')
		i.guess
			background-image:url('../assets/images/Icon_lottery_grey@2x.png')
		i.news
			background-image:url('../assets/images/Icon_information_grey@2x.png')
		i.personal
			background-image:url('../assets/images/Icon_my_grey@2x.png')
	.router-link-active
		i.promotions
			background-image:url("../assets/images/Icon_discounts@2x.png")
		i.guess
			background-image:url("../assets/images/Icon_lottery@2x.png")
		i.news
			background-image:url("../assets/images/Icon_information@2x.png")
		i.personal
			background-image:url("../assets/images/Icon_my@2x.png")
		span
			color:$special-color
	.home-a
		span
			color:#7e8c8d
	.router-link-exact-active
		i.home
			background-image:url("../assets/images/Icon_home@2x.png")
		span
			color:$special-color
</style>