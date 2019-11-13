<template>
  <div>
  	<div class="header">
  		<div class="header-header">
  			<img class="header-img" src="~img/logo@3x.png">
  			<span class="header-span">Chicken Music</span>
  		</div>
  	</div>
  </div>
</template>
<script>
export default {
  name: 'header-Header'
}
</script>
<style scoped lang="stylus">
@import '~css/variable.styl'
	.header
		width:100%
		height:1rem
		display:relative
		background:$color-background
		text-align:center;
		.header-header
			height:100%
			.header-img
				vertical-align: top
				display:inline-block
				width:.8rem
			.header-span
				vertical-align: top
				display:inline-block
				color:$color-theme
				font-size:$font-size-large
				padding-top:.2rem
				padding-left:.2rem
</style>   
