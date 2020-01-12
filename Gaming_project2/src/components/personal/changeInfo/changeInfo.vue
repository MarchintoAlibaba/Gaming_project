<template>
	<div class="changeInfo">
		<div class="main" :computed="userinfo">
			<div class="item">
				<div class="top">
					真实姓名&ensp;<img src="static/img/icon_not null@2x.png">
				</div>
				<input type="text" v-model="reallyName" class="really-name" placeholder="需和绑定银行卡的持卡人姓名一致" @focus="focusFun" @blur="blurFun">
			</div>
			<div class="item">
				<div class="top">
					昵称
				</div>
				<input type="text" v-model="nickName" placeholder="请输入昵称" @focus="focusFun" @blur="blurFun">
			</div>
			<div class="item">
				<div class="top">
					用户名
				</div>
				<input type="text" v-model="userID" placeholder="请输入昵称" @focus="focusFun" @blur="blurFun">
			</div>
			<div class="item">
				<div class="top">
					性别
				</div>
				<div class="sex-box">
					<label for="sexman">
						<input class="sex" type="radio" ref='sex' name="sex" id="sexman"> 男&ensp;
					</label>
					<label for="sexwomen">
						<input class="sex sex-right" ref='sex' type="radio" id="sexwomen" name="sex"> 女&ensp;
					</label>
				</div>
			</div>
			<div class="item">
				<div class="top">
					生日
				</div>
				<input type="tel" v-model="birthday" placeholder="请输入您的生日(年/月/日)" @focus="focusFun" @blur="blurFun">
			</div>
			<div class="item">
				<div class="top">
					身份证号&ensp;<img src="static/img/icon_not null@2x.png">
				</div>
				<input type="tel" v-model="userId" maxlength="18" placeholder="请输入您的身份证号码" @focus="focusFun" @blur="blurFun">
			</div>
			<div class="item">
				<div class="top">
					地址
				</div>
				<input type="text" v-model="adress" placeholder="请输入您的地址" @focus="focusFun" @blur="blurFun">
			</div>
			<div class="item">
				<div class="top">
					QQ
				</div>
				<input type="number" v-model="qq" placeholder="请输入您的QQ" @focus="focusFun" @blur="blurFun">
			</div>
			<div class="item">
				<div class="top">
					邮箱
				</div>
				<input type="email" v-model="mailbox" placeholder="请输入您的邮箱" @focus="focusFun" @blur="blurFun">
			</div>
			<div class="care">
				<img src="static/img/icon_not null@2x.png"> 标记星号为必填项目
			</div>
			<div class="confirm" @click="confirm">
				保存
			</div>
		</div>
		<transition name="slide-info">
			<div class="prompt" v-show="prompt">
				<div class="prompt-content">
					<div class="prompt-title">
						安全提示
					</div>
					<div class="prompt-content-c">
						请确认姓名真实有效，一旦保存则不能再次更改
					</div>
					<div class="prompt-confirm">
						<span class="confirm-left" @click="write_again">重新填写</span>
						<span class="confirm-right" @click="setInfo">确定</span>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
