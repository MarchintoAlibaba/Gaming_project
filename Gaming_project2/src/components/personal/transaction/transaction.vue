<template>
	<div class="transaction" ref="zIndex">
		<div class="index">
			<div class="menu">
				<div class="vux-tab-item vux-tab-selected" @click="xxf">存款记录</div>
				<div class="vux-tab-item" @click="xxf">提款记录</div>
				<div class="vux-tab-item" @click="xxf">优惠记录</div>
				<div class="vux-tab-item" @click="xxf">返水记录</div>
			</div>
		</div>
		<div class="allxxf">
			<scroll class="allcontent" :data="depositList" :pullUpLoad="true" @scrollUp="scrollUp">
				<div class="xxf">
					<ul>
						<li v-for="item in depositList">
							<div class="l" v-if="choose=='存款记录'">
								<span>订单号：
									<span class="copy" v-clipboard:copy="item.pdid" v-clipboard:success="onCopy" v-clipboard:error="onError">复制单号</span>
								</span>
								<span>{{item.payType}}{{item.description}}</span>
								<span>{{item.payDate}} </span>
							</div>
							<div class="l" v-if="choose=='提款记录'">
								<span>订单号：
									<span class="copy" v-clipboard:copy="item.ddid" v-clipboard:success="onCopy" v-clipboard:error="onError">复制单号</span>
								</span>
								<span class="description">{{item.description}}</span>
								<span>提款时间：{{item.distillDate}} </span>
							</div>
							<div class="l" v-if="choose=='优惠记录'">
								<span>订单号：
									<span class="copy" v-clipboard:copy="item.pid" v-clipboard:success="onCopy" v-clipboard:error="onError">复制单号</span>
								</span>
								<span>{{item.title}}</span>
								<span>{{item.distillDate}}</span>
							</div>
							<div class="l" v-if="choose=='返水记录'">
								<span>投注日期：{{item.returnDay}}</span>
								<span>投注总额：{{item.betSum}}</span>
								<span>派发时间：{{item.returnDate}}</span>
							</div>
							<div class="r">
								<span class="money">
									<em>￥</em>{{item.money}}
								</span>
								<span class="state-name">
									<label class="col11">{{item.stateName}}</label>
								</span>
							</div>
						</li>
					</ul>
					<no-data :noDataShow="noData"></no-data>
					<data-loading v-show="dataLoad" :loadingWords='loadingWords'></data-loading>
				</div>
			</scroll>
		</div>
	</div>
