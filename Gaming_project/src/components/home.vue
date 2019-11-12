<template>
	<div class="home">
		<div class="main">
			<div class="banner">
				<swiper :options="swiperOption">
					<swiper-slide v-for="item of swiperList" :key="item.id"><img class="swiper-img" :src="item.imgUrl"></swiper-slide>
					<div class="swiper-pagination"  slot="pagination"></div>
				</swiper>
			</div>
			<div class="menu-oper">
				<a href="#/UC/Deposit/Index" class="">
					<span><i class="iconfont bz-cunkuan">&#xe67c;</i></span> 
					<label>充值</label>
				</a> 
				<a href="#/UC/Withdraw/Index" class=""><span><i class="iconfont bz-tikuan">&#xe618;</i></span> 
					<label> 提现</label>
				</a> 
				<a href="#/UC/BetRecord/Index" class=""><span><i class="iconfont bz-touzhujilv">&#xe61f;</i></span> 
					<label>投注记录</label>
				</a> 
				<a href="#/UC/Reg" class=""><span><i class="iconfont bz-shenfenzheng">&#xe733;</i></span> 
					<label>注册</label>
				</a>
			</div>
			<div class="hotMatch">
				<div class="head">
					<span><img src="@/assets/images/laba.svg">
          				今天还有<b>28</b>场精彩比赛喔~
        			</span> 
        			<span><i class="iconfont bz-you">&#xe657;</i></span>
        		</div>
        		<section class="gamelist">
        			<div class="item" v-for="(item,index) in gamelist" @click="toBet(item)">
        				<div class="tbox">
        					<div class="tname">
        						<span class="w20"><i><img :src="item.egameLogo" alt=""></i></span> 
        						<label> {{item.matchName}}<b> - BO{{item.bo}}</b></label>
        					</div> 
        					<div class="more">+{{item.playCount}}</div>
        				</div> 
        				<div class="cbox">
        					<div class="team">
        						<div class="tmlogo">
        							<img :src="item.egEgameMatchTeamList[0].teamLogo">
        						</div> 
    							<div class="tmodds moire">
    								<span class="tmname">{{item.egEgameMatchTeamList[0].team}}</span> 
    								<span class="odds ">{{oddsRealChange[index].oddsLeft||item.egEgameMatchTeamList[0].odds}}</span>
    							</div>
        					</div> 
    						<div class="score">
    							<span class="time"><p>{{item.matchDateTime | timestampToTime(item.matchDateTime)}}</p>
    								<b>{{item.matchDateTime | timestampToHours(item.matchDateTime)}}</b>
    							</span> 
    							<div class="tmstatus">
    								<span class="toStart" v-show="(oddsRealChange[index].betState||item.betState)==1 && !item.isLive"><img src="@/assets/images/commingGame.svg">未开始</span>
    								<span class="comingGame" v-show="item.isLive && (oddsRealChange[index].betState||item.betState)==1"><img src="@/assets/images/moveBall.svg">即将滚球</span>
    								<span class="play" v-show="(oddsRealChange[index].betState||item.betState)==2 && item.isLiving && item.videourl"><img src="@/assets/images/playVideo.svg">直播中</span>
    								<span class="play" v-show="(oddsRealChange[index].betState||item.betState)==2 && item.isLiving && !item.videourl"><img src="@/assets/images/playVideo.svg">滚球中</span>
    								<span class="gameEnd" v-show="(oddsRealChange[index].betState||item.betState)==3"><img src="@/assets/images/moveBall.svg">已结束</span>
    								<span class="gameCancle" v-show="(oddsRealChange[index].betState||item.betState)==4"><img src="@/assets/images/moveBall.svg">比赛取消</span>
    							</div>
    						</div> 
							<div class="team">
								<div class="tmlogo">
									<img :src="item.egEgameMatchTeamList[1].teamLogo">
								</div> 
								<div class="tmodds moire">
									<span class="tmname">{{item.egEgameMatchTeamList[1].team}}</span> 
									<span class="odds" v-show="false">{{oddschange||item.egEgameMatchTeamList[1].odds}}</span><!-- 为了使computed里面的值有变化而设置在页面上的 -->
									<span class="odds">{{oddsRealChange[index].oddsRight || item.egEgameMatchTeamList[1].odds}}</span>
								</div>
							</div>
    					</div>
        			</div>
        		</section>
			</div>
			<div class="News">
				<div class="items">
					<div class="head">
						<h2><em></em>新闻</h2> 
						<span><i class="iconfont bz-you">&#xe657;</i></span>
					</div> 
					<div class="list New clearfix">
						<div class="item" v-for='item in newslist'>
							<a href="#/News/Index/Article/2852" class="bd">
								<div class="detail">
									<div class="name">{{item.title}}</div> 
									<div class="time">
										<span><i class="iconfont bz-liulan">&#xe68b;</i>0</span> 
										<span><i class="iconfont bz-shijian">&#xe64d;</i>1小时前</span>
									</div>
								</div> 
								<div class="imgbox">
									<div class="ibg"></div> 
									<img :src="item.imgPath">
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'home',
	computed:{
		oddschange(){
			if(this.gamelist){ //当gamelist有值的时候进入循环
				let gamelistL = this.gamelist.length;
				for(let i = 0;i < gamelistL;i ++){
					if(this.$store.state.oddschange[this.gamelist[i].egEgameMatchTeamList[0].edoid]){//如果有左边比赛的赔率变化
						this.oddsRealChange[i].oddsLeft = this.$store.state.oddschange[this.gamelist[i].egEgameMatchTeamList[0].edoid].newOdds
					}
					if(this.$store.state.oddschange[this.gamelist[i].egEgameMatchTeamList[1].edoid]){//如果有左边比赛的赔率变化
						this.oddsRealChange[i].oddsRight = this.$store.state.oddschange[this.gamelist[i].egEgameMatchTeamList[1].edoid].newOdds
					}
					if(this.$store.state.oddschange[this.gamelist[i].egEgameMatchTeamList[0].edoid]){//如果有左边（右边）比赛的状态变化
						this.oddsRealChange[i].betState = this.$store.state.oddschange[this.gamelist[i].egEgameMatchTeamList[0].edoid].betState
					}
				}	
			}
			return this.$store.state.oddschange || false;
		}
	},
	data(){
		return {
			swiperOption:{
				pagination: {
				    el:'.swiper-pagination'
				},
	            autoplay:{
	            	delay:3000
	            },
	            loop:true
            },
            swiperList: [{
                id:'0001',
                imgUrl:'static/img/82131d6a5a294699bee8c8a110b8c56b.png'
            },
            {
                id:'0002',
                imgUrl:'static/img/c4c8ff6c0c75452aba82d7c708e2fbe5.png'
            },
            {
                id:'0003',
                imgUrl:'static/img/cd9a10c609154d0bb3dd790d7b1ce2e5.png'
            }],
            gamelist:null,
            newslist:null,
            oddsRealChange:[]
		}
	},
	mounted(){
		this.gameList();
		this.newsList();
	},
	methods:{
		gameList(){
			this.axios.post(this.http + '/api/Bet/GetEgEgameMatchHotList').then((response)=>{
				if(response.data.resultCode == 1){
					this.gamelist = response.data.resultData.egEgameMatchList;
					let gamelistL = this.gamelist.length;
					for(var i = 0;i < gamelistL;i ++){//将oddsRealChange变成一个有对象值的数组
						this.oddsRealChange[i] = {oddsLeft:'',betState:'',oddsRight:''};
					}
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		newsList(){
			this.axios.post(this.http + '/api/News/GetNewsContentList',{
				pageIndex: 1,
				pageSize: 6
			}).then((response)=>{
				this.newslist = response.data.resultData.newsContentList;
			}).catch((error)=>{
				console.log(error)
			})
		},
		toBet(item){
			this.$router.push(`/bet/${item.mid}`);
		},
	},
	filters:{//时间过滤器
		timestampToTime(times){ //年月日
			let date = new Date(times),
				Y = date.getFullYear() + '-',
				M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
				D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			return Y + M + D;
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
.banner>>>.swiper-pagination-bullet //这里因为在scoped的限制下面需要这样写穿透样式
	width:13px
	height:2px
	border-radius:0
	background:hsla(37,21%,88%,.6)
	opacity:0.2
.banner>>>.swiper-pagination-bullet-active 
	background:#fff
	opacity:1
.home
	position:fixed
	top:45px
	right:0
	bottom:60px
	left:0
	z-index:1
	background:#000
	.main
		width: 100%
		height: 100%
		flex: 1
		overflow-y: auto
		margin-bottom: -1px
		.banner
			width:100%
			height:0
			padding-bottom:42.667%
			.swiper-img
				width:100%
		.menu-oper
			display: flex
			padding: 4px 0 12px
			background: linear-gradient(to bottom,#27313e,#293443)
			a
				display: inline-block
				text-align: center
				width: 25%
				span
					display:inline-block
					width: 46px
					height: 46px
					line-height: 46px
					border-radius: 100%
					margin: 0 auto
					i
						font-size: 30px
				label
					display: block
					color: #fff
		.menu-oper a:nth-of-type(1) span i
			color: #07f1b6
		.menu-oper a:nth-of-type(2) span i
			color: #3cc0fe
		.menu-oper a:nth-of-type(3) span i
			color: #ffc136
		.menu-oper a:nth-of-type(4) span i
			color: #9f9fff
.hotMatch
	margin-top:10px
	.head
		height: 40px
		line-height: 40px
		padding: 0 10px
		color: #fff
		display: flex
		justify-content: space-between
		font-size: 1.2rem
		position:relative
		background: linear-gradient(90deg,#2b3a4a,#202630)
		img
			width: 24px
			vertical-align: middle
			position: relative
			bottom: 1px
		b
			color: #03fcb3
			margin: 0 3px
		i
			font-size: 1rem
			color: #b5c1cd
	.head:after
		position:absolute
		content:''
		left:0
		right:0
		bottom:0
		height:1px
		background:#222
	.gamelist 
		.item:last-child
			border-bottom-width:0
		.item
			border-radius: 0
			box-shadow: none
			border-bottom: 2px solid #000
			position: relative
			background: linear-gradient(90deg,#2b3a4a,#202630)
			padding: 10px
			font-size: 12px
			color: #fff
			.tbox
				display: flex
				justify-content: space-between
				align-items: center
				margin-bottom: 10px
				i
					display: inline-block
					vertical-align: -6px;
					width: 20px
					height: 20px
					img
						width:100%
				.more
					border: 1px solid
					border-image: linear-gradient(90deg,#2a91d4,#03fcb3) 1 1;
					border-radius: 4px
					color: #03fcb3
					display: inline-block
					width: 30px
					text-align: center
					font-size: 12px
			.cbox
				display: flex
				justify-content: space-between
				.team
					width: 35%
					text-align: center
					.tmlogo
						width: 46px
						height: 46px
						overflow: hidden
						margin: 0 auto
						img
							height: 100%
							width: auto
							vertical-align: middle
					.tmodds 
						height: 40px
						display: flex
						align-items: center
						justify-content: center
						flex-direction: column
						background: #2d3f49
						color: #fff
						box-shadow: inset 0 1px 0 0 hsla(0,0%,100%,.05), 0 1px 2px 0 rgba(0,0,0,.57)
						text-align: center
						border-radius: 2px
						font-size: 1.4rem
						border: .5px solid #0b9f72
						position: relative
						overflow: hidden
						.tmname
							font-size: 1rem
							color: #bacef1
							.odds
								font-size: 1.3rem
								font-weight: 700
								font-family: -apple-system,Helvetica,sans-serif
				.score
					width: 30%
					display: flex
					align-items: center
					justify-content: space-around
					flex-direction: column
					text-align: center
					b
						font-size:16px
					.tmstatus
						font-size: 1.2px
						img
							width: 18px
							height: 18px
							display: inline-block
							vertical-align: middle
							position: relative
							bottom: 2px
							margin-right: 3px
						.toStart
							color:#fff
						.comingGame
							color:$special-color
						.play
							color:#ffe600
						.gameEnd
							color: #ffe600
						.gameCancle
							color:#fff	
.News
	margin-top:10px
	background:linear-gradient(to bottom,#232a35,#2b3949,#232a35)
.head
	height: 40px
	line-height: 40px
	display: flex
	justify-content: space-between
	padding: 0 10px
	h2
		font-size: 1.4rem
		font-weight: 400
		color: #03fcb3	
		em
			display: inline-block
			width: 2px
			height: 13px
			background: #03fcb3
			margin-right: 10px
			position: relative
			top: 2px
			border-radius: 2px
	span
		font-size: 13px
		 i
			font-size: 10px
			color: #b5c1cd
.New
	padding: 0
	.item
		position: relative
		&:before
			position:absolute
			content:''
			top: 0
			right: 0
			left:0
			height: 1px
			transform-origin: 0 0
			border-top: 1px solid #222
			transform: scaleY(.5)
		.bd 
			display: flex
			justify-content: space-between
			padding: 10px
			position: relative
			color: #b5c1cd
			.detail
				display: flex
				flex-direction: column
				justify-content: space-around
				width: 60%
				padding-right: 10px
				margin-top: .3em
				.name
					font-size: 1.4rem
					font-weight: lighter
					color: #fff
				.time
					font-size: 1.2rem
					color: #b5c1cd
					i
						margin-right: 3px
						position: relative
						top: 1px
						font-size: 1.4rem
				.time span:first-child 
					display: inline-block
					width: 80px
			.imgbox
				width: 40%
				height: 85px
				position: relative
				border-radius: 4px
				overflow: hidden
				.ibg
					position: absolute
					top: 0
					left: 0
					width: 100%
					height: 100%
					z-index: 999
				img
					width: 100%
					height: 85px
					vertical-align: middle
					object-fit: cover
</style>
