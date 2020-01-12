<template>
	<div class="reg">
		<div class="main">
			<div class="loginbox regbox">
			  	<div class="logo">
			  		<router-link to="/" class="router-link-active">
			  			<img v-lazy="agentLogo">
			  		</router-link>
			  	</div>
			  	<div class="form">
				    <div class="row input-row">
				    	<span><i class="iconfont bz-yonghu">&#xe663;</i></span> 
				    	<input type="text" v-model="userID" maxlength="12" placeholder="用户名 5-12位英文或数字" @focus="focusFun" @blur="blurFun">
				    </div>
				    <div class="row input-row">
				    	<span><i class="iconfont bz-mima">&#xe635;</i></span> 
				    	<input type="password" v-model="password" maxlength="16" placeholder="密码 6-16位英文或数字" @focus="focusFun" @blur="blurFun">
				    </div>
				    <div class="row input-row">
				    	<span><i class="iconfont bz-mima">&#xe635;</i></span> 
				    	<input type="password" v-model="checkpassword"  placeholder="确认密码" maxlength="16" @focus="focusFun" @blur="blurFun">
				    </div>
				    <div class="row input-row">
				    	<span><i class="iconfont bz-shenfenzheng">&#xe733;</i></span> 
				    	<input type="text" v-model="realityName" maxlength="10" placeholder="请填写真实姓名，否则无法出款" @focus="focusFun" @blur="blurFun">
				    </div>
				    <div class="row input-row">
				    	<span><i class="iconfont bz-shouji">&#xe840;</i></span> 
				    	<input type="tel" v-model="phoneNumber" placeholder="手机号码" maxlength="11" @focus="focusFun" @blur="blurFun"> 
				    	<label class="btn btn-def" @click="getCheckCode">发送验证码</label>
				    </div>
				    <div class="row input-row">
				    	<span><i class="iconfont bz-yanzhengma">&#xe60d;</i></span> 
				    	<input type="text" v-model="checkCode" placeholder="短信验证码" maxlength="5" @focus="focusFun" @blur="blurFun">
				    </div>
				    <div class="row input-row">
				    	<span><i class="iconfont bz-tuijianma">&#xe610;</i></span> 
				    	<input type="text" v-model="recommend" maxlength="10" placeholder="推荐码，没有可不填" @focus="focusFun" @blur="blurFun">
				    </div>
				    <div class="row btn-row">
				    	<router-link class="btn btn-danger" to="/reg" @click.native="reg">注册</router-link>
				    </div>
				    <div class="row ckbox">
				    	<span>
				        	注册即代表您已同意 <router-link to="/reg/rules">用户注册协议</router-link>
				    	</span> 
				        <router-link to="/login" class="">立即登录</router-link>
				    </div>
			  	</div>
			</div>
		</div>
		<transition name="slide">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
export default{
	name:'reg',
	props:['agentLogo'],
	data(){
		return{
			password:null,
			realityName:null,
			checkpassword:null,
			phoneNumber:null,
			recommend:null,
			userID:null,
			checkCode:null,
			clickState:true,
			timeCode:60
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
		getCheckCode(e){
			let dom = e.target;
			if(dom.innerText == '发送验证码' && this.clickState){
				if(this.phoneNumber.length < 11){//检测手机号是否符合规格
					this.$popup({
						hint:'请输入有效的手机号码',
						hintShow:true
					})
				}else{
					let timer;
					this.clickState = false;
					this.axios.post(this.http + '/api/Member/GetMobileAuthCode',{
						mobile:this.phoneNumber
					}).then(response=>{
						this.clickState = true;
						if(response.data.resultCode == 1){
							this.$popup({
								hint:'验证码发送成功',
								hintShow:true
							})
							timer = setInterval(()=>{
								this.timeCode --;
								dom.innerText = '重新发送(' + this.timeCode + ')';
								if(this.timeCode == 0){
									dom.innerText = '发送验证码';
									clearInterval(timer);
									this.timeCode = 60;
								}
							},1000)
						}
					}).catch(error=>{
						console.log(error)
					})
				}
			}
		},
		reg(e){
				let regUserId = /^[a-zA-Z]+[a-zA-Z0-9]{4,}$/,//正则匹配5-12位英文或数字的用户名,必须以字母开头
					This = this,
					regPassword = /^[a-zA-Z0-9]{6,}$/;//6-16位英文或数字密码
				if(!regUserId.test(this.userID)){ //检测用户名是否符合规格
					this.$popup({
						hint:'请输入5-12位英文或数字的用户名,必须以字母开头',
						hintShow:true
					})
				}else if(!regPassword.test(this.password)){//检测密码是否符合规格
					this.$popup({
						hint:'请输入6-16位英文或数字密码',
						hintShow:true
					})
				}else if(this.password !== this.checkpassword){//检测密码是否一致
					this.$popup({
						hint:'密码和确认密码不一致',
						hintShow:true
					})
				}else if(this.phoneNumber.length < 11){//检测手机号是否符合规格
					this.$popup({
						hint:'请输入有效的手机号码',
						hintShow:true
					})
				}else if(this.checkCode.length < 5){
					this.$popup({
						hint:'请输入有效的验证码',
						hintShow:true
					})
				}else{
					this.axios.post(this.http+"/api/Member/Register",{ //上面检测输入信息都符合规格就发送注册请求
						password: this.$md5(this.$md5(this.password)),//密码
						realityName: this.realityName,//真实姓名
						recommend: this.recommend,//推荐码
						userID: this.userID,//用户名
						checkCode:this.checkCode
					}).then((response) =>{						
						if(response.data.resultCode == 1){//注册成功返回个人中心
							this.$popup({
								hint:response.data.message,
								hintShow:true
							})
							localStorage.setItem('userID', this.userID);
							localStorage.setItem('accessToken', response.data.resultData.accessToken);
							This.$router.push('/personal');
						}
					}).catch((error) =>{
						console.log(error)
					})
				}
				
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.reg
	position:fixed
	top:45px
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
		overflow-y:auto
		flex-direction: column
		.loginbox 
			padding: 20px
			font-weight: lighter
		.logo
			margin-bottom: 30px
			text-align: center
		a    
			text-decoration: none
			cursor: pointer
			img
				height:40px
				object-fit:cover
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
			input::placeholder
				color:$detailsTitle-color
			span
				display: inline-block
				text-align: left
				line-height: 30px
				margin-right: 10px
				color: hsla(0,0%,100%,.5)
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
			a
				color: $special-color
				text-decoration: underline
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
	color: $personal-color
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
	width: 140px !important
	padding: 0px 5px !important
	line-height: 30px
	color:$normal-color
</style>