<template>
	<div class="betRecord">
		<div class="index">
			<div class="tabbox two">
				<span :class="{active:actived}" @click="actived=true">
					未结算
				</span>
				<span :class="{active:!actived}" @click="actived=false">已结算</span>
			</div>
		</div>
		<div class="main">
			<div class="l" v-show="actived">
				<label>暂时没有记录</label>
				<p class="r">
					<router-link to="/personal">去玩两把</router-link>
				</p>
			</div>
			<div class="item" v-show="!actived">
				<div class="type">
					<p>
						<span class="c1">单场</span>
					</p>
					<p>
						<span>下注金额：<label class="c3">￥10.00</label>
						</span>
						<span>
	                    盈利：
	                    <label class="c3">￥16.60</label></span>
                	</p>
                	<p>
                		<span>订单号：1180671243662266368</span>
                		<span>2019-10-06 10:28:54</span>
                	</p>
				</div>
				<div class="info">
					<div class="row">
						<p>
							<span class="c1"><span class=" on w20  gameicon bz-csgo">
								<i class="person"></i>
							</span>全场 - 获胜者</span>
							<span class="mc">
								<label>Maple</label>
							</span>
						</p>
						<p>
							<span>Maple vs Beyond</span>
							<span class="c2">赔率：1.66</span>
						</p>
						<p>
							<span>开赛时间:2019-10-06 16:00:00</span>
							<span class="sy">
								<label class="w"></label>
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'betRecord',
	data(){
		return{
			actived:true
		}
	},
}
</script>
<style scoped lang="stylus">
	@import '~@/assets/css/variable'
	@import '~@/assets/css/iconfont/iconfont'
.betRecord
	position:fixed
	top:45px
	bottom:0
	left:0
	right:0
	z-index:1
	background:$background-color
	.index
		height: 42px
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
		width: 100%
		height: 100%
		flex: 1
		overflow-y: auto
		margin-bottom: -1px
		.l
			padding-top: 40px
			width: 100%
			text-align: center
			line-height: 30px
			.label
				color:$normal-color
			.r
				margin-top: 30px
				a
					background: linear-gradient(90deg,#00fe98 0,#00feec)
					color: #202630
					display: inline-block
					padding: 13px 15px
					line-height: 0
					text-align: center
					transition: all .3s
					border-radius: 2px
	.item
		margin: 8px
		border-radius: 3px
		background: $personal-color
		box-shadow: 0 0 1px 0 hsla(0,0%,100%,.4)
		font-size: $words-size-13
		font-weight: lighter
		color: #7f858f
		p
			display: flex
			flex-wrap: nowrap
			justify-content: space-between
			padding: 3px 0
		.c1
			color: $normal-color
			font-size: $words-size-14
		.c2
			color: #ffe87a;
		.sy
			width: 24px
			height: 41px
		.mc
			color: #c2c5c8
			label
				margin-left: 5px
		.type
			padding: 10px
			
			.c3
				color: $special-color
	.info
		padding: 10px 10px 0
		background: #28323c
		.row
			margin-bottom: 8px
			padding-bottom: 8px
	.person
		margin-right: 3px
		vertical-align: middle
		width: 20px
		height: 20px
		display: inline-block
		vertical-align: middle
		position: relative
		bottom: 1px
		background:url('../../../assets/images/person.svg')
	.w
		width: 24px
		height: 38px
		display: inline-block
		text-align: center
		background-image:url('../../../assets/images/win.svg')
</style>