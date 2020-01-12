<template>
	<div class="news" ref="newsZ">
		<header v-if="searchHead">
			<ul class="newTabs" ref="newTabs" v-show="titleS">
				<li class="active">
					<router-link to="/news" tag="a">热门</router-link>
				</li> 
				<li>
					<router-link to="/news/tidings" tag="a">新闻</router-link>
				</li> 
				<li>
					<router-link to="/news/special" tag="a">专题</router-link>
				</li> 
				<li>
					<router-link to="/news/atlas" tag="a">图集</router-link>
				</li> 
				<li>
					<router-link to="/news/film" tag="a">视频</router-link>
				</li> 
				<li>
					<div class="search">
						<router-link to="/news/search" tag="a">
							<i class="iconfont bz-search1">&#xe649;</i>
						</router-link>
					</div>
				</li>
			</ul>
			<div class="title" v-show="!titleS">
				<div class="l" @click="back"><i class="iconfont">&#xe682;</i></div>
				<div class="m">资讯专题</div>
				<div class="l"></div>
			</div>
			<ul class="clearfix">
				<li class="game-active" @click="gameSort($event,undefined)" ref="allSort"><label><b><i></i></b>全部</label></li>
				<li v-for="item in allGameList" @click="gameSort($event,item.nSid)" :key="item.nsid">
					<label><b><img :src="item.logo"></b>{{item.name}}</label>
				</li> 
			</ul>
		</header>
		<header v-if="!searchHead">
			<div class="title">
				<div class="l" @click="back"><i class="iconfont">&#xe682;</i></div>
				<div class="m">
					<div class="searchbox">
						<span @click="clickSearchList"><i class="iconfont bz-search1">&#xe649;</i></span> 
						<input type="search" placeholder="请输入关键字" v-model="keyWords"> 
						<span class="clear" @click="clearKeyW">
							<label><i class="iconfont bz-close">&#xe687;</i></label>
						</span>
					</div>
				</div>
				<div class="l"></div>
			</div>
			<ul class="newTabs search retinabt2">
				<li class="search-active" @click="searchSortL"><a>新闻</a></li>
				<li @click="searchSortL"><a>专题</a></li> 
				<li @click="searchSortL"><a>图集</a></li> 
				<li @click="searchSortL"><a>视频</a></li>
			</ul>
		</header>
		<div class="main" @scroll="scrollTop">
			<div class="mbg1">
				<div class="items" v-if="speciallist.length">
					<div class="clearfix">
						<swiper :options="swiperOption">
							<swiper-slide v-for="item of speciallist" :key="item.cid">
								<div class="bd">
									<img class="swiper-img cover" :src="item.imgPath">
								<div class="info">
									<div class="name">{{item.name}}</div>
								</div>
								</div>
							</swiper-slide>
						</swiper>
					</div>
				</div>
				<div class="items">
					<div class="item" v-for="(item,index) in allList" @click="newsDetail($event,item)" :class="{'photoitem':item.imageUrls}" :key="item.cid">
						<div class="bd" v-if="!item.imageUrls">
							<div class="detail">
								<div class="name">{{item.title}}</div> 
								<div class="time">
									<span><i class="iconfont bz-liulan">&#xe68b;</i>{{item.clickCount}}</span> 
									<span><i data-v-d65835ae="" class="iconfont bz-shijian">&#xe64d;</i>{{item.publishDateString}}</span>
								</div>
							</div> 
							<div class="imgbox">
								<div class="ibg"></div> 
								<img v-lazy="item.imgPath">
							</div>
						</div>
						<div v-if="item.imageUrls">
							<div class="name">{{item.title}}</div> 
							<ul  class="imgs">
								<li>
									<div class="ct">
										<img v-lazy="item.imageUrls.split(',')[0] || ''">
									</div>
								</li> 
								<li>
									<div class="ct">
										<img v-lazy="item.imageUrls.split(',')[1] || ''">
									</div>
								</li> 
								<li>
									<div class="ct">
										<img v-lazy="item.imageUrls.split(',')[2] || ''"> 
										<div class="num">
											<i class="iconfont bz-tupian">&#xe71d;</i>{{item.imageUrlCount}}P
				                    	</div>
			                    	</div>
		                    	</li>
		                    </ul> 
		                    <div class="time">
			                    <span><i class="iconfont bz-tupian">&#xe68b;</i>{{item.clickCount}}</span> 
			                	<span><i class="iconfont bz-shijian">&#xe64d;</i>{{item.publishDate}}</span>
		                	</div>
						</div>
					</div>
				</div>
				<dataLoading v-show="loading"></dataLoading>
			</div>
		    <no-data :noDataShow="noData"></no-data>
		</div>
		<router-view @newsDetail='newsDetail' @showImg='newsDetail' :sid='sid' :loading="loading" :noData="noData" :manyLoading="manyLoading" @searchList="pageSearch"></router-view>
		<transition name="slide">
			<div class="newsDetails" v-show="newsDetailsShow">
				<div class="header">
					<div class="l" @click="newsDetailsShow=false"><i class="iconfont">&#xe682;</i></div>
					<div class="m">开心电竞资讯</div>
					<div class="r"></div>
				</div>
				<div class="mbg1">
					<div class="title">
						<h2>{{newsDetailsWords.title}}</h2> 
						<div class="time">
							<span><i class="iconfont bz-liulan">&#xe68b;</i>{{newsDetailsWords.clickCount}}</span> 
							<span><i class="iconfont bz-shijian">&#xe64d;</i>{{newsDetailsWords.publishDateString}}</span>
						</div>
					</div>
					<div class="weui-tab" v-html="newsDetailsWords.content">
					</div>
				</div>
			</div>
		</transition>
		<transition name="img-slide">
			<div class="img-slide-Details" v-show="imgDetailsShow">
				<div class="img-center" @click="imgDetailsShow=false">
					<swiper :options="swiperOption2" ref='test'>
						<!-- slides -->
						<swiper-slide class="slide2" v-for="item of swiperList" :key="item">
							<img class="swiper-img" :src="item">
						</swiper-slide>
						<!-- Optional controls -->
						<div class="swiper-pagination"  slot="pagination"></div>
						
					</swiper>
					<span class="swiper-close">
							<i class="iconfont bz-close">&#xe687;</i>
						</span>
				</div>
				<div class="upload">{{imgTitle}}</div>
			</div>
		</transition>
	</div>
