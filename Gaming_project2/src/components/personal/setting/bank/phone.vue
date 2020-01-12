<template>
	<div class="phone">
		<div class="main">
			<div class="loginbox regbox editbox">
				<div class="form">
					<div class="row input-row">
						<span>
							<i class="iconfont bz-mima">&#xe635;</i>
						</span>
						<input type="password" placeholder="请输入登录密码" @focus="focusFun" @blur="blurFun">
					</div>
					<div class="row input-row">
						<span>
							<i class="iconfont bz-mima">&#xe840;</i>
						</span>
						<input type="number" placeholder="新输入新手机号码" @focus="focusFun" @blur="blurFun">
					</div>
					<div class="row input-row">
						<span>
							<i class="iconfont bz-mima">&#xe60d;</i>
						</span>
						<input type="number" placeholder="请输入短信验证码" @focus="focusFun" @blur="blurFun">
						<label class="btn btn-def">发送验证码</label>
					</div>
					<div class="row btn-row">
						<router-link class="btn btn-danger" tag="a" to="/personal/setting">
							保存
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'phone',
	mounted(){
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
.phone
	position:fixed
	top:45px
	right:0
	bottom:0
	left:0
	background:$background-color
	.main
		width: 100%
		height: 100%
		flex: 1
		overflow-y: auto
		margin-bottom: -1px
		position:relative
		.editbox
			padding: 15px
		.loginbox
			font-weight: lighter
.form .row span
	display: inline-block
	text-align: left
	line-height: 30px
	margin-right: 10px
.form .input-row
	border-bottom: .5px solid hsla(0,0%,100%,.08)
	background: no-repeat
	transition: all .3s
.form .div-focus
	border-bottom: .5px solid $special-color
.form .row
	height: 50px
	margin-bottom: 10px
	padding: 10px
	display: flex
	justify-content: flex-start
	flex-wrap: nowrap
	align-content: center
	border-radius: 2px
	box-sizing: border-box
.form .row input
	width: 100%
	border: none
	background: transparent
	color: $normal-color
	font-size: $words-size-14
	outline:none
.form .row input::placeholder
	color:#fff
	font-weight:lighter
.form .btn-row
	padding:10px 0
.form .btn-row .btn
	width: 100%
	padding: 20px 15px
	font-size: $words-size-14
	background: linear-gradient(90deg,#00fe98 0,#00feec)
	color: $personal-color
	text-align:center
	line-height:0
	border-radius:2px
span i.bz-mima
	font-size: $words-size-17
	color: hsla(0,0%,100%,.5)
span.input-focus i.bz-mima
	color:$special-color
.row .btn-def
	width: 130px
	padding: 0px 5px
	line-height: 30px 
	background: #29323a linear-gradient(180deg,#29323a,#222a31)
	box-shadow: inset 0 1px 0 0 hsla(0,0%,100%,.05), 0 1px 2px 0 rgba(0,0,0,.57)
	text-align:center
	color:$normal-color
</style>