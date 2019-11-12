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
						<span>{{details.matchDateTime|timestampToTime}}</span> 
						<span>{{details.matchDateTime|timestampToHours}}</span> 
						<span class="toStart" v-show="details.state==6"><img src="@/assets/images/commingGame.svg">未开始</span>
		    			<span class="comingGame" v-show="details.state==5"><img src="@/assets/images/moveBall.svg">即将滚球</span>
						<span class="play" v-show="details.state==2"><img src="@/assets/images/playing.svg">直播中</span>
						<span class="play" v-show="details.state==1"><img src="@/assets/images/movingBall.svg">滚球中</span>
						<span class="gameEnd" v-show="details.state==3"><img src="@/assets/images/moveBall.svg">已结束</span>
						<span class="gameCancle" v-show="details.state==4"><img src="@/assets/images/moveBall.svg">比赛取消</span>
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
				<section class="guess">
					<div class="cont">
						<div :id="'guide_'+index" class="items" v-for="(item,index) in sortList">
							<div class="tp">
								<div class="line"></div> 
								<span>{{item.playSortName}}</span> 
								<div class="line"></div>
							</div> 
							<ul class="list">
								<li v-for="items in item.baseEgamePlayList">
									<h3><em></em>{{item.playSortName}} - {{items.playName}}</h3> 
									<div v-for="itemss in items.egEgameMatchDetailsList">
										<div class="odd" :class="{'odd-active':betEdoid.indexOf(itemsss.edoid) != -1}" :edoid="itemsss.edoid" v-for="itemsss in itemss.egEgameMatchDetailOddsList" @click="bettingList($event,itemsss,item.playSortName,items)">
											<span>{{itemsss.oddsName}}</span>
											<span><i class="iconfont bz-suoding" v-show="itemss.betState == 0 || itemsss.oddsBetState==0">&#xe65e;</i><i class="iconfont" v-show="itemss.betState == 1 && itemsss.oddsBetState==1">{{itemsss.odds}}</i></span>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</div>
		</div>
		<div v-show="bettingModule">
			<div class="vux-popup-dialog" v-show="popup_dialog">
				<div class="orderlisthead">
					<span class="removebtn">
						<i class="iconfont bz-qingkong"></i>清空全部<em class="tag">{{bettingModuleList.length}}</em>
					</span> 
					<span class="closebtn"><i class="iconfont bz-close">&#xe687;</i></span>
				</div> 
				<div class="orderlist">
					<div id="vux-scroller-84fvw">
						<div class="xs-container">
							<div class="list">
								<ul>
									<li class="retinabb" v-for="(item,index) in bettingModuleList">
										<div class="rwt">
											<div class="c-1">
												<h2>{{item.oddsName}}<span></span> 
													<span>@{{item.odds}}</span>
												</h2> 
												<p>
													<span>{{item.playSortName}} - {{item.playName}}</span>
												</p> 
												<p>
													<span>{{details.hTeam}}</span>
													<span>- vs -</span>
													<span>{{details.vTeam}}</span>
												</p>
											</div> 
											<div class="c-2">
												<div class="closebtn">
													<i class="iconfont bz-close">&#xe687;</i>
												</div> 
												<div class="input">
													<span>请输入金额</span> <span data-v-146fe13f="">可赢金额:0</span>
												</div>
											</div>
										</div> 
										<div class="rwb" v-show="enterMoney+'_'+index">
											<div class="keyboard">
												<div class="number">
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
													<span>最大投注<b>{{item.maxMoney}}</b></span> 
													<span><i class="iconfont bz-shanchu">&#xe750;</i></span> 
													<span>确认</span>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>  
						</div>
						<div class="xs-fixed-container"></div>
						<div>
							<div></div>
						</div>
					</div>
				</div> 
				<div></div>
			</div> 
			<div class="orderinput">
				<div class="l">
					<span v-show="betclose=='展开'">已选注单<b>{{bettingModuleList.length}}</b></span>
					<span v-show="betclose=='折叠'">下注金额：0.00</span> 
					<span v-show="betclose=='折叠'">最高可赢：<em>0.00</em></span>
				</div> 
				<div class="r">
					<span @click="openOrclose">
						<i class="iconfont bz-zhedie" v-show="betclose=='折叠'">&#xe617;</i>
						<i class="iconfont bz-zhedie" v-show="betclose=='展开'">&#xe600;</i>{{betclose}}</span>
					<span>{{confirmBet}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapActions,mapMutations} from 'vuex'
