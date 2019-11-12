<template>
	<transition name="slide">
		<div class="loading" id="loading">
			<span>
				<img width="100%" src="static/img/loading.svg" alt="loading">
			</span>
		</div>
	</transition>
</template>
<script>
export default{
	name:'loading',
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/variable'
.slide-enter-active,.slide-leave-active
	transition:all 0.5s
.slide-enter,.slide-leave-to
	opacity:0
.loading
	position:fixed
	z-index:10
	color: #fff
	top:0
	right:0
	bottom:0
	left:0
	display: flex
	justify-content: center
	align-items: center
	font-size:$words-size-16
	span
		width:40px
		height:40px
</style>