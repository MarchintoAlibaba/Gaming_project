<template>
	<div v-show="bettingModule">
		<div class="vux-popup-dialog" v-if="betmodule.popup_dialog">
			<div class="orderlisthead">
				<span class="removebtn" @click="deleteAllBetting">
					<i class="iconfont bz-qingkong">&#xe630;</i>清空全部<em class="tag">{{bettingModuleList.length}}</em>
				</span>
				<span class="choose-way">
					<label :class="{'choose-active':betmodule.oddOrEven}" @click="chooseOdd">单关</label>
					<label :class="{'choose-active':!betmodule.oddOrEven}" @click="chooseEven">串关</label>
				</span>
				<span class="closebtn" @click="openOrclose"><i class="iconfont bz-close">&#xe687;</i></span>
			</div>
			<div class="orderlist" :computed1="oddschange" :computed2="playchange" :computed3="gamechange" :computed4="betmoduleEvenList" :computed5='betmodule'>
				<scroll class="allcontent" :data="bettingModuleList" v-if="betmodule.oddOrEven">
					<div id="vux-scroller-84fvw">
						<div class="xs-container">
							<div class="list">
								<ul>
									<li class="retinabb" v-for="(item,index) in bettingModuleList">
										<div class="rwt" :class="{'change':item.oddsChange,'lock':(item.oddsBetChange=='0'||item.playBetChange == '0'||item.gameBetChange == '0')}">
											<div class="c-1">
												<h2>{{item.oddsName}}
													<span class="iconfont suored" ref="oddsuored" v-if="item.oddsBetChange === '0' || item.playBetChange === '0' || item.gameBetChange === '0'">&#xe65e;</span> 
													<span v-if="item.oddsBetChange != '0' && item.playBetChange != '0' && item.gameBetChange != '0'">@{{item.odds}}</span>
												</h2> 
												<p>
													<span>{{item.playSortName}} - {{item.playName}}</span>
												</p> 
												<p>
													<span>{{item.hTeam}}</span>
													<span>- vs -</span>
													<span>{{item.vTeam}}</span>
												</p>
											</div> 
											<div class="c-2">
												<div class="closebtn" @click="deleteBetDataL(index)">
													<i class="iconfont bz-close">&#xe687;</i>
												</div> 
												<div class="input" v-show="!item.betListObj&&!item.betMoney">
													<span @click="betInputC(index)" v-if="item.oddsBetChange != '0' && item.playBetChange != '0' && item.gameBetChange != '0'">请输入金额</span>
													<span v-if="item.oddsBetChange == '0' || item.playBetChange == '0' || item.gameBetChange == '0'">请输入金额</span>
													<span>可赢金额:0</span>
												</div>
												<div class="input active" v-show="item.betMoney || item.betListObj">
													<span @click="betInputC(index)">{{item.betMoney}}<b v-show="item.betListObj"></b></span> 
													<span>{{item.canWinMoney}}</span>
												</div>
											</div>
										</div> 
										<div class="rwb" v-show="item.betListObj && item.oddsBetChange != '0' && item.playBetChange != '0' && item.gameBetChange != '0'">
											<div class="keyboard">
												<div class="number" @click="inputMoney($event,index)">
													<span>1</span> 
													<span>2</span> 
													<span>3</span> 
													<span>4</span> 
													<span>5</span> 
													<span>6</span> 
													<span>7</span> 
													<span>8</span> 
													<span>9</span> 
													<span>0</span>
												</div> 
												<div class="keys">
													<span @click="maxBetMoney(index)">最大投注<b>{{item.maxMoney}}</b></span> 
													<span @click="deleteBetMoney(index)"><i class="iconfont bz-shanchu">&#xe750;</i></span> 
													<span @click="confirmBetMoney(index)">确认</span>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>  
						</div>
					</div>
				</scroll>
				<scroll class="allcontent" :data="betmodule.evenList" v-if="!betmodule.oddOrEven">
					<div id="vux-scroller-84fvw">
						<div class="xs-container">
							<div class="list">
								<ul>
									<li class="retinabb" v-for="(item,index) in betmoduleEvenList">
										<div class="rwt" :class="{'change':item.oddsChange,'lock':(item.oddsBetChange=='0'||item.playBetChange == '0'||item.gameBetChange == '0')}">
											<div class="c-1">
												<h2>{{item.oddsName}}
													<span class="iconfont suored" ref="evensuored" v-if="item.oddsBetChange === '0' || item.playBetChange === '0' || item.gameBetChange === '0'">&#xe65e;</span> 
													<span v-if="item.oddsBetChange != '0' && item.playBetChange != '0' && item.gameBetChange != '0'">@{{item.odds}}</span>
												</h2> 
												<p>
													<span>{{item.playSortName}} - {{item.playName}}</span>
												</p> 
												<p>
													<span>{{item.hTeam}}</span>
													<span>- vs -</span>
													<span>{{item.vTeam}}</span>
												</p>
											</div> 
											<div class="c-2">
												<div class="closebtn" @click="deleteBetDataL(index)">
													<i class="iconfont bz-close">&#xe687;</i>
												</div>
											</div> 
										</div> 
									</li>
								</ul>
								<div class="even-input">
									<div>
										<span>总赔率</span>
										<span class="special-color">@{{betmodule.evenAllOdds|allOdds}}</span>
									</div>	
									<div>
										<span>类型</span>
										<span>{{evenAllBet}} 串 1</span>
									</div>
									<div>
										<span>请输入金额</span>
										<span class="write-money">{{betmodule.evenBetMoney|evenMoneyL}}<b></b></span>
									</div>
								</div>
								<div class="rwb" v-show="evenWrite">
									<div class="keyboard">
										<div class="number" @click="evenMoney">
											<span>1</span> 
											<span>2</span> 
											<span>3</span> 
											<span>4</span> 
											<span>5</span> 
											<span>6</span> 
											<span>7</span> 
											<span>8</span> 
											<span>9</span> 
											<span>0</span>
										</div> 
										<div class="keys">
											<span @click="maxEvenMoney">最大投注<b>{{betmodule.maxMoney}}</b></span> 
											<span @click="deleteEvenMoney"><i class="iconfont bz-shanchu">&#xe750;</i></span>
										</div>
									</div>
								</div>
							</div>  
						</div>
					</div>
				</scroll>
			</div> 
			<div v-show="betmodule.oddsHint">
				<div class="orderlistordermsg">
					<i class="iconfont bz-gonggao">&#xe71f;</i>
					您所选注单的盘口、赔率或有效性已产生变化
				</div>
			</div>
		</div> 
		<div class="orderinput">
			<div class="l">
				<span v-show="betmodule.betclose=='展开'">已选注单<b>{{bettingModuleList.length}}</b></span>
				<span v-show="betmodule.betclose=='折叠' && betmodule.oddOrEven">下注金额：{{allBetMoney}}</span> 
				<span v-show="betmodule.betclose=='折叠' && betmodule.oddOrEven">最高可赢：<em>{{allWinMoney}}</em></span>
				<span v-show="betmodule.betclose=='折叠' && !betmodule.oddOrEven">下注金额：{{betmodule.evenBetMoney}}</span> 
				<span v-show="betmodule.betclose=='折叠' && !betmodule.oddOrEven">最高可赢：<em>{{betmodule.evenWinMoney}}</em></span>
			</div> 
			<div class="r">
				<span @click="openOrclose">
					<i class="iconfont bz-zhedie" v-show="betmodule.betclose=='折叠'">&#xe617;</i>
					<i class="iconfont bz-zhedie" v-show="betmodule.betclose=='展开'">&#xe600;</i>{{betmodule.betclose}}</span>
				<span @click="confirmBtn" ref="confirB">{{betmodule.confirmBet}}</span>
			</div>
		</div>
	</div>
