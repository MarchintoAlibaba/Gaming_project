<template>
	<div class="home">
		<div class="main">
			<div class="banner">
				<swiper :options="swiperOption">
					<swiper-slide v-for="item of swiperList" :key="item.pid">
						<router-link :to="'/promotions/'+item.pid">
							<img class="swiper-img" v-lazy="item.imgUrl">
						</router-link>
					</swiper-slide>
					<div class="swiper-pagination"  slot="pagination"></div>
				</swiper>
			</div>
			<div class="menu-oper">
				<router-link to="/personal/deposit">
					<span><i class="iconfont bz-cunkuan">&#xe67c;</i></span> 
					<label>充值</label>
				</router-link> 
				<router-link to="/personal/setting/bank"><span><i class="iconfont bz-tikuan">&#xe618;</i></span> 
					<label> 提现</label>
				</router-link> 
				<router-link to="/personal/betRecord"><span><i class="iconfont bz-touzhujilv">&#xe61f;</i></span> 
					<label>投注记录</label>
				</router-link> 
				<router-link to="/reg"><span><i class="iconfont bz-shenfenzheng">&#xe733;</i></span> 
					<label>注册</label>
				</router-link>
			</div>
			<div class="hotMatch">
				<router-link class="head" to="/guess">
					<span><img src="@/assets/images/laba.svg">
          				今天还有<b>{{gameCount.sD1}}</b>场精彩比赛喔~
        			</span>
        			<span>{{people}}：在线人数</span>
        		</router-link>
        		<section class="gamelist" :computed1="oddschange" :computed2="gamechange">
        			<div class="item" v-for="(item,index) in gamelist" @click="toBet(item.mid)">
        				<div class="tbox">
        					<div class="tname">
        						<span class="w20"><i><img :src="item.egameLogo" alt=""></i></span> 
        						<label> {{item.matchName}}<b> - {{item.bo}}</b></label>
        					</div> 
        					<div class="more">+{{item.playCount}}</div>
        				</div> 
        				<div class="cbox">
        					<div class="team">
        						<div class="tmlogo">
        							<img :src="item.egEgameMatchTeamList[0].teamLogo">
        						</div> 
    							<div class="tmodds">
    								<span class="tmname">{{item.egEgameMatchTeamList[0].team}}</span> 
    								<span class="odds ">{{oddsRealChange[index].oddsLeft||item.egEgameMatchTeamList[0].odds}}</span>
    							</div>
        					</div> 
    						<div class="score">
    							<span class="time" v-if='(oddsRealChange[index].state||item.state) == 5 || (oddsRealChange[index].state||item.state) == 6'>
    								<p>{{item.matchDateTime | timestampToTime(item.matchDateTime)}}</p>
    								<b>{{item.matchDateTime | timestampToHours(item.matchDateTime)}}</b>
    							</span> 
    							<span class="scorebox" v-if='(oddsRealChange[index].state||item.state) == 1 || (oddsRealChange[index].state||item.state) == 2 || (oddsRealChange[index].state||item.state) == 3'>
    								<label><i class="iconfont">{{(oddsRealChange[index].result||item.result)|gameResultLeft()}}</i></label>
    								<em>:</em> 
    								<label><i class="iconfont">{{(oddsRealChange[index].result||item.result)|gameResultRight()}}</i></label>
    							</span>
    							<div class="tmstatus">
    								<span class="toStart" v-if="(oddsRealChange[index].state||item.state)==6"><img src="@/assets/images/commingGame.svg">{{item.stateName}}</span>
    								<span class="comingGame" v-if="(oddsRealChange[index].state||item.state)==5"><img src="@/assets/images/moveBall.svg">{{item.stateName}}</span>
    								<span class="play" v-if="(oddsRealChange[index].state||item.state)==2"><img src="@/assets/images/playVideo.svg">{{item.stateName}}</span>
    								<span class="play" v-if="(oddsRealChange[index].state||item.state)==1"><img src="@/assets/images/playVideo.svg">{{item.stateName}}</span>
    								<span class="gameEnd" v-if="(oddsRealChange[index].state||item.state)==3">{{item.stateName}}</span>
    								<span class="gameCancle" v-if="(oddsRealChange[index].state||item.state)==4">{{item.stateName}}</span>
    							</div>
    						</div> 
							<div class="team">
								<div class="tmlogo">
									<img :src="item.egEgameMatchTeamList[1].teamLogo">
								</div> 
								<div class="tmodds">
									<span class="tmname">{{item.egEgameMatchTeamList[1].team}}</span>
									<span class="odds">{{oddsRealChange[index].oddsRight || item.egEgameMatchTeamList[1].odds}}</span>
								</div>
							</div>
    					</div>
        			</div>
        		</section>
			</div>
			<div class="News">
				<div class="items">
					<router-link to="/news" class="head">
						<h2><em></em>新闻</h2> 
						<span><i class="iconfont bz-you">&#xe657;</i></span>
					</router-link> 
					<div class="list New clearfix">
						<div class="item" v-for='item in newslist'>
							<router-link :to="'newsCenter/'+item.cid" class="bd">
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
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<transition name="slide">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
	name: 'home',
	props:['people'],
	computed:{
		oddschange(){//比赛赔率变化
			if(this.gamelist.length){ //当gamelist有值的时候进入循环
				let gamelistL = this.gamelist.length;
				for(var j = 0;j < gamelistL;j ++){//循环首页三场比赛
					if(this.$store.state.oddschange[this.gamelist[j].mid]){//如果有这场比赛mid
						let i = 0,
							gameMid = this.gamelist[j].mid,
							gameOddsListL = this.$store.state.oddschange[gameMid].length;
						for(;i < gameOddsListL;i ++){//循环本场比赛的所有赔率
							if(this.$store.state.oddschange[gameMid][i].edoid == this.gamelist[j].egEgameMatchTeamList[0].edoid){
								this.oddsRealChange[j].oddsLeft = this.$store.state.oddschange[gameMid][i].newDetail.odds
							}else if(this.$store.state.oddschange[gameMid][i].edoid == this.gamelist[j].egEgameMatchTeamList[1].edoid){
								this.oddsRealChange[j].oddsRight = this.$store.state.oddschange[gameMid][i].newDetail.odds
							}
						}
					}
				}	
			}
			return this.$store.state.oddschange || false;
		},
		gamechange(){//比赛变化
			if(this.gamelist.length){
				let gamelistL = this.gamelist.length;
				for(let j = 0;j < gamelistL;j ++){
					if(this.$store.state.gamechange[this.gamelist[j].mid]){
						this.oddsRealChange[j].state = this.$store.state.gamechange[this.gamelist[j].mid].newDetail.state;
						this.oddsRealChange[j].result = this.$store.state.gamechange[this.gamelist[j].mid].newDetail.result;
					}
				}
			}
			return this.$store.state.gamechange || false;
		},
		gameCount(){//比赛条数变化
			return this.$store.state.sortListCount || false;
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
            swiperList: [],
            gamelist:[],
            newslist:[],
            oddsRealChange:[],
		}
	},
	mounted(){
		this.gameList();
		this.newsList();
		this.sortList();
		this.getSwiperList();
	},
	methods:{
		getSwiperList(){//优惠活动轮播
			this.axios.post(this.http + '/api/BaseInfo/GetPPromotionList',{
				state:0,
			}).then(response=>{
				if(response.data.resultCode == 1){
					this.swiperList = response.data.resultData.pPromotionList;
				}
			}).catch(error=>{
				console.log(error)
			})
		},
		gameList(){//热门比赛列表
			this.axios.post(this.http + '/api/Bet/GetEgEgameMatchHotList').then((response)=>{
				if(response.data.resultCode == 1){
					this.gamelist = response.data.resultData.egEgameMatchList;
					let gamelistL = this.gamelist.length;
					for(var i = 0;i < gamelistL;i ++){//将oddsRealChange变成一个有对象值的数组
						this.oddsRealChange[i] = {oddsLeft:'',state:'',result:'',oddsRight:''};
					}
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		newsList(){//新闻列表
			this.axios.post(this.http + '/api/News/GetNewsContentList',{
				itid:'7b261dc2-1cdd-49f0-b477-00280c873a1c',
				pageIndex: 1,
				pageSize: 6
			}).then((response)=>{
				if(response.data.resultCode == 1){
					this.newslist = response.data.resultData.newsContentList;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		toBet(mid){
			this.$router.push(`/guess/bet/${mid}`);
		},
		...mapActions(['sortList'])
	},
	filters:{//时间过滤器
		timestampToTime(times){//年月日
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
	bottom:48px
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
			padding-bottom:160px
			.swiper-img
				width:100%
				height:160px
				object-fit:cover
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
					.scorebox
						display: flex
						flex-wrap: nowrap
						justify-content: center
						i
							font-size: 2.4rem
							margin: 0 -3px
							color: #fff
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
