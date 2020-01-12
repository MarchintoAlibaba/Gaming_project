<template>
	<div class="setBank">
		<div class="main">
			<div class="all">
				<div class="item" v-for="item in cardList">
					<div class="top">
						<img :src="item.logoUrl">
						{{item.bankName}} <span>储蓄卡</span>
					</div>
					<div class="bottom">
						{{item.cardNumber|cardNumber}}
					</div>
				</div>
				<div class="items">
					<router-link to="/personal/setting/setBank/bank">
						<div class="add">
							<i class="iconfont addi">&#xe70a;</i>
							添加银行卡
						</div>
					</router-link>
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
	data(){
		return{
			cardList:[],
		}
	},
	mounted(){
		this.getBankList();
	},
	methods:{
		getBankList(){
			this.axios.post(this.http + '/api/Member/GetUserBankList',{
				userID:localStorage.getItem('userID')
			}).then(response=>{
				if(response.data.resultCode == 1){
					this.cardList = response.data.resultData.userBankList;
				}
			}).catch(error=>{
				console.log(error)
			})
		}
	},
	filters:{//数字格式过滤器
		cardNumber(num){
			let reg = /^(\d{4})(\d+)(\d{4})$/,
				cardCenter = num.replace(reg,"$2"),
				cardStar = '',
				cardCenterL = cardCenter.length;
			for(let i = 0;i < cardCenterL;i ++){
				cardStar += '*';
			}
			let cardS = cardStar.replace(/(.{4})/g,'$1 ');
			return num.replace(reg,"$1 " + cardS + " $3");
		}
	},
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.setBank
	position:absolute
	top:0
	bottom:0
	left:0
	right:0
	background:$background-color
	overflow-y:auto
	.main
		padding:10px
		.item
			border-radius:8px
			background:#303C4C
			display:flex
			justify-content:space-around
			flex-direction: column
			color:#fff
			height:110px
			padding:0 8px 6px
			margin-bottom:16px
			img	
				width:18px
				height:18px
			span
				color:#c2c5c8
			.bottom
				font-size:$words-size-20
		.items
			color:#fff
			border-radius:8px
			padding:14px
			margin-bottom:16px
			border:1px dashed gray
			.addi
				color:$special-color
				font-size:30px
				vertical-align:-6px
</style>