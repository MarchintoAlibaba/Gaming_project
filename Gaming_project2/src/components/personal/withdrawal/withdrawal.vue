<template>
	<div class="withdrawal">
		<div class="main">
			<div class="content">
				<div class="flex-box_bank">
					<div class="bank_l">
						<img :src="bankListChoose.logoUrl">
						<div class="bank_infor">
							<span class="bank-name">
								{{bankListChoose.bankName}}
							</span>
							<span class="bank-code">
								尾号 {{bankListChoose.cardNumber|card_number}} 储蓄卡
							</span>
						</div>
					</div>
					<div class="bank_r" @click="choose_bank=true">
						切换 <i class="iconfont">&#xe657;</i>
					</div>
				</div>
				<div class="pay-item">
					真实姓名：{{userinfo.realityName}}
				</div>
				<div class="pay-item">
					账户余额：<span class="money">￥{{userinfo.balance}}</span>
				</div>
				<div class="pay-item">
					金额
					<div class="write">
						￥ <input type="number" v-model="money" placeholder="请输入提款金额" @focus="focusFun" @blur="blurFun">
					</div>
				</div>
			</div>
			<div class="submit-information" @click="confirm">
				确认提款
			</div>
		</div>
		<transition name="slide-background">
			<div class="choose-bank" v-show="choose_bank">
			</div>
		</transition>
		<transition name="slide-bank">
			<div class="choose-bottom" v-show="choose_bank">
				<div class="title">
					<span>请选择收款银行卡</span>
					<i class="iconfont" @click="choose_bank=false">&#xe687;</i>
				</div>
				<div class="allbank">
					<div class="cont" v-for='item in bankList' @click="choose_bank_of(item)">
						<div class="retinabb">
							<img :src="item.logoUrl">
							<div class="back-info">
								<span class="bank-name-">{{item.bankName}}</span>
								<span>尾号 {{item.cardNumber|card_number}} 储蓄卡</span>
							</div>
						</div>
					</div>
					<router-link to="/personal/setting/setBank/bank" class="cont">
						<div class="retinabb">
							<i class="iconfont">&#xe70a;</i>
							<div class="back-info">
								添加新的银行收款卡
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
export default{
	name:'withdrawal',
	computed:{
		userinfo(){
			return this.$store.state.userinfo || false
		}
	},
	data(){
		return{
			bankListChoose:{},
			bankList:[],
			money:'',
			choose_bank:false
		}
	},
	mounted(){
		this.getbankList();
	},
	methods:{
		choose_bank_of(item){
			this.bankListChoose = item;
			this.choose_bank = false;
		},
		confirm(){
			if(this.money == ''){
				this.$popup({
					hint:'请输入提款金额',
					hintShow:true
				})
			}else{
				this.axios.post(this.http + '/api/Member/UserDistill',{
					ubid:this.bankListChoose.ubid,
					money:this.money,
					userID:localStorage.getItem('userID')
				}).then(response=>{
					if(response.data.resultCode == 1){
						this.$popup({
							hint:'提款成功',
							hintShow:true
						})
						this.$router.push('/personal')
					}
				}).catch(error=>{
					console.log(error)
				})
			}
		},
		focusFun(e){
			e.target.parentElement.parentElement.classList.add("input-focus");
			e.target.parentElement.classList.add('div-focus');
		},
		blurFun(e){
			e.target.parentElement.parentElement.classList.remove("input-focus");
			e.target.parentElement.classList.remove('div-focus');
		},
		getbankList(){
			this.axios.post(this.http + '/api/Member/GetUserBankList',{
				userID:localStorage.getItem('userID')
			}).then(response=>{
				if(response.data.resultCode == 1){
					this.bankListChoose = response.data.resultData.userBankList[0];
					this.bankList = response.data.resultData.userBankList;
				}
			}).catch(error=>{
				console.log(error)
			})
		}
	},
	filters:{
		card_number(num){//银行卡尾号后四位
			if(num){//当num有值时才进入
				let reg = /(\d+)(\d{4})$/;
				return num.replace(reg,"$2");
			}
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.slide-background-enter-active,.slide-background-leave-active
	transition:all 0.3s
.slide-background-enter,.slide-background-leave-to
	opacity:0
.slide-bank-enter-active,.slide-bank-leave-active
	transition:all 0.3s
.slide-bank-enter,.slide-bank-leave-to
	transform:translate3d(0,100%,0)
.withdrawal
	position:fixed
	width:100%
	top:45px
	bottom:0
	z-index:1
	background:$background-color
	.main
		padding:10px
		.content
			background-color: #202630
			color: #ddd
			margin-bottom: 10px
			box-shadow: 0 0 1px 0 hsla(0,0%,100%,.4)
			font-size: 15px
			padding: 15px 10px
			.flex-box_bank
				width: 100%
				padding-bottom: 10px
				display: flex
				justify-content: space-between
				align-items: center
				.bank_l
					display: flex
					justify-content: space-between
					img
						width:40px
						height:40px
						margin-right:20px
					.bank_infor
						display: flex
						flex-direction: column
						.bank-name
							font-weight: 700
							color: #fff
						.bank-code
							color: #9c9d9d
				.bank_r
					height:40px
					line-height:40px
					i
						vertical-align:-1px
			.pay-item
				height: 60px
				margin-top:20px
				.money
					color:$special-color
				.write
					display:flex
					padding:10px
					margin-bottom:10px
					align-items: center
					border-bottom: .5px solid hsla(0,0%,100%,.08)
					background: no-repeat
					transition: all .3s
					input
						width:100%
						color:#fff
						font-size:15px
						background:none
						margin-left:14px
				.div-focus
					border-bottom: .5px solid $special-color
			.input-focus
				color:$special-color
		.submit-information
			background: linear-gradient(90deg,#00fe98,#00feec)
			color: rgba(0,0,0,.5)
			height: 42px
			line-height: 42px
			font-size: 15px
			margin-top: 22px
			margin-bottom: 11px
			text-align:center
			border-radius: 5px
	.choose-bank
		position:fixed
		top:0
		left:0
		right:0
		bottom:0
		background-color: rgba(0, 0, 0, 0.5)
	.choose-bottom
		position:fixed
		width:100%
		height:51vh
		bottom:0
		background: #28323c
		padding-bottom:10px
		flex-direction: column
		display: flex
		.title
			position: relative
			height: 40px
			line-height: 40px
			background: #29323a linear-gradient(180deg, #29323a, #222a31)
			box-shadow: inset 0 -1px 0 0 rgba(0,0,0,0.24), 0 1px 3px 0 rgba(255,255,255,0.04)
			display: flex
			justify-content: space-between
			padding: 0 10px
			font-size: 13px
			font-weight: lighter
			color: #eee
		.allbank
			width: 100%
			height: 100%
			position: relative
			overflow-y: auto
			.cont
				width: 100%
				flex: 1
				overflow-y: auto
				overflow-x: hidden
				-webkit-overflow-scrolling: touch
				position: relative
				.retinabb
					display: block
					padding: 10px 8px
					text-decoration: none
					color: #7f858f
					cursor: pointer
					display:flex
					position: relative
					align-items:center
					&::after
						pointer-events: none
						position: absolute
						content: ""
						display:inline-block
						height: 1px
						left: 0
						bottom: 0
						background: #222
						right: 0
						transform: scaleY(.3333)
					img,i
						margin-right: 10px
						display: inline-block
						width: 31px
						height: 31px
						line-height: 31px
						vertical-align: middle
						font-size:30px
					.back-info
						display:flex
						flex-direction:column
						justify-content:space-around
						.bank-name-
							color:#fff
</style>