</template>
<script>
import noData from '@/base/noData'
import dataLoading from '@/base/dataLoading'
import {mapMutations} from 'vuex'
export default{
	name:'guess',
	components:{
		dataLoading,
		noData
	},
	computed:{
		swiper(){
			return this.$refs.test.swiper
		}
	},
	data(){
		return{
			swiperOption:{
	            autoplay:{
	            	delay:3000
	            },
	            slidesPerView:"auto",
	            centeredSlides:true,
	            loop:true,
	            observer:true,//修改swiper自己或子元素时，自动初始化swiper
	            observeParents:true,//修改swiper的父元素时，自动初始化swiper
	            
            },
            swiperOption2:{
            	pagination:{
				    el:'.swiper-pagination',
				    type: 'fraction',
				},
	            spaceBetween : 20,
            },
            swiperList: [],
			allGameList:[],
			allList:[],
			speciallist:[],
			newsDetailsShow:false,
			imgDetailsShow:false,
			newsDetailsWords:{},
			imgTitle:'',
			loading:false,
			newsFlag:true,
			photoFlag:true,
			sid:[],
			PageI:1,
			noData:false,
			manyLoading:false,
			titleS:true,//头部导航模块
			searchHead:true,
			keyWords:'',
			searchSort:'7b261dc2-1cdd-49f0-b477-00280c873a1c',
			searchPageI:1
		}
	},
	mounted(){
		this.gameList();
		this.specialList();
		this.newsRouter();
	},
	methods:{
		gameSort(dom,sid){//游戏分类
			let clickSame = true;
			if(this.sid[0] != sid && clickSame){//如果点击不同给的游戏类型才加载不同的数据
				let divDom = dom.currentTarget ? dom.currentTarget : dom;
				this.loading = false;
				document.getElementsByClassName('game-active')[0].className = '';
				divDom.className = 'game-active';
				this.$refs.newsZ.style.zIndex = 1;
				this.sid = [];
				if(sid){
					this.sid.push(sid);
				}else{
					clickSame = false;
				}
				if(this.$route.path == '/news'){
					this.allList = [];
					this.photoFlag = true;
					this.newsFlag = true;
					this.PageI = 1;
					this.togetherList(this.PageI,this.sid);
				}
			}
		},
		scrollTop(e){//判断页面滚动是否到底部
			let dom = e.target;
			this.scroll_top(dom);
		},
		scroll_top(dom){//利用懒函数和防抖对滑动到底部请求数据
			let timer = null;
			this.scroll_top = ()=>{
				clearTimeout(timer);
				timer = setTimeout(()=>{
					if(dom.scrollHeight - dom.scrollTop - dom.clientHeight <= 40){//滑动到底部了
						this.$refs.newsZ.style.zIndex = 11;
						if(this.manyLoading){//防止页面一次性加载多页数据
							this.PageI ++ ;
							this.togetherList(this.PageI,this.sid);
						}
					}
				},50)
			}
			return this.scroll_top();
		},
		togetherList(index,sid){//把新闻列表与图集列表拼凑在一起
			this.manyLoading = false;
			let p1 = new Promise((resolve,reject)=>{
					if(this.photoFlag){
						this.photoitem(index,sid,resolve,reject);
					}else{
						resolve([]);
					}
				}),
				p2 = new Promise((resolve,reject)=>{
					if(this.newsFlag){
						this.hotNewsList(index,sid,resolve,reject);
					}else{
						resolve([]);
					}
				});
			Promise.all([p1,p2]).then((results)=>{
				let allListL = results[1].length,//新闻数据长度
					resultsZL = results[0].length;//图集数据长度
				this.manyLoading = true;//
				if(index == 1){//当第一页时让加载的loading显示
					this.loading = true;
					if(!allListL && !resultsZL){//如果第一页里面图集数据和新闻数据都没有暂无数据就显示
						this.noData = true;
					}else{
						this.noData = false;
					}
				}
				if(!this.photoFlag && !this.newsFlag){//当新闻和图集都没有时让加载的loading隐藏
					this.loading = false;
				}
				if(allListL){//如果有新闻数据
					if(resultsZL){//如果有图集数据
						if(allListL == 10){//如果最后请求的新闻条数满9条
							let j = 0,
								i = 0;
							for(;i < allListL;i ++){
								if((i + 1) % 5 == 0){
									if(results[0][j]){
										results[1].splice(i,0,results[0][j]);
										j ++;
										allListL = results[1].length;
									}
								}
							}
						}else{//如果最后请求的新闻条数没有9条了
							results[1] = results[1].concat(results[0]);
						}
					}
				}else if(resultsZL){//如果没有新闻数据 如果有图集数据
					for(let i = 0;i < resultsZL;i ++){
						results[1].splice(i,0,results[0][i]);
					}
				}
				this.allList = this.allList.concat(results[1]);
			})
		},
		photoitem(pageIndex,sid,resolve){//图集列表
			this.axios.post(this.http + '/api/News/GetNewsContentList',{
				itid:"aed6eda2-c663-4d91-886c-01574e9034aa",
				nSid:sid,
				pageIndex:pageIndex,
				pageSize:2
			}).then((response)=>{
				if(response.data.resultCode == 1){
					let allCount = response.data.resultData.page.pageRecord;
					if(pageIndex * 2 >= allCount){//如果加载的条数大于总条数
						this.photoFlag = false;					
					}
					resolve(response.data.resultData.newsContentList);
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		newsDetail(e,item){//新闻详情
			if(e.currentTarget.classList.value.indexOf('photoitem') > -1){
				this.imgDetailsShow = true;
				this.swiper.slideTo(0);//每次点击图集列表都显示第一张图片
				this.swiperList = item.imageUrls.split(',');
				this.imgTitle = item.title;
			}else{
				this.newsDetailsShow = true;
				this.newsDetailsWords = item;
			}
		},
		gameList(){//游戏种类
			this.axios.post(this.http + '/api/News/GetNewsSortList').then((reponse)=>{
				if(reponse.data.resultCode == 1){
					this.allGameList = reponse.data.resultData.newsSortList;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		hotNewsList(pageIndex,sid,resolve){//新闻列表
			this.axios.post(this.http + '/api/News/GetNewsContentList',{
				itid:'7b261dc2-1cdd-49f0-b477-00280c873a1c',//新闻itid
				nSid:sid,
				pageIndex:pageIndex,
				pageSize:10
			}).then((response)=>{
				if(response.data.resultCode == 1){
					let allCount = response.data.resultData.page.pageCount;
					if(pageIndex >= allCount){//如果加载的条数大于总条数
						this.newsFlag = false;
					}
					resolve(response.data.resultData.newsContentList);
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		specialList(){//专题轮播
			this.axios.post(this.http + '/api/News/GetNewsContentList',{
				itid:'1a96dbfb-c18c-426c-a7da-00152574b0e0',//专题itid
				nSid:[],
				pageIndex:1,
				pageSize:3
			}).then((reponse)=>{
				if(reponse.data.resultCode == 1){
					this.speciallist = reponse.data.resultData.newsContentList;
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
		newsRouter(){//检测资讯模块的路由
	    	let toPath = this.$route.path;
	    	switch(toPath){
	    		case '/news':
	    		document.getElementsByClassName('active')[0].className = '';
	    		this.$refs.newTabs.children[0].className = "active";
	    		this.gameSort(this.$refs.allSort,'');
	    		break;
	    		case '/news/tidings':
	    		document.getElementsByClassName('active')[0].className = '';
	    		this.$refs.newTabs.children[1].className = "active";
	    		this.gameSort(this.$refs.allSort,'');
	    		break;
	    		case '/news/special':
	    		document.getElementsByClassName('active')[0].className = '';
	    		this.$refs.newTabs.children[2].className = "active";
	    		this.gameSort(this.$refs.allSort,'');
	    		break;
	    		case '/news/atlas':
	    		document.getElementsByClassName('active')[0].className = '';
	    		this.$refs.newTabs.children[3].className = "active";
	    		this.gameSort(this.$refs.allSort,'');
	    		break;
	    		case '/news/film':
	    		document.getElementsByClassName('active')[0].className = '';
	    		this.$refs.newTabs.children[4].className = "active";
	    		this.gameSort(this.$refs.allSort,'');
	    		break;
	    		case `/news/special/${this.$route.params.id}`:
	    		document.getElementsByClassName('active')[0].className = '';
	    		this.titleS = false;
	    		this.$refs.newTabs.children[2].className = "active";
	    		break;
	    		case '/news/search':
	    		this.loading = false;
	    		this.searchHead = false;
	    		break;
	    	}
		},
		back(){
			this.$router.go(-1);
			this.titleS = true;
			this.searchHead = true;
		},
		clickSearchList(){//搜索页面点击搜索按钮
			if(this.keyWords){
				this.$store.commit('newsSearchWay',{changeK:'searchList',changeV:[]});
				this.searchList(1);
			}
		},
		searchList(searchPageI){//子组件search的搜索数据方法
			if(this.$store.state.newsSearch.keyword){
				this.manyLoading = false;
				this.axios.post(this.http + '/api/News/GetNewsContentList',{
					itid:this.searchSort,
					keyword:this.keyWords,
					pageIndex:searchPageI,
					pageSize:10
				}).then((response)=>{
					this.manyLoading = true;
					if(response.data.resultCode == 1){
						this.loading = true;
						let data = response.data.resultData.newsContentList,
							allCount = response.data.resultData.page.pageCount;
						data = this.$store.state.newsSearch.searchList.concat(data);
						this.$store.commit('newsSearchWay',{changeK:'searchList',changeV:data});
						if(searchPageI >= allCount){//如果加载的条数大于总条数
							this.loading = false;
						}
						if(searchPageI == 1){
							console.log(data)
							if(data.length == 0){
								console.log(99)
								this.noData = true;
							}else{
								this.noData = false;
							}
						}
					}
				}).catch((error)=>{
					console.log(error)
				})
			}
		},
		searchSortL(e){
			document.getElementsByClassName('search-active')[0].className = '';
			e.currentTarget.className = 'search-active';
			this.loading = false;
			this.$store.commit('newsSearchWay',{changeK:'searchList',changeV:[]});
			let dom = e.currentTarget.children[0];
			if(dom.innerHTML == '新闻'){
				this.searchSort = '7b261dc2-1cdd-49f0-b477-00280c873a1c';//新闻
				this.$store.commit('newsSearchWay',{changeK:'sort',changeV:'新闻'});
			}else if(dom.innerHTML == '专题'){
				this.searchSort = '1a96dbfb-c18c-426c-a7da-00152574b0e0';//专题
				this.$store.commit('newsSearchWay',{changeK:'sort',changeV:'专题'});
			}else if(dom.innerHTML == '图集'){
				this.searchSort = 'aed6eda2-c663-4d91-886c-01574e9034aa';//图集
				this.$store.commit('newsSearchWay',{changeK:'sort',changeV:'图集'});
			}else{
				this.searchSort = '328f1bac-bfdf-42b5-a637-012707a8a6b8';//视频
				this.$store.commit('newsSearchWay',{changeK:'sort',changeV:'视频'});
			}
			this.searchPageI = 1;
			this.searchList(this.searchPageI);
		},
		pageSearch(){
			this.searchPageI ++;
			this.searchList(this.searchPageI);
		},
		clearKeyW(){
			this.keyWords = '';
		},
		...mapMutations(['newsSearchWay'])
	},
	watch:{
		$route(to,from){//监听到路由变化时news模块的z-index设置为1
	    	this.$refs.newsZ.style.zIndex = 1;
	    	this.newsRouter();
		},
		keyWords(){
			this.$store.commit('newsSearchWay',{changeK:'keyword',changeV:this.keyWords});
		}
	},
}
</script>
<style lang="stylus">
.upload-img
	width:100%
</style>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.img-slide-enter-active,.img-slide-leave-active
	transition:all 0.3s
.img-slide-enter,.img-slide-leave-to
	opacity:0
.swiper-slide
	width:82%/*设为固定值*/
	padding:0 2%
.swiper-slide img
	width:100%	
	border-radius:8px
	display:block
.cover
	height:164px
	object-fit:cover
.slide2
	width:100% !important
	padding:0
	display:flex
	align-items:center
	justify-content:center
.slide2 img
	width:auto
	max-width:100%
	max-height: 100%
	border-radius:0
.swiper-pagination-fraction
	top:14px
	color:#fff
.news
	position:fixed
	top:0
	left:0
	right:0
	z-index:1
	bottom:48px
	background:$background-color
	header
		height: 81px
		width: 100%
		overflow: hidden
		position: relative
		font-weight: lighter
		ul
			overflow: auto
			display: flex
			height: 36px
			line-height: 36px
			overflow-x:visible
			&::-webkit-scrollbar
				display:none
			li
				font-size: 1rem
				padding: 0 12px
				flex-shrink:0
				text-align:center
				color: #b5c1cd
				a
					font-size: 1.4rem
					color: #bacef1
					display: block
					text-align: center
				.search
					float: right
		.newTabs
			height:40px
			line-height:40px
			justify-content:space-between
			color: #b5c1cd
			position: relative
			li
				float: left
				width: 16.6%
			.active,.search-active
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
				a
					color:#03fcb3
					
		.clearfix
			position:relative
			&:after
				box-shadow: inset -10px 0 10px 0 #12171d
				content: ""
				height: 36px
				position: fixed
				right: 0
				top: 36px
				transition: box-shadow .3s
				width: 10px
			li
				i
					display:inline-block
					background:url('/static/img/allGameGray.svg')
					background-size:100% 100%
			.game-active
				color: #03fcb3
				i
					background:url('/static/img/allGameMark.svg')
					background-size:100% 100%
					filter:none
				img
					filter:none
			img,i
				width: 15px
				height: 15px
				margin-right: 2px
				vertical-align:-3px
				filter: grayscale(100%)
		.title
			height:45px
			width:100%
			display:flex
			.l
				width:50px
				text-align:center
				color:#fff
				font-size:16px
				height:100%
				line-height:45px
			.m
				flex:1
				text-align:center
				color:#fff
				line-height:45px
				font-size:16px
				overflow: hidden
				text-overflow: ellipsis
				white-space: nowrap
				.searchbox
					height: 30px
					line-height: 30px
					text-align: left
					margin-top: 7px
					border-radius: 30px
					position: relative
					padding: 0 10px
					display: flex
					justify-content: space-between
					border: .5px solid #414f5a
					margin-left: 10px		
					span
						display: inline-block
						width: 30px
						text-align: center
						i
							margin-right: 3px
							position: relative
							font-size: 1.4rem
							color: #c2c5c8
					input
						flex: 1
						border: none
						background: transparent
						color: #fff
						font-size: 13px
						font-weight: lighter
					.clear
						display: inline-block
						width: 30px
						text-align: center
						label
							display: inline-block
							width: 16px
							height: 16px
							line-height: 16px
							text-align: center
							background: hsla(0,0%,100%,.54)
							border-radius: 18px
							margin-top: 7px
							i
								left: 1.5px
								color: #000
								font-size: 15px
								position: relative
								margin-right: 3px
		.newTabs
			height: 36px
			line-height: 36px
			display: flex
			justify-content: space-between
			color: #b5c1cd
			position: relative
			li
				font-size: 1rem
				padding: 0 12px
				flex-shrink: 0
				text-align: center
				color: #b5c1cd;
				float: left
				width: 16.6%
	.main
		position:fixed
		width:100%
		top:81px
		bottom:48px
		display: flex
		flex-direction: column
		overflow-y:auto
		background: linear-gradient(0deg,#202630 0,#2b3a4a 50%,#202630)
		.mbg1
			padding-top: 5px
			position: relative
			.clearfix
				padding: 5px 0px
				display: flex
				overflow: auto
				.bd
					position: relative
					.info
						background: transparent linear-gradient(180deg,transparent,rgba(0,0,0,.9))
						border-radius: 0 0 8px 8px
						bottom: 0
						height: 40%
						position: absolute
						width: 100%
						color: #fff
						text-align: left
						padding: 0 15px
						display: flex
						align-items: flex-end
						flex-wrap: wrap
						.name
							line-height: 40px
							font-size: 13px
			.item
				position: relative
				&:before
					content: " "
					position: absolute
					top: 0
					right: 0
					height: 1px
					border-top: 1px solid #222
					-webkit-transform-origin: 0 0
					transform-origin: 0 0
					-webkit-transform: scaleY(.5)
					transform: scaleY(.5)
					left: 0
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
							span:first-child
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
							z-index: 2
						img
							width: 100%
							height: 85px
							vertical-align: middle
							object-fit: cover
			.photoitem
				padding: 10px
				.name
					font-size: 1.4rem
					font-weight: lighter
					color: #fff
				.imgs
					margin: 10px 0
					margin-right: -10px
					overflow:hidden
					li
						float: left
						width: 33.333%
						position: relative
						.ct
							margin-right: 8px
							overflow: hidden
							position: relative
							box-shadow: inset 0 0 25px #000
							border-radius: 4px
							img
								width: 100%
								margin-right: 8px
								height: 120px
								object-fit: cover
								vertical-align: middle
							.num
								position: absolute
								bottom: 20px
								right: 10px
								background: rgba(0,0,0,.7)
								color: #fff
								padding: 2px 5px
								font-size: 1.2rem
								border-radius: 2px
								i
									font-size: 1.2rem
									margin-right: 2px
				.time
					font-size: 1.2rem
					color: #b5c1cd
					i
						margin-right: 3px
						position: relative
						top: 1px
						font-size: 1.4rem
					span:first-child
						display: inline-block
						width: 80px
	.newsDetails
		position:fixed
		width:100%
		top:0
		bottom:0
		z-index:1
		background: #eee
		.header
			display:flex
			height: 44px
			box-shadow: 0 0 13px rgba(0,0,0,.22)
			font-weight: lighter  
			background-color: rgb(15, 20, 25)
			position: fixed
			left: 0px
			top: 0px
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
				overflow: hidden
				text-overflow: ellipsis
				white-space: nowrap
		.mbg1
			position:absolute
			width:100%
			height: calc(100% - 43px)
			overflow-y: auto
			bottom:0
			background: linear-gradient(0deg,#202630 0,#2b3a4a 50%,#202630)
			.title
				background: linear-gradient(0deg,#242e3a 0,#0f1419)
				padding: 15px
				h2
					font-size:21px
				.time
					text-align: right
					line-height: 30px
					font-size: 1.2rem
					color: #798ea4
					span
						margin-left: 20px
						i
							margin-right: 3px
							position: relative
							top: 1px
				.gtag
					padding-top: 10px
			.weui-tab
				position: relative
				overflow: auto
				padding: 15px
				p
					color:red
				img
					display:block
					width:100%
	.img-slide-Details
		position:fixed
		width:100%
		top:0
		bottom:0
		z-index:1
		background:#0f1419
		.img-center
			position:absolute
			top:0
			bottom:0
			width:100%
			display:flex
			.swiper-close
				display: inline-block
				width: 20px
				height: 20px
				position: absolute
				right: 10px
				top: 12px
				i
					font-size:20px
		.upload
			position: absolute
			bottom: 0
			line-height: 3em
			background: rgba(0,0,0,.5)
			z-index: 5
			color: #fff
			text-indent: 1em
			width: 100%
			text-overflow: ellipsis
			overflow: hidden
			white-space: nowrap
			
</style>