<template>
	<div class="betting">
		<div class="main">
			<header class="header">
				<div class="team">
					<div class="tm">
						<span class="gmicon"><img :src="details.hTeamLogo"></span>
						<b>{{details.hTeam}}</b>
					</div> 
					<div class="bf">
						<span v-if="(gameStateAndR.state||details.state) == '5' || (gameStateAndR.state||details.state) == '6'">{{details.matchDateTime|timestampToTime}}</span> 
						<span v-if="(gameStateAndR.state||details.state) == '5' || (gameStateAndR.state||details.state) == '6'">{{details.matchDateTime|timestampToHours}}</span>
						<span v-if="(gameStateAndR.state||details.state) == '1' || (gameStateAndR.state||details.state) == '2'" class="scorebox">
							<label>
								<i class="iconfont">{{(gameStateAndR.result||details.result)|gameResultLeft()}}</i>
							</label> 
							<em>:</em>
							<label>
								<i class="iconfont">{{(gameStateAndR.result||details.result)|gameResultRight()}}</i>
							</label>
						</span> 
						<span class="toStart" v-show="(gameStateAndR.state||details.state)==6"><img src="@/assets/images/commingGame.svg">未开始</span>
		    			<span class="comingGame" v-show="(gameStateAndR.state||details.state)==5"><img src="@/assets/images/moveBall.svg">即将滚球</span>
						<span class="play" v-show="(gameStateAndR.state||details.state)==2"><img src="@/assets/images/playing.svg">直播中</span>
						<span class="play" v-show="(gameStateAndR.state||details.state)==1"><img src="@/assets/images/movingBall.svg">滚球中</span>
						<span class="gameEnd" v-show="(gameStateAndR.state||details.state)==3"><img src="@/assets/images/moveBall.svg">已结束</span>
						<span class="gameCancle" v-show="(gameStateAndR.state||details.state)==4"><img src="@/assets/images/moveBall.svg">比赛取消</span>
					</div> 
					<div class="tm">
						<span class="gmicon"><img :src="details.vTeamLogo"></span> <b>{{details.vTeam}}</b>
					</div>
				</div>
				<div class="tabs">
					<div class="vux-tab-wrap">
						<div class="vux-tab-container">
							<div class="vux-tab" ref="vux_tab_item">
								<div class="vux-tab-item" v-for="(item,index) in sortList" @click="sortListC(index)" :class="{'vux-tab-selected':index === 0}">{{item.playSortName}}</div>
								<div class="vux-tab-ink-bar" ref="vux_tab_ink"></div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div id="main2" class="main-bet" @scroll="scrollTop" ref="scrollDiv">
				<section class="guess" :computed1="oddschange" :computed2="playchange" :computed3="gamechange" :computed4="bettingModuleList">
					<div class="cont" :class="{'cont-bottom':bettingModuleList.length}">
						<div :id="'guide_'+index" class="items" v-for="(item,index) in sortList">
							<div class="tp">
								<div class="line"></div> 
								<span>{{item.playSortName}}</span> 
								<div class="line"></div>
							</div> 
							<ul class="list">
								<li v-for="items in item.egEgameMatchDetailsList">
									<h3><em></em>{{item.playSortName}} - {{items.playName}}</h3> 
									<div class="odd" v-for="itemss in items.egEgameMatchDetailOddsList" :class="{'odd-active':betEdoid.indexOf(itemss.edoid) != -1}" :edoid="itemss.edoid" @click="bettingList($event,item,items,itemss)">
										<span>{{itemss.oddsName}}</span>
										<span>
											<i class="iconfont bz-suoding" v-show="items.betState == '0' || itemss.oddsBetState == '0' || allMidsuo == '0'">&#xe65e;</i>
											<span v-show="items.betState == '1' && itemss.oddsBetState == '1' && allMidsuo == '1'" :class="'odds-change'+itemss.oddsState">
												<i class="iconfont odds-shang" v-show="itemss.oddsState=='1'">&#xe609;</i>
												<i class="iconfont odds-xia" v-show="itemss.oddsState=='2'">&#xe641;</i>
												{{itemss.odds}}
											</span>
										</span>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>
