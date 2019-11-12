<template>
	<div class="msg">
		<div class="main">
			<div class="nomesg">
				<p>暂无消息</p>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'msg',
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/variable'
@import '~@/assets/css/iconfont/iconfont'
.msg
	position:fixed
	top:0
	bottom:0
	left:0
	right:0
	z-index:1
	background:$background-color
	.main
		width: 100%;
		height: 100%;
		flex: 1;
		overflow-y: auto;
		margin-bottom: -1px;
		.nomesg
			width: 100%
			text-align: center
			line-height: 100px
</style>