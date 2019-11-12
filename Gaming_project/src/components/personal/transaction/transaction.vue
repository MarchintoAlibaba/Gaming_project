<template>
	<div class="transaction" ref="zIndex">
		<div class="index">
			<div class="menu">
				<div class="vux-tab-item vux-tab-selected" @click="xxf" index="0">存款记录</div>
				<div class="vux-tab-item" @click="xxf" index="1">提款记录</div>
				<div class="vux-tab-item" @click="xxf" index="2">优惠记录</div>
				<div class="vux-tab-item" @click="xxf" index="3">返水记录</div>
			</div>
		</div>
		<div class="allxxf">
			<scroll class="allcontent" :data="depositList" :pullUpLoad="true" @scrollUp="scrollUp">
				<div class="xxf xxf1">
					<p v-show="!depositList">暂无记录</p>
					<ul v-show="depositList">
						<li v-for="item in depositList">
							<div class="l">
								<span>订单号：{{item.pdid}}</span>
								<span>{{item.payType}}{{item.description}}</span>
								<span>{{item.payDate}} </span>
							</div>
							<div class="r">
								<span class="money">
									<em>￥</em>{{item.money}}
								</span>
								<span>
									<label class="col11">{{item.stateName}}</label>
								</span>
							</div>
						</li>
					</ul>
					<data-loading v-show="dataLoad" :loadingWords='loadingWords'></data-loading>
				</div>
			</scroll>

			<div class="xxf xxf2">
				<p>暂无记录</p>
			</div>
			
			<div class="xxf xxf3">
				<ul>
					<li>
						<div class="l">
							<span>订单号：1180038044984676400</span>
							<span>新人有好礼，注册即送18彩金 </span>
							<span>2019-10-04 16:32:48 </span>
						</div>
						<div class="r">
							<span class="money">
								<em>￥</em>18
							</span>
							<span>
								<label class="col11">成功</label>
							</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="xxf xxf4">
				<ul>
					<li>
						<div class="l">
							<span>投注日期：2019-10-06 </span>
							<span>投注总额：10  </span>
							<span>派发时间：2019-10-07 05:30:00  </span>
						</div>
						<div class="r">
							<span class="money">
								<em>￥</em>0.05
							</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import scroll from '@/base/scroll'
import dataLoading from '@/base/dataLoading'
export default{
	name:'transaction',
	components:{
		scroll,
		dataLoading
	},
	data(){
		return{
			xxfList:true,
			depositList:[],
			alldepositList:null,
			dataLoad:false,
			loadingWords:'上拉加载',
			depositR:this.deposit(10),
		}
	},
	mounted(){
		this.$loading({//loading页面加载
			loadShow:true
		})
		this.depositR();
		this.$loading({//loading页面加载
			loadShow:false
		})
	},
	methods:{
		xxf(e){
			document.getElementsByClassName('vux-tab-selected')[0].classList.remove("vux-tab-selected");
			e.target.classList.add("vux-tab-selected");
			let xxfDiv = document.getElementsByClassName('xxf'),xxfDivL = xxfDiv.length;
			for(let i = 0;i < xxfDivL;i ++){
				xxfDiv[i].style.display = 'none';
			}
			document.getElementsByClassName('xxf')[e.target.getAttribute('index')].style.display = 'block'
		},
		deposit(pageSize){
			let depositPageI = 0,depositPageN = 1;
			return ()=>{
				if(depositPageI < depositPageN){
					depositPageI ++;
					if(depositPageI >=2 ){
						this.$refs.zIndex.style.zIndex = '11';
					}
					this.axios.post(this.http + '/api/Member/GetUserPayDetailsList',{//请求存款记录
						startDate:'',
						endDate:'',
						state:'',
						pageIndex:depositPageI,
						pageSize:pageSize,
						userID:localStorage.getItem('userID')
					}).then((response)=>{
						this.dataLoad = true;
						this.loadingWords = '上拉加载';
						if(response.data.resultCode == 1){
							this.depositList = this.depositList.concat(response.data.resultData.userPayDetailsList);
							if(depositPageI == 1){
								this.alldepositList = response.data.resultData.page.pageRecord;
								depositPageN = Math.ceil(this.alldepositList / pageSize);
							}
							if(depositPageI == depositPageN){
								this.dataLoad = false;
							}
						}
					}).catch((error)=>{
						console.log(error)
					})
				}
			}
		},
		scrollUp(){
			this.loadingWords = '<img height="100%" src="static/img/loading.svg" alt="loading">';
			this.depositR();
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
		.allxxf
			position:fixed
			top:91px
			right:0
			bottom:0
			left:0
			background:$background-color
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
	.xxf>ul>li
		display:flex
		-webkit-box-pack: justify
		justify-content: space-between
		padding: 10px
		background: #202630
		box-shadow: 0 0 1px 0 hsla(0,0%,100%,.4)
		line-height: 23px
		font-weight: lighter
		margin: 8px
		border-radius: 3px
		color: #7f858f
	.xxf>ul>li .l
		flex-wrap: wrap
		display: flex
		flex-direction: column
		align-content: center
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