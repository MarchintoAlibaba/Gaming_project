<template>
	<div class="special">
		<div class="mbg1" @scroll="scrollTop">
			<ul class="items">
				<li v-for="item in allList">
					<router-link :to="'/news/special/'+item.cid">
						<div class="imgbox">
							<img v-lazy="item.imgPath">
						</div> 
						<div class="info">
							<h2>{{item.title}}</h2> 
							<p>{{item.specialName}}</p> 
							<div class="time">
								<span>{{item.publishDateString}}</span> 
								<span><i class="iconfont bz-biaoqian">&#xe629;</i>{{item.sidNewsCount}}</span>
							</div> 
							<div class="tags">
								<span class="tag">{{item.sortName}}</span>
							</div>
						</div>
					</router-link>
				</li>
			</ul>
			<dataLoading v-show="loading"></dataLoading>
			<no-data :noDataShow="noData"></no-data>
		</div>
		<transition name="slide">
	    	<router-view></router-view>
	    </transition>
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
				itid:'1a96dbfb-c18c-426c-a7da-00152574b0e0',//专题itid
				nSid:sid,
				pageIndex:pageIndex,
				pageSize:10
			}).then((response)=>{
				let data = response.data;
				this.manyLoading = true;
				if(data.resultCode == 1){
					this.loading = true;
					let allCount = data.resultData.page.pageRecord;
					if(pageIndex * 10 >= allCount){//如果加载的条数大于总条数
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
.special
	position:fixed
	z-index:1
	overflow-x:hidden
	overflow-y:auto
	width:100%
	top:81px
	bottom:48px
	background:#0f1419
	box-shadow:inset 0 13px 13px rgba(0,0,0,0.22);
	.mbg1
		position: relative
		height: 100%
		width: 100%
		flex: 1
		overflow-y: auto
		margin-bottom: -1px
		.items
			margin-bottom: 10px
			li
				background: linear-gradient(90deg,#2b3a4a,#202630)
				margin: 8px
				border-radius: 4px
				position: relative
				overflow: hidden
				font-weight: lighter
				.imgbox
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
						display:flex
						justify-content:space-between
						padding-right: 20px
						color: #798ea4
						span
							i
								margin-right: 3px
								position: relative
								top: 1px
								font-size: 1.4rem
					.tags
						left: 0
						top: 11px
						position: absolute
						font-size: 1rem
						.tag
							font-style: normal
							font-size: 10px
							font-weight: 400
							min-width: 18px
							position: relative
							top: -1px
							margin-bottom: 5px
							padding: 0 10px
							text-align: center
							height: 16px
							line-height: 15px
							display: block
							background: rgba(219,64,64,.9)
							color: #fff
							border-radius: 2px 0 10px 0
</style>