export default{
	name:'changeInfo',
	computed:{
		userinfo(){
			if(JSON.stringify(this.$store.state.userinfo) != '{}'){
				let userinfo = this.$store.state.userinfo;
				this.reallyName = userinfo.realityName;
				this.nickName = userinfo.nickName;
				this.userID = userinfo.userID;
				this.sex = userinfo.sex === '' ? true : userinfo.sex === true ? true : false;
				this.$nextTick(() => {
					if(this.sex){
						document.getElementsByClassName('sex')[0].setAttribute('checked','checked');
					}else{
						document.getElementsByClassName('sex')[1].setAttribute('checked','checked');
					}
				})
				this.birthday = userinfo.birthDay;
				this.userId = userinfo.idcardNumber;
				this.adress = userinfo.address;
				this.qq = userinfo.qq;
				this.mailbox = userinfo.email;
			}
			return this.$store.state.userinfo || false
		}
	},
	data(){
		return{
			reallyName:'',
			nickName:'',
			userID:'',
			sex:'',
			birthday:'',
			userId:'',
			adress:'',
			qq:'',
			mailbox:'',
			prompt:false,
			flag:true
		}
	},
	methods:{
		focusFun(e){
			let dom = e.target;
			if(dom.className == 'really-name' && this.userinfo.realityName){
				dom.blur()
				this.$popup({
					hint:'真实姓名不能修改',
					hintShow:true
				})
			}else{
				dom.parentElement.classList.add("input-focus");
				dom.classList.add('div-focus');
			}
			
		},
		blurFun(e){
			e.target.parentElement.classList.remove("input-focus");
			e.target.classList.remove('div-focus');
		},
		write_again(){//重新填写
			this.prompt = false;
			document.getElementsByClassName("really-name")[0].focus();
		},
		confirm(){//点击保存
			if(this.reallyName == '' || this.userId == ''){
				this.$popup({
					hint:'标记星号为必填项目',
					hintShow:true
				})
			}else if(this.userId.length < 18){
				this.$popup({
					hint:'请填写正确格式的身份证号码',
					hintShow:true
				})
			}else if(this.flag && !this.userinfo.realityName){
				this.prompt = true;
				this.flag = false;
			}else{
				this.setInfo(); 
			}
		},
		setInfo(){
			let checkSex = document.getElementsByClassName('sex')[0].checked;
			this.axios.post(this.http + '/api/Member/UpdateUserBaseInfo',{
				realityName:this.reallyName,
				nickName:this.nickName,
				sex:checkSex,
				birthDay:this.birthday,
				idcardNumber:this.userId,
				address:this.adress,
				qq:this.qq,
				email:this.mailbox,
				userID:localStorage.getItem('userID')
			}).then(response=>{
				if(response.data.resultCode == 1){
					this.$popup({
						hint:'保存成功',
						hintShow:true
					})
					this.$router.push('/personal')
				}
			}).catch(error=>{
				console.log(error)
			})
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/variable'
@import '~@/assets/css/iconfont/iconfont'
.slide-info-enter-active,.slide-info-leave-active
	transition:all 0.3s
.slide-info-enter,.slide-info-leave-to
	opacity:0
.changeInfo
	position:fixed
	top:45px
	bottom:0
	left:0
	right:0
	z-index:1
	background:#222B36
	overflow-y:auto
	.main
		padding:10px 13px
		color:#fff
		.item
			margin-top:12px
			.top
				height:20px
				line-height:20px
			img
				width:12px
				height:12px
			input
				height:48px
				width:100%
				background:none
				font-size:16px
				border-bottom:.5px solid hsla(0,0%,100%,.08)
				color:#fff
				transition: all .3s
				&::-webkit-input-placeholder
					color:#797979
			.sex-box
				height:48px
				line-height:48px
				color:#797979
				font-size:16px
				.sex
					width:20px
					height:20px
					vertical-align:-6px
				.sex-right
					margin-left:24px
			.div-focus
				border-bottom: .5px solid $special-color
		.input-focus
			color:$special-color
		.care
			height:60px
			line-height:60px
			img
				width:12px
				height:12px
		.confirm
			height:52px
			background:#44D7B6
			text-align:center
			line-height:52px
			font-size: 16px
			border-radius:6px
	.prompt
		position:fixed
		top:50%
		left:50%
		margin-top:-94px
		margin-left:-158px
		width:316px
		height:188px
		background:#fff
		border-radius:4px
		.prompt-content
			margin:16px
			display:flex
			flex-direction:column
			.prompt-title
				height:30px
				line-height:30px
				font-size: 18px
				color: #000000
				font-weight:700
			.prompt-content-c
				margin:16px 10px
				font-size: 14px
				color: #A2A2A2
			.prompt-confirm
				height:48px
				display:flex
				justify-content:space-between
				.confirm-left,.confirm-right
					width:136px
					border: 1px solid #C4C5CB
					border-radius: 6px
					line-height:48px
					text-align:center
					font-size: 16px
					color: #797979
				.confirm-right
					background:#44D7B6
					color:#fff
					border:none
</style>