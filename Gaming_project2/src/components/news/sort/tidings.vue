<template>
	<div class="article" @scroll="scrollTop">
		<div class="mbg1">
			<div class="items">
				<div class="item" v-for="(item,index) in allList" @click="newsDetail($event,item)">
					<div class="bd">
						<div class="detail">
							<div class="name">{{item.title}}</div> 
							<div class="time">
								<span><i class="iconfont bz-liulan">&#xe68b;</i>{{item.clickCount}}</span> 
								<span><i class="iconfont bz-shijian">&#xe64d;</i>{{item.publishDateString}}</span>
							</div>
						</div> 
						<div class="imgbox">
							<div class="ibg"></div> 
							<img v-lazy="item.imgPath" :key="item.cid">
						</div>
					</div>
				</div>
			</div>
			<dataLoading v-show="loading"></dataLoading>
		</div>
		<no-data :noDataShow="noData"></no-data>
	</div>
</template>
<script>
import noData from '@/base/noData'
import dataLoading from '@/base/dataLoading'
export default{
	name:"tidings",
	components:{
		dataLoading,
		noData
	},
	props:['sid'],
	data(){
		return{
			allList:[],
			loading:false,
			PageI:1,
			manyLoading:true,
			noData:false
		}
	},
	mounted(){
		this.hotNewsList(this.PageI,this.sid);
	},
	methods:{
		newsDetail(e,item){//点击新闻列表展示详情页
			this.$emit('newsDetail',e,item);
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
						if(this.loading){
							document.getElementsByClassName('news')[0].style.zIndex = 11;
							if(this.manyLoading){//防止页面一次性加载多页数据
								this.PageI ++ ;
								this.hotNewsList(this.PageI,this.sid);
							}
						}
					}
				},50)
			}
			return this.scroll_top();
		},
		hotNewsList(pageIndex,sid){//专题列表
			this.manyLoading = false;
			this.axios.post(this.http + '/api/News/GetNewsContentList',{
				itid:'7b261dc2-1cdd-49f0-b477-00280c873a1c',//新闻itid
				nSid:sid,
				pageIndex:pageIndex,
				pageSize:10
			}).then((response)=>{
				let data = response.data;
				if(data.resultCode == 1){
					this.manyLoading = true;
					this.loading = true;
					let allCount = data.resultData.page.pageCount;
					if(pageIndex >= allCount){//如果加载的条数大于总条数
						this.loading = false;
						
					}
					if(pageIndex == 1){//如果是第一页就把列表置为空
						this.allList = [];
						if(data.resultData.newsContentList.length == 0){
							this.noData = true;
						}else{
							this.noData = false;
						}
					}
					this.allList = this.allList.concat(data.resultData.newsContentList)
				}
			}).catch((error)=>{
				console.log(error)
			})
		},
	},
	watch:{
		sid(){//监听如果sid变化了
			this.PageI = 1;
			this.hotNewsList(this.PageI,this.sid);
			return this.sid;
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.article
	position:fixed
	z-index:1
	overflow-x:hidden
	overflow-y:auto
	width:100%
	top:81px
	bottom:48px
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
</style>