<template>
	<div class="historyall">
		<div class="clearhistory">
			<div class="clearhistoryleft">搜索历史</div>
			<span class='clearlist'>删除</span>
		</div>
		<div class="historylist">
			<li class="list">
				<div class="listtitle">周杰伦</div>
				<span class='clearsong'>+</span>
			</li>
		</div>
	</div>
</template>
<script>
export default{
	name:'history'
}
</script>
<style scoped lang='stylus'>
@import '~css/variable'
.historyall
	width:100%
	min-height:1rem
	.clearhistory
		width:100%
		height:.8rem
		line-height:.8rem
		color:$color-text-l
		font-size:$font-size-medium
		display:flex
		.clearhistoryleft
			flex:1
		.clearlist
			width:.8rem
			height:.8rem
			line-height:.8rem
			text-align:right
	.historylist
		width:100%
		.list
			width:100%
			height:.8rem
			display:flex
			color:$color-text-l
			line-height:.8rem
			.listtitle
				flex:1
			.clearsong
				width:.8rem
				height:.8rem
				line-height:.8rem
				text-align:right
				
</style>