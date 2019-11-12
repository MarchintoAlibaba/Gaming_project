<template>
	<div class="login">
		<div class="header">
			<nav-header :title="titleCenter" :titleSet="titleSet"></nav-header>
		</div>
		<!-- <pop-up-box :hint="hint" :hintShow="hintShow"></pop-up-box> -->
		<div class="main">
			<nav class="loginbox">
				<div class="logo">
				  	<router-link to="#/" class="router-link-active"><img src="~@/assets/images/logo.svg"></router-link>
				</div>
				<div class="form">
					<div tabindex="1" class="row input-row">
						<span>
							<i class="iconfont bz-yonghu">&#xe663;</i>
						</span> 
						<input type="text" v-model="userID" maxlength="12" placeholder="用户名/手机号" @focus="focusFun" @blur="blurFun">
					</div>
					<div class="row input-row">
						<span><i class="iconfont bz-mima">&#xe635;</i></span> 
						<input type="password" v-model="password" maxlength="16" placeholder="登录密码"  @focus="focusFun" @blur="blurFun">
					</div>
					<div class="row input-row changebtn">
				    	<span><i class="iconfont bz-shouji">&#xe60d;</i></span> 
				    	<input type="text" v-model="captchaValue" placeholder="请输入验证码" maxlength="6" @focus="focusFun" @blur="blurFun"> 
				    	<label class="btn-def"><img width="100%" :src="checkImg" alt=""></label>
				    	<span class="changeimg" @click="getImg">看不清换一张</span>
				    </div>
				  	<div class="row btn-row"><a class="btn btn-danger" @click="login">登录</a></div>
				  	<div class="row ckbox">
				  		<span @click="check=!check">
				  			<i class="iconfont bz-uncheckbox" v-show="!check">&#xe628;</i>
				  			<i class="iconfont bz-checkbox" v-show="check">&#xe607;</i>
				  			记住账号
				    	</span> 
				    	<span>
				    		<router-link to="/findPass">
				        		忘记密码？
				      		</router-link>
				      	</span>
				  	</div>
				  	<div class="line"></div>
				  	<div class="mark">
					    还没有账号？
					    <router-link to="/reg" class="">
					      	立即注册
					    </router-link> <router-link to="/index"><i class="iconfont bz-kefu">&#xe611;</i> 在线客服</router-link>
					</div>
				</div>
			</nav>
		</div>
	</div>
</template>
<script>
import navHeader from '@/base/navTitle'
// import popUpBox from '@/base/popUpBox'
export default{
	name:'login',
	components:{
		navHeader,
		// popUpBox
	},
	data(){
		return{
			titleCenter:'',
			titleSet:false,
			check:false,
			hint:null,
			hintShow:true,
			userID:null,
			loadShow:true,
			captchaValue:null,
			checkImg:null,
			password:null,
			captchaKey:null
		}
	},
	mounted(){
		this.getImg();
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
		login(){
			this.axios.post(this.http+'/api/Member/Login2',{
				"userID": this.userID,
				"captchaVerifyParam":{
					"captchaValue": this.captchaValue,
					"captchaKey": this.captchaKey
				},
				"password": this.password
			}).then((response)=>{
				if(response.data.resultCode == 1){
					localStorage.setItem('accessToken', response.data.resultData.accessToken);
					localStorage.setItem('userID', this.userID);
					this.$popup({
						hint:response.data.message,
						hintShow:true
					})
					this.$router.push('/personal');
				}else{
					this.getImg();
				}
			}).catch((error) =>{
				console.log(error);
			});
		},
		getImg(){
			this.axios.post(this.http+'/api/Common/Captcha/GetCaptchaInfo',{
				"width":"70",
				"height":"30",	
				"charCount": 4
			}).then((response)=>{
				if(response.data.resultCode == 1){
					this.captchaKey = response.data.resultData.captchaKey;
					this.checkImg = 'data:image/jpeg;base64,' + response.data.resultData.image;
				}
			}).catch((error)=>{
				console.log(error);
			})
		},
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.login
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
		margin: 0 auto
		display: flex
		flex-direction: column
	.loginbox 
		padding: 20px
		font-weight: lighter
		.logo
			margin-top: 60px
			margin-bottom: 30px
			text-align: center
		a    
			text-decoration: none
			cursor: pointer
			img
				height: auto
				width: 180px
				vertical-align: middle	
		.row
			height: 50px
			margin-bottom: 10px
			padding: 10px
			display: flex
			justify-content: flex-start
			flex-wrap: nowrap
			align-content: center
			border-radius: 2px
			.btn
				width: 100%
				padding: 20px 15px
				font-size: $words-size-14
		.btn-row
			padding-left: 0
			padding-right: 0
		.input-row
			background: hsla(0,0%,100%,.08)
			transition: all .3s
			.input-focus
				color:$special-color
			input
				width: 100%
				border: none
				background: transparent
				color: $normal-color
				font-size: $words-size-14
			span
				display: inline-block
				text-align: left
				line-height: 30px
				margin-right: 10px
				color: hsla(0,0%,100%,.5)
			.changeimg
				position:absolute
				top:6px
				right:0
				width:50px
				line-height:20px
				display:inline-block
				color:$normal-color
				i    
					font-size: $words-size-17
		.div-focus
			background:linear-gradient(to bottom,#3a3e42,#33373b,#3a3e42)
		.ckbox
			color: $normal-color
			display: flex
			justify-content: space-between
			font-size: $words-size-14
			font-weight: 400
			i
				margin-right: 5px
				font-size: $words-size-18
				position: relative
				top: 1px
			i.bz-checkbox
				color: $special-color
		.line
			height: 1px
			background: hsla(0,0%,100%,.05)
			margin: 20px 0
			width: 100%
		.mark
			text-align: center
			line-height: 40px
			a
				color: $special-color
				text-decoration: underline
				margin-left: 5px
				margin-right: 10px
.btn-danger
	background: linear-gradient(90deg,#00fe98 0,#00feec)
	color: $normal-color
	color: #202630
.btn
	display: inline-block
	padding: 13px 15px
	line-height: 0
	text-align: center
	transition: all .3s
	border-radius: 2px	
.btn-def
	background: #29323a linear-gradient(180deg,#29323a,#222a31)
	box-shadow: inset 0 1px 0 0 hsla(0,0%,100%,.05), 0 1px 2px 0 rgba(0,0,0,.57)
	width: 130px
	padding: 0px 5px
	color:$normal-color	
	padding: 0
	margin-right:60px
.changebtn
	position:relative
</style>