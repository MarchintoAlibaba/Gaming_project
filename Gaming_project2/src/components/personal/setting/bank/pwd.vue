<template>
	<div class="pwd">
		<div class="main">
			<div class="loginbox regbox editbox">
				<div class="form">
					<div class="row input-row">
						<span>
							<i class="iconfont bz-mima">&#xe635;</i>
						</span>
						<input type="password" v-model="oldPassword" maxlength="16" placeholder="旧密码" @focus="focusFun" @blur="blurFun">
					</div>
					<div class="row input-row">
						<span>
							<i class="iconfont bz-mima">&#xe65e;</i>
						</span>
						<input type="password" v-model="newPassword" maxlength="16" placeholder="新密码 6-16位英文或数字" @focus="focusFun" @blur="blurFun">
					</div>
					<div class="row input-row">
						<span>
							<i class="iconfont bz-mima">&#xe65e;</i>
						</span>
						<input type="password" v-model="checknNewPassword" placeholder="确认密码" @focus="focusFun" @blur="blurFun">
					</div>
					<div class="row btn-row">
						<router-link class="btn btn-danger" tag="a" to="/personal/setting/pwd" @click.native="setNewP">
							保存
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<transition name="slidea" v-if="secessNewP">
			<div class="weui-dialog">
				<div class="weui-ba">
					<div class="weui-dialog__bd">
						<div>
							<i style="font-size:54px;display:block" class="iconfont bz-zhengque">&#xe69e;</i>密码修改成功，请重新登录
						</div>
					</div> 
					<div class="weui-dialog__ft">
						<router-link class="weui-dialog__btn" to='/personal'>重新登录</router-link>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
export default{
	name:'pwd',
	data(){
		return{
			oldPassword:null,
			newPassword:null,
			checknNewPassword:null,
			secessNewP:false
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
		},
		setNewP(){
			let regPassword = /^[a-zA-Z0-9]{6,}$/;//6-16位英文或数字密码
			if(!regPassword.test(this.oldPassword)){
				this.$popup({
					hint:'旧密码格式错误',
					hintShow:true
				})
			}else if(!regPassword.test(this.newPassword)){//检测密码是否符合规格
				this.$popup({
					hint:'请输入6-16位英文或数字密码',
					hintShow:true
				})
			}else if(this.newPassword !== this.checknNewPassword){//检测密码是否一致
				this.$popup({
					hint:'密码和确认密码不一致',
					hintShow:true
				})
			}else{
				this.axios.post(this.http + '/api/Member/ModifyPassword',{
					oldPassword:this.$md5(this.$md5(this.oldPassword)),
					newPassword:this.$md5(this.$md5(this.newPassword)),
					userID:localStorage.getItem('userID')
				}).then((response)=>{
					if(response.data.resultCode == 1){
						this.secessNewP = true;
						localStorage.removeItem('accessToken');
						localStorage.removeItem('userID');
						// this.$router.push('');
					}
				}).catch((error)=>{
					console.log(error)
				})
			}
		},
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.slidea-enter-active,.slidea-leave-active
	transition:all .5s
.slidea-enter,.slidea-leave-to
	opacity:0
.pwd
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
	
.weui-dialog
	position: fixed
	z-index: 1
	top: 0
	right: 0
	left: 0
	bottom: 0
	background:rgba(0,0,0,.6)
	.weui-ba
		position: fixed
		display: table
		width: 80%
		max-width: 300px
		top: 0
		right: 0
		bottom: 0
		left: 0
		margin: auto
		text-align: center
		border-radius: 3px
		overflow: hidden
		background:linear-gradient(0deg,#2b3a4a 0,#202630)
		.weui-dialog__bd
			min-height: 40px
			font-size: 14px
			word-wrap: break-word
			word-break: break-all
		.weui-dialog__bd:first-child
			padding: 2.7em 20px 1.7em
			color: #fff
			.bz-zhengque
				color:#5db95f
		.weui-dialog__ft
			position: relative
			line-height: 48px
			font-size: 14px
			display: flex
		.weui-dialog__btn
			border-top: 1px solid hsla(0,0%,100%,.1)
			display: block
			flex: 1
			color: #07feb7
			text-decoration: none
			-webkit-tap-highlight-color: rgba(0,0,0,0)
			position: relative
</style>