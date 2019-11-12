<template>
	<div class="guess" ref='zIndex'>
		<div class="main">
			<header class="header">
				<nav class="menu">
					<div class="l">
						<ul class="clearfix">
							<li class="active"><a mark="today" @click="getAllList">今日<span>18</span></a></li> 
							<li><a mark="Roller" @click="getAllList">滚盘<span>4</span></a></li> 
							<li><a mark="gameBefore" @click="getAllList">赛前<span>48</span></a></li> 
							<li><a mark="gameResult" @click="getAllList">赛果</a></li> 
							<li><a href="javascript:void(0)">筛选 <i class="iconfont bz-shaixuan"></i></a></li>
          				</ul>
          			</div>
          		</nav>
          	</header>
          	<div class="notice">
          		<div class="l"><img src="@/assets/images/laba.svg"></div>
          		<div class="r">
          			<marquee id="marquee"  scrollamount="3" scroll>
          				<ul>
          					<li>请注意:[电子竞技] [ CSGO [ESEA MDL -欧洲] [ CR4ZY vs Tricked ] 由于赛事提前开始，此赛事所有注单取消，返还本金，带来不便敬请谅解。请注意:[电子竞技] [ CSGO ] [ESEA MDL - 北美] [Divine vs Ben's Anime Team] 由于赛程时间变更，所有注单将被取消，返还本金，带来不便敬请谅解。温馨提示：亚洲电竞不会通过客服提供任何充值方式 (银行卡号、二维码...等等方式)，充值方式及信息只会在官网存款页面上显示，经由客户自行申请及付款.请注意:[电子竞技] [ CSGO [ESEA MDL -欧洲] [ CR4ZY vs Tricked ] 由于赛事提前开始，此赛事所有注单取消，返还本金，带来不便敬请谅解。</li>
          				</ul>
          			</marquee>
          		</div>
          	</div>
          	<div class="index" v-show="PageCount" ref="minHeightS">
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
		          		<div class="item" v-for="(item,index) in gameMacthList">
		          			<div class="tbox">
		          				<div class="tname">
		          					<span class="w20"><i></i></span> 
		          					<label> 中国职业联赛<b> - BO{{item.bo}}</b></label>
		          				</div> 
		          				<div class="more"> +{{item.playCount}} </div>
		          			</div> 
		          			<div class="mbox">
		          				<div class="team">
		          					<div class="tmlogo"><img :src="item.egEgameMatchTeamList[0].teamLogo"></div> 
		          					<div class="tmname">{{item.egEgameMatchTeamList[0].team}}</div>
		          				</div> 
		          				<div class="score">
		          					<span class="scorebox" v-show="(oddsRealChange[index].betState||item.betState) ==2">
		          						<label><i class="iconfont bz-0"></i></label> 
		          						<em>:</em> 
		          						<label>
		          							<i class="iconfont bz-1"></i>
		          						</label>
		          					</span>
		          					<span class="time" v-show="(oddsRealChange[index].betState||item.betState) ==1">{{item.matchDateTime|timestampToHours}}</span>
		          				</div> 
		          				<div class="team">
		          					<div class="tmlogo"><img :src="item.egEgameMatchTeamList[1].teamLogo"></div> 
		          					<div class="tmname">{{item.egEgameMatchTeamList[1].team}}</div>
		          				</div>
		          			</div> 
		          			<div class="fbox">
		          				<div class="tmodds">
		          					<span class="odds">{{oddsRealChange[index].oddsLeft||item.egEgameMatchTeamList[0].odds}}
									</span>
									<span class="odds" v-show="false">{{oddschange||item.egEgameMatchTeamList[1].odds}}</span><!-- 为了使computed里面的值有变化而设置在页面上的 -->
								</div> 
								<div class="tmstatus">
									<span class="toStart" v-show="(oddsRealChange[index].betState||item.betState)==1 && !item.isLive"><img src="@/assets/images/commingGame.svg">未开始</span>
		    						<span class="comingGame" v-show="item.isLive && (oddsRealChange[index].betState||item.betState)==1"><img src="@/assets/images/moveBall.svg">即将滚球</span>
		    						<span class="play" v-show="(oddsRealChange[index].betState||item.betState)==2 && item.isLiving && item.videourl"><img src="@/assets/images/playing.svg">直播中</span>
		    						<span class="play" v-show="(oddsRealChange[index].betState||item.betState)==2 && item.isLiving && !item.videourl"><img src="@/assets/images/movingBall.svg">滚球中</span>
		    						<span class="gameEnd" v-show="(oddsRealChange[index].betState||item.betState)==3"><img src="@/assets/images/moveBall.svg">已结束</span>
		    						<span class="gameCancle" v-show="(oddsRealChange[index].betState||item.betState)==4"><img src="@/assets/images/moveBall.svg">比赛取消</span>
								</div> 
								<div class="tmodds">
									<span class="odds">
										{{oddsRealChange[index].oddsRight||item.egEgameMatchTeamList[1].odds}}
									</span>
								</div>
							</div> 
						</div>
						<!-- <div class="scroll-bottom"></div> -->
						<data-loading v-show="dataLoad" :loadingWords='loadingWords'></data-loading>
					</div>
				</scroll>
			</div>
			<div v-show="!PageCount" class="Lo">暂无数据</div>
		</div>
	</div>
</template>
<script>
import scroll from '@/base/scroll'
import dataLoading from '@/base/dataLoading'
export default{
	name:'guess',
	components:{
		scroll,
		dataLoading
	},
	computed:{
		oddschange(){
			if(this.gameMacthList){ //当gamelist有值的时候进入循环
				let gameMacthListL = this.gameMacthList.length;
				for(let i = 0;i < gameMacthListL;i ++){
					if(this.$store.state.oddschange[this.gameMacthList[i].egEgameMatchTeamList[0].edoid]){//如果有左边比赛的赔率变化
						this.oddsRealChange[i].oddsLeft = this.$store.state.oddschange[this.gameMacthList[i].egEgameMatchTeamList[0].edoid].newOdds
					}
					if(this.$store.state.oddschange[this.gameMacthList[i].egEgameMatchTeamList[1].edoid]){//如果有左边比赛的赔率变化
						this.oddsRealChange[i].oddsRight = this.$store.state.oddschange[this.gameMacthList[i].egEgameMatchTeamList[1].edoid].newOdds
					}
					if(this.$store.state.oddschange[this.gameMacthList[i].egEgameMatchTeamList[0].edoid]){//如果有左边（右边）比赛的状态变化
						this.oddsRealChange[i].betState = this.$store.state.oddschange[this.gameMacthList[i].egEgameMatchTeamList[0].edoid].betState
					}
				}
				return  this.$store.state.oddschange || false;
			}
		}
	},
	data(){
		return{
			gameMacthList:[],
			oddsRealChange:[],
			PageCount:1,//为false时为暂无数据
			dataLoad:false,
			loadingWords:'上拉加载',
			scrollDownL:false,
			upLoadingWords:'下拉刷新',
			GetTodayListR:this.GetTodayList(10),//每页请求的数据为10条
			GetRollerListR:null,
			getBeforeListR:null,
			getResultListR:null,
		}
	},
	mounted(){
		console.log(this.$refs.minHeightS.offsetHeight)
		this.$refs.minHeightB.style.minHeight = (this.$refs.minHeightS.offsetHeight + 0.5) + 'px';
		this.GetTodayListR();
	},
	methods:{
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
						pageIndex:PageI,
						pageSize:pageSize
					}).then((response)=>{
						this.loadingWords = '上拉加载';
						this.scrollDownL = false;
						if(response.data.resultCode == 1){
							this.gameMacthList = this.gameMacthList.concat(response.data.resultData.egEgameMatchList)
							let gameMacthListL = this.gameMacthList.length;
							for(var i = (pageSize * (PageI - 1));i < gameMacthListL;i ++){//将oddsRealChange变成一个有对象值的数组
								this.oddsRealChange[i] = {oddsLeft:'',betState:'',oddsRight:''};
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
					if(PageI >=2 ){
						this.$refs.zIndex.style.zIndex = '11';
					}
					this.axios.post(this.http + '/api/Bet/GetEgEgameMatchList',{
						sortID:2,
						pageIndex:PageI,
						pageSize:pageSize
					}).then((response)=>{
						this.loadingWords = '上拉加载';
						this.scrollDownL = false;
						if(response.data.resultCode == 1){
							this.gameMacthList = this.gameMacthList.concat(response.data.resultData.egEgameMatchList)
							let gameMacthListL = this.gameMacthList.length;
							for(var i = (pageSize * (PageI - 1));i < gameMacthListL;i ++){//将oddsRealChange变成一个有对象值的数组
								this.oddsRealChange[i] = {oddsLeft:'',betState:'',oddsRight:''};
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
		getBeforeList(pageSize){
			let PageI = 0,PageN = 1; //利用闭包储存两个私有变量
			this.dataLoad = false;
			this.gameMacthList = [];
			return ()=>{
				if(PageI < PageN){
					PageI ++;
					if(PageI >=2 ){
						this.$refs.zIndex.style.zIndex = '11';
					}
					this.axios.post(this.http + '/api/Bet/GetEgEgameMatchList',{
						sortID:3,
						pageIndex:PageI,
						pageSize:pageSize
					}).then((response)=>{
						this.loadingWords = '上拉加载';
						this.scrollDownL = false;
						if(response.data.resultCode == 1){
							this.gameMacthList = this.gameMacthList.concat(response.data.resultData.egEgameMatchList)
							let gameMacthListL = this.gameMacthList.length;
							for(var i = (pageSize * (PageI - 1));i < gameMacthListL;i ++){//将oddsRealChange变成一个有对象值的数组
								this.oddsRealChange[i] = {oddsLeft:'',betState:'',oddsRight:''};
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
		getResultList(pageSize){
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
						pageIndex:PageI,
						pageSize:pageSize
					}).then((response)=>{
						this.loadingWords = '上拉加载';
						this.scrollDownL = false;
						if(response.data.resultCode == 1){
							this.gameMacthList = this.gameMacthList.concat(response.data.resultData.egEgameMatchList)
							let gameMacthListL = this.gameMacthList.length;
							for(var i = (pageSize * (PageI - 1));i < gameMacthListL;i ++){//将oddsRealChange变成一个有对象值的数组
								this.oddsRealChange[i] = {oddsLeft:'',betState:'',oddsRight:''};
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
				targetEle = e.target.parentElement
			}
			if(targetEle.parentElement.className != "active"){
				this.dataLoad = false;
				$('.active').removeClass("active");
				targetEle.parentElement.className = "active";
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
	},
	filters:{
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
.guess
	position:fixed
	top:45px
	right:0
	bottom:0
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
		.Lo
			height:40px
			display:flex
			align-items:center
			justify-content:center
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
							i
								width: 20px
								height: 20px
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
									color: #ffe600
								.gameCancle
									color:$normal-color
					.scroll-bottom
						height:50px
						width:100%

					
								
</style>