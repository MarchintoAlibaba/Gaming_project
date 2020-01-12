<template>
	<div class="search" @scroll="scrollTop" :computed="searchList">
		<div v-if="sort=='新闻'">
			<div class="item" v-for="item in searchList" @click="newsDetail($event,item)">
				<a class="bd">
					<div class="detail">
						<div class="name">{{item.title}}</div> 
						<div class="time">
							<span><i class="iconfont bz-liulan">&#xe68b;</i>{{item.clickCount}}</span> 
							<span><i class="iconfont bz-shijian">&#xe64d;</i>{{item.publishDateString}}</span>
						</div>
					</div> 
					<div class="imgbox">
						<div class="ibg"></div>
						<img v-lazy="item.imgPath">
					</div>
				</a>
			</div>
		</div>
		<div v-if="sort=='专题'">
			<div class="item" v-for="item in searchList">
				<a href="#/News/Index/Special/1029" class="itemspe">
					<div class="img-box">
						<img v-lazy="item.imgPath">
					</div> 
					<div class="info">
						<h2>{{item.title}}</h2> 
						<p>参赛战队：八大俱乐部主力战队+两支上一季发展联赛前二名战队（Typhoon ; IG Vitality）时间：10月17日起每周四至周日（具体赛程详见官博及官网后续更新赛制：常规赛为BO3积分循环制，积分前六晋级季后赛，末四淘汰。季后赛为BO3双败淘汰赛，总决赛为BO5。总奖金：150万人民币
						</p> 
						<div class="time">
							<span></span> 
							<span><i class="iconfont bz-biaoqian">&#xe683;</i>1</span>
						</div> 
						<div class="tags">
							<span class="tag">DOTA2</span>
						</div>
					</div>
				</a>
			</div>
		</div>
		<div class="photo" v-if="sort=='图集'">
			<div class="photo-hot" v-show="photoFirst.length">
				<div class="row row1">
					<div class="item photoitem" v-for="item in photoFirst" @click="imgD($event,item)">
						<img v-lazy="item.imgPath"> 
						<span class="num"><i class="iconfont bz-tupian">&#xe71d;</i>{{item.imageUrlCount}}P</span> 
						<p>{{item.title}}</p>
					</div>
				</div>
				<div class="row row2">
					<div class="item photoitem" v-for="item in photoSecond" @click="imgD($event,item)">
						<img v-lazy="item.imgPath"> 
						<span class="num"><i class="iconfont bz-tupian">&#xe71d;</i>{{item.imageUrlCount}}P</span> 
						<p>{{item.title}}</p>
					</div>
				</div>
			</div>
			<div class="items">
				<div class="New">
					<div class="item photoitem" v-for="item in photoFourth" @click="imgD($event,item)">
						<div class="name">{{item.title}}</div> 
						<ul class="imgs">
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
									<div class="num"><i class="iconfont bz-tupian">&#xe71d;</i>{{item.imageUrlCount}}P</div>
								</div>
							</li>
						</ul> 
						<div class="time">
							<span><i class="iconfont bz-liulan">&#xe68b;</i>{{item.clickCount}}</span> 
							<span><i class="iconfont bz-shijian">&#xe64d;</i>{{item.publishDate}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="videos" v-if="sort=='视频'">
			<ul>
				<li v-for="item in searchList">
					<div class="imgbox">
						<img v-lazy="item.imgPath">
					</div> 
					<div class="name">
						<img v-lazy="item.sortLogo" alt="">{{item.title}}
					</div> 
					<div class="info">
						<span><i class="iconfont bz-bofang1">&#xe60e;</i>{{item.clickCount}}</span> <span>{{item.videoDuration}}</span>
					</div> 
					<div class="opens">
						<span><i class="iconfont bz-bofang">&#xe60e;</i></span>
					</div>
				</li>
			</ul>
		</div>
		<dataLoading v-show="loading"></dataLoading>
		<no-data :noDataShow='noData'></no-data>
	</div>
