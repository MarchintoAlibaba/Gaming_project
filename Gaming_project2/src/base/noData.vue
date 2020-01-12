<template>
	<div class="noData" v-show="noDataShow">
		{{noDataWords}}
	</div>
</template>
<script>
export default{
	name:'noData',
	props:{
		noDataWords:{
			default:'暂无数据'
		},
		noDataShow:{
			default:false
		}
	}
}
</script>
<style scoped lang="stylus">
.noData
	width: 100%
	height: 80px
	line-height: 80px
	text-align: center
</style>