<template>
	<div>
		<div class="user-info">
			<div class="user-info-all">
				<div class="user">
					<div class="usinfo">
						<div class="phone">
							<i class="iconfont icon">&#xe663;</i>
						</div>
						<div class="name">
							<h2>{{userinfo.userID}}</h2>
							<div class="user-info-money">
								<div class="money-left">
									<span>姓名：{{userinfo.realityName}}</span>
								</div>
								<div class="money-right">
									<em>|</em>
									<span>
										余额：
										<b>{{userinfo.balance}}</b>
									</span>
								</div>
							</div>
							<div class="user-info-money">
								<div class="money-left">
									<span>彩金：{{userinfo.giftBalance}}</span>
								</div>
								<div class="money-right">
									<em>|</em>
									<span>
										冻结款：
										<b>{{userinfo.freeze}}</b>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="main">
					<div class="item">
						<router-link to="/personal/deposit" class="row">
							<span>
								<i class="iconfont icon">&#xe618;</i>
								存款/充值
							</span>
							<span>
								<i class="iconfont">&#xe657;</i>
							</span>
						</router-link>
						<div class="row" @click="withdraw">
							<span>
								<i class="iconfont icon">&#xe67c;</i>
								提款/提现
							</span>
							<span>
								<i class="iconfont">&#xe657;</i>
							</span>
						</div>
					</div>

					<div class="item">
						<router-link to="/personal/transaction" class="row">
							<span>
								<i class="iconfont icon">&#xe67f;</i>
								交易记录
							</span>
							<span>
								<i class="iconfont">&#xe657;</i>
							</span>
						</router-link>
						<router-link to="/personal/betRecord" class="row">
							<span>
								<i class="iconfont icon">&#xe61f;</i>
								投注记录
							</span>
							<span>
								<i class="iconfont">&#xe657;</i>
							</span>
						</router-link>
						<router-link tag="a" to="/personal/msg" class="row">
							<span>
								<i class="iconfont icon">&#xe642;</i>
								消息
							</span>
							<span>
								<i class="iconfont">&#xe657;</i>
							</span>
						</router-link>
						<router-link to="/personal/agentCenter" class="row" v-if="userinfo.isUion">
							<span>
								<i class="iconfont icon">&#xe642;</i>
								代理商中心
							</span>
							<span>
								<i class="iconfont">&#xe657;</i>
							</span>
						</router-link>
					</div>
					
					<div class="item">
						<router-link to="/personal/changeInfo" class="row">
							<span>
								<i class="iconfont icon">&#xe61f;</i>
								修改个人信息
							</span>
							<span>
								<i class="iconfont">&#xe657;</i>
							</span>
						</router-link>
						<router-link to="/personal/recommend" class="row">
							<span>
								<i class="iconfont icon">&#xe7d5;</i>
								我的推荐
							</span>
							<span>
								<i class="iconfont">&#xe657;</i>
							</span>
						</router-link>
						<router-link to="/personal/agent" class="row">
							<span>
								<i class="iconfont icon">&#xe6c9;</i>
								合营伙伴
							</span>
							<span>
								<i class="iconfont">&#xe657;</i>
							</span>
						</router-link>
						<a href="https://app.goceshi.com/qy/khoq" class="row">
							<span>
								<i class="iconfont icon">&#xe605;</i>
								APP下载
							</span>
							<span>
								<i class="iconfont">&#xe657;</i>
							</span>
						</a>
						<router-link tag="a" to="/personal" class="row">
							<span>
								<i class="iconfont icon">&#xe63c;</i>
								版本号
							</span>
							<span>
								v1.2.1
							</span>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<transition :name="slide_name">
			<router-view></router-view>
		</transition>
		<div class="pswp" v-show="pswp">
			<div class="weui-dialog">
				<div class="weui-dialog__bd">
					<div>
						<i class="iconfont icon-warn">&#xe604;</i>
						请先绑定银行卡
					</div>
				</div>
				<div class="weui-dialog__ft">
					<router-link to="/personal" class="weui-dialog__btn weui-dialog__btn_default" @click.native="pswp=false">
						先看看
					</router-link>
					<router-link to="/personal/setting/setBank/bank" class="weui-dialog__btn weui-dialog__btn_primary" @click.native="pswp=false">
						立即绑定
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'personal',
	data(){
		return{
			pswp:false,
		}
	},
	computed:{
		slide_name:function(){
			return this.$route.meta.name || 'slide';
		},
		userinfo(){
			return this.$store.state.userinfo || false;
		}
	},
	methods:{
		withdraw(){
			if(this.userinfo.isBankValided){
				this.$router.push('/personal/withdrawal');
			}else{
				this.pswp = true;
			}
		}
	},
	watch:{
	   '$route':function(route1,route2){
	        if(route1.meta.index && route2.meta.index){
	        	if(route1.meta.index < route2.meta.index){
	            	this.$route.meta.name = 'name1';
		        }else{
		            this.$route.meta.name = 'name2';
		        }
	        }else{
	        	this.$route.meta.name = 'slide';
	        }
	    }
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.user-info
	position:fixed
	width:100%
	top:45px
	bottom:48px
	background:$background-color
.user-info-all
	width:100%
	height:100%
	overflow-x:hidden
	overflow-y:auto
.icon
	background:linear-gradient(top left,#2a91d4,#00fdb3)
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
.user
	background:$background-color
	.usinfo
		padding:15px
		display: flex
		b
			color: $special-color
			border-radius: 2px
			font-size: $words-size-13
			font-weight: lighter
		.phone
			height: 60px
			line-height: 60px
			width: 60px
			background: hsla(0,0%,100%,.15)
			border-radius: 100%
			text-align: center
		.phone i
			font-size:$words-size-30
		.name
			margin-left:10px
			flex:1
			h2
				font-size:$words-size-18
				font-weight: lighter
				color: $normal-color
				margin-bottom: 5px
			.user-info-money
				width:100%
				display:flex
				span
					margin-right:5px
				em
					font-weight: lighter
					margin: 0 5px
					color: hsla(0,0%,100%,.2)
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
	color: $normal-color
	position:relative
.main .item .row span:first-child i
	margin-right: 10px
	font-size: $words-size-18
.main .item .row span:last-child i
	color: $right-color
.main .item .row:after
	content:''
	position:absolute
	right:0
	border-bottom: 1px solid hsla(0,0%,100%,.02)
	left: 15px;
	bottom:0;
.main .item .row:last-child:after
	border:0
.pswp
	position:fixed;
	top: 0;
	left:0
	right:0
	bottom:0
	background:rgba(rgba(0,0,0,.6))
	z-index:1
	.weui-dialog
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
		overflow: hidden;
		background: linear-gradient(to top, #2b3a4a 0%, #202630);
		.weui-dialog__bd
			padding: 2.7em 20px 1.7em
			color:$normal-color
			.icon-warn
				font-size: $words-size-54
				color:#e0b365
				display:block
				margin-bottom:6px
		.weui-dialog__ft
			position: relative
			line-height: 48px
			font-size: $words-size-18
			display: flex
			&:after
				content: " "
				position: absolute
				left: 0
				top: 0
				right: 0
				height: 1px
				border-top: 1px solid hsla(0,0%,100%,.1)
				color: #d5d5d6
				transform-origin: 0 0
				transform: scaleY(.5)
		.weui-dialog__bd, .weui-dialog__ft
			font-size:$words-size-14 
			.weui-dialog__btn
				display: block
				flex: 1
				color: #3cc51f
				text-decoration: none
				-webkit-tap-highlight-color: rgba(0,0,0,0);
				position: relative
				&:after
					content: " "
					position: absolute
					left: 0
					top: 0
					width: 1px
					bottom: 0
					border-left: 1px solid hsla(0,0%,100%,.1)
					color: #d5d5d6
					transform-origin: 0 0
					transform: scaleX(.5)
			.weui-dialog__btn_default
				color:#b4c0cb
			.weui-dialog__btn_primary
				color:#07feb7

</style>