<template>
	<div class="guess guesszIndex" ref='zIndex'>
		<div class="main">
			<header class="header">
				<nav class="menu">
					<div class="l">
						<ul class="clearfix">
							<li class="active"><a mark="today" @click="getAllList">今日<span>{{gameCount.sD1}}</span></a></li> 
							<li><a mark="Roller" @click="getAllList">滚盘<span>{{gameCount.sD2}}</span></a></li> 
							<li><a mark="gameBefore" @click="getAllList">赛前<span>{{gameCount.sD3}}</span></a></li> 
							<li><a mark="gameResult" @click="getAllList">赛果</a></li> 
							<li><a @click="chooseClick">筛选 <i class="iconfont bz-shaixuan">&#xe601;</i></a></li>
          				</ul>
          			</div>
          		</nav>
          	</header>
          	<div class="notice">
          		<div class="l"><img src="@/assets/images/laba.svg"></div>
          		<div class="r">
          			<marquee id="marquee"  scrollamount="3" scroll>
          				<ul>
          					<li>{{announcementL}}</li>
          				</ul>
          			</marquee>
          		</div>
          	</div>
          	<div class="index" v-show="PageCount" ref="minHeightS" :computed1="oddschange" :computed2="gamechange" :computed3="bettingModuleList" :computed4="playchange">
          		<scroll class="allcontent" :probeType="2" :data="gameMacthList" :pullUpLoad="true" :pullDownRefresh="true" @scrollUp="scrollUp" @scrollDown="scrollDown" @scrollDownT="scrollDownT" @scrollDownF="scrollDownF">
          			<div class="padding-bottom" ref="minHeightB">
          				<div class="dataLoadingT">
							<div v-html="upLoadingWords" class='Lo'>
							</div>
						</div>
						<div class="dataLoadingH" v-show="scrollDownL">
							<div class='Lo'>
								<img height="100%" src="static/img/loading.svg" alt="loading">
							</div>
						</div>
		          		<div class="item" v-for="(item,index) in gameMacthList" @click="toBet(item.mid,item.state)" :class="{'cancel':item.state==4}">
		          			<div class="tbox">
		          				<div class="tname">
		          					<img class="w20" :src="item.egameLogo">
		          					<label>{{item.matchName}}<b> - {{item.bo}}</b></label>
		          				</div> 
		          				<div class="more"> +{{item.playCount}} </div>
		          			</div> 
		          			<div class="mbox">
		          				<div class="team">
		          					<div class="tmlogo"><img :src="item.egEgameMatchTeamList[0].teamLogo"></div> 
		          					<div class="tmname">{{item.egEgameMatchTeamList[0].team}}</div>
		          				</div> 
		          				<div class="score">
		          					<span class="scorebox" v-show="item.state!=5&&item.state!=6">
		          						<label>
		          							<i class="iconfont">{{(oddsRealChange[index].result||item.result)|gameResultLeft()}}</i>
		          						</label> 
		          						<em>:</em>
		          						<label>
		          							<i class="iconfont">{{(oddsRealChange[index].result||item.result)|gameResultRight()}}</i>
		          						</label>
		          					</span>
		          					<span class="time" v-show="item.state==5||item.state==6">{{item.matchDateTime|timestampToHours}}</span>
		          				</div> 
		          				<div class="team">
		          					<div class="tmlogo"><img :src="item.egEgameMatchTeamList[1].teamLogo"></div> 
		          					<div class="tmname">{{item.egEgameMatchTeamList[1].team}}</div>
		          				</div>
		          			</div> 
		          			<div class="fbox">
		          				<div class="tmodds">
		          					<span class="odds verification left" :edoid="item.egEgameMatchTeamList[0].edoid" :class="['odds-change'+oddsRealChange[index].oddsStateLeft,{'odd-active':betEdoid.indexOf(item.egEgameMatchTeamList[0].edoid) != -1}]" v-if="item.egEgameMatchTeamList[0].result==='0'" @click.stop="addBetList($event,item,index)">
		          						<i class="iconfont odds-shang" v-show="oddsRealChange[index].oddsStateLeft==1 && (oddsRealChange[index].betStateLeft||item.egEgameMatchTeamList[0].oddsBetState)==='1' && (oddsRealChange[index].betState||item.betState) === '1' && item.playBetState != '0'">&#xe609;</i>
		          						<i class="iconfont odds-xia" v-show="oddsRealChange[index].oddsStateLeft==2 && (oddsRealChange[index].betStateLeft||item.egEgameMatchTeamList[0].oddsBetState)==='1' && (oddsRealChange[index].betState||item.betState) === '1' && item.playBetState != '0'">&#xe641;</i>
		          						<i class="iconfont odds-suo" v-show="(oddsRealChange[index].betStateRight||item.egEgameMatchTeamList[0].oddsBetState)==='0' || (oddsRealChange[index].betState||item.betState) === '0' || item.playBetState == '0'">&#xe65e;</i>
		          						<span v-show="(oddsRealChange[index].betStateLeft||item.egEgameMatchTeamList[0].oddsBetState)==='1' && (oddsRealChange[index].betState||item.betState) === '1' && item.playBetState != '0'">{{oddsRealChange[index].oddsLeft||item.egEgameMatchTeamList[0].odds}}</span>
									</span>
									<span class="sy-win" v-if="item.egEgameMatchTeamList[0].result==='1'"></span>
									<span class="sy-fail" v-if="item.egEgameMatchTeamList[0].result==='2'"></span>
								</div> 
								<div class="tmstatus">
									<span class="toStart" v-if="(oddsRealChange[index].state||item.state)==6"><img src="@/assets/images/commingGame.svg">未开始</span>
		    						<span class="comingGame" v-if="(oddsRealChange[index].state||item.state)==5"><img src="@/assets/images/moveBall.svg">即将滚盘</span>
		    						<span class="play" v-if="(oddsRealChange[index].state||item.state)==2"><img src="@/assets/images/playing.svg">直播中</span>
		    						<span class="play" v-if="(oddsRealChange[index].state||item.state)==1"><img src="@/assets/images/movingBall.svg">滚盘中</span>
		    						<span class="gameEnd" v-if="(oddsRealChange[index].state||item.state)==3">{{item.updateDateTime|gameFinishTime(item.updateDateTime)}}<br><b>{{item.updateDateTime|gameFinishTimeWeek(item.updateDateTime)}}</b></span>
		    						<span class="gameCancle" v-if="(oddsRealChange[index].state||item.state)==4">{{item.updateDateTime|gameFinishTime(item.updateDateTime)}}<br><b>{{item.updateDateTime|gameFinishTimeWeek(item.updateDateTime)}}</b></span>
								</div> 
								<div class="tmodds">
									<span class="odds verification right" :edoid="item.egEgameMatchTeamList[1].edoid" @click.stop="addBetList($event,item,index)" :class="['odds-change'+oddsRealChange[index].oddsStateRight,{'odd-active':betEdoid.indexOf(item.egEgameMatchTeamList[1].edoid) != -1}]" v-if="item.egEgameMatchTeamList[1].result==='0'">
										<i class="iconfont odds-shang" v-show="oddsRealChange[index].oddsStateRight==1 && (oddsRealChange[index].betStateRight||item.egEgameMatchTeamList[1].oddsBetState)==='1' && (oddsRealChange[index].betState||item.betState) === '1' && item.playBetState != '0'">&#xe609;</i>
		          						<i class="iconfont odds-xia" v-show="oddsRealChange[index].oddsStateRight==2 && (oddsRealChange[index].betStateRight||item.egEgameMatchTeamList[1].oddsBetState)==='1' && (oddsRealChange[index].betState||item.betState) === '1' && item.playBetState != '0'">&#xe641;</i>
		          						<i class="iconfont odds-suo" v-show="(oddsRealChange[index].betStateRight||item.egEgameMatchTeamList[1].oddsBetState)==='0' || (oddsRealChange[index].betState||item.betState) === '0' || item.playBetState == '0'">&#xe65e;</i>
										<span v-show="(oddsRealChange[index].betStateRight||item.egEgameMatchTeamList[1].oddsBetState)==='1' && (oddsRealChange[index].betState||item.betState) === '1' && item.playBetState != '0'">{{oddsRealChange[index].oddsRight||item.egEgameMatchTeamList[1].odds}}</span>
									</span>
									<span class="sy-win" v-if="item.egEgameMatchTeamList[1].result==='1'"></span>
									<span class="sy-fail" v-if="item.egEgameMatchTeamList[1].result==='2'"></span>
								</div>
							</div> 
							<div class="mask" v-show="item.state==4">
								<i class="iconfont">&#xe624;</i>
							</div>
						</div>
						<data-loading v-show="dataLoad" :loadingWords='loadingWords'></data-loading>
					</div>
				</scroll>
			</div>
			<no-data :noDataShow="!PageCount"></no-data>
		</div>
		<transition name="slide-choose">
			<div class="choose-all" v-show="chooseGame">
				<div class="header">
					<div class="l" @click="chooseGame=false"><i class="iconfont">&#xe682;</i></div>
					<div class="m">游戏筛选</div>
					<div class="r"></div>
				</div>
				<div class="choose-main">
					<div class="choose-top">
						<span @click="confirmBtn"><i class="iconfont confirm-choose">&#xe615;</i>确定</span>
					</div>
					<div class="choose-bottom">
						<div class="choose-bottom-all">
							<div class="choose-item" :class="{'choose-item-choose':sortListJson=='all'}" @click="chooseSort($event,'all')" sort='all' ref="chooseAll">
								<div class="choose-center">
									<span class="all-choose"></span>
									<span class="choose-w">全部</span>
								</div>
							</div>
							<div class="choose-item" v-for="item in getGameSortList" @click="chooseSort($event,item.egid)" :class="{'choose-item-choose':sortListJson.indexOf(item.egid) > -1}">
								<div class="choose-center">
									<img v-lazy="item.logo">
									<span class="choose-w">{{item.shortName}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<bet></bet>
		<transition name="slide">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
import noData from '@/base/noData'
import bet from '@/base/bet'
import scroll from '@/base/scroll'
import dataLoading from '@/base/dataLoading'
import {mapActions,mapMutations} from 'vuex'
export default{
	name:'guess',
	components:{
		scroll,
		dataLoading,
		bet,
		noData
	},
	computed:{
		oddschange(){//socket赔率变化
			console.log(222)
			if(this.gameMacthList.length){ //当gamelist有值的时候进入循环
				let gameMacthListL = this.gameMacthList.length;
				for(var j = 0;j < gameMacthListL;j ++){//循环首页三场比赛
					if(this.$store.state.oddschange[this.gameMacthList[j].mid]){//如果有这场比赛mid
						// this.oddsRealChange[i].oddsLeft = this.$store.state.oddschange[this.gamelist[i].egEgameMatchTeamList[0].edoid].newOdds
						let i = 0,
							gameMid = this.gameMacthList[j].mid,
							gameOddsListL = this.$store.state.oddschange[gameMid].length;
						for(;i < gameOddsListL;i ++){//循环本场比赛的所有赔率
							if(this.$store.state.oddschange[gameMid][i].edoid == this.gameMacthList[j].egEgameMatchTeamList[0].edoid){
								let oddschangeO = this.$store.state.oddschange[gameMid][i];
								this.oddsRealChange[j].oddsLeft = oddschangeO.newDetail.odds;
								this.oddsRealChange[j].oddsStateLeft = oddschangeO.oddsState;
								this.oddsRealChange[j].betStateLeft = oddschangeO.newDetail.betState;
								this.gameMacthList[j].egEgameMatchTeamList[0].odds = oddschangeO.newDetail.odds;
							}else if(this.$store.state.oddschange[gameMid][i].edoid == this.gameMacthList[j].egEgameMatchTeamList[1].edoid){
								let oddschangeO = this.$store.state.oddschange[gameMid][i];
								this.oddsRealChange[j].oddsRight = oddschangeO.newDetail.odds;
								this.oddsRealChange[j].oddsStateRight = oddschangeO.oddsState;
								this.oddsRealChange[j].betStateRight = oddschangeO.newDetail.betState;
								this.gameMacthList[j].egEgameMatchTeamList[1].odds = oddschangeO.newDetail.odds;
							}
						}
					}
				}
			}
			return  this.$store.state.oddschange || false;
		},
		playchange(){//socket玩法变化 具体玩法是否锁盘
				let	bettingModuleList = this.gameMacthList,
					bettingModuleListL = bettingModuleList.length;
				if(bettingModuleListL){
					for(let n = 0;n < bettingModuleListL;n ++){
						let mid = bettingModuleList[n].mid;
						if(this.$store.state.playchange[mid]){
							let playchange = this.$store.state.playchange[mid],
								playchangeL = playchange.length;
							for(let m =0;m < playchangeL;m ++){
								if(playchange[m].edid == bettingModuleList[n].edid){//如果投注列表里面的赔率变化了将oddsState设置为true
									let betStatus = playchange[m].newDetail.betState;
									bettingModuleList[n].playBetState = betStatus;
									break;
								}
							}
						}
					}
				}
			// }
			return this.$store.state.playchange || false;
		},
		gamechange(){//socket比赛状态及比分变化
			if(this.gameMacthList.length){
				let gameMacthListL = this.gameMacthList.length;
				for(let j = 0;j < gameMacthListL;j ++){
					let mid = this.gameMacthList[j].mid;
					if(this.$store.state.gamechange[mid]){
						let gamechangeO = this.$store.state.gamechange[mid];
						this.oddsRealChange[j].state = gamechangeO.newDetail.state;//该场比赛的进程状态
						this.oddsRealChange[j].result = gamechangeO.newDetail.result;//该场比赛的比分
						this.oddsRealChange[j].betState = gamechangeO.newDetail.betState;//该场比赛的投注状态
					}
				}
			}
			return this.$store.state.gamechange || false;
		},
		bettingModuleList(){//检测vuex里面的bettingModuleList是否问[]
			let bettingModuleLL = this.$store.state.bettingModuleL.length;
			this.betEdoid = '';
			for(let i = 0;i < bettingModuleLL;i ++){//将所有选择了的投注的edoid连成一个字符串
				this.betEdoid += this.$store.state.bettingModuleL[i].edoid + '|';
			}
			return this.$store.state.bettingModuleL || false;
		},
		gameCount(){//比赛条数变化
			return this.$store.state.sortListCount || false;
		}
	},
	data(){
		return{
			gameMacthList:[],
			oddsRealChange:[],//socket里面的数据变化
			PageCount:1,//为false时为暂无数据
			dataLoad:false,
			loadingWords:'上拉加载',
			scrollDownL:false,
			upLoadingWords:'下拉刷新',
			GetTodayListR:this.GetTodayList(10),//每页请求的数据为10条
			GetRollerListR:null,
			getBeforeListR:null,
			getResultListR:null,
			announcementL:'',
			chooseGame:false,
			getGameSortList:[],
			gameSortListArr:[],
			sortListJson:'',
		}
	},
	mounted(){
		this.$refs.minHeightB.style.minHeight = (this.$refs.minHeightS.offsetHeight + 0.5) + 'px';
		this.GetTodayListR();
		this.sortList();
		this.announcement();
		this.getGameSort();
	},
	methods:{
		chooseClick(){
			this.chooseGame = true;
			this.gameSortListArr = this.$store.state.gameSortList.slice();
			if(this.gameSortListArr.length == 0){
				this.sortListJson = 'all';
			}else{
				this.sortListJson = this.gameSortListArr.join('|');
			}
		},
		confirmBtn(){//筛选点击确定
			let dom = document.getElementsByClassName('active')[0];
			this.chooseGame = false;
			this.$store.commit('changeGameSortList',this.gameSortListArr);
			this.sortList();
			this.getSortGL(dom);
		},
		chooseSort(e,gameEgid){//筛选点击种类
			let dom = e.currentTarget;
			if(dom.getAttribute('sort')){//点击全部
				let chooseDiv = document.getElementsByClassName('choose-item-choose'),
					chooseDivL = chooseDiv.length;
				for(let i = 0;i < chooseDivL;i ++){
					chooseDiv[0].classList.remove('choose-item-choose');
				}
				dom.classList.add('choose-item-choose');
				this.gameSortListArr = [];
			}else{//点击个别种类
				let chooseAll = this.$refs.chooseAll;
				if(chooseAll.classList.value.indexOf('choose-item-choose') > -1){
					chooseAll.classList.remove('choose-item-choose')
				}
				if(dom.classList.value.indexOf('choose-item-choose') > -1){
					dom.classList.remove('choose-item-choose');
					let gameSortListArrL = this.gameSortListArr.length;
					for(let i = 0;i < gameSortListArrL;i ++){
						if(this.gameSortListArr[i] == gameEgid){
							this.gameSortListArr.splice(i,1);
						}
					}
					if(document.getElementsByClassName('choose-item-choose').length == 0){
						chooseAll.classList.add('choose-item-choose');
						this.gameSortListArr = [];
					}
				}else{
					dom.classList.add('choose-item-choose');
					this.gameSortListArr.push(gameEgid);
					console.log(this.gameSortListArr)
				}
			}
		},
		getGameSort(){
			this.axios.post(this.http + '/api/Bet/GetBaseEgameList')
			.then(response=>{
				if(response.data.resultCode == 1){
					this.getGameSortList = response.data.resultData.baseEgameList;
				}
			}).catch(error=>{
				console.log(error)
			})
		},
		announcement(){
			this.axios.post(this.http + '/api/BaseInfo/GetMsgNoticeList')
			.then(response=>{
				if(response.data.resultCode == 1){
					let data = response.data.resultData.msgNoticeList,
						dataL = data.length;
					for(let i = 0;i < dataL;i ++){
						this.announcementL += data[i].content + ' ';
					}
				}
			}).catch(error=>{
				console.log(error);
			})
		},
		toBet(mid,state){
			if(state != 4){
				this.$router.push(`/guess/bet/${mid}`);
			}
		},
		addBetList(e,item,index){//添加投注列表
			let targetDiv = e.target.className.indexOf('verification') > -1 ? e.target : e.target.parentNode;
			if(targetDiv.classList.value.indexOf('odd-active') > -1){//点击取消删除投注
				targetDiv.classList.remove('odd-active');
				let bettingModuleListL = this.$store.state.bettingModuleL.length,
					edoid = targetDiv.getAttribute('edoid'),
					mid,
					betmoduleL = this.$store.state.betmodule.evenList.length;
				for(let i = 0;i < bettingModuleListL;i ++){//在vuex删除当前点击的
					if(this.$store.state.bettingModuleL[i].edoid == edoid){
						mid = this.$store.state.bettingModuleL[i].mid
						this.deleteBetDataL(i);
						break;
					}
				}
				//删除串关里面的投注
				for(let i = 0;i < betmoduleL;i ++){//循环串关里面的列表
					if(this.$store.state.betmodule.evenList[i].edoid == edoid){//如果删除的该条数据在串关里面
						this.deleteChangeBetModuleL(i);//删除串关列表里面的该条投注
						let bettingModuleListL = this.$store.state.bettingModuleL.length;	
						for(let j = 0;j < bettingModuleListL;j ++){//查看是否有相同比赛id的其他赔率id
							if(this.$store.state.bettingModuleL[j].mid == mid){//如果有将其加入到串投列表
								let data = this.$store.state.bettingModuleL[j];
								this.addChangeBetModuleL(data);
								return;
							}
						}
					}
				}
			}else{//点击添加投注
				if(targetDiv.lastElementChild.previousElementSibling.style.display == 'none'){
					let bettingModuleObj = {};
					if(targetDiv.className.indexOf('left') > -1){//点击左边的赔率投注
						bettingModuleObj.oddsName = item.egEgameMatchTeamList[0].team;
						bettingModuleObj.odds = this.oddsRealChange[index].oddsLeft || item.egEgameMatchTeamList[0].odds;//赔率
						bettingModuleObj.edoid = item.egEgameMatchTeamList[0].edoid;//赔率id
					}else{//点击右边的赔率投注
						bettingModuleObj.oddsName = item.egEgameMatchTeamList[1].team;
						bettingModuleObj.odds = this.oddsRealChange[index].oddsRight || item.egEgameMatchTeamList[1].odds;//赔率
						bettingModuleObj.edoid = item.egEgameMatchTeamList[1].edoid;//赔率id
					}
					targetDiv.classList.add('odd-active');
					bettingModuleObj.playSortName = item.playSortName;//玩法分类名称
					bettingModuleObj.playName = item.playName;
					bettingModuleObj.maxMoney = item.maxMoney;
					bettingModuleObj.minMoney = item.minMoney;
					bettingModuleObj.canCombine = item.playCanCombine;//玩法是否可以串投
					bettingModuleObj.allcanCombine = item.canCombine;//整场比赛是否可以串投
					bettingModuleObj.edid = item.edid;//玩法id
					bettingModuleObj.mid = item.mid;//比赛id
					bettingModuleObj.betListObj = false;
					bettingModuleObj.betMoney = '';
					bettingModuleObj.canWinMoney = 0;
					bettingModuleObj.oddsChange = false;//赔率改变
					bettingModuleObj.oddsBetChange = '';//赔率锁盘or开盘
					bettingModuleObj.playBetChange = '';//玩法锁盘or开盘
					bettingModuleObj.gameBetChange = '';//比赛锁盘or开盘
					bettingModuleObj.hTeam = item.egEgameMatchTeamList[0].team//左边的队名
					bettingModuleObj.vTeam = item.egEgameMatchTeamList[1].team//右边的队名
					this.addBetDataL(bettingModuleObj);
					// 添加串投列表里面的数据
					if(item.playCanCombine && item.canCombine){//如果比赛和玩法都可以串投
						if(this.$store.state.betmodule.evenList.length == 0){//如果串投列表为空 将第一个单投数据加入到串投中
							this.addChangeBetModuleL(this.$store.state.bettingModuleL[0]);
						}else{//如果串投不为空 循环串投列表里面的比赛id与该条数据的比赛id是否一致 如果比赛id不一致加将其投注加入串投列表中
							let betmoduleL = this.$store.state.betmodule.evenList.length,
								bettingModuleLL = this.$store.state.bettingModuleL.length - 1,
								mid = this.$store.state.bettingModuleL[bettingModuleLL].mid,
								flag = true;
							for(let i = 0;i < betmoduleL;i ++){//循环串关列表里面的mid是否有本次添加的这条投注数据的mid
								if(this.$store.state.betmodule.evenList[i].mid == mid){//如果有
									flag = false;
								}
							}
							if(flag){//没有本次添加的这条投注数据的mid
								let data = this.$store.state.bettingModuleL[bettingModuleLL];
								this.addChangeBetModuleL(data);
							}
						}
					}
				}
			}
		},
		addChangeBetModuleL(data){//增加一条串关投注
			this.$store.commit('addChangeBetModule',data);
		},
		deleteChangeBetModuleL(index){//删除一条串关投注
			this.$store.commit('deleteChangeBetModule',index)
		},
		addBetDataL(data){//增加一条投注
			this.$store.commit('addBetData',data);
		},
		deleteBetDataL(index){//删除一条投注
			this.$store.commit('deleteBetData',index);
		},
		GetTodayList(pageSize){//今天
			let PageI = 0,PageN = 1; //利用闭包储存两个私有变量
			this.gameMacthList = [];
			this.dataLoad = false;
			return ()=>{
				if(PageI < PageN){
					PageI ++;
					if(PageI >=2 || this.scrollDownL){
						this.$refs.zIndex.style.zIndex = '11';
					}
					this.axios.post(this.http + '/api/Bet/GetEgEgameMatchList',{
						sortID:1,
						egid:this.$store.state.gameSortList,
						pageIndex:PageI,
						pageSize:pageSize
					}).then((response)=>{
						this.loadingWords = '上拉加载';
						this.scrollDownL = false;
						if(response.data.resultCode == 1){
							this.gameMacthList = this.gameMacthList.concat(response.data.resultData.egEgameMatchList);
							let gameMacthListL = this.gameMacthList.length;
							for(var i = (pageSize * (PageI - 1));i < gameMacthListL;i ++){//将oddsRealChange变成一个有对象值的数组
								this.oddsRealChange[i] = {oddsLeft:'',state:'',result:'',oddsRight:'',oddsStateLeft:'',oddsStateRight:'',betStateLeft:'',betStateRight:'',betState:''};
							}
							if(PageI == 1){
								this.PageCount = response.data.resultData.page.pageRecord;
								PageN = Math.ceil(this.PageCount / pageSize);
								// this.scrollDownL = false;
							}
							if(PageI == PageN){
								this.dataLoad = false;
							}else{
								setTimeout(()=>{
									this.dataLoad = true;
								})
							}
						}
					}).catch((error)=>{
						console.log(error)
					})
				}
			}
		},
		GetRollerList(pageSize){//滚盘 
			let PageI = 0,PageN = 1; //利用闭包储存两个私有变量
			this.gameMacthList = [];
			return ()=>{
				if(PageI < PageN){
					PageI ++;
					if(PageI >=2 || this.scrollDownL){
						this.$refs.zIndex.style.zIndex = '11';
					}
					this.axios.post(this.http + '/api/Bet/GetEgEgameMatchList',{
						sortID:2,
						pageIndex:PageI,
						egid:this.$store.state.gameSortList,
						pageSize:pageSize
					}).then((response)=>{
						this.loadingWords = '上拉加载';
						this.scrollDownL = false;
						if(response.data.resultCode == 1){
							this.gameMacthList = this.gameMacthList.concat(response.data.resultData.egEgameMatchList)
							let gameMacthListL = this.gameMacthList.length;
							for(var i = (pageSize * (PageI - 1));i < gameMacthListL;i ++){//将oddsRealChange变成一个有对象值的数组
								this.oddsRealChange[i] = {oddsLeft:'',state:'',result:'',oddsRight:'',oddsStateLeft:'',oddsStateRight:'',betStateLeft:'',betStateRight:'',betState:''};
							}
							if(PageI == 1){
								this.PageCount = response.data.resultData.page.pageRecord;
								PageN = Math.ceil(this.PageCount / pageSize);
							}
							if(PageI == PageN){
								this.dataLoad = false;
							}else{
								setTimeout(()=>{
									this.dataLoad = true;
								})
							}
						}
					}).catch((error)=>{
						console.log(error)
					})
				}
			}
		},
		getBeforeList(pageSize){//赛前
			let PageI = 0,PageN = 1; //利用闭包储存两个私有变量
			this.dataLoad = false;
			this.gameMacthList = [];
			return ()=>{
				if(PageI < PageN){
					PageI ++;
					if(PageI >=2 || this.scrollDownL){
						this.$refs.zIndex.style.zIndex = '11';
					}
					this.axios.post(this.http + '/api/Bet/GetEgEgameMatchList',{
						sortID:3,
						egid:this.$store.state.gameSortList,
						pageIndex:PageI,
						pageSize:pageSize
					}).then((response)=>{
						this.loadingWords = '上拉加载';
						this.scrollDownL = false;
						if(response.data.resultCode == 1){
							this.gameMacthList = this.gameMacthList.concat(response.data.resultData.egEgameMatchList)
							let gameMacthListL = this.gameMacthList.length;
							for(var i = (pageSize * (PageI - 1));i < gameMacthListL;i ++){//将oddsRealChange变成一个有对象值的数组
								this.oddsRealChange[i] = {oddsLeft:'',state:'',result:'',oddsRight:'',oddsStateLeft:'',oddsStateRight:'',betStateLeft:'',betStateRight:'',betState:''};
							}
							if(PageI == 1){
								this.PageCount = response.data.resultData.page.pageRecord;
								PageN = Math.ceil(this.PageCount / pageSize);
							}
							if(PageI == PageN){
								this.dataLoad = false;
							}else{
								setTimeout(()=>{
									this.dataLoad = true;
								})
							}
						}
					}).catch((error)=>{
						console.log(error)
					})
				}
			}
		},
		getResultList(pageSize){//赛果
			let PageI = 0,PageN = 1; //利用闭包储存两个私有变量
			this.dataLoad = false;
			this.gameMacthList = [];
			return ()=>{
				if(PageI < PageN){
					PageI ++;
					if(PageI >=2 || this.scrollDownL){
						this.$refs.zIndex.style.zIndex = '11';
					}
					this.axios.post(this.http + '/api/Bet/GetEgEgameMatchList',{
						sortID:4,
						egid:this.$store.state.gameSortList,
						pageIndex:PageI,
						pageSize:pageSize
					}).then((response)=>{
						this.loadingWords = '上拉加载';
						this.scrollDownL = false;
						if(response.data.resultCode == 1){
							this.gameMacthList = this.gameMacthList.concat(response.data.resultData.egEgameMatchList)
							let gameMacthListL = this.gameMacthList.length;
							for(var i = (pageSize * (PageI - 1));i < gameMacthListL;i ++){//将oddsRealChange变成一个有对象值的数组
								this.oddsRealChange[i] = {oddsLeft:'',state:'',result:'',oddsRight:'',oddsStateLeft:'',oddsStateRight:'',betStateLeft:'',betStateRight:'',betState:''};
							}
							if(PageI == 1){
								this.PageCount = response.data.resultData.page.pageRecord;
								PageN = Math.ceil(this.PageCount / pageSize);
							}
							if(PageI == PageN){
								this.dataLoad = false;
							}else{
								setTimeout(()=>{
									this.dataLoad = true;
								})
							}
						}
					}).catch((error)=>{
						console.log(error)
					})
				}
			}
		},
		getAllList(e){
			let targetEle = e.target;
			if(e.target.tagName == 'SPAN'){ //当点击span标签的时候
				targetEle = e.target.parentElement;
			}
			if(targetEle.parentElement.className != "active"){
				this.$refs.zIndex.style.zIndex = '1';
				this.dataLoad = false;
				$('.active').removeClass("active");
				targetEle.parentElement.className = "active";
				this.sortList();
				this.getSortGL(targetEle);
			}
		},
		getSortGL(targetEle){
			if(targetEle.getAttribute("mark") == "today"){ //今天
				this.GetTodayListR = this.GetTodayList(10);
				this.GetTodayListR();
			}else if(targetEle.getAttribute("mark") == "Roller"){//滚盘
				this.GetRollerListR = this.GetRollerList(10);
				this.GetRollerListR();
			}else if(targetEle.getAttribute("mark") == "gameBefore"){//赛前
				this.getBeforeListR = this.getBeforeList(10);
				this.getBeforeListR();
			}else if(targetEle.getAttribute("mark") == "gameResult"){//赛果
				this.getResultListR = this.getResultList(10);
				this.getResultListR();
			}
		},
		scrollUp(){//上拉加载
			this.loadingWords = '<img height="100%" src="static/img/loading.svg" alt="loading">';
			// this.$refs.zIndex.style.zIndex = '11';
			if($('.active').children("a").attr('mark') == 'today'){
				this.GetTodayListR();
			}else if($('.active').children("a").attr('mark') == 'Roller'){
				this.GetRollerListR();
			}else if($('.active').children("a").attr('mark') == 'gameBefore'){
				this.getBeforeListR();
			}else if($('.active').children("a").attr('mark') == 'gameResult'){
				this.getResultListR();
			}
		},
		scrollDown(){//下拉刷新
			this.scrollDownL = true;
			if($('.active').children("a").attr('mark') == 'today'){
				this.GetTodayListR = this.GetTodayList(10);
				this.GetTodayListR();
			}else if($('.active').children("a").attr('mark') == 'Roller'){
				this.GetRollerListR = this.GetRollerList(10);
				this.GetRollerListR();
			}else if($('.active').children("a").attr('mark') == 'gameBefore'){
				this.getBeforeListR = this.getBeforeList(10);
				this.getBeforeListR();
			}else if($('.active').children("a").attr('mark') == 'gameResult'){
				this.getResultListR = this.getResultList(10);
				this.getResultListR();
			}
		},
		scrollDownT(){
			// this.scrollDownL = true;
			this.upLoadingWords = "下拉刷新";
		},
		scrollDownF(){
			// this.scrollDownL = true;
			this.upLoadingWords = "释放后刷新数据";
		},
		...mapMutations(['addBetData','deleteBetData','addChangeBetModule','deleteChangeBetModule','changeGameSortList']),
		...mapActions(['sortList'])
	},
	filters:{
		timestampToHours(times){//时分
			let date = new Date(times),
				h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':',
				m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
			return h + m;
		},
		gameFinishTime(times){//先把日期换成时间戳然后再换成年月日
			let time = times.replace(/-/g,'/'),//将2019-11-20换成2019/11/20
				date = new Date(time),
				Y = date.getFullYear() + '-',
				M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
				D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			return Y + M + D;	
		},
		gameFinishTimeWeek(times){//先把日期换成时间戳然后再换成周几
			let time = times.replace(/-/g,'/'),//将2019-11-20换成2019/11/20
				date = new Date(time),
				W = date.getDay();
			switch(W){
				case 1:
				W = '（周一）';
				break;
				case 2:
				W = '（周二）';
				break;
				case 3:
				W = '（周三）';
				break;
				case 4:
				W = '（周四）';
				break;
				case 5:
				W = '（周五）';
				break;
				case 6:
				W = '（周六）';
				break;
				case 0:
				W = '（周日）';
				break;
			}
			return W;	
		},
		gameResultLeft(result){//字符串过滤器 只要比赛结果的左边字符
			if(result){
				let index = result.lastIndexOf(":")
				return result.substring(0,index);
			}
		},
		gameResultRight(result){//字符串过滤器 只要比赛结果的右边字符
			if(result){
				let index = result.lastIndexOf(":") + 1;
				return result.substring(index);
			}
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.slide-choose-enter-active,.slide-choose-leave-active
  transition:all 0.3s
.slide-choose-enter,.slide-choose-leave-to
  transform:translate3d(0,-100%,0)

.guess
	position:fixed
	top:45px
	right:0
	bottom:48px
	left:0
	z-index:1
	background:$background-color
	.main
		width: 100%
		height: 100%
		margin: 0 auto
		display: flex
		flex-direction: column
		.header
			height: 44px
			box-shadow: 0 0 13px rgba(0,0,0,.22)
			font-weight: lighter
			position: relative
			height: 46px
			.menu
				position: relative
				height: 42px
				line-height: 42px
				li
					float: left
					width: 20%
					padding-bottom: 3px
					a
						font-size: $words-size-14 
						color: $title-color
						display: block
						text-align: center
						span
							display: inline-block
							background: #2d3f49
							color: #95a6c6
							font-size: $words-size-10
							font-weight: 400
							height: 13px
							line-height: 13px
							min-width: 18px
							border-radius: 10px
							padding: 0 4.5px
							position: relative
							text-align: center
							bottom: 1px
				li.active
					position:relative
					&:after
						position:absolute
						content:''
						left:12.5%
						right:12.5%
						bottom:0
						height:20px
						z-index:-1
						background-image:radial-gradient(ellipse farthest-side at bottom,#196b61 20%,$background-color 102%)
						background-origin:content-box
					&:before
						position:absolute
						content:''
						left:12.5%
						right:12.5%
						bottom:0
						height:3px
						display:inline-block
						border-radius:3px
						background:radial-gradient(#1ea18e 22%,$background-color 97%)
				li.active a span
					color: $normal-color
					background: #03a36c
				li.active a
					color: $special-color;
		.notice
			height: 36px
			line-height: 36px
			padding-right: 10px
			position: relative
			overflow: hidden
			.l
				text-align: center
				position: absolute
				left: 0
				top: 0
				width: 30px
				img
					width: 20px
					height: 20px
					vertical-align: middle
					position: relative
					top: 1px
			.r
				margin-left: 35px
				font-size: $words-size-12 
				color: rgb(3, 252, 179)
				overflow: hidden
				font-weight: lighter
				#marquee
					margin: 0 16px 0 0
					width: 100%
					height: 36px
					overflow: hidden
					color: $special-color
					margin-right: 10px
					li
						padding: 0 2px
						line-height: 36px
						color: $special-color
		.index
			position: relative
			width: 100%
			height: 100%
			flex: 1
			overflow-y: auto
			margin-bottom: -1px
			.allcontent
				width:100%
				height:100%
				overflow-y:auto
				position:relative
				.padding-bottom
					padding-bottom:10px	
					position:relative
					.dataLoadingT
						position:absolute
						top:-40px
						width:100%
						height:40px
						display:flex
						align-items:center
						justify-content:center
						.Lo
							height:40px
							display:flex
							align-items:center
							justify-content:center
					.dataLoadingH
						top:-40px
						width:100%
						height:40px
						display:flex
						align-items:center
						justify-content:center
						.Lo
							height:40px
							display:flex
							align-items:center
							justify-content:center
					.item
						position: relative
						background: linear-gradient(90deg,#2b3a4a,#202630)
						margin: 8px
						border-radius: 4px
						padding: 10px
						font-size: $words-size-12  
						box-shadow: 0 0 1px 0 rgba(102,255,204,.4)
						color:$normal-color
						.tbox
							display: flex
							justify-content: space-between
							align-items: center
							margin-bottom: 10px
							.w20
								width: 20px
								height: 20px
								vertical-align:-6px
							.more
								border: 1px solid
								border-image: linear-gradient(90deg,#2a91d4,#03fcb3) 1 1
								border-radius: 4px
								color: $special-color
								display: inline-block
								width: 30px
								text-align: center
								font-size: $words-size-12 
						.mbox
							display: flex
							justify-content: space-between
							.team
								width: 35%
								text-align: center
								.tmlogo
									width: 64px
									height: 64px
									overflow: hidden
									margin: 0 auto
									img
										height: 100%
										width: auto
										vertical-align: middle
								.tmname
									margin: 5px 0;
							.score
								width: 30%
								display: flex
								align-items: center
								justify-content: center
								text-align: center
								flex-direction: column
								font-size: $words-size-14 
								font-weight: 400
								.scorebox
									display: flex
									flex-wrap: nowrap
									justify-content: center
									i
										font-size: $words-size-24 
										margin: 0 -3px
										color: $normal-color
									em
										font-style: normal
										font-size: $words-size-20 
										margin: 0 10px
										display: inline-block
										bottom: 2px
										font-weight: 700
										font-family: Segoe UI,Tahoma,Geneva,Verdana,sans-serif
										position: relative
										color: $title-color
									i
										font-size: $words-size-24
										margin: 0 -3px
										color: $normal-color
						.fbox
							display: flex
							justify-content: space-between
							.tmodds
								width: 35%
								height: 40px
								display: flex
								align-items: center
								justify-content: center
								text-align: center
								.odds
									display: inline-block
									background: #2d3f49
									color: $normal-color
									font-weight: 400
									font-family: -apple-system,Helvetica,sans-serif
									box-shadow: inset 0 1px 0 0 hsla(0,0%,100%,.05), 0 1px 2px 0 rgba(0,0,0,.57);
									width: 80%
									height: 32px
									line-height: 32px
									text-align: center
									border-radius: 2px
									font-size: $words-size-14
									border: .5px solid #0b9f72
									position: relative
									overflow: hidden
									i
										margin-right: 2px
									.odds-shang
										animation:fade 0.6s infinite alternate forwards
										@keyframes fade
											from
												opacity:1
											to 
												opacity:0.3
									.odds-xia
										animation:fade 0.6s infinite alternate forwards
										@keyframes fade
											from
												opacity:1
											to 
												opacity:0.3
									.odds-suo
										color:#ffe87a
								.odds-change1
									color:#6dd169
								.odds-change2
									color:red
								.sy-win
									width:24px
									height:41px
									background:url('~@/assets/images/win.svg') no-repeat
								.sy-fail
									width:24px
									height:41px
									background:url('~@/assets/images/fail.svg') no-repeat
								.odd-active
									background:#0b9f72
							.tmstatus
								width: 30%;
								display: flex
								align-items: center
								justify-content: center
								text-align: center
								flex-direction: column
								img
									vertical-align: middle
									height: 1.7rem
									width: 1.7rem
									border: none
									display: block
									margin:0 auto
								.toStart
									color:#fff
								.comingGame
									color:$special-color
								.play
									color:#ffe600
								.gameEnd
									color: #fff
								.gameCancle
									color:$normal-color
					.cancel
						.mask
							display: block
							position: absolute
							left: 0
							top: 0
							background: rgba(0,0,0,.3)
							color: gray
							width: 100%
							height: 100%
							border-radius: 4px
							color: #ffe600
							i
								font-size: 45px
								position: absolute
								top: 28px
								right: 20px
					.scroll-bottom
						height:50px
						width:100%	
	.choose-all
		position:fixed
		top:0
		right:0
		bottom:0
		left:0
		z-index:1
		background:$background-color	
		display:flex
		flex-direction:column
		.header
			display:flex
			box-shadow: 0 0 13px rgba(0,0,0,.22)
			font-weight: lighter  
			background-color: rgb(15, 20, 25)
			width: 100%
			justify-content:space-around
			.l,.r
				width: 45px
				height: 45px
				line-height: 45px
				text-align: center
				color: #fff
			.m
				text-align: center
				height: 45px
				line-height: 45px
				font-size: 1.6rem
				color: #fff
				flex:1	
		.choose-main
			flex:1
			flex-direction:column
			display:flex
			height:100%
			.choose-top
				padding:0 10px
				height:45px
				display:flex
				justify-content:flex-end
				align-items:center
				span
					padding:5px 10px
					background:linear-gradient(90deg, #00fe98 0, #00feec)
					color:#000
					border-radius:3px
			.choose-bottom
				flex:1
				overflow-y:auto
				height:100%
				.choose-bottom-all
					display:flex
					justify-content:space-between
					flex-wrap: wrap
					position:relative
					padding:0 10px
					.choose-item
						overflow:hidden
						width:31%
						padding-bottom:31%
						height:0
						margin-bottom:4.5%
						display:flex
						flex-direction:column
						align-items:center
						position:relative
						background:#1a2028
						border-radius:5px
						.choose-center
							margin-top:20%
							display:flex
							align-items:center
							flex-direction:column
							img,.all-choose
								width:30px
								height:30px
								margin-bottom:10px
								filter:grayscale(100%)
							.all-choose
								background:url('/static/img/allGameGray.svg')
								background-size:100%
						&:after
							position:absolute
							content:''
							display:block
							background:rgba(255,255,255,0.05)
							width:30%
							left:35%
							bottom:12%
							height:3px
							border-radius:5px
					.choose-item-choose
						background:#242d38
						.choose-center
							img
								filter:none
						&:after
							background:$special-color
						.choose-center
							.all-choose
								background:url('/static/img/allGameMark.svg')
								filter:none
</style>