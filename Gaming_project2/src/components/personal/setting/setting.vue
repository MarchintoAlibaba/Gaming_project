<template>
	<div class="setting">
		<div class="main">
			<div class="item">
				<div class="row">
					<span>
						姓名
					</span>
					<span>
						{{userinfo.realityName}}
					</span>
				</div>
				<router-link to="/personal/setting/phone" class="row">
					<span>
						手机
					</span>
					<span>
						<i class="iconfont">{{userinfo.mobile}}&ensp;&#xe657;</i>
					</span>
				</router-link>
			</div>
			<div class="item">
				<router-link :to="'/personal/setting/'+(userinfo.isBankValided?'setBank':'setBank/bank')" class="row">
					<span>
						设置提款卡
					</span>
					<span>
						<span v-if="!userinfo.isBankValided"><i class="iconfont icon-warn">&#xe604;</i>未设置</span>
						<span v-if="userinfo.isBankValided"><i class="iconfont bz-zhengque">&#xe69e;</i>已设置</span>
						&ensp;<i class="iconfont">&#xe657;</i>
					</span>
				</router-link>
				<router-link to="/personal/setting/pwd" class="row">
					<span>
						修改密码
					</span>
					<span>
						<i class="iconfont">&#xe657;</i>
					</span>
				</router-link>
			</div>
			<div class="item">
				<router-link to="/" class="row" @click.native="loginout">
					<span>
						退出
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
	name:'setting',
	computed:{
		userinfo:function(){
			return this.$store.state.userinfo || false
		}
	},
	methods:{
		loginout(){
			this.axios.post(this.http + '/api/Member/Logout').then((response)=>{
				localStorage.removeItem('accessToken');
				localStorage.removeItem('userID');
				if(response.data.resultCode == 1){
					this.$popup({
						hint:response.data.message,
						hintShow:true
					})
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.setting
	top:45px
	right:0
	bottom:0
	left:0
	position:fixed
	background:$background-color
	z-index:1
.main
	width:100%
	height:100%
.main .item
	margin: 8px
	border-radius: 3px
	background: $personal-color
	box-shadow: 0 0 1px 0 hsla(0,0%,100%,.4)
.main .item .row
	display: flex
	justify-content: space-between
	align-items: center
	padding: 15px
	font-weight: lighter
	color: #fff
	position:relative
.main .item .row span:first-child i
	margin-right: 10px
	font-size: $words-size-18
.main .item .row span:last-child i,.main .item .row span:last-child
	color: #ccc;
.main .item .row span:last-child i.icon-warn
	color:#ffe87a
.main .item .row:after
	content:''
	position:absolute
	right:0
	border-bottom: 1px solid hsla(0,0%,100%,.02)
	left: 15px;
	bottom:0;
.main .item .row:last-child:after
	border:0
.main .item .row span:last-child i.bz-zhengque
	color:#5eca4d
			
</style>