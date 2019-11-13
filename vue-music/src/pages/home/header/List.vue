<template>
	<div class="list">
		<router-link tag="div" to="/recommend" class="list-li">推荐</router-link>
		<router-link tag="div" to="/singer" class="list-li">歌手</router-link>
		<router-link tag="div" to="/rank" class="list-li">排行</router-link>
		<router-link tag="div" to="/search" class="list-li">搜索</router-link>
	</div>
</template>
<script>
export default{
	name:'headerList'
}
</script>
<style scoped lang="stylus">
@import '~css/variable.styl'
	.list
		display:flex
		width:100%
		height:.8rem
		.list-li
			flex:1
			width:25%
			float:left
			font-size:$font-size-medium
			text-align:center
			color:$color-text-l
			height:100%
			line-height:.8rem
		.router-link-active
			position:relative
			color: $color-theme
        	.router-link-active::after
	        	position:absolute
	        	content:''
	        	width:.4rem
	        	height:.04rem
	        	top:0.7rem
	        	left:50%
	        	// left:.84rem
	        	background:red
	        	z-index:2
	        	margin-left:-0.2rem
</style>