<script>
import scroll from '@/base/scroll'
import {mapActions,mapMutations} from 'vuex'
export default{
	name:'betting',
	components:{
		scroll,
	},
	computed:{
		bettingModuleList(){//每一次投注数据的变化都能察觉
			let bettingModuleLL = this.$store.state.bettingModuleL.length;
			this.betEdoid = '';
			for(let i = 0;i < bettingModuleLL;i ++){//将所有选择了的投注的edoid连成一个字符串
				this.betEdoid += this.$store.state.bettingModuleL[i].edoid + '|';
			}
			return this.$store.state.bettingModuleL || false;
		},
		oddschange(){//socket赔率变化 每个赔率是否锁盘以及具体赔率的变化和变化的趋势
			
			if(this.sortList.length){ //当sortList有值的时候进入循环
				let mid = this.$route.params.id;
				setTimeout(()=>{
					if(this.$store.state.oddschange[mid]){//如果有这场比赛mid
						let sortListL = this.sortList.length,
							oddschangeL = this.$store.state.oddschange[mid].length;
						for(let m = 0;m < oddschangeL;m ++){//循环所有socket推过来的赔率
							for(let i = 0;i < sortListL;i ++){//3层循环找出本场比赛具体有哪些赔率edoid
								// let baseEgamePlayListL = this.sortList[i].baseEgamePlayList.length;
								// for(let j = 0;j < baseEgamePlayListL;j ++){
									let egEgameMatchDetailsListL = this.sortList[i].egEgameMatchDetailsList.length;
									for(let k = 0;k < egEgameMatchDetailsListL;k ++){
										let egEgameMatchDetailOddsListL = this.sortList[i].egEgameMatchDetailsList[k].egEgameMatchDetailOddsList.length;
										for(let l = 0;l < egEgameMatchDetailOddsListL;l ++){
											let edoid = this.sortList[i].egEgameMatchDetailsList[k].egEgameMatchDetailOddsList[l].edoid;	
											if(this.$store.state.oddschange[mid][m].edoid == edoid){
												let sortListO = this.sortList[i].egEgameMatchDetailsList[k].egEgameMatchDetailOddsList[l],
													oddschangeO = this.$store.state.oddschange[mid][m];
												sortListO.odds = oddschangeO.newDetail.odds;//更新具体赔率
												sortListO.oddsState = oddschangeO.oddsState;//更新具体赔率的变化是上升还是下降
												sortListO.oddsBetState = oddschangeO.newDetail.betState;//更新具体赔率是开盘还是封盘
												break;
											}
										}
									}
								// }
							}
						}
					}
				},20)
			}
			return  this.$store.state.oddschange || false;
		},
		playchange(){//socket玩法变化 具体玩法是否锁盘
			if(this.sortList.length){//当sortList有值的时候进入循环
				let mid = this.$route.params.id;
				setTimeout(()=>{
					if(this.$store.state.playchange[mid]){//如果socket玩法变化有这场比赛mid
						let playchangeL = this.$store.state.playchange[mid].length,sortListL = this.sortList.length;
						for(let i =0;i < playchangeL;i ++){//循环socket所有推送过来的玩法id（edid）
							for(let j = 0;j < sortListL; j++){//多层循环找出本页面的玩法id
								let baseEgamePlayListL = this.sortList[0].baseEgamePlayList.length;
								for(let k = 0;k < baseEgamePlayListL;k ++){
									let egEgameMatchDetailsListL = this.sortList[0].baseEgamePlayList[0].egEgameMatchDetailsList.length;
									for(let l = 0;l < egEgameMatchDetailsListL;l++){
										let edid = this.sortList[j].baseEgamePlayList[k].egEgameMatchDetailsList[l].edid;
										if(this.$store.state.playchange[mid][i].edid == edid){//如果本页面的edid与socket推送过来的edid一样 说明该玩法id的状态需要改变
											// console.log('玩法id'+edid)
											this.sortList[j].baseEgamePlayList[k].egEgameMatchDetailsList[l].betState = this.$store.state.playchange[mid][i].newDetail.betState;//玩法是否锁盘状态
											this.sortList[j].baseEgamePlayList[k].egEgameMatchDetailsList[l].canCombine = this.$store.state.playchange[mid][i].newDetail.canCombine;//是否可以串投
											break;
										}
									}
								}
							}
						}
					}
				},20)
			}
			return this.$store.state.playchange || false;
		},
		gamechange(){//socket比赛变化接口 整场比赛是否锁盘
			if(this.sortList.length){
				let mid = this.$route.params.id;
				setTimeout(()=>{
					if(this.$store.state.gamechange[mid]){//如果socket比赛变化有这场比赛mid
						let gamechangeO = this.$store.state.gamechange[mid];
						this.gameStateAndR.result = gamechangeO.newDetail.result;//比赛结果变化
						this.gameStateAndR.state = gamechangeO.newDetail.state;//比赛进程变化
						this.allMidsuo = gamechangeO.newDetail.betState;//整场比赛的锁定状态
						this.allcanCombine = gamechangeO.newDetail.canCombine;//正常比赛的是否可以串投
					}
				},20)
			}
			return this.$store.state.gamechange || false;
		}
	},
	data(){
		return{
			details:{},
			gameStateAndR:{},
			sortList:[],
			betEdoid:'',
			popup_dialog:'',
			confirmBet:'',
			allMidsuo:'',//全场比赛的mid锁
			allcanCombine:''//全场比赛的是否可以串投
		}
	},
	mounted(){
		this.gameDetails();
	},
	methods:{
		gameDetails(){//请求比赛细节接口
			this.axios.post(this.http + '/api/Bet/GetEgEgameMatchDetailsList',{
				mid:this.$route.params.id
			}).then((response)=>{
				if(response.data.resultCode == 1){
					let data = response.data.resultData
					this.details = data.defaultMatchDetails;
					this.allcanCombine = data.defaultMatchDetails.canCombine;
					this.sortList = data.basePlaySortList;
					this.allMidsuo = data.defaultMatchDetails.betState;
					let sortListL = this.sortList.length;
					this.$refs.vux_tab_ink.style.width = (100 / sortListL) + 'vw'; //全局比赛选中标记
					this.gameTitle({//将比赛的头部细节存入vuex里面
						gametitle:response.data.resultData.defaultMatchDetails
					})
					this.$nextTick(()=>{//在页面渲染完之后 
						for(let i = 0;i < sortListL;i ++){//循环全场比赛的玩法种类 用户一进入页面就跑到相关瞄点
							if(this.sortList[i].checked){
								this.sortListC(i);
							}
						}
					})
					
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		sortListC(index){//点击不同按钮跳转到不同的瞄点
			document.getElementsByClassName('vux-tab-selected')[0].classList.remove('vux-tab-selected');
			this.$refs.vux_tab_item.getElementsByTagName('div')[index].classList.add('vux-tab-selected');
			this.$refs.vux_tab_ink.style.left = (index * this.$refs.vux_tab_ink.offsetWidth) + 'px';
			document.getElementById('guide_' + index).scrollIntoView(true);
		},
		scrollTop(){//绑定页面滚动事件
			this.scroll_top(); 
		},
		scroll_top(){//监听页面滑动到某个位置对应标题
			let sortListL = this.sortList.length,
				listDivName = [],
				timer = null;
			for(let i = 0;i < sortListL;i ++){
				listDivName.push(document.getElementById('guide_' + i).offsetTop);	
			}
			this.scroll_top = ()=>{// 惰性函数加闭包优化性能
				clearTimeout(timer);
				timer = setTimeout(()=>{ //防抖 在滑动结束后50ms执行函数 
					for(let i = 0;i < sortListL;i ++){
						if((listDivName[i - 1] || 0) <= this.$refs.scrollDiv.scrollTop && this.$refs.scrollDiv.scrollTop < listDivName[i]){
							document.getElementsByClassName('vux-tab-selected')[0].classList.remove('vux-tab-selected');
							this.$refs.vux_tab_item.getElementsByTagName('div')[i - 1].classList.add('vux-tab-selected');
							this.$refs.vux_tab_ink.style.left = ((i - 1) * this.$refs.vux_tab_ink.offsetWidth) + 'px';
						}else if(this.$refs.scrollDiv.scrollTop > listDivName[sortListL - 1]){
							document.getElementsByClassName('vux-tab-selected')[0].classList.remove('vux-tab-selected');
							this.$refs.vux_tab_item.getElementsByTagName('div')[sortListL - 1].classList.add('vux-tab-selected');
							this.$refs.vux_tab_ink.style.left = ((sortListL - 1) * this.$refs.vux_tab_ink.offsetWidth) + 'px';
						}
					}
				},50)
			}
			return this.scroll_top();
		},
		bettingList(e,item,items,itemss){//点击赔率进行投注
			let targetDiv = e.currentTarget;
			if(targetDiv.classList.value.indexOf('odd-active') > -1){//点击取消删除投注
				targetDiv.classList.remove('odd-active');
				let bettingModuleListL = this.$store.state.bettingModuleL.length,
					edoid = targetDiv.getAttribute('edoid'),
					mid,
					betmoduleL = this.$store.state.betmodule.evenList.length;
				for(let i = 0;i < bettingModuleListL;i ++){//在vuex删除当前点击的
					if(this.$store.state.bettingModuleL[i].edoid == edoid){
						mid = this.$store.state.bettingModuleL[i].mid;
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
				if(targetDiv.lastElementChild.lastElementChild.style.display != 'none'){
					let bettingModuleObj = {};
					targetDiv.classList.add('odd-active');
					bettingModuleObj.oddsName = itemss.oddsName;
					bettingModuleObj.odds = itemss.odds;
					bettingModuleObj.playSortName = item.playSortName;
					bettingModuleObj.playName = items.playName;
					bettingModuleObj.maxMoney = items.maxMoney;//最大投注
					bettingModuleObj.minMoney = items.minMoney;//最小投注
					bettingModuleObj.canCombine = items.canCombine;//玩法是否可以串投
					bettingModuleObj.allcanCombine = this.allcanCombine;//整场比赛是否可以串投
					bettingModuleObj.edoid = itemss.edoid;//赔率id
					bettingModuleObj.edid = items.edid;//玩法id
					bettingModuleObj.mid = this.$route.params.id;//比赛id
					bettingModuleObj.betListObj = false;
					bettingModuleObj.betMoney = '';
					bettingModuleObj.canWinMoney = 0;
					bettingModuleObj.oddsChange = false;//赔率改变
					bettingModuleObj.oddsBetChange = '';//赔率锁盘or开盘
					bettingModuleObj.playBetChange = '';//玩法锁盘or开盘
					bettingModuleObj.gameBetChange = '';//比赛锁盘or开盘
					bettingModuleObj.hTeam = this.details.hTeam//左边的队名
					bettingModuleObj.vTeam = this.details.vTeam//右边的队名
					this.addBetDataL(bettingModuleObj);
					// 添加串投列表里面的数据
					if(itemss.canCombine && this.allcanCombine){//玩法和比赛都可以串投时
						if(this.$store.state.betmodule.evenList.length == 0){//如果串投列表为空 将第一个单投数据加入到串投中
							let data = this.$store.state.bettingModuleL[0];
							this.addChangeBetModuleL(data);
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
			this.$store.commit('addBetData',data)
		},
		deleteBetDataL(index){//删除一条投注
			this.$store.commit('deleteBetData',index)
		},
		...mapActions(['gameTitle']),
		...mapMutations(['addBetData','deleteBetData','changeBetData','changeBetMoney','changeWinMoney','changeOddsChange','oddsBetChange','playBetChange','gameBetChange','addChangeBetModule','deleteChangeBetModule']),
	},
	filters:{
		timestampToTime(times){ //月日周
			let date = new Date(times),
				// Y = date.getFullYear() + '-',
				M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月',
				D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日',
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
			return M + D + W;
		},
		timestampToHours(times){//时分
			let date = new Date(times),
				h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':',
				m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
			return h + m;
		},
		gameResultLeft(result){//字符串过滤器 只要比赛结果的左边字符
			let index = result.lastIndexOf(":")
			return result.substring(0,index);
		},
		gameResultRight(result){//字符串过滤器 只要比赛结果的右边字符
			let index = result.lastIndexOf(":") + 1;
			return result.substring(index);
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.betting
	top:45px
	right:0
	bottom:0
	left:0
	position:fixed
	background:$background-color
	z-index:1
	.main
		width: 100%
		height: 100%
		margin: 0 auto
		display: flex
		flex-direction: column
		.header
			height: 156px
			position: relative
			background: linear-gradient(0deg,#2b3a4a 0,#0f1419)
			box-shadow: 0 0 13px rgba(0,0,0,.22)
			font-weight: lighter
			.team
				background: transparent
				box-shadow: 0 1px 5px rgba(0,0,0,.1)
				z-index: 2
				height: 116px
				display: flex
				justify-content: space-around
				overflow: hidden
				.tm
					text-align: center
					width: 108px
					flex-direction: column
					align-items: center
					display: flex
					justify-content: space-around
					.gmicon
						display: inline-block
						height: 64px
						width: auto
						img
							height: 100%
							width: auto
							vertical-align: middle
					b
						margin-bottom: 1rem
						color: #fff
						display: block
						font-weight: 400
						word-wrap: break-word
						font-size: 1.25rem
				.bf
					width: calc(100% - 216px)
					height: 100%
					text-align: center
					font-size: 1.2rem
					display: flex
					flex-direction: column
					align-content: center
					justify-content: space-around
					align-items: center
					span
						color: #bacef1
					span:nth-child(2)
						color: #fff
						font-size: 1.6rem
						font-weight: 700
						letter-spacing: 3px
						margin: -1rem 0
					img
						width: 16px
						height: 16px
						display: inline-block
						vertical-align: middle
						position: relative
						bottom: 2px
						margin-right: 3px
					.scorebox
						display: flex
						flex-wrap: nowrap
						justify-content: center
						em
							font-style: normal
							font-size: 20px
							margin: 0 10px
							display: inline-block
							bottom: 2px
							font-weight: 700
							font-family: Segoe UI,Tahoma,Geneva,Verdana,sans-serif
							position: relative
							color: #bacef1
						i
							font-size: 24px
							margin: 0 -3px
							color: #fff
							font-weight:400
			.tabs
				display: flex
				justify-content: flex-start
				background: #0f1419
				box-shadow: 0 1px 5px rgba(0,0,0,.1)
				z-index:2
				position: relative
				.vux-tab-wrap
					position: initial
					padding-top: 44px
					.vux-tab-container
						height: 44px
						top: 0
						left: 0
						right: 0
						overflow: hidden
						position: absolute
						.vux-tab
							display: flex
							height: 44px
							position: relative
							.vux-tab-item
								display: block
								flex: 1
								width: 100%
								height: 100%
								box-sizing: border-box
								background-size: 100% 1px
								text-align: center
								line-height: 44px
								color: #fff
								border-bottom: 1px solid none
								border-image: initial
								font-size: 1.2rem
							.vux-tab-ink-bar
								position: absolute
								height: 22px
								bottom: 0
								left: 0
								text-align: center
								display: block
								background-color: transparent
								transition: left .3s cubic-bezier(.35,0,.25,1),left .3s cubic-bezier(.35,0,.25,1) .09s
								&::after
									position:absolute
									content:''
									width:60%
									height:16px
									bottom:0
									z-index:-1
									left:20%
									background-image: radial-gradient(ellipse farthest-side at bottom, #196b61 20%, #0f1419 102%)
									background-origin: content-box
								&::before
									position: absolute
									content: ''
									left: 20%
									right: 20%
									bottom: 0
									height: 2px
									display: inline-block
									border-radius: 3px
									background: #03fcb3
							.vux-tab-selected
								color: #07f1b7
								
		.main-bet
			position: relative
			width: 100%
			height: 100%
			flex: 1
			overflow-y: auto
			margin-bottom: -1px
			background: rgb(15, 20, 25)
			.items
				padding: 10px
				background: linear-gradient(90deg,#2b3a4a,#202630)
				margin-bottom: 5px
				font-size: 1.2rem
				.tp
					position: relative
					display: flex
					justify-content: center
					align-items: center
					height: 30px
					margin-bottom: 10px
					.line
						height: 1px
						width: 100px
						position: relative
						&::after
							pointer-events: none
							position: absolute
							content: ""
							height: 1px
							background:hsla(0,0%,100%,.2)
							transform: scaleY(.3333)
							left: 0
							right: 0
					 span
						margin: 0 5px
						display: inline-block
						background: #2d3f49
						color: #95a6c6
						padding: 2px 10px
						border-radius: 40px
				.list
					li
						margin-bottom: 15px
						&::after
							content: " "
							display: table
							clear: both
						h3
							font-size: 1.2rem
							color: #fff
							font-weight: 400
							line-height: 12px
							margin-bottom: 10px
							font-weight: lighter
							em
								list-style: none
								display: inline-block
								background: #03a36c
								height: 7px
								width: 7px
								border-radius: 7px 0
								bottom: 1px
								margin-right: 5px
								position: relative
						.odd
							width: calc(50% - 10px)
							margin-bottom: 10px
							background: #2d3f49
							float: left
							position: relative
							overflow: hidden
							height: 40px
							line-height: 40px
							text-align: left
							box-shadow: inset 0 1px 0 0 hsla(0,0%,100%,.05), 0 1px 2px 0 rgba(0,0,0,.57)
							color: #bacef1
							text-decoration: none
							padding: 0 8px
							display: flex
							justify-content: space-between
							border: .5px solid #0b9f72
							border-radius: 2px
							span:first-child
								font-size: 1.2rem
								display: flex
								flex-wrap: wrap
								align-items: center
								line-height: normal
								font-weight: 200
							span:last-child
								color: #fff
								font-size: 1.25rem
								i
									font-size: 1.4rem
									position: relative
									top: -1px
								i.bz-suoding
									margin-right: 8px
									color: #ffe87a
								span
									i
										top: 0
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
								.odds-change1
									color:#6dd169
								.odds-change2
									color:red
						.odd-active
							background: #0b9f72
							color: #fff
						.odd:nth-of-type(even)
							float: right
							flex-direction:row-reverse					
							span:last-child
								span
									float:right
									display: flex
									flex-direction: row-reverse
									i
										margin-left:4px
								
			.items:last-child
				margin-bottom:0
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
		.orderlisthead
			position: relative
			display:flex
			height: 40px
			line-height: 40px
			background: #0f1419
			padding: 0 10px
			font-size: 1.2rem
			font-weight: lighter
			color: #fff
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
			.closebtn
				position: absolute
				top: 0
				right: 0
				width: 40px
				text-align: center
		.orderlist
			width: 100%
			display: flex
			flex-direction: column
			left: 0
			bottom: 0
			overflow-x: hidden
			overflow-y: auto
			background: #28323c
			z-index: 100
			border-radius: 0 0 0 0
			height: auto
			max-height: initial
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
		height: 45px
		width: 100%
		padding: 0 10px
		display: flex
		justify-content: space-between
		align-items: center
		background: #202630
		font-weight: lighter
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
				height: 45px
				line-height: 45px
				margin-right: -10px
				padding: 0 10px
				color: #fff
				background: #0b9f72 linear-gradient(180deg,#0b9f72,#0d966e)
			span.danger
				background:#d5093c
.cont-bottom
	margin-bottom:45px

</style>