<template>
	<div class="dataLoading">
		<div v-html="loadingWords" class='Lo'>
		</div>
	</div>
</template>
<script>
export default{
	name:'dataLoading',
	props:{
		loadingWords:{
			default:'<img height="100%" src="static/img/loading.svg" alt="loading">'
		}
	}
}
</script>
<style scoped lang="stylus">
.dataLoading
	// position:absolute
	// bottom:0
	width:100%
	height:40px
	display:flex
	align-items:center
	justify-content:center
	.Lo
		height:40px
		display:flex
		align-items:center
		justify-content:center
</style>