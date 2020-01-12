<template>
	<div class="payInfo">
		<div class="main" v-show="!paypage">
			<div class="paybox">
				<div class="set">
					<div class="row row-line">
						<span>金额</span> 
						<p class="col">￥<input type="number" v-model="money" placeholder="请输入充值金额" @focus="focusFun" @blur="blurFun"></p>
					</div> 
					<div class="row row-line"><span>备注会员号</span> 
						<p class="col">
						<input type="text" v-model="description" placeholder="请输入备注会员号" @focus="focusFun" @blur="blurFun"></p>
					</div> 
					<div class="amount">
						<i class="iconfont bz-tishi cl1">&#xe606;</i>
						当前通道单笔最低：<b class="money">10</b>，最高
						<b class="money">5000</b>
					</div>
				</div> 
				<div class="promo">
					<div class="tit">选择优惠活动</div> 
					<ul>
						<li class="" @click="preferential=true;nopreferential=false">
							<h2>
								<i class="iconfont bz-uncheckbox" v-show="!preferential">&#xe628;</i>
								<i class="iconfont bz-checkbox" v-show="preferential">&#xe607;</i>
								首存有好礼，最高送8888元
							</h2>
				        </li> 
				        <li class="" @click="nopreferential=true;preferential=false">
				        	<h2>
				        		<i class="iconfont bz-uncheckbox" v-show="!nopreferential">&#xe628;</i>
				        		<i class="iconfont bz-checkbox" v-show="nopreferential">&#xe607;</i>
				        		不参加优惠
				            </h2>
				        </li>
				    </ul>
				</div> 
				<router-link to="/personal/deposit/alipay/001" class="btn btn-danger" @click.native="confirm">确认存款</router-link>
			</div>
		</div>
		<div class="main" v-show="paypage">
			<div class="paybox">
				<div class="set">
					<div class="fixedAmount" style="display: none;">
						<div class="row">
		            		收款银行：
		          		</div> 
			          	<div class="row">
				            金额：200&nbsp;&nbsp;<span class="btn btn-info f-right">复制</span>
				        </div> 
				        <div class="row">
				            收款人：&nbsp;&nbsp;<span class="btn btn-info  f-right">复制</span>
				        </div> 
				        <div class="row">
				            收款卡号：&nbsp;&nbsp;<span class="btn btn-info  f-right">复制</span>
				        </div> 
			        	<div class="msgbox"><i class="iconfont bz-tishi"></i>转账金额必须与提交订单金额一致，否则无法即时到账。</div>
      				</div>
		      		<div class="fixedAmount">
		      			<div class="imgN">
		      				<img src="https://imgs.yzdjres.com/1651c670a3574c2fb43b7d5d524ac90e.png" style="width: 200px; height: 200px;">
		      			</div> 
			      		<div class="moneyN">
			            	金额：{{money}}
			          	</div> 
			          	<div class="msgbox">
			          		<i class="iconfont bz-tishi">&#xe606;</i>转账金额必须与提交订单金额一致，否则无法即时到账。
			          	</div>
		          	</div> 
		          	<div class="fixedAmount" style="display: none;">
		          		<div class="payment">
		          			<div>
		          				<canvas height="480" width="480"></canvas> 
		          				<img src="">
		          			</div>
		          		</div> 
			          	<div class="moneyN">
			            	金额：200
			          	</div> 
			          	<div class="msgbox">
			          		<i class="iconfont bz-tishi"></i>转账金额必须与提交订单金额一致，否则无法即时到账。
			          	</div>
		      		</div> 
		      		<div class="fixedAmount" style="display: none;">
		      			<div class="wordC">
		      				<i class="iconfont bz-zhengque all"></i> <br> 
		      				<p>订单提交成功</p> <br> 
		      				<p>金额：200 </p> <br>
		      			</div>
		      		</div>
      			</div> 
		      	<div style="display: none;">
		      		<a class="btn btn-danger" style="display: none;">确认去存款</a> 
		      		<a href="#/UC/Index" class="btn btn-danger" style="">已完成支付</a>
		      	</div> 
		      	<div>
		      		<router-link to="/personal" class="btn btn-danger">已完成支付</router-link>
		      	</div>
	    	</div>
	  	</div>
	</div>