</template>
<script>
import noData from '@/base/noData'
import scroll from '@/base/scroll'
import dataLoading from '@/base/dataLoading'
export default{
	name:'transaction',
	components:{
		scroll,
		dataLoading,
		noData
	},
	data(){
		return{
			depositList:[],
			dataLoad:false,
			noData:false,
			loadingWords:'上拉加载',
			pageI:1,
			manyLoading:true,
			choose:'存款记录',
			api:'/api/Member/GetUserPayDetailsList'
		}
	},
	mounted(){
		this.deposit(this.choose,this.pageI,this.api);
	},
	methods:{
		onCopy(e){
			this.$popup({
					hint:'复制成功',
					hintShow:true
				})
		},
		onError(e){
			this.$popup({
				hint:'复制失败,请点击重试',
				hintShow:true
			})
		},
		xxf(e){
			let dom = e.target;
			if(dom.classList.value.indexOf('vux-tab-selected') == -1){
				document.getElementsByClassName('vux-tab-selected')[0].classList.remove("vux-tab-selected");
				dom.classList.add("vux-tab-selected");
				this.pageI = 1;
				this.noData = false;
				this.depositList = [];
				if(dom.innerText == '存款记录'){
					this.choose = '存款记录';
					this.api = '/api/Member/GetUserPayDetailsList';
					this.deposit(this.choose,this.pageI,this.api);
				}else if(dom.innerText == '提款记录'){
					this.choose = '提款记录';
					this.api = '/api/Member/GetUserDistillDetailsList';
					this.deposit(this.choose,this.pageI,this.api);
				}else if(dom.innerText == '优惠记录'){
					this.choose = '优惠记录';
					this.api = '/api/Member/GetUserPromotionDetailsList';
					this.deposit(this.choose,this.pageI,this.api);
				}else if(dom.innerText == '返水记录'){
					this.choose = '返水记录';
					this.api = '/api/Member/GetUserReturnDetailsList';
					this.deposit(this.choose,this.pageI,this.api);
				}
			}
		},
		deposit(choose,pageI,api){
			this.manyLoading = false;
			this.axios.post(this.http + api,{//请求存款记录
				pageIndex:pageI,
				pageSize:10,
				userID:localStorage.getItem('userID')
			}).then((response)=>{
				this.$refs.zIndex.style.zIndex = '1';
				this.manyLoading = true;
				this.loadingWords = '上拉加载';
				if(response.data.resultCode == 1){
					if(choose == '存款记录'){
						this.depositList = this.depositList.concat(response.data.resultData.userPayDetailsList);
					}else if(choose == '提款记录'){
						this.depositList = this.depositList.concat(response.data.resultData.userDistillDetailsList);
					}else if(choose == '优惠记录'){
						this.depositList = this.depositList.concat(response.data.resultData.userPromotionDetailsList);
					}else if(choose == '返水记录'){
						this.depositList = this.depositList.concat(response.data.resultData.userReturnDetailsList);
					}
					console.log(this.depositList)
					if(pageI == 1 && this.depositList.length == 0){
						this.noData = true;
					}
					let pageRecord = response.data.resultData.page.pageRecord;
					if((pageI * 10) >= pageRecord){
						this.dataLoad = false;
					}else{
						this.dataLoad = true;
					}
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		scrollUp(){
			if(this.dataLoad && this.manyLoading){
				this.pageI ++;
				this.$refs.zIndex.style.zIndex = '11';
				this.loadingWords = '<img height="100%" src="static/img/loading.svg" alt="loading">';
				this.deposit(this.choose,this.pageI,this.api);
			}
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/variable'
@import '~@/assets/css/iconfont/iconfont'
	.transaction
		position:fixed
		top:45px
		right:0
		bottom:0
		left:0
		z-index:1
		background:$background-color
		display:flex
		flex-direction: column
		.allxxf
			flex:1
			width:100%
			height:100%
			.xxf
				display:none
				padding-bottom:10px
			.xxf:nth-of-type(1)
				display:block	
			.xxf>p
				text-align:center
				line-height:100px
		.index
			height:46px
			box-shadow: 0 0 13px rgba(0,0,0,.22)
		    font-weight: lighter
		    .menu
				height: 42px
				line-height: 42px
				display:flex
				.vux-tab-item
					flex: 1;
					width: 100%;
					height: 100%;
					background-size: 100% 1px;
					font-size: 14px;
					text-align: center;
					line-height: 44px;
					color: rgb(194, 197, 200);
				.vux-tab-selected
					color: #07f1b7;
					position:relative
				.vux-tab-selected:after
					position:absolute
					content:''
					width:60px
					height:1px
					background:$special-color
					bottom:0
					left:50%
					margin-left:-30px
	.xxf>ul
		padding-top:8px
	.xxf>ul>li
		display:flex
		justify-content: space-between
		padding: 10px
		background: #202630
		box-shadow: 0 0 1px 0 hsla(0,0%,100%,.4)
		line-height: 23px
		font-weight: lighter
		margin: 8px
		border-radius: 3px
		color: #7f858f
	.xxf>ul>li:first-child
		margin-top:0
	.xxf>ul>li .l
		flex-wrap: wrap
		display: flex
		flex-direction: column
		align-content: center
	.xxf>ul>li .l span.copy
		background: #2b3a4a
		display: inline-block
		width: 70px
		text-align: center
		border-radius:3px
		text-align:center
		padding:1px 0
	.xxf>ul>li .l span:first-child
		color: #c2c5c8	
	.xxf>ul>li .r
		display: flex
		flex-wrap: wrap
		flex-direction: column
		text-align: center
	.xxf>ul>li .r .money
		font-size: 20px
		font-weight: 300
		color: #03fcb3
	.xxf>ul>li .r .state-name
		text-align:right
	.xxf>ul>li .r .money em
		font-style: normal
		font-size: 1.2rem
	.col11   
		color: #6dd169
	.allcontent
		width:100%
		height:100%
		overflow-y:auto
</style>