</template>
<script>
import noData from '@/base/noData'
import dataLoading from '@/base/dataLoading'
import {mapActions} from 'vuex'
export default{
	name:'search',
	components:{
		dataLoading,
		noData
	},
	props:['loading','noData','manyLoading'],
	data(){
		return{
			photoFirst:[],
			photoSecond:[],
			photoThird:[],
			photoFourth:[],
		}
	},
	computed:{
		sort(){
			return this.$store.state.newsSearch.sort || false;
		},
		searchList(){
			if(this.$store.state.newsSearch.sort == '图集'){
				this.photoList();
			}
			return this.$store.state.newsSearch.searchList || false;
		}
	},
	methods:{
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
						if(this.loading){
							document.getElementsByClassName('news')[0].style.zIndex = 11;
							if(this.manyLoading){//防止页面一次性加载多页数据
								this.$emit('searchList');
							}
						}
					}
				},50)
			}
			return this.scroll_top();
		},
		imgD(e,item){
			this.$emit('showImg',e,item);
		},
		photoList(){
			this.photoThird = this.$store.state.newsSearch.searchList.slice();
			this.photoFirst = [];
			this.photoSecond = [];
			if(this.photoThird.length >= 5){
				this.photoFirst = this.photoThird.splice(0,2);
				this.photoSecond = this.photoThird.splice(0,3);
			}
			console.log(this.photoThird)
			this.photoFourth = this.photoThird;
		},
		newsDetail(e,item){//点击新闻列表展示详情页
			this.$emit('newsDetail',e,item);
		},
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.search
	position:fixed
	z-index:1
	overflow-x:hidden
	overflow-y:auto
	width:100%
	top:81px
	bottom:0
	background:#000
	.item
		position:relative
		&::before
			content: " "
			position: absolute
			top: 0
			right: 0
			height: 1px
			border-top: 1px solid #222
			transform-origin: 0 0
			transform: scaleY(.5)
			left: 0
		.bd
			display: flex;
			justify-content: space-between
			padding: 10px
			position: relative
			color: #b5c1cd
			.detail
				display: flex
				flex-direction: column
				-webkit-justify-content: space-around
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
					z-index:1
				img
					width: 100%
					height: 85px
					vertical-align: middle
					object-fit: cover
		.itemspe
			display:block
			background: linear-gradient(90deg,#2b3a4a,#202630)
			margin: 8px
			border-radius: 4px
			position: relative
			overflow: hidden
			font-weight: lighter
			.img-box
				height: 155px
				overflow: hidden
				border-radius: 4px 4px 0 0
	    			img
						width: 100%
						vertical-align: middle
						object-fit: cover
			.info
				font-weight: lighter
				padding: 10px
				h2
					font-size: 1.4rem
					font-weight: lighter
					color: #fff
					margin-top: 8px
					margin-bottom: 8px
				p
					font-size: 1.2rem
					color: #b5c1cd
					overflow: hidden
					text-overflow: ellipsis
					white-space: nowrap
					margin-bottom: 8px
				.time
					font-size: 1.2rem
					text-align: right
					padding-right: 20px
					color: #798ea4
					span
						display: inline-block
						width: 80px
						i
							margin-right: 3px
							position: relative
							top: 1px
							font-size: 1.4rem
				.tags
					left: 0
					top: 11px
					position: absolute;   
					font-size: 1rem
					.tag
						background: rgba(219,64,64,.9)
						color: #fff
						border-radius: 2px 0 10px 0
						font-style: normal
						margin-bottom: 5px
						padding: 0 10px
						text-align: center
						height: 16px
						line-height: 15px
						display: block
						font-size: 10px
						font-weight: 400
						min-width: 18px
						position: relative
						top: -1px
	.photo
		.item
			margin-bottom: 5px!important
			background: linear-gradient(90deg,#2b3a4a,#202630)
			overflow: hidden
			position: relative
		.photo-hot
			background: linear-gradient(90deg,#2b3a4a,#202630)
			padding: 10px 10px 8px
			margin-bottom:5px
			.row
				display:flex
				img
					width:100%
					height:100%
					object-fit:cover
					vertical-align:middle
				.num
					position: absolute
					top: 8px
					right: 8px
					background: rgba(0,0,0,.5)
					font-size: 1rem
					color: #fff
					padding: 0 5px
					border-radius: 20px
					i
						font-size: 1.2rem
						margin-right: 2px
				p
					background: transparent linear-gradient(180deg,transparent,rgba(0,0,0,.8))
					bottom: 0
					height: 40%
					position: absolute
					width: 100%
					color: #fff
					font-size: 1rem
					padding: 0 5px
					padding-top: 15px
					overflow: hidden
					text-overflow: ellipsis
					white-space: nowrap
			.row1
				height: 120px
				.item:first-child
					width: 66%
					margin-right: 1%
					border-radius: 4px
				.item:last-child
					width: 33%
					border-radius: 4px
			.row2
				height: 90px
				.item
					margin-right: 1%
					width: 32.5%
					border-radius: 4px
		.items
			.New
				background: #000
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
	.videos
		ul
			li
				margin: 10px
				overflow: hidden
				background: #0f1418
				margin-bottom: 10px
				position: relative
				.imgbox
					width: 100%
					height: 155px
					overflow: hidden
					img
						height: 100%
						width: 100%
						object-fit: cover
				.name
					height: 40px
					line-height: 40px
					padding: 0 8px
					font-size: 1.4rem
					color: #fff
					overflow: hidden
					text-overflow: ellipsis
					white-space: nowrap
					font-weight: lighter
					img
						width: 16px
						height: 16px
						margin-right: 3px
						vertical-align:-2px
				.info
					background: transparent linear-gradient(180deg,transparent,rgba(0,0,0,.7)) repeat scroll 0 0;
					bottom: 40px
					height: 40%
					position: absolute
					width: 100%
					color: #fff
					padding: 40px 10px 0
					display: flex
					justify-content: space-between
					font-size: 1.2rem
					i
						font-size: 1.2rem
				.opens
					span
						position: absolute
						margin: -27px 0 0 -27px
						left: 50%
						top: 50%
						width: 38px
						height: 38px
						line-height: 38px
						border-radius: 38px
						text-align: center
						cursor: pointer
						background: rgba(0,0,0,.5)
						color: #fff
						i
							position: relative
							left: 2px
</style>