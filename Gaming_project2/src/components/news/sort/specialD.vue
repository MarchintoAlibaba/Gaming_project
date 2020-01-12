<template>
	<div class="specialD">
		<div class="main">
			<header>
				<img v-lazy="specialContent.imgPath">
				<div class="bg"></div> 
				<div class="info">
					<p v-html="specialContent.title"></p> 
					<div class="bop">
						<div class="sptags">
							<span class="tag">{{specialContent.sortName}}</span>
						</div> 
						<div class="time">
							<span><i class="iconfont bz-biaoqian">&#xe629;</i>{{specialContent.sidNewsCount}}</span>
						</div>
					</div>
				</div>
			</header>
			<div class="mbg1" @scroll="scrollTop">
				<router-link class="item" v-for="item in allListNews" :to="'/newsCenter/'+item.cid" :key="item.cid">
					<div class="bd">
						<div class="detail">
							<div class="name">{{item.title}}</div> 
							<div class="time">
								<span><i class="iconfont bz-liulan">&#xe68b;</i>{{item.clickCount}}</span> 
								<span><i class="iconfont bz-shijian">&#xe64d;</i>{{item.publishDateString}}</span>
							</div>
						</div> 
						<div class="imgbox">
							<img v-lazy="item.imgPath">
						</div>
					</div>
				</router-link>
				<dataLoading v-show="loading"></dataLoading>
				<no-data :noDataShow="noData"></no-data>
			</div>
		</div>
	</div>
</template>
<script>
import noData from '@/base/noData'
import dataLoading from '@/base/dataLoading'
export default{
	name:'specialD',
	components:{
		dataLoading,
		noData
	},
	data(){
		return{
			allListNews:[],
			pageI:1,
			specialContent:{},
			loading:false,
			noData:false,
			manyLoading:false
		}
	},
	mounted(){
		this.getSpecialContent();
		this.getNewsList(this.pageI);
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
								this.PageI ++ ;
								this.getNewsList(this.PageI);
							}
						}
					}
				},50)
			}
			return this.scroll_top();
		},
		getSpecialContent(){
			this.axios.post(this.http + '/api/News/GetNewsContent',{//专题详情
				cid:this.$route.params.id,
			}).then(response=>{
				let data = response.data;
				if(data.resultCode == 1){
					this.specialContent = data.resultData;
				}
			}).catch(error=>{
				console.log(error)
			})
		},
		getNewsList(pageI){//专题的新闻列表
			this.manyLoading = false;
			this.axios.post(this.http + '/api/News/GetNewsContentList',{
				sid:this.$route.params.id,
				pageIndex:this.pageI,
				pageSize:10,
			}).then(response=>{
				this.manyLoading = true;
				let data = response.data;
				if(data.resultCode == 1){
					this.loading = true;
					this.allListNews = this.allListNews.concat(data.resultData.newsContentList);
					let allCount = data.resultData.page.pageRecord;
					if(pageI * 10 >= allCount){//如果加载的条数大于总条数
						this.loading = false;
					}
					if(pageI == 1){//如果是第一页
						if(data.resultData.newsContentList.length == 0){
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
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.specialD
	position:fixed
	top:45px
	right:0
	bottom:0
	left:0
	.main
		width: 100%
		height: 100%
		margin: 0 auto
		display: flex
		flex-direction: column
		header
			height: 200px
			box-shadow: none
			position: relative
			img
				width: 100%
				height: 200px
				vertical-align: middle
				object-fit: cover
			.bg
				position: absolute
				top: 0
				left: 0
				height: 100%
				width: 100%
				background: rgba(0,0,0,.5)
			.info
				color: #fff
				position: absolute
				width: 100%
				bottom: 0
				left: 0
				height: 100%
				display: flex
				flex-direction: column
				justify-content: flex-end
				p
					font-size: 13px
					padding: 5px 15px
					max-height:80%
				.bop
					display: flex
					justify-content: space-between
					.sptags
						margin-top: 5px
						margin-left: 10px
						span
							font-style: normal;
							display: inline-block
							background-color: #53545a
							font-size: 10px
							min-width: 18px
							border-radius: 10px
							padding: 0 4.5px
							position: relative
							top: -1px
							text-align: center
							height: 15px
							line-height: 15px
							color: #fff
							font-weight: lighter
							margin-right: 4px
					.time
						height: 30px
						line-height: 30px
						text-align: right
						padding-right: 15px
						span
							display: inline-block
							margin-left: 20px
							i
								margin-right: 3px
								position: relative
								top: 1px
								font-size: 1.4rem
		.mbg1
			width: 100%
			height: 100%
			flex: 1
			overflow-y: auto
			margin-bottom: -1px
			position: relative
			background: linear-gradient(0deg,#202630 0,#2b3a4a 50%,#202630)
			.item
				position: relative
				&:before
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
						img
							width: 100%
							height: 85px
							vertical-align: middle
							object-fit: cover
</style>