export default{
	name:'betting',
	computed:{
		bettingModuleList(){//每一次投注数据的变化都能察觉
			let bettingModuleLL = this.$store.state.bettingModuleL.length;
			this.betEdoid = '';
			console.log(bettingModuleLL)
			for(let i = 0;i < bettingModuleLL;i ++){//将所有选择了的投注的edoid连成一个字符串
				console.log(this.$store.state.bettingModuleL[i].edoid)
				this.betEdoid += this.$store.state.bettingModuleL[i].edoid + '|';
			}
			
			this.bettingModule = bettingModuleLL == 0 ? false : true;//整块投注模块的显示隐藏
			if(bettingModuleLL == 0){
				this.bettingModule = false;
				this.betclose = '折叠';
				this.popup_dialog = true;
				this.enterMoney_0 = true;
				this.confirmBet = '确认下注';
			}else{
				this.bettingModule = true;
			}
			if(bettingModuleLL == 2){//所有投注模块的上部分的显示与隐藏	
				this.betclose = '展开';
				this.popup_dialog = false;
				this.enterMoney_0 = false;
				this.confirmBet = '立即投注';
			}
			return this.$store.state.bettingModuleL || false;
		},
	},
	data(){
		return{
			details:{},
			sortList:[],
			bettingModule:false,
			enterMoney_0:true,
			popup_dialog:true,
			betclose:'折叠',
			betEdoid:'|',
			confirmBet:'确认下注'
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
					this.details = response.data.resultData.defaultMatchDetails;
					this.sortList = response.data.resultData.basePlaySortList;
					let sortListL = this.sortList.length;
					this.$refs.vux_tab_ink.style.width = (100 / sortListL) + 'vw'; //全局比赛选中标记
					this.gameTitle({//将比赛的头部细节存入vuex里面
						gametitle:response.data.resultData.defaultMatchDetails
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
						}
					}
				},50)
			}
			return this.scroll_top();
		},
		bettingList(e,itemsss,playSortName,baseEgamePlayList){//点击赔率进行投注
			let targetDiv = e.target.tagName == 'DIV' ? e.target : e.target.parentNode.tagName == "DIV" ? e.target.parentNode : e.target.parentNode.parentNode;
			if(targetDiv.classList.value.indexOf('odd-active') > -1){//点击取消删除投注
				targetDiv.classList.remove('odd-active');
				let bettingModuleListL = this.$store.state.bettingModuleL.length;
				for(let i = 0;i < bettingModuleListL;i ++){//在vuex删除当前点击的
					console.log(this.$store.state.bettingModuleL[i].edoid,targetDiv.getAttribute('edoid'))
					if(this.$store.state.bettingModuleL[i].edoid == targetDiv.getAttribute('edoid')){
						this.deleteBetDataL(i);
						break;
					}
				}
			}else{//点击添加投注
				let bettingModuleObj = {};
				targetDiv.classList.add('odd-active');
				bettingModuleObj.oddsName = itemsss.oddsName;
				bettingModuleObj.odds = itemsss.odds;
				bettingModuleObj.playSortName = playSortName;
				bettingModuleObj.playName = baseEgamePlayList.playName;
				bettingModuleObj.maxMoney = baseEgamePlayList.maxMoney;
				bettingModuleObj.minMoney = baseEgamePlayList.minMoney;
				bettingModuleObj.edoid = itemsss.edoid;
				this.addBetDataL(bettingModuleObj);
			}
		},
		addBetDataL(data){
			this.$store.commit('addBetData',data)
		},
		deleteBetDataL(index){
			this.$store.commit('deleteBetData',index)
		},
		openOrclose(){
			if(this.betclose == '折叠'){
				this.betclose = '展开';
				this.popup_dialog = false;
				this.confirmBet = '立即投注';
			}else{
				this.betclose = '折叠';
				this.popup_dialog = true;
				this.confirmBet = '确认下注';
			}
			
		},
		...mapActions(['gameTitle']),
		...mapMutations(['addBetData','deleteBetData']),
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
						.odd-active
							background: #0b9f72
							color: #fff
						.odd:nth-of-type(even)
							float: right
							flex-direction:row-reverse
							span:first-child
								color: #fff
								font-size: 1.25rem
			.items:last-child
				margin-bottom:0
	.vux-popup-dialog
		position: fixed
		left: 0
		width: 100%
		transition-property: transform;
		transition-duration: .3s
		overflow-y: auto
		max-height: calc(100vh - 250px)
		bottom: 45px
		display: flex
		justify-content: flex-start
		flex-direction: column
		height: auto
		background: none
		.orderlisthead
			position: relative
			height: 40px
			line-height: 40px
			background: #0f1419
			padding: 0 10px
			font-size: 1.2rem
			font-weight: lighter
			color: #fff
			.removebtn
				i
					font-size: 13px
					margin-right: 3px
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

</style>