</template>
<script>
import scroll from '@/base/scroll'
import {mapActions,mapMutations} from 'vuex'
export default{
	name:'bet',
	components:{
		scroll,
	},
	computed:{
		bettingModuleList(){//每一次投注数据的变化都能察觉
			let bettingModuleLL = this.$store.state.bettingModuleL.length,allBetMoney = 0,allWinMoney = 0;
			if(this.$store.state.betmodule.initial < bettingModuleLL){//当添加投注列表时 
				this.$store.commit('changeBetModule',{changeK:'betclose',changeV:'展开'});
				this.$store.commit('changeBetModule',{changeK:'popup_dialog',changeV:false});
				this.$store.commit('changeBetModule',{changeK:'confirmBet',changeV:'立即投注'});
			}else if(this.$store.state.betmodule.initial == 'initial'){//当添加第一个投注列表时
				this.$store.commit('changeBetModule',{changeK:'betclose',changeV:'折叠'});
				this.$store.commit('changeBetModule',{changeK:'popup_dialog',changeV:true});
				this.$store.commit('changeBetModule',{changeK:'confirmBet',changeV:'确认下注'});
				if(bettingModuleLL == 1){
					this.$store.commit('changeBetModule',{changeK:'initial',changeV:true});
					this.$store.commit('changeBetData',{index:0,t_or_f:true});
				}
			}
			if(bettingModuleLL){
				this.$store.commit('changeBetModule',{changeK:'initial',changeV:bettingModuleLL});
			}else{
				this.$store.commit('changeBetModule',{changeK:'oddsHint',changeV:false});
				this.$store.commit('changeBetModule',{changeK:'initial',changeV:'initial'});
				this.$store.commit('changeBetModule',{changeK:'confirmBet',changeV:'确认下注'});
			}
			for(let i = 0;i < bettingModuleLL;i ++){//将所有投注相加
				let bettingModuleLI = this.$store.state.bettingModuleL[i];
				allBetMoney += Number(bettingModuleLI.betMoney);
				allWinMoney += Number(bettingModuleLI.canWinMoney);
				if(bettingModuleLI.canCombine === true && bettingModuleLI.allcanCombine === true){//如果单关里面的串投可以投了
					let betmoduleEvenList = this.betmoduleEvenList,
						betmoduleEvenListL = betmoduleEvenList.length;
					for(let x = 0;x < betmoduleEvenListL;x ++){//循环串关列表
						if(bettingModuleLI.edoid !== betmoduleEvenList[x].edoid){//如果单关列表与串关列表里面不是同一注
							this.deleteChangeBetModuleL(x);//删除串投里的一条数据
							this.addChangeBetModuleL(bettingModuleLI);//后再增加这条新的
						}
					}
				}
			}
			this.allBetMoney = allBetMoney.toFixed(2);
			this.allWinMoney = allWinMoney.toFixed(2);
			this.bettingModule = bettingModuleLL == 0 ? false : true;//整块投注模块的显示隐藏
			return this.$store.state.bettingModuleL || false;
		},
		betmoduleEvenList(){//串投里面的数据
			this.evenAllBet = this.$store.state.betmodule.evenList ? this.$store.state.betmodule.evenList.length : 0;
			let evenAllOdds = 1;
			if(this.evenAllBet){//当串投有数据时
				if(this.evenAllBet < 9){//串投的投注数量最多为8注
					let maxMoney = this.$store.state.betmodule.evenList[0].maxMoney,
						minMoney = this.$store.state.betmodule.evenList[0].minMoney,
						winMoney;
					for(let i = 0;i < this.evenAllBet;i ++){
						let evenListM = this.$store.state.betmodule.evenList[i];
						evenAllOdds *= evenListM.odds;
						this.$store.commit('changeBetModule',{changeK:'evenAllOdds',changeV:evenAllOdds});//设置串投里面的赔率
						if(evenListM.maxMoney < maxMoney){//串投里面最大投注取所有投注里面的最小
							maxMoney = evenListM.maxMoney;
						}
						if(evenListM.minMoney > minMoney){//串投里面最小投注取所有投注里面的最大
							minMoney = evenListM.minMoney;
						}
						if(evenListM.canCombine === false || evenListM.allcanCombine === false){//如果不可以串投
							let gameMid = evenListM.mid,
								bettingModuleList = this. bettingModuleList,
								bettingModuleListL = bettingModuleList.length;
							this.deleteChangeBetModuleL(i);//删除串投里的一条数据
							for(let x = 0;x < bettingModuleListL;x ++){//循环单关列表
								if(bettingModuleList[x].mid === gameMid){//如果单关列表里面有其他同场比赛的投注列表
									this.addChangeBetModuleL(bettingModuleList[x]);//将单关里面的投注添加到串关里面
								}
							}
						}
					}
					this.$store.commit('changeBetModule',{changeK:'maxMoney',changeV:maxMoney});
					this.$store.commit('changeBetModule',{changeK:'minMoney',changeV:minMoney});
					winMoney = (this.$store.state.betmodule.evenBetMoney * this.$store.state.betmodule.evenAllOdds);
					if(winMoney == '0'){
						winMoney = '0.00'
					}else{
						let res = /([0-9]+.[0-9]{2})[0-9]*/;
						winMoney = (winMoney.toFixed(6)).replace(res,"$1");
					}
					this.$store.commit('changeBetModule',{changeK:'evenWinMoney',changeV:winMoney});
				}else{
					this.$popup({
						hint:'串关投注最多选择8个投注项目',
						hintShow:true
					})
				}	
			}else{
				this.$store.commit('changeBetModule',{changeK:'evenBetMoney',changeV:'0.00'});
			}
			return this.$store.state.betmodule.evenList || false;
		},
		betmodule(){
			return this.$store.state.betmodule || false;
		},
		oddschange(){//socket赔率变化 每个投注列表赔率是否锁盘以及具体赔率的变化
			console.log(111)
			let bettingModuleList = this.$store.state.bettingModuleL,
				bettingModuleListL = bettingModuleList.length;
			if(this.$route.path == '/guess/bet/' + this.$route.params.id){
				let mid = this.$route.params.id;
				if(this.$store.state.oddschange[mid]){//如果有这场比赛mid
					this.oddsChangeA(mid,bettingModuleList,bettingModuleListL);
				}
			}else if(this.$route.path == '/guess'){
				for(let i = 0;i < bettingModuleListL;i ++){
					let mid = bettingModuleList[i].mid;
					if(this.$store.state.oddschange[mid]){//如果有这场比赛mid
						this.oddsChangeA(mid,bettingModuleList,bettingModuleListL);
					}
				}
			}
			return  this.$store.state.oddschange || false;
		},
		playchange(){//socket玩法变化 具体玩法是否锁盘
			let	bettingModuleList = this.$store.state.bettingModuleL,
				bettingModuleListL = bettingModuleList.length;
			if(bettingModuleListL){
				for(let n = 0;n < bettingModuleListL;n ++){
					let mid = bettingModuleList[n].mid;
					if(this.$store.state.playchange[mid]){
						let playchange = this.$store.state.playchange[mid],
							playchangeL = playchange.length;
						for(let m =0;m < playchangeL;m ++){
							if(playchange[m].edid == bettingModuleList[n].edid){//如果投注列表里面的赔率变化了将oddsState设置为true
								let betStatus = playchange[m].newDetail.betState,
									canCombine = playchange[m].newDetail.canCombine;
								// this.$store.commit('playBetChange',{index:n,status:betStatus});//是否锁盘状态
								this.evenW();
								this.$store.commit('changeBetModule',{changeK:'oddsHint',changeV:true});
								// this.$store.commit('changeCanCombine',{index:n,key:'canCombine',t_or_f:canCombine});
								break;
							}
						}
					}
				}
			}
			return this.$store.state.playchange || false;
		},
		gamechange(){//socket比赛变化接口 整场比赛是否锁盘
			let bettingModuleList = this.$store.state.bettingModuleL,
				bettingModuleListL = bettingModuleList.length,
				gamechangeL = this.$store.state.gamechange.length;
			if(bettingModuleListL){
				for(let i = 0;i < bettingModuleListL;i ++){
					let mid = bettingModuleList[i].mid;
					if(this.$store.state.gamechange[mid]){//如果socket推送的所有比赛id里面有投注模块的比赛id
						let betStatus = this.$store.state.gamechange[mid].newDetail.betState;
						// this.$store.commit('gameBetChange',{index:i,status:betStatus});//是否锁盘状态
						this.evenW();
						this.$store.commit('changeBetModule',{changeK:'oddsHint',changeV:true});
						let allcanCombine = this.$store.state.gamechange[mid].newDetail.canCombine;
						// this.$store.commit('changeCanCombine',{index:i,key:'allcanCombine',t_or_f:allcanCombine});
					}
				}
			}
			return this.$store.state.gamechange || false;
		}
	},
	data(){
		return {
			bettingModule:false,
			evenWrite:true,
			betChangeFlag:true,
		}
	},
	methods:{
		evenW(){
			let betmoduleEvenList = this.betmoduleEvenList,
				betmoduleEvenListL = betmoduleEvenList.length,
				trueF = true;
			for(let i = 0;i < betmoduleEvenListL;i ++){
				if(this.betmoduleEvenList[i].gameBetChange == '0' || this.betmoduleEvenList[i].oddsBetChange == '0' || this.betmoduleEvenList[i].playBetChange == '0'){
					trueF = false;
				}
			}
			this.evenWrite = trueF ? true : false;
		},
		oddsChangeA(mid,bettingModuleList,bettingModuleListL){
			this.evenW();
			let allOddschange = this.$store.state.oddschange[mid],
			oddschangeL = allOddschange.length;
			if(bettingModuleListL){
				for(let m = 0;m < oddschangeL;m ++){//循环所有socket推过来的赔率
					for(let n = 0;n < bettingModuleListL;n ++){
						if(allOddschange[m].edoid == bettingModuleList[n].edoid){//如果投注列表里面的赔率变化了将oddsState设置为true
							let betStatus = allOddschange[m].newDetail.betState;//是否锁盘 0位锁盘 1为开盘
							if(allOddschange[m].oddsState != '0'){
								let winMoney = (allOddschange[m].newDetail.odds * bettingModuleList[n].betMoney).toFixed(2);//每当赔率变化可赢的钱也会变化
								this.$store.commit('changeOddsChange',{index:n,t_or_f:true});//赔率是否改变
								this.$store.commit('changeOdds',{index:n,newOdds:allOddschange[m].newDetail.odds});//变化的赔率
								this.$store.commit('changeWinMoney',{index:n,winMoney:winMoney});//设置可赢的钱
								// if(this.betChangeFlag){
									if(this.betmodule.confirmBet == '确认下注'){
										this.$store.commit('changeBetModule',{changeK:'confirmBet',changeV:'接受赔率变化'});
									}
									this.$refs.confirB.className = 'danger';
								// }
								// this.betChangeFlag = true;
							}
							this.$store.commit('oddsBetChange',{index:n,status:betStatus});//是否锁盘状态
							this.$store.commit('changeBetModule',{changeK:'oddsHint',changeV:true});
							break;
						}
					}
				}
			}
		},
		maxEvenMoney(){//点击串关最大投注
			this.$store.commit('changeBetModule',{changeK:'evenBetMoney',changeV:this.betmodule.maxMoney.toFixed(2)});
		},
		chooseEven(e){//点击串关
			this.$store.commit('changeBetModule',{changeK:'oddOrEven',changeV:false});
		},
		chooseOdd(e){//点击单关
			this.$store.commit('changeBetModule',{changeK:'oddOrEven',changeV:true});
		},
		betInputC(index){//点击输入金额输入框
			let bettingModuleListL = this.bettingModuleList.length;
			for(let i = 0;i < bettingModuleListL;i ++){
				this.$store.commit('changeBetData',{index:i,t_or_f:false});
			}
			this.$store.commit('changeBetData',{index:index,t_or_f:true}); //当对象里面的值改变时，
			// this.$forceUpdate();//启动render树重新渲染
		},
		inputMoney(e,index){//单关输入要投注的钱
			if(e.target.tagName == "SPAN"){
				let winMoney,betMoney = this.$store.state.bettingModuleL[index].betMoney + e.target.innerText;
				if(Number(betMoney) > this.$store.state.bettingModuleL[index].maxMoney){//如果填写的投注金额大于最大金额
					this.$popup({
						hint:this.$store.state.bettingModuleL[index].oddsName + '最高投注额 ' + this.$store.state.bettingModuleL[index].maxMoney,
						hintShow:true
					})
					betMoney = this.$store.state.bettingModuleL[index].maxMoney;
				}else if(betMoney == '0'){//如果第一次输入0则表将设置为空
					betMoney = '';
				}
				winMoney = betMoney == '' ? 0 : (this.$store.state.bettingModuleL[index].odds * betMoney).toFixed(2);
				this.$store.commit('changeBetMoney',{index:index,money:betMoney});//设置下注的钱
				this.$store.commit('changeWinMoney',{index:index,winMoney:winMoney});//设置最高可赢的钱
			}
		},
		evenMoney(e){//串关输入要投注的钱
			if(e.target.tagName == "SPAN"){
				let winMoney,betMoney = Number(this.betmodule.evenBetMoney) + e.target.innerText;
				if(Number(betMoney) > this.betmodule.maxMoney){//如果填写的投注金额大于最大金额
					this.$popup({
						hint:'最高投注额 ' + this.betmodule.maxMoney,
						hintShow:true
					})
					betMoney = this.betmodule.maxMoney;
				}else if(betMoney == '0'){//如果第一次输入0则表将设置为空
					betMoney = '';
				}
				winMoney = betMoney == '' ? '0.00' : (this.betmodule.evenAllOdds * betMoney).toFixed(2);
				betMoney = Number(betMoney).toFixed(2);
				this.$store.commit('changeBetModule',{changeK:'evenBetMoney',changeV:betMoney});
				this.$store.commit('changeBetModule',{changeK:'evenWinMoney',changeV:winMoney});
			}
		},
		deleteBetMoney(index){//删除修改单投投注金额
			let winMoney,betMoney = parseInt(this.bettingModuleList[index].betMoney / 10);//先除以10再取整
			if(betMoney == 0){
				betMoney = '';
			}
			winMoney = betMoney == '' ? 0 : (this.bettingModuleList[index].odds * betMoney).toFixed(2);
			this.$store.commit('changeBetMoney',{index:index,money:betMoney});
			this.$store.commit('changeWinMoney',{index:index,winMoney:winMoney});
		},
		deleteEvenMoney(){//删除修改串投投注金额
			let betMoney = parseInt(this.betmodule.evenBetMoney / 10).toFixed(2);//先除以10再取整
			this.$store.commit('changeBetModule',{changeK:'evenBetMoney',changeV:betMoney});
		},
		confirmBetMoney(index){//确认投注金额
			if(this.bettingModuleList[index].betMoney < 10 && this.bettingModuleList[index].betMoney > 0){//如果金额小于最小投注金额默认为最小投注金额
				this.$popup({
					hint:this.bettingModuleList[index].oddsName	 + '最低投注额 ' + this.bettingModuleList[index].minMoney,
					hintShow:true
				})
				let winMoney,betMoney = this.bettingModuleList[index].minMoney;
				winMoney = (this.bettingModuleList[index].odds * betMoney).toFixed(2);
				this.$store.commit('changeBetMoney',{index:index,money:betMoney});
				this.$store.commit('changeWinMoney',{index:index,winMoney:winMoney});
			}
			this.$store.commit('changeBetData',{index:index,t_or_f:false});
		},
		maxBetMoney(index){//最大投注
			let winMoney,betMoney = this.bettingModuleList[index].maxMoney;
			winMoney = (this.bettingModuleList[index].odds * betMoney).toFixed(2);
			this.$store.commit('changeBetMoney',{index:index,money:betMoney});
			this.$store.commit('changeWinMoney',{index:index,winMoney:winMoney});
		},
		confirmBtn(e){//确认投注
			document.getElementsByClassName('guesszIndex')[0].style.zIndex = '1';
			if(localStorage.getItem('userID')){//判断是否处于有效的登录状态
				if(this.betmodule.betclose == '展开'){
					this.openOrclose(e);
				}else if(this.betmodule.confirmBet == '接受赔率变化'){
					// this.betChangeFlag = false;
					this.$store.commit('changeBetModule',{changeK:'confirmBet',changeV:'确认下注'});
					e.target.className = '';
					setTimeout(()=>{
						console.log('gg')
						
					},1000)
					return;
				}else{
					if(this.$store.state.betmodule.oddOrEven){//如果单关投注
						let betpramas = [],i,
						bettingModuleList = this.$store.state.bettingModuleL,
						bettingModuleListL = bettingModuleList.length,
						oddsuoredL = this.$refs.oddsuored ? this.$refs.oddsuored.length : 0;
						if(oddsuoredL != bettingModuleListL){//如果选中的投注没有全部锁定就进入否则清除所有投注
							for(i = 0;i < bettingModuleListL;i ++){
								if(bettingModuleList[i].betMoney >= bettingModuleList[i].minMoney){//如果投注的钱大于最小投注值就将改注加入到投注列表中
									betpramas.push({
										betOdds:bettingModuleList[i].odds,
										edoid:bettingModuleList[i].edoid,
										money:bettingModuleList[i].betMoney,
									})
								}else{
									if(bettingModuleList[i].betMoney > 0){//如果投注的钱小于最小投注值就提示
										this.$popup({
											hint:bettingModuleList[i].oddsName + '最低投注额 ' + bettingModuleList[i].minMoney,
											hintShow:true
										})
										return;
									}
								}
							}
							if(!betpramas.length){//如果没有一个投注额被填写
								this.$popup({
									hint:'请输入投注金额',
									hintShow:true
								})
								return;
							}
							this.axios.post(this.http + '/api/Bet/UserBetSingle',{//会员投注
								userBetSingleList:betpramas,
								acceptOddsChange:true,
								userID:localStorage.getItem('userID')
							}).then((response)=>{
								if(response.data.resultCode == 1){
									this.$popup({
										hint:'投注成功',
										hintShow:true
									})
									let bettingModuleListL = this.$store.state.bettingModuleL.length,
										flag = false,
										betpramasL = betpramas.length;
									for(let i = 0;i < bettingModuleListL;i ++){//投注成功在vuex删除当前的投注
										for(let j = 0;j < betpramasL;j ++){
											if(this.$store.state.bettingModuleL[i].edoid == betpramas[j].edoid){
												this.deleteBetDataL(i);
												flag = true;
												bettingModuleListL = this.$store.state.bettingModuleL.length;
											}
										}
										if(flag){
											i = -1;
											flag = false;
										}
									}
								}
							}).catch((error)=>{
								console.log(error);
							})
						}else{
							this.deleteAllBetting();
						}
					}else{//如果串关投注
						if(this.$store.state.betmodule.evenList.length > 1 && this.$store.state.betmodule.evenList.length <= 8){
							if(this.$store.state.betmodule.evenBetMoney >= this.$store.state.betmodule.minMoney){//串投里面的钱大于最小投注
								let betpramas = [],i,bettingModuleListL = this.$store.state.betmodule.evenList.length;
								// evensuoredL = this.$refs.evensuored ? this.$refs.oddsuored.length : 0;
								for(i = 0;i < bettingModuleListL;i ++){
									betpramas.push({
										betOdds:Number(this.$store.state.betmodule.evenList[i].odds),//投注赔率
										edoid:this.$store.state.betmodule.evenList[i].edoid//投注赔率id
									})
								}
								this.axios.post(this.http + '/api/Bet/UserBetMultiple',{//会员串投投注
									acceptOddsChange:true,
									userBetMultipleExtend:{
										betType:this.$store.state.betmodule.evenList.length,
										money:this.$store.state.betmodule.evenBetMoney,
										userBetMultipleList:betpramas,
									},
									userID:localStorage.getItem('userID')
								}).then((response)=>{
									if(response.data.resultCode == 1){
										this.$popup({
											hint:'投注成功',
											hintShow:true
										})
										let bettingModuleListL = this.$store.state.bettingModuleL.length,
											flag = false,
											betpramasL = betpramas.length;
										for(let i = 0;i < bettingModuleListL;i ++){//投注成功在vuex删除当前的投注
											for(let j = 0;j < betpramasL;j ++){
												if(this.$store.state.bettingModuleL[i].edoid == betpramas[j].edoid){
													this.deleteBetDataL(i);
													flag = true,
													bettingModuleListL = this.$store.state.bettingModuleL.length;
												}
											}
											if(flag){
												i = -1;
												flag = false;
											}
										}
									}
								}).catch((error)=>{
									console.log(error);
								})
							}else if(this.$store.state.betmodule.evenBetMoney != '0.00' && this.$store.state.betmodule.evenBetMoney < this.$store.state.betmodule.minMoney){//串投里面的钱小于最小投注
								this.$popup({
									hint:'最低投注额 ' + this.$store.state.betmodule.minMoney,
									hintShow:true
								})
							}else{//没有输入投注金额
								this.$popup({
									hint:'请输入投注金额',
									hintShow:true
								})
							}
						}else if(this.$store.state.betmodule.evenList.length == 1){
							this.$popup({
								hint:'串关投注最少选择2个项目',
								hintShow:true
							})
						}else if(this.$store.state.betmodule.evenList.length > 8){
							this.$popup({
								hint:'串关投注最多选择8个投注项目',
								hintShow:true
							})
						}
					}
				}
			}else{
				this.$router.push('/login');
			}
		},
		addChangeBetModuleL(data){//增加一条串关投注
			this.$store.commit('addChangeBetModule',data);
		},
		deleteChangeBetModuleL(index){//删除一条串关投注
			this.$store.commit('deleteChangeBetModule',index)
		},
		deleteBetDataL(index){//删除一条投注
			let betmoduleL = this.$store.state.betmodule.evenList.length,
				edoid = this.$store.state.bettingModuleL[index].edoid;
			//删除串关里面的投注
			for(let i = 0;i < betmoduleL;i ++){//循环串关里面的列表
				if(this.$store.state.betmodule.evenList[i].edoid == edoid){//如果删除的该条数据在串关里面
					let mid = this.$store.state.bettingModuleL[index].mid;
					this.deleteChangeBetModuleL(i);//删除串关列表里面的该条投注
					this.$store.commit('deleteBetData',index);//删除单关里面的一条数据
					betmoduleL = this.$store.state.betmodule.evenList.length;
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
			
		},
		deleteAllBetting(){//清空所有的投注
			let bettingModuleListL = this.bettingModuleList.length;
			for(let i = 0;i < bettingModuleListL;i ++){
				this.deleteBetDataL(0)
			}
		},
		openOrclose(e){
			if(this.$store.state.betmodule.betclose == '折叠'){
				this.$store.commit('changeBetModule',{changeK:'betclose',changeV:'展开'});
				this.$store.commit('changeBetModule',{changeK:'popup_dialog',changeV:false});
				this.$store.commit('changeBetModule',{changeK:'confirmBet',changeV:'立即投注'});
			}else{
				this.$store.commit('changeBetModule',{changeK:'betclose',changeV:'折叠'});
				this.$store.commit('changeBetModule',{changeK:'popup_dialog',changeV:true});
				if(this.$refs.confirB.className == 'danger'){
					this.$store.commit('changeBetModule',{changeK:'confirmBet',changeV:'接受赔率变化'});
				}else{
					this.$store.commit('changeBetModule',{changeK:'confirmBet',changeV:'确认下注'});
				}
				let bettingModuleListL = this.bettingModuleList.length;
				if(bettingModuleListL == 1){
					this.$store.commit('changeBetData',{index:0,t_or_f:true});
				}else{
					for(let i = 0;i < bettingModuleListL;i ++){
						this.$store.commit('changeBetData',{index:i,t_or_f:false});
					}
				}
				
			}
		},
		...mapMutations(['deleteBetData','changeBetData','changeBetMoney','changeWinMoney','changeOddsChange','oddsBetChange','changeBetModule','playBetChange','gameBetChange','changeOdds','changeCanCombine']),
	},
	filters:{
		allOdds(data){
			let res = /([0-9]+.[0-9]{2})[0-9]*/;
			return (data + '').replace(res,"$1");
		},
		evenMoneyL(data){
			if(data == '0.00'){
				return '';
			}else{
				return parseInt(data);
			}
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
	.vux-popup-dialog
		position: fixed
		left: 0
		width: 100%
		transition-property: transform;
		transition-duration: .3s
		overflow-y: auto
		max-height: calc(100vh - 251px)
		bottom: 45px
		display: flex
		justify-content: flex-start
		flex-direction: column
		height: auto
		background: none
		z-index:2
		.orderlisthead
			position: relative
			display:flex
			height: 40px !important
			background: #0f1419
			padding: 0 10px
			font-size: 1.2rem
			font-weight: lighter
			color: #fff
			line-height:40px
			justify-content:space-between
			.choose-way
				width:40%
				display:flex
				justify-content:center
				align-items:center
				height:100%
				label
					display:flex
					align-items:center
					width:50%
					justify-content:space-around
					height:70%
					background:#202630
					color:#c2c5c8
					font-size:14px
					border-radius:2px 0 0 2px
					&:last-child
						border-radius:0 2px 2px 0
				.choose-active
					background:#2b3a4a
					color:#03fcb3
			.removebtn
				i
					font-size: 14px
					margin-right:2px
			.tag  
				font-style: normal
				display: inline-block
				font-size: 10px
				font-weight: 400
				height: 13px
				line-height: 13px
				min-width: 18px
				border-radius: 10px
				padding: 0 4.5px
				position: relative
				top: -1px
				text-align: center
				color: #fff
				background: #05a87f
				margin-left: 5px
				vertical-align: middle
		.orderlist
			width: 100%
			display: flex
			flex-direction: column
			left: 0
			bottom: 0
			overflow-x: hidden
			overflow-y: auto
			background: #28323c
			border-radius: 0 0 0 0
			height: auto
			max-height: calc(100vh - 296px)
			position: relative
			.allcontent
				width:100%
				height:100%
				overflow-y:auto
				position:relative
				#vux-scroller-84fvw
					height: auto
					touch-action: auto
					user-select: none
					-webkit-user-drag: none
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0)
					position: relative
					overflow: hidden
					.xs-container
						transform-origin: 0px 0px
						transform: translate(0px, 0px) translateZ(0px)
						.list
							width: 100%
							height: 100%
							flex: 1
							overflow-y: auto
							overflow-x: hidden
							-webkit-overflow-scrolling: touch
							position: relative
							transform-origin: 0px 0px
							transform: translate(0px, 0px) translateZ(0px)
							.retinabb
								position: relative;
								&:after
									position:absolute
									content:''
									left:0
									right:0
									transform: scaleY(.5)
									transform-origin: 100% 100%
									height: 1px
									border: 1px solid rgba(21,50,48,.06)
									background:#222
									pointer-events: none
									bottom:0
								&:last-child:after
									height:0
									border:none
							li
								display: flex
								justify-content: space-between
								flex-wrap: wrap
								font-weight: lighter
								.rwt
									display: flex
									justify-content: space-between
									width: 100%
									padding: 10px
									.c-1
										text-align: left
										max-width: calc(100% - 135px)
										h2
											font-size: 1.2rem;
											color: #fff;
											font-weight: 400;
											margin-bottom: 10px;
											display: flex
											flex-wrap: wrap
											overflow: hidden
											text-overflow: ellipsis
											-webkit-box-orient: vertical
											-webkit-line-clamp: 2
											span
												margin-left: 10px
												color: #ffe87a
												display: inline-block
												padding: 0 5px
												border-radius: 2px
												height:17px
											.suored
												background:red
												color:#fff
										p
											margin-top: 3px
											font-size: 1rem
											span
												margin-right: 3px
									.c-2
										font-size: 1rem
										text-align: right
										.closebtn
											display: inline-block
											width: 18px
											height: 18px
											line-height: 18px
											text-align: center
											background: hsla(0,0%,100%,.15)
											border-radius: 100%
											i
												font-size: 10px
										.input
											margin-top: 3px
											span
												display: inline-block
												height: 32px
												line-height: 32px
												width: 65px
												text-align: center
												margin-top: 5px
												color: #fff
												&:first-child
													border-radius: 2px 0 0 2px
													box-shadow: inset 0 1px 0 1px rgba(0,0,0,.31), 0 1px 1px 0 hsla(0,0%,100%,.04)
													background: rgba(0,0,0,.4)
												&:last-child
													margin-left: -3px
													background: #232b32
													color: #a4a6a9
													border-radius: 0 2px 2px 0
												b
													display: inline-block
													width: 1px
													height: 16px
													background: #ccc
													border-radius: 2px
													margin-left: 5px
													opacity:0.3
													vertical-align: middle
													animation: fade 0.6s infinite alternate forwards
													@keyframes fade
														from
															opacity:1
														to 
															opacity:0.3
										
								.lock
									background:linear-gradient(90deg,#666 0,transparent)
									color:#888
								.change
									background:linear-gradient(90deg,#5d3031 0,transparent)
									color:#888
									.c-1
										h2
											span
												background: #d5093c
												color: #fff									
							.rwb
								width: 100%
								.keyboard
									width: 100%
									padding: 10px
									.number
										display: flex
										flex-wrap: nowrap
									.keys
									.number	
										span
											display: inline-block
											height: 40px
											line-height: 40px
											text-align: center
											background: #29323a linear-gradient(180deg,#29323a,#222a31)
											box-shadow: inset 0 1px 0 0 hsla(0,0%,100%,.05), 0 1px 2px 0 rgba(0,0,0,.57)
											width: 10%
											margin-right: 5px
											border-radius: 3px
											font-size: 18px
											color: #fff
											font-weight: 400
									.keys
										justify-content: space-between
										margin-top: 5px
										display: flex
										flex-wrap: nowrap
										span
											width: 33.333%
											font-size: 1.4rem
											&:first-child
												line-height: normal
												padding-top: 2px
											b
												display: block
												font-size: 1.2rem
												color: #ffe87a
											i
												font-size: 32px
						.even-input
							width:100%
							div
								display:flex
								padding:0 10px
								color:#fff
								height:32px
								align-items:center
								justify-content:space-between
								.special-color
									color:#03fcb3
								.write-money
									width:65px
									height:28px
									line-height:28px
									text-align:center
									border-radius: 2px 0 0 2px
									box-shadow: inset 0 1px 0 1px rgba(0,0,0,.31), 0 1px 1px 0 hsla(0,0%,100%,.04)
									background: rgba(0,0,0,.4)
									b
										display: inline-block
										width: 1px
										height: 16px
										background: #ccc
										border-radius: 2px
										margin-left: 5px
										opacity:0.3
										vertical-align: middle
										animation: fade 0.6s infinite alternate forwards
										@keyframes fade
											from
												opacity:1
											to 
												opacity:0.3
		.orderlistordermsg
			position: relative
			width: 100%
			height: 45px
			line-height: 45px
			text-align: center
			color: #ffe87a
			background: #202630
			box-shadow: inset 0 -1px 0 0 rgba(0,0,0,.24), 0 1px 3px 0 hsla(0,0%,100%,.04)
			font-size: 1.2rem
			font-weight: lighter
			i
				margin-right: 5px
				position: relative
				top: 1px
	.orderinput
		position: fixed
		bottom: 0
		left: 0
		height: 48px
		width: 100%
		padding: 0 10px
		display: flex
		justify-content: space-between
		align-items: center
		background: #202630
		font-weight: lighter
		z-index:2
		.l
			color: #eee
			font-size: 1.2rem
			height: 100%
			display: flex
			flex-direction: column
			align-content: center
			justify-content: center
			align-items: center
			b
				display: inline-block
				color: #fff
				background: #05a87f
				padding: 0 8px
				border-radius: 30px
				line-height: 14px
				font-size: 1.2rem
				margin-left: 3px
				position: relative
			em
				font-style: normal
				color: #ffe87a
		.r 
			span:first-child
				padding-right: 20px
				line-height: 44px
				display: inline-block
				color: #03fcb3
				i
					margin-right: 3px
					position: relative
					top: 1px
					font-size:14px
					transition: all .3s ease 0s
			span:last-child
				display: inline-block
				height: 48px
				line-height: 48px
				margin-right: -10px
				padding: 0 10px
				color: #fff
				background: #0b9f72 linear-gradient(180deg,#0b9f72,#0d966e)
			span.danger
				background:#d5093c
</style>