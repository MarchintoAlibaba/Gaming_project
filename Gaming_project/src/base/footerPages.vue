<template>
	<div class="footer">
		<router-link tag="a" to="/">
			<i class="home"></i>
		</router-link>
		<router-link tag="a" to="/promotions">
			<i class="promotions"></i>
		</router-link>
		<router-link tag="a" to="/guess">
			<i class="guess"></i>
		</router-link>
		<router-link tag="a" to="/news">
			<i class="news"></i>
		</router-link>
		<router-link tag="a" to="/personal" @click.native='checklogin'>
			<i class="personal"></i>
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
.footer
	height:48px
	width:100%
	position:fixed
	bottom:0
.footer a
	    float:left
	    width:20%
	    height:100%
	    text-align:center
	    line-height:48px
.footer a i
			display:inline-block
			height:39px
			width:39px
			position:relative
			top:3px
		.router-link-exact-active i.home
				background-image:url("../assets/images/home.svg")
		.router-link-exact-active i.promotions
				background-image:url("../assets/images/promotions.svg")
		.router-link-exact-active i.news
				background-image:url("../assets/images/news.svg")
		.router-link-exact-active i.personal
				background-image:url("../assets/images/personal.svg")
			i.home
				background:url("../assets/images/home-gray.svg") no-repeat 50%
			i.promotions
				background:url('../assets/images/promotions-gray.svg') no-repeat 50%
			i.guess
				background:url('../assets/images/guess.svg') no-repeat 50%
			i.news
				background:url('../assets/images/news-gray.svg') no-repeat 50%
			i.personal
				background:url('../assets/images/personal-gray.svg') no-repeat 50%
</style>