<template>
	<div class="bank">
		<div class="main">
			<div class="bankbox">
				<div class="row cardname">
					<span>持卡人</span>
					<span>
						{{userinfo.realityName}}
						<label>
							持卡人姓名必须与注册姓名一致，否则无法提款
						</label>
					</span>
				</div>
				<div class="row cardno">
					<span>卡号</span>
					<input type="tel" v-model="cardN" placeholder="请输入卡号" maxlength="19" @focus="focusFun" @blur="blurFun">
				</div>
				<div class="row cardbank">
					<span>开户行</span>
					<input readonly="readonly" v-model="openBank" placeholder="请输入开户银行" @focus="focusFun" @blur="blurFun" @click="bankList">
					<i class="iconfont bz-you">&#xe657;</i>
				</div>
				<div class="row cardno">
					<span>分行</span>
					<input type="tel" v-model="subbranch" placeholder="请输入开户行分行"  @focus="focusFun" @blur="blurFun">
				</div>
				<div class="row btnbox">
					<div class="btn btn-danger" @click="bindingBank">
						确定
					</div>
				</div>
			</div>
		</div>
		<transition name="slidea">
			<div class="vux-popup-dialog" v-show="allbanks">
				<div class="bottombox">
					<div class="title">
						<span>请选择开户银行</span>
						<span @click="allbanks=false">
							<i class="iconfont bz-close">&#xe687;</i>
						</span>
					</div>
					<div class="allbank">
						<div class="cont banks" @click="allbanks=false;openBank=item.name" v-for='item in baseBankList'>
							<span class="retinabb">
								<span class="bankicon gsyh"><img width="100%" :src="item.logoUrl"></span>{{item.name}}
							</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default{
	name:'bank',
	computed:{
		userinfo:function(){
			return this.$store.state.userinfo || '';
		}
	},
	data(){
		return{
			allbanks:false,
			cardN:null,
			openBank:null,
			baseBankList:null,
			subbranch:null,
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
		bankList(){
			this.allbanks = true;
			this.axios.post(this.http + '/api/BaseInfo/GetBaseBankList',{
				pageIndex:1,
				pageSize:10
			}).then((response)=>{
				if(response.data.resultCode == 1){
					this.baseBankList = response.data.resultData.baseBankList;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		bindingBank(){
			if(this.cardN == null){
				this.$popup({
					hint:'请输入有效的银行卡号',
					hintShow:true
				})
			}else if(this.openBank == null){
				this.$popup({
					hint:'请选择银行',
					hintShow:true
				})
			}else if(this.subbranch == null){
				this.$popup({
					hint:'请输入分行地址',
					hintShow:true
				})
			}else{
				this.axios.post(this.http + '/api/Member/BindBank',{
				bankID:this.openBank,
				subbranch:this.subbranch,
				cardNumber:this.cardN,
				userID:this.userinfo.userID
				}).then((response)=>{
					if(response.data.resultCode == 1){
						this.$popup({
							hint:response.data.message,
							hintShow:true
						})
						this.$router.push('/personal');
					}
				}).catch((error)=>{
					console.log(error)
				})
			}
			
		}
	},
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.slidea-enter-active,.slidea-leave-active
	transition:all 3s
.slidea-enter,.slidea-leave-to
	transform:translate3d(0,100%,0)
.bank
	position:absolute
	top:0
	left:0
	right:0
	bottom:0
	background:$background-color
	.main
		width:100%
		height:100%
		.bankbox
			padding:10px	
			.btnbox
				margin-top:20px
				.btn
					display: inline-block
					padding: 13px 15px
					line-height: 0
					text-align: center
					-webkit-transition: all .3s
					transition: all .3s
					color: $normal-color
					border-radius: 2px
					width: 100%
					box-sizing:border-box
					padding: 20px 15px
					font-size: $words-size-14
					background: linear-gradient(90deg,#00fe98 0,#00feec)
					color: $personal-color
			input 
				width: 100%
				height: 20px
				line-height: 20px
				border: none
				background: transparent;
				color: $normal-color
				margin: 10px 0
				font-size: $words-size-14
			.cardbank
				display: flex
				padding: 10px
				align-items: center
				padding:10px
				border-bottom: 0.5px solid rgba(255,255,255,0.08)
				.bz-you
					color:$right-color
				span
					width:70px
			.cardno
				border-bottom: .5px solid hsla(0,0%,100%,.08)
				padding: 0 10px
			.div-focus
				border-bottom: .5px solid $special-color
				.input-focus
					color:$special-color
			.cardname
				display: flex
				padding: 10px
				background: hsla(0,0%,100%,.1)
				span:first-child
					width:70px
				span:last-child
					color:$normal-color
					label
						display: block
						font-size: $words-size-12
						color: $special-color
						margin-top: 5px
			.row
				margin-bottom: 20px
	.vux-popup-dialog
		height: 100vh
		z-index:1
		position: fixed
		left: 0
		bottom: 0
		width: 100%
		background: rgba(0,0,0,.5)
		transition-property: transform
		transition-duration: .3s
		max-height: 100%
		overflow-y: auto
	.bottombox
		width: 100%
		height: 100%
		display: flex
		flex-direction: column
		position: fixed
		left: 0
		bottom: 0
		overflow-x: hidden
		overflow-y: auto
		max-height: 50vh
		background: #28323c
		.title
			position: relative
			height: 40px
			line-height: 40px
			background: #29323a linear-gradient(180deg,#29323a,#222a31)
			box-shadow: inset 0 -1px 0 0 rgba(0,0,0,.24), 0 1px 3px 0 hsla(0,0%,100%,.04)
			display: flex
			-webkit-box-pack: justify
			justify-content: space-between
			padding: 0 10px
			font-size: $words-size-13
			font-weight: lighter
			color: #eee
		.allbank
			width:100%
			height:100%
			position: relative
			overflow-y: auto
			overflow-x: hidden
			.cont
				width: 100%
				height:51px
				flex: 1
				overflow-y: auto
				overflow-x: hidden
				-webkit-overflow-scrolling: touch
				position: relative
				.retinabb
					display: block
					padding: 15px 10px
					text-decoration: none
					color: #7f858f
					cursor: pointer
					position: relative
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
						transform: scaleY(.3333);
					.bankicon
						margin-right: 10px
						display: inline-block
						width: 21px
						height: 21px
						line-height: 21px
						vertical-align: middle
				span
					i.bz-close
						font-size:$words-size-20
</style>