<template>
	<div class="findPass">
		<div class="header">
			<nav-header :title="titleCenter" :titleSet="titleSet"></nav-header>
		</div>
		<div class="main">
			<div class="bankbox">
				<div class="row cardno">
					<span>手机号码</span> 
					<input placeholder="请输入注册时填写的手机号码" type="tel" maxlength="11" @focus="focusFun" @blur="blurFun">
				</div>
				<div class="row cardno" style="position: relative;">
					<span>验证码</span> 
					<input placeholder="请输入短信验证码" type="tel" maxlength="6" @focus="focusFun" @blur="blurFun"> 
					<label class="btn btn-def">发送验证码
					</label>
				</div>
				<div class="row cardno">
					<span>新密码</span> 
					<input placeholder="请输入新密码" maxlength="16" type="password" @focus="focusFun" @blur="blurFun">
				</div>
				<div class="row cardno">
					<span>确认密码</span> <input placeholder="请输入新密码" type="password" maxlength="16" @focus="focusFun" @blur="blurFun">
				</div>
				<div class="row btnbox">
					<a class="btn btn-danger">重置密码</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import navHeader from '@/base/navTitle'
export default{
	name:'login',
	components:{
		navHeader
	},
	data(){
		return{
			titleCenter:'找回密码',
			titleSet:false,
			check:false
		}
	},
	methods:{
		focusFun(e){
			e.target.previousElementSibling.className = "input-focus";
			e.target.parentElement.classList.add('div-focus');
		},
		blurFun(e){
			e.target.previousElementSibling.className = "";
			e.target.parentElement.classList.remove('div-focus');
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.findPass
	position:fixed
	top:0
	right:0
	bottom:0
	left:0
	z-index:1
	background:$background-color
	.main
		width: 100%
		height: 100%
		flex: 1
		overflow-y: auto
		margin-bottom: -1px
		.bankbox
			padding: 10px
			.cardno
				border-bottom: .5px solid hsla(0,0%,100%,.08)
				padding: 0 10px
				margin-bottom: 20px
				input 
					width: 100%
					height: 20px
					line-height: 20px
					border: none
					background: transparent
					color: #fff
					margin: 10px 0
					font-size: 1.4rem
				input::placeholder
					color:#999
				.btn-def
					position: absolute
					top: 25px
					right: 0px
					color:#fff
					padding: 0px 5px
					line-height: 30px
					width: 90px
					background: #29323a linear-gradient(180deg,#29323a,#222a31)
					box-shadow: inset 0 1px 0 0 hsla(0,0%,100%,.05), 0 1px 2px 0 rgba(0,0,0,.57)
				.input-focus
					color:$special-color
			.btnbox
				margin-top: 20px
			.div-focus
				border-bottom: .5px solid $special-color
.btn
	width: 100%
	padding: 20px 15px
	font-size: 1.4rem
	background: linear-gradient(90deg,#00fe98 0,#00feec)
	color: #202630
	display: inline-block
	padding: 20px 15px
	line-height: 0
	text-align: center
	transition: all .3s
	border-radius: 2px
</style>