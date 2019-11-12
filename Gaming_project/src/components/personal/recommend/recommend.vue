<template>
	<div class="recommend">
		<div class="index">
			<div class="tabbox two">
				<span :class="{active:actived}" @click="actived=true">
					我的推荐
				</span>
				<span :class="{active:!actived}" @click="actived=false">我的好友</span>
			</div>
		</div>
		<div class="main">
			<div class="panel" v-show="actived">
				<h2>手机网页二维码</h2>
				<div class="qr">
					<div><img src="../../../assets/images/second.png" alt="二维码"></div>
				</div>
				<div class="btnlist">
					<div class="item">
						<div>
							<span>手机链接:</span> 
							<span class="url">https://yzdj8.com/?r=9899</span>
						</div> 
						<div>
							<a class="btn btn-info" style="opacity: 1;">复制</a>
						</div>
					</div> 
					<div class="item">
						<div>
							<span>电脑链接:</span> 
							<span class="url">https://yzdj1.com/#/?r=9899</span>
						</div> 
						<div>
							<a class="btn btn-info" style="opacity: 1;">复制</a>
						</div>
					</div> 
					<div class="item">
						<div>
							<span>推 荐 码:</span> 
							<span class="url">9899</span>
						</div> 
						<div>
							<a class="btn btn-info" style="opacity: 1;">复制</a>
						</div>
					</div>
					<div class="mark">
						<p><i class="iconfont bz-tishi">&#xe606;</i>好友可通过任意一种方式完成注册</p> 
						<a href="#/Discount/Detail/11" class="btn btn-danger">查看活动奖励</a>
					</div>
				</div>
			</div>
			<table v-show="!actived">
				<thead>
					<tr>
						<th>ID</th> 
						<th>账号</th> 
						<th>总存款</th> 
						<th>注册时间</th> 
						<th>状态</th>
					</tr>
				</thead> 
				<tbody>
					<tr>
						<td colspan="5" style="text-align: center; line-height: 30px;">暂无记录</td>
					</tr> 
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
export default{
	name:'recommend',
	data(){
		return{
			actived:true
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/variable'
@import '~@/assets/css/iconfont/iconfont'
.recommend
	position:fixed
	top:45px
	bottom:0
	left:0
	right:0
	z-index:1
	background:$background-color
	.index
		height: 46px
		box-shadow: 0 0 13px rgba(0,0,0,.22)
		font-weight: lighter
		overflow:hidden
		.two
			justify-content: center
			margin-top: 8px
			display: flex
			flex-wrap: nowrap
			padding: 0 10px
			span
				display: inline-block
				width: 100px
				height: 30px
				line-height: 30px
				background: $personal-color
				font-size: $words-size-14
				text-align: center
				border-radius: 2px 0 0 2px;
			.active
				color: $special-color
				background: $home-color
				border: none
	.main
		background: linear-gradient(0deg,#202630 0,#2b3a4a 50%,#202630)
		width: 100%
		height: 100%
		flex: 1
		overflow-y: auto
		margin-bottom: -1px
		.panel
			margin: 8px
			padding: 10px
	    	h2
				font-size: $words-size-16
				color: #fff
				text-align: center
			.qr
				width: 180px
				height: 180px
				border: 5px solid #40474f
				margin: 10px auto
				img
					width:100%
	.item
		display: flex;
		justify-content: space-between
		box-shadow: 0 0 1px 0 hsla(0,0%,100%,.2)
		background: #202630
		margin-bottom: 10px
		padding: 0 5px
		color: #fff
		line-height: 45px
		div:first-child
			overflow: hidden
			white-space: nowrap
			.url
				font-size: 1.2rem
				color: #03fcb3
		div:last-child
			width: 60px
			flex: 0 0 auto
			.btn-info
				background: #29323a linear-gradient(180deg,#29323a,#222a31)
				box-shadow: inset 0 1px 0 0 hsla(0,0%,100%,.05), 0 1px 2px 0 rgba(0,0,0,.57)
				display: inline-block
				padding: 13px 15px
				line-height: 0
				text-align: center
				transition: all .3s
				color: #fff
				border-radius: 2px
	.mark
		text-align: center
		p
			color: #03fcb3
			text-align: center
			line-height: 30px
			i
				margin-right: 3px
		.btn-danger
			margin: 10px 0
			padding: 18px
			background: linear-gradient(90deg,#00fe98 0,#00feec)
			color: #202630
			display: inline-block
			line-height: 0
			text-align: center
			transition: all .3s
			border-radius: 2px
table
	width: 100%
	th
		font-weight: lighter
		color: #fff
		height: 40px
		border-bottom: .5px solid hsla(0,0%,100%,.1)
		text-align: center
	td
		text-align: center
		line-height: 30px
		font-size: 1.2rem
		height: 40px
		border-bottom: .5px solid hsla(0,0%,100%,.1)
</style>