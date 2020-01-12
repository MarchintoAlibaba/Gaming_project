<template>
	<div class="deposit">
		<div class="main">
			<div class="item">
				<router-link tag="a" to="/personal/deposit/alipay" class="row">
					<span>
						<img src="static/img/zfb.svg" alt="支付宝">
						支付宝
					</span>
					<span>
						<i class="iconfont">&#xe657;</i>
					</span>
				</router-link>
			</div>
			<div class="item">
				<router-link tag="a" to="/personal/deposit/wechat" class="row">
					<span>
						<img src="static/img/wx.svg" alt="微信">
						微信
					</span>
					<span>
						<i class="iconfont">&#xe657;</i>
					</span>
				</router-link>
			</div>
			<div class="item">
				<router-link tag="a" to="/personal/deposit/bankCardTransfer" class="row">
					<span>
						<img src="static/img/zxzf.svg" alt="银行卡转账">
						银行卡转账
					</span>
					<span>
						<i class="iconfont">&#xe657;</i>
					</span>
				</router-link>
			</div>
		</div>
		<transition name="slide">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
export default{
	name:'deposit',
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/variable'
@import '~@/assets/css/iconfont/iconfont'
.deposit
	position:fixed
	top:45px
	bottom:0
	left:0
	right:0
	z-index:1
	background:$background-color
	.header
		width:100%
		height:45px
.main .item
	margin: 8px;
	border-radius: 3px;
	background: $personal-color;
	box-shadow: 0 0 1px 0 hsla(0,0%,100%,.4);
.main .item .row
	display: flex;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	justify-content: space-between;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
	padding:10px 15px;
	font-weight: lighter;
	color: #fff;
	position:relative
.main .item .row span:first-child i
	margin-right: 10px;
	font-size: $words-size-18;
.main .item .row span:last-child i,.main .item .row span:last-child
	color: #ccc;
.main .item .row img
	display: inline-block;
	width: 26px;
	height: 26px;
	vertical-align: middle;
	margin-right: 10px;
</style>