</template>
<script>
import navHeader from '@/base/navTitle'
import {mapMutations} from 'vuex'
export default{
	name:'payInfo',
	components:{
		navHeader,
	},
	data(){
		return{
			preferential:false,
			nopreferential:false,
			money:null,
			description:null,
			paypage:false
		}
	},
	methods:{
		focusFun(e){
			e.target.parentElement.parentElement.classList.add('div-focus');
		},
		blurFun(e){
			e.target.parentElement.parentElement.classList.remove('div-focus');
		},
		confirm(){
			if(this.money == null){
				this.$popup({
					hint:'请输入存款金额',
					hintShow:true
				})
			}else if(this.description == null){
				this.$popup({
					hint:'请输入转账支付宝昵称',
					hintShow:true
				})
			}else{
				this.$loading({//loading页面加载
					loadShow:true
				})
				this.axios.post(this.http + '/api/Member/UserPay',{
					money:this.money,
					description:this.description,
					userID:localStorage.getItem('userID')
				}).then((response)=>{
					this.$loading({//loading页面加载
						loadShow:false
					})
					if(response.data.resultCode == 1){
						this.paypage = true;
					}
				}).catch((error)=>{
					console.log(error)
				})

			}
		},
		...mapMutations({
			setUserInfo:'SET_USERINFO'
		})
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/variable'
@import '~@/assets/css/iconfont/iconfont'
.payInfo
	position:fixed
	top:45px
	bottom:0
	left:0
	right:0
	background:$background-color
	.main
		overflow: auto
		width: 100%
		height: 100%
		flex: 1
		overflow-y: auto
		margin-bottom: -1px
		.paybox
			margin: 10px
			font-weight: lighter
			.set
				background: #202630
				box-shadow: 0 0 1px 0 hsla(0,0%,100%,.4)
				margin-bottom: 10px
				padding: 15px 10px
				color: #ddd
				.row
					padding: 20px 0
					margin-bottom: 10px
					border-bottom: .5px solid hsla(0,0%,100%,.08)
					span
						margin-bottom: 10px
						display: inline-block
						min-width: 60px
					.col
						display: flex
						flex-wrap: nowrap
						align-content: center
						input
							width: 100%
							margin-left: 15px
							border: 0
							background: transparent
							font-size: 1.4rem
							font-weight: lighter
							color: #fff
				.div-focus
					border-bottom: 0.5px solid $special-color
					color:$special-color
				.amount
					margin-top: 10px
					font-size: 13px
					border-radius: 2px
					background: hsla(0,0%,100%,.06)
					padding: 10px
					i
						position: relative
						top: 1px
						margin-right: 3px
						color: #fff
					.money
						font-size: 14px
						color: #03fcb3
						font-weight: lighter
						margin-left: 3px
			.promo
				background: #202630
				box-shadow: 0 0 1px 0 hsla(0,0%,100%,.4)
				margin-bottom: 10px
				padding: 15px 10px
				color: #ddd
				.tit
					height: 30px
					line-height: 30px
				ul
					li
						background: hsla(0,0%,100%,.1)
						margin-bottom: 10px
						padding: 10px
						border-radius: 2px
						h2
							font-size: 1.4rem
							font-weight: 400
							color: #fff
							line-height: 30px
							padding-bottom: 5px
							i
								font-size: 20px
								margin-right: 10px
								position: relative
								top: 2px
			.btn-danger
				width: 100%
				padding: 20px 15px
				font-size: 1.4rem
				background: linear-gradient(90deg,#00fe98 0,#00feec)
				color: #202630
				display: inline-block
				line-height: 0
				text-align: center
				transition: all .3s
				border-radius: 2px
	.bz-checkbox
		color:$special-color
	.f-right
		margin-right: 10px
	.payment
		text-align: center
		padding-top: 20px
		div
			text-align: center
			padding-top: 20px
			canvas
				height: 160px
				width: 160px
				display: none
			img
				height: 160px
				width: 160px
	.moneyN
		text-align: center
		font-size: 18px
		line-height: 60px	
	.bz-zhengque
		font-size: 54px
		display: block
	.wordC
		text-align: center
	.imgN
		text-align: center
		padding-top: 20px
	.msgbox
		background: hsla(0,0%,100%,.06)
		margin: 20px 8px
		padding: 15px
		color: #03fcb3
		font-size: 13px
		font-weight: lighter
</style>