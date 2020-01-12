<template>
	<div class="betRecord" ref="zIndex">
		<div class="index">
			<div class="tabbox two">
				<span :class="{active:actived}" @click="doget">
					未结算
				</span>
				<span :class="{active:!actived}"  @click="doget">已结算</span>
			</div>
		</div>
		<div class="main">
			<scroll class="allcontent" :data="list" :pullUpLoad="true" @scrollUp="scrollUp">
				<div class="all-list">
					<div class="item" v-for="item in list">
						<div class="type">
							<p>
								<span class="c1">{{item.betTypeName}}</span>
							</p>
							<p>
								<span>下注金额：<label class="c3">￥{{item.money}}</label>
								</span>
								<span>
			                    盈利：
			                    <label class="c3">￥{{item.winMoney}}</label></span>
		                	</p>
		                	<p>
		                		<span>订单号：<span class="copy" v-clipboard:copy="item.bid" v-clipboard:success="onCopy" v-clipboard:error="onError">复制单号</span></span>
		                		<span>{{item.betDateTime}}</span>
		                	</p>
						</div>
						<div class="info" v-for="items in item.betsDetails">
							<div class="row">
								<p>
									<span class="c1"><span class=" on w20  gameicon bz-csgo">
										<img class="person" :src="items.egameLogo"/>
									</span>{{items.playSortName}} - {{items.playName}}</span>
									<span class="mc">
										<label>{{items.oddsName}}</label>
									</span>
								</p>
								<p>
									<span>{{items.team}}</span>
									<span class="c2">赔率：{{items.odds}}</span>
								</p>
								<p>
									<span>开赛时间:{{items.matchDateTime}}</span>
									<span class="sy" v-show="item.openState==1">
										<label class="w" :class="{'lose':item.winMoney==0}"></label>
									</span>
								</p>
							</div>
						</div>
					</div>
					<data-loading v-show="dataLoad" :loadingWords='loadingWords'></data-loading>
					<div class="l" v-show="noData">
						<noData :noDataWords="noDataWords" :noDataShow='true'></noData>
						<p class="r">
							<router-link to="/guess">去玩两把</router-link>
						</p>
					</div>
				</div>
			</scroll>
		</div>
	</div>
</template>
<script>
import dataLoading from '@/base/dataLoading'
import scroll from '@/base/scroll'
import noData from '@/base/noData'
export default{
	name:'betRecord',
	components:{
		noData,
		scroll,
		dataLoading,
	},
	data(){
		return{
			actived:true,
			pageI:1,
			list:[],
			noDataWords:'暂时没有记录',
			noData:false,
			dataLoad:false,
			manyLoading:false,
			loadingWords:'上拉加载',
		}
	},
	mounted(){
		this.getBetRecording(this.pageI,0);
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
		scrollUp(){//上拉加载
			if(this.dataLoad && this.manyLoading){//如果有更多数据才加载
				this.$refs.zIndex.style.zIndex = '11';
				this.loadingWords = '<img height="100%" src="static/img/loading.svg" alt="loading">';
				this.pageI ++;
				if(document.getElementsByClassName('active').innerText == '未结算'){//未结算的投注记录
					this.getBetRecording(this.pageI,0);
				}else{//已结算的投注记录
					this.getBetRecording(this.pageI,1);
				}
			}
		},
		doget(e){
			let dom = e.currentTarget;
			this.pageI = 1;
			this.$refs.zIndex.style.zIndex = '1';
			if(dom.className != 'active'){
				this.noData = false;
				if(dom.innerText == '未结算'){
					this.actived = true;
					this.getBetRecording(this.pageI,0);
				}else{
					this.actived = false;
					this.getBetRecording(this.pageI,1);
				}
			}
		},
		getBetRecording(pageI,state){//获取投注记录
			if(pageI == 1){
				this.list = [];
			}
			this.manyLoading = false;
			this.axios.post(this.http + '/api/Member/GetUserBetsList',{
				openState:state,
				pageIndex:pageI,
				pageSize:10,
				userID:localStorage.getItem('userID')
			}).then(response=>{
				this.manyLoading = true;
				if(response.data.resultCode == 1){
					this.list = this.list.concat(response.data.resultData.userBetsList);
					let allCount = response.data.resultData.page.pageRecord;
					if(pageI == 1 && this.list.length == 0){
						this.noData = true;
					}
					if(pageI * 10 >= allCount){
						this.dataLoad = false;
					}else{
						this.dataLoad = true;
					}
				}
			}).catch(error=>{
				console.log(error)
			})
		},
	}
}
</script>
<style scoped lang="stylus">
	@import '~@/assets/css/variable'
	@import '~@/assets/css/iconfont/iconfont'
.betRecord
	position:fixed
	top:45px
	bottom:0
	left:0
	right:0
	z-index:1
	background:$background-color
	display:flex
	flex-direction:column
	.index
		height: 42px
		box-shadow: 0 0 13px rgba(0,0,0,.22)
		font-weight: lighter
		overflow:hidden
		.two
			justify-content: center
			margin-top: 8px
			display: flex
			flex-wrap: nowrap
			padding: 0 10px
			span
				display: inline-block
				width: 100px
				height: 30px
				line-height: 30px
				background: $personal-color
				font-size: $words-size-14
				text-align: center
				border-radius: 2px 0 0 2px;
			.active
				color: $special-color
				background: $home-color
				border: none
	.main
		width: 100%
		height: 100%
		flex: 1
		overflow-y: auto
		margin-bottom: -1px
		position:relative
		.allcontent
			width:100%
			height:100%
			overflow-y:auto
			.all-list
				padding:8px	
				.l
					width: 100%
					text-align: center
					line-height: 30px
					.label
						color:$normal-color
					a
						background: linear-gradient(90deg,#00fe98 0,#00feec)
						color: #202630
						display: inline-block
						padding: 13px 15px
						line-height: 0
						text-align: center
						transition: all .3s
						border-radius: 2px
				.item
					border-radius: 3px
					background: $personal-color
					box-shadow: 0 0 1px 0 hsla(0,0%,100%,.4)
					font-size: $words-size-13
					font-weight: lighter
					color: #7f858f
					margin-bottom:8px
					p
						display: flex
						flex-wrap: nowrap
						justify-content: space-between
						padding: 3px 0
					.c1
						color: $normal-color
						font-size: $words-size-14
					.c2
						color: #ffe87a;
					.sy
						width: 24px
						height: 41px
					.mc
						color: #c2c5c8
						label
							margin-left: 5px
					.type
						padding: 10px
						.copy
							background: #2b3a4a
							display: inline-block
							width: 70px
							text-align: center
							border-radius:3px
							text-align:center
							padding:2px 0
						.c3
							color: $special-color
				.info
					padding: 10px 10px 0
					background: #28323c
					.row
						margin-bottom: 1px
						padding-bottom: 8px
				.person
					margin-right: 3px
					vertical-align: middle
					width: 20px
					height: 20px
					display: inline-block
					position: relative
					bottom: 1px
				.w
					width: 24px
					height: 38px
					display: inline-block
					text-align: center
					background-image:url('~@/assets/images/win.svg')
				.lose
					background-image:url('~@/assets/images/fail.svg')
</style>