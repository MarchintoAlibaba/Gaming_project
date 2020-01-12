<template>
	<div class="agentCenter" ref="zIndex">
		<div class="index">
			<div class="menu" @click="chooseSort($event,'')">
				<div class="vux-tab-item tab-active">会员列表</div>
				<div class="vux-tab-item">开下级会员</div>
				<div class="vux-tab-item">会员投注记录</div>
				<div class="vux-tab-item">佣金列表</div>
			</div>
		</div>
		<div class="allxxf">
			<div class="showOrH allUser">
				<scroll class="allcontent" :data="userList" :pullUpLoad="true" @scrollUp="scrollUp">
					<div class="xxf">
						<ul class='first-part'>
							<li class="first-li">
								<table>
									<tr>
										<th>ID</th>
										<th>总存款</th>
										<th>注册时间</th>
										<th>充值</th>
									</tr>
									<tr class="data-list" v-for='item in userList'>
										<td>{{item.userID}}</td>
										<td>{{item.balance}}</td>
										<td>{{item.registerTime}}</td>
										<td @click='Details(item)'>会员充值</td>
									</tr>
								</table>
							</li>
							<no-data :noDataShow="noData"></no-data>
						</ul>
						<data-loading v-show="dataLoad" :loadingWords='loadingWords'></data-loading>
					</div>
				</scroll>
			</div>
			<div class="showOrH openUser" v-show="false">
				<div class="row input-row">
					<span>
						<i class="iconfont bz-mima">&#xe663;</i>
					</span>
					<input type="text" v-model="userName" maxlength="16" placeholder="请输入会员账号" @focus="focusFun" @blur="blurFun">
				</div>
				<div class="row input-row">
					<span>
						<i class="iconfont bz-mima">&#xe65e;</i>
					</span>
					<input type="password" v-model="userPassword" maxlength="16" placeholder="请输入会员登录密码" @focus="focusFun" @blur="blurFun">
				</div>
				<div class="row input-row">
					<span>
						<i class="iconfont bz-mima">&#xe733;</i>
					</span>
					<input type="text" v-model="name" maxlength="16" placeholder="请输入会员昵称" @focus="focusFun" @blur="blurFun">
				</div>
				<div class="row btn-row">
					<router-link class="btn btn-danger" tag="a" to="/personal/agentCenter" @click.native="setNewP">
						提交
					</router-link>
				</div>
			</div>
			<div class="showOrH userBet" v-show="false">
				<scroll class="allcontent" :data="userBetL" :pullUpLoad="true" @scrollUp="scrollUp2">
					<div class="userBetxxf xxf">
						<ul>
							<li v-for='item in userBetL' class="line-li">
								<div class="item-top">
									<div class="line-li bet-info">
										<div>{{item.betTypeName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;投注人：{{item.userID}}</div>
										<div class="bet-money" :class="{'do-not':item.openState==0}">
											{{item.openStateName}}
										</div>
									</div>
									<div class="line-li">
										<div>下注金额：<span class="bet-money">{{item.money}}</span></div>
										<div>盈利：<span class="bet-money">{{item.winMoney}}</span></div>
									</div>
									<div class="line-li">
										<div class="back-money">订单号：<span class="copy copy-btn" v-clipboard:copy="item.bid" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制</span></div>
										<div>{{item.betDateTime}}</div>
									</div>
								</div>
								<div class="item-bottom" v-for="items in item.betsDetails">
									<div class="line-li bet-info">
										<div class="logo-img">
											<img v-lazy="items.egameLogo">
											<span>{{items.playSortName}}</span>-
											<span>{{items.playName}}</span>
										</div>
										<div><span>{{items.oddsName}}</span></div>
									</div>
									<div class="line-li">
										<div>{{items.team}}</div>
										<div class="odds-bet">赔率：{{items.odds}}</div>
									</div>
									<div class="line-li">
										<div>开赛时间：{{items.matchDateTime}}</div>
										<div class="win-fail" v-if="item.openState==1">
											<img v-if="!(item.winMoney==0)" src="@/assets/images/win.svg">
											<img v-if="item.winMoney==0" src="@/assets/images/fail.svg">
										</div>
									</div>
								</div>
							</li>
							<no-data :noDataShow="noData"></no-data>
						</ul>
						<data-loading v-show="dataLoad" :loadingWords='loadingWords'></data-loading>
					</div>
				</scroll>
			</div>
			<div class="showOrH backList" v-show="false">
				<scroll class="allcontent" :data="backMoney" :pullUpLoad="true" @scrollUp="scrollUp3">
					<div class="userBetxxf xxf">
						<ul>
							<li v-for='item in backMoney'>
								<div class="item-top">
									<div class="line-li">
										<div class="back-money">返佣金编号：<span class="copy copy-btn" v-clipboard:copy="item.bid" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制</span></div>
										<div class="money-special"><span class="money-symbol">￥</span>{{item.bonus}}</div>
									</div>
									<div class="line-li">
										<div>活跃会员数：{{item.usersCount}}</div>
										<div>净利润：{{item.profit}}</div>
									</div>
									<div class="line-li">
										<div>创建时间：{{item.dateTime}}</div>
										<div>
											<p :class="[{'do-not':item.state==0},{'alreay':item.state==1}]">{{item.stateName}}</p>
										</div>				
									</div>
									<div class="line-li">
										<div>返佣年月：{{item.returnMonth}}</div>
										<div>返佣比列：{{item.scale}}</div>
									</div>
								</div>
							</li>
							<no-data :noDataShow="noData"></no-data>
						</ul>
						<data-loading v-show="dataLoad" :loadingWords='loadingWords'></data-loading>
					</div>
				</scroll>
			</div>
		</div>
		<transition name="slide">
			<div class="details" v-show="detailsS">
				<header>
					<div class="title">
						<div class="l" @click="detailsS=false"><i class="iconfont">&#xe682;</i></div>
						<div class="m">
							{{titleW}}
						</div>
						<div class="l"></div>
					</div>
				</header>
				<div class="registerTime" v-show="backD.registerTime">
					<div class="row person">充值到下级"{{backD.userID}}"</div>
					<div class="row input-row">
						<span>
							<i class="iconfont bz-mima">&#xe618;</i>
						</span>
						<input type="number" v-model="chargeMoney" maxlength="16" placeholder="充值金额" @focus="focusFun" @blur="blurFun">
					</div>
					<div class="row input-row">
						<span>
							<i class="iconfont bz-mima">&#xe610;</i>
						</span>
						<input type="text" v-model="chargeW" placeholder="充值备注" @focus="focusFun" @blur="blurFun">
					</div>
					<div class="row btn-row">
						<router-link class="btn btn-danger" tag="a" to="/personal/agentCenter" @click.native="chargeM(backD.userID)">
							提交
						</router-link>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import noData from '@/base/noData'
import scroll from '@/base/scroll'
import dataLoading from '@/base/dataLoading'
export default{
	name:'agentCenter',
	components:{
		scroll,
		dataLoading,
		noData
	},
	data(){
		return{
			pageI:1,
			userList:[],
			userBetL:[],
			backMoney:[],
			noData:false,
			userName:'',
			userPassword:'',
			name:'',
			detailsS:false,
			backD:{},
			titleW:'',
			chargeMoney:'',
			chargeW:'',
			dataLoad:false,
			loadingWords:'上拉加载',
			manyLoading:true,
		}
	},
	mounted(){
		this.getUserList(this.pageI);
	},
	methods:{
		scrollUp3(){
			if(this.dataLoad && this.manyLoading){
				this.$refs.zIndex.style.zIndex = '11';
				this.loadingWords = '<img height="100%" src="static/img/loading.svg" alt="loading">';
				this.pageI ++ ;
				this.backMoneyList(this.pageI);
			}
		},
		scrollUp2(){
			if(this.dataLoad && this.manyLoading){
				this.$refs.zIndex.style.zIndex = '11';
				this.loadingWords = '<img height="100%" src="static/img/loading.svg" alt="loading">';
				this.pageI ++ ;
				this.userBetList(this.pageI);
			}
		},
		scrollUp(){
			if(this.dataLoad && this.manyLoading){
				this.$refs.zIndex.style.zIndex = '11';
				this.loadingWords = '<img height="100%" src="static/img/loading.svg" alt="loading">';
				this.pageI ++ ;
				this.getUserList(this.pageI);
			}
		},
		chargeM(_subUserID){
			if(this.chargeMoney == ''){
				this.$popup({
					hint:'请输入充值金额',
					hintShow:true
				})
			}else{
				this.axios.post(this.http + '/api/Member/SubUserPay',{
					userID:localStorage.getItem('userID'),
					money:this.chargeMoney,
					description:this.chargeW,
					subUserID:_subUserID
				}).then(response=>{
					if(response.data.resultCode == 1){
						this.$popup({
							hint:response.data.message,
							hintShow:true
						})
						let menu = document.getElementsByClassName('menu')[0].firstElementChild;
						this.chooseSort('',menu);
						this.detailsS = false;
					}
				}).catch(error=>{
					console.log(error)
				})
			}
		},
		setNewP(){
			let regUserId = /^[a-zA-Z]+[a-zA-Z0-9]{4,}$/,//正则匹配5-12位英文或数字的用户名,必须以字母开头
				regPassword = /^[a-zA-Z0-9]{6,}$/;//6-16位英文或数字密码
			if(!regUserId.test(this.userName)){
				this.$popup({
					hint:'请输入5-12位英文或数字的用户名,必须以字母开头',
					hintShow:true
				})
			}else if(!regPassword.test(this.userPassword)){//检测密码是否符合规格
				this.$popup({
					hint:'请输入6-16位英文或数字密码',
					hintShow:true
				})
			}else if(this.name == ''){//检测密码是否一致
				this.$popup({
					hint:'请输入会员昵称',
					hintShow:true
				})
			}else{
				this.axios.post(this.http + '/api/Member/CreateSubUser',{
					subUserID:this.userName,
					password:this.$md5(this.$md5(this.userPassword)),
					name:this.name,
					userID:localStorage.getItem('userID')
				}).then((response)=>{
					if(response.data.resultCode == 1){
						this.$popup({
							hint:response.data.message,
							hintShow:true
						})
						let menu = document.getElementsByClassName('menu')[0].firstElementChild;
						this.chooseSort('',menu);
					}
				}).catch((error)=>{
					console.log(error)
				})
			}
		},
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
		Details(item){//进入详情
			this.detailsS = true;
			this.backD = item;
			if(item.registerTime){
				this.titleW = '会员充值';
			}
		},
		focusFun(e){
			e.target.previousElementSibling.className = "input-focus";
			e.target.parentElement.classList.add('div-focus');
		},
		blurFun(e){
			e.target.previousElementSibling.className = "";
			e.target.parentElement.classList.remove('div-focus');
		},
		chooseSort(e,domDiv){
			let dom,words;
			if(e){
				dom = e.target;
				words = dom.innerText;
			}else if(domDiv){
				dom = domDiv;
				words = domDiv.innerText;
			}
			if(words != document.getElementsByClassName("tab-active")[0].innerText){
				this.pageI = 1;
				this.dataLoad = false;
				this.$refs.zIndex.style.zIndex = '1';
				this.userList = [];
				this.userBetL = [];
				this.backMoney = [];
				document.getElementsByClassName("tab-active")[0].classList.remove('tab-active');
				dom.classList.add('tab-active');
				this.showOrHide();
				switch(words){
					case '会员列表':
					let allUser = document.getElementsByClassName('allUser')[0];
					allUser.style.display = 'block';
					this.getUserList(this.pageI);
					break;
					case '开下级会员':
					let openUser = document.getElementsByClassName('openUser')[0];
					openUser.style.display = 'block';
					break;
					case '会员投注记录':
					let userBet = document.getElementsByClassName('userBet')[0];
					userBet.style.display = 'block';
					this.userBetList(this.pageI);
					break;
					case '佣金列表':
					let backList = document.getElementsByClassName('backList')[0];
					backList.style.display = 'block';
					this.backMoneyList(this.pageI);
					break;
				}
			}
		},
		backMoneyList(pageI){//返佣列表
			this.axios.post(this.http + '/api/Member/GetUnionBonusList',{
				userID:localStorage.getItem('userID'),
				pageIndex:pageI,
				pageSize:10
			}).then(response=>{
				if(response.data.resultCode == 1){
					this.backMoney = this.backMoney.concat(response.data.resultData.unionBonusList)
					let allCount = response.data.resultData.page.pageRecord;
					if(pageI * 10 >= allCount){
						this.dataLoad = false;
					}else{
						this.dataLoad = true;
					}
					if(pageI == 1){
						if(this.backMoney.length == 0){
							this.noData = true;
						}else{
							this.noData = false;
						}
					}
				}
			}).catch(error=>{
				console.log(error)
			})
		},
		userBetList(pageI){//用户投注列表
			this.manyLoading = false;
			this.axios.post(this.http + '/api/Member/GetSubUserBetsList',{
				userID:localStorage.getItem('userID'),
				pageIndex:pageI,
				pageSize:10
			}).then(response=>{
				this.manyLoading = true;
				if(response.data.resultCode == 1){
					this.userBetL = this.userBetL.concat(response.data.resultData.userBetsList);
					let allCount = response.data.resultData.page.pageRecord;
					if(pageI * 10 >= allCount){
						this.dataLoad = false;
					}else{
						this.dataLoad = true;
					}
					if(pageI == 1){
						if(this.userBetL.length == 0){
							this.noData = true;
						}else{
							this.noData = false;
						}
					}
				}
			})
		},
		showOrHide(){
			let domS = document.getElementsByClassName('showOrH'),
				domSL = domS.length;
			for(let i = 0;i < domSL;i ++){
				domS[i].style.display = 'none';
			}
		},
		getUserList(pageI){//用户好友列表
			this.manyLoading = false;
			this.axios.post(this.http + '/api/Member/GetRecommendInfoList',{
				pageIndex:pageI,
				pageSize:30,
				userID:localStorage.getItem('userID')
			}).then(response=>{
				this.manyLoading = true;
				if(response.data.resultCode == 1){
					this.userList = this.userList.concat(response.data.resultData.recommendInfoList);
					let allCount = response.data.resultData.page.pageRecord;
					if(pageI * 30 >= allCount){
						this.dataLoad = false;
					}else{
						this.dataLoad = true;
					}
					if(pageI == 1){
						if(this.userList.length == 0){
							this.noData = true;
						}else{
							this.noData = false;
						}
					}
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
.agentCenter
	position:fixed
	top:45px
	right:0
	bottom:0
	left:0
	z-index:1
	background:$background-color
	display: flex
	flex-direction: column
	.index
		height:46px
		box-shadow: 0 0 13px rgba(0,0,0,.22)
	    font-weight: lighter
	    .menu
			height: 42px
			line-height: 42px
			display:flex
			justify-content:space-around
			.vux-tab-item
				flex:1
				height: 100%;
				background-size: 100% 1px;
				font-size: 14px;
				text-align: center;
				line-height: 44px;
				color: rgb(194, 197, 200);
			.tab-active
				color: #07f1b7;
				position:relative
				&:after 
					position:absolute
					content:''
					width:76%
					height:1px
					background:$special-color
					bottom:0
					left:12%
	.allxxf
		width:100%
		height:100%
		flex:1
		.showOrH
			width:100%
			height:100%
			position:relative
			.allcontent
				width:100%
				height:100%
				overflow-y:auto
				.xxf
					padding:8px	
					ul
						li.first-li
							padding:10px
							display:flex
							justify-content:space-between
							line-height: 23px
							font-weight: lighter
							color: #7f858f	
							table
								width:100%
								text-align:center
								border:none
								tr
									height:40px
									border-bottom:1px solid hsla(0,0%,100%,.04)
									&:last-child
										border:none
								tr.data-list
									td
										color:#fff
										&:last-child
											color:#07f1b7
								tr.userList
									td
										&:last-child
												color:#ccc
						p
							height: 30px
							line-height: 30px
							font-size: 1.4rem
						p.betNumber
							color:#fff
						li
							border-radius: 3px
							margin-bottom:8px
							overflow:hidden
							.line-li
								margin:6px 0
								align-items:center
								display:flex
								justify-content:space-between
								font-weight: lighter
								color: #7f858f
								.back-money
									color: #c2c5c8
								.money-special
									font-size:20px
									color:#07f1b7
									.money-symbol
										font-size:12px
								.copy
									background: #2b3a4a
									color:#7f858f
									display: inline-block
									width: 70px
									text-align: center
									border-radius:3px
									text-align:center
									padding:2px 0
								p.do-not
									color:#f00
								p.alreay
									color:#03fcb3
								.bet-money
									color:$special-color
								.odds-bet
									width:90px
									text-align:right
									color:#ffe87a
								.win-fail
									img
										display:block
										width:24px
										height:41px
								.logo-img
									img
										width:20px
										height:20px
										vertical-align:-4px
							.bet-info
								color:#fff
								.do-not
									color:#f00
							.item-bottom
								background:#28323c
								padding:10px
								border-bottom:1px solid hsla(0,0%,100%,.04)
								&:last-child
									border:none
							.item-top
								background: #202630
								padding:10px
					.first-part
						background:#202630
						border-radius:3px
	.details
		position:fixed
		top:0
		right:0
		bottom:0
		left:0
		z-index:1
		background:$background-color
		.title
			height:45px
			width:100%
			display:flex
			line-height:45px
			.l
				width:50px
				text-align:center
				color:#fff
				font-size:16px
				height:100%
			.m
				flex:1
				text-align:center
				color:#fff
				font-size:16px
.openUser,.registerTime
	padding:10px	
	.row span
		display: inline-block
		text-align: left
		line-height: 30px
		margin-right: 10px
	.input-row
		border-bottom: .5px solid hsla(0,0%,100%,.08)
		background: no-repeat
		transition: all .3s
	.div-focus
		border-bottom: .5px solid $special-color
		span
			color:$special-color
	.row
		height: 50px
		margin-bottom: 10px
		padding: 10px
		display: flex
		justify-content: flex-start
		flex-wrap: nowrap
		align-content: center
		border-radius: 2px
		box-sizing: border-box
		input
			width: 100%
			border: none
			background: transparent
			color: $normal-color
			font-size: $words-size-14
			outline:none
			&::placeholder
				color:#fff
				font-weight:lighter
	.btn-row
		padding:10px 0
		.btn
			width: 100%
			padding: 20px 15px
			font-size: $words-size-14
			background: linear-gradient(90deg,#00fe98 0,#00feec)
			color: $personal-color
			text-align:center
			line-height:0
			border-radius:2px
	.person
		color:#fff
		text-align:center
		justify-content:center
		align-items:center		
</style>