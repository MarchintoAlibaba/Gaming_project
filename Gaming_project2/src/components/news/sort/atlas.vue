<template>
	<div class="atlas">
		<div class="main" @scroll="scrollTop">
			<div class="photo-hot" v-if="firstList.length">
				<div class="row row1">
					<div class="item photoitem" v-for="item in firstList" @click="imgD($event,item)">
						<img v-lazy="item.imgPath"> 
						<span class="num"><i class="iconfont bz-tupian">&#xe71d;</i>{{item.imageUrlCount}}P</span> 
						<p>{{item.title}}</p>
					</div> 
				</div> 
				<div class="row row2">
					<div class="item photoitem"  v-for="item in secondList" @click="imgD($event,item)">
						<img v-lazy="item.imgPath"> 
						<span class="num"><i class="iconfont bz-tupian">&#xe71d;</i>{{item.imageUrlCount}}P</span> 
						<p>{{item.title}}</p>
					</div>
				</div>
			</div>
			<div class="items" v-if="allList.length">
				<div class="New">
					<div class="photoitem" v-for="item in allList" @click="imgD($event,item)" :key="item.cid">
						<div class="name">{{item.title}}</div> 
						<ul class="imgs clearfix">
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
			<dataLoading v-show="loading"></dataLoading>
		    <no-data :noDataShow='noData'></no-data>
		</div>
	</div>
</template>
<script>
import noData from '@/base/noData'
import dataLoading from '@/base/dataLoading'
export default{
	name:'atlas',
	components:{
		dataLoading,
		noData
	},
	props:['sid'],
	data(){
		return{
			allList:[],
			pageI:1,
			firstList:[],
			secondList:[],
			noData:false,
			loading:false,
			manyLoading:true,
		}
	},
	mounted(){
		this.getAllList(this.pageI,this.sid);
	},
	methods:{
		imgD(e,item){//点击图集列表
			this.$emit('showImg',e,item);
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
								this.pageI ++ ;
								this.getAllList(this.pageI,this.sid);
							}
						}
					}
				},50)
			}
			return this.scroll_top();
		},
		getAllList(pageIndex,sid){
			this.manyLoading = false;
			this.axios.post(this.http + '/api/News/GetNewsContentList',{
				itid:'aed6eda2-c663-4d91-886c-01574e9034aa',//图集的itid
				nsid:sid,
				pageIndex:pageIndex,
				pageSize:10,
			}).then(response=>{
				let data = response.data;
				this.loading = true;
				this.manyLoading = true;
				if(data.resultCode == 1){
					let dataL = data.resultData.newsContentList;
					let allCount = data.resultData.page.pageCount;
					if(pageIndex >= allCount){//如果加载的条数大于总条数
						this.loading = false;
					}
					if(pageIndex == 1){//第一页请求进来
						//this.$refs.scrolltop.scrollTop = 0;//每个种类的第一页进来scrolltop都为0
						this.allList = [];//把所以的数组都先设置为空
						this.firstList = [];
						this.secondList = [];
						if(dataL.length == 0){
							this.noData = true;
						}else{
							this.noData = false;
						}
						if(dataL.length >= 5){
							this.firstList = dataL.splice(0,2);
							this.secondList = dataL.splice(0,3);
						}
					}
					this.allList = this.allList.concat(dataL);
				}
			})
		}
	},
	watch:{
		sid(){//监听如果sid变化了
			this.PageI = 1;
			this.getAllList(this.PageI,this.sid);
			return this.sid;
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.atlas
	position:fixed
	z-index:1
	overflow-x:hidden
	overflow-y:auto
	width:100%
	top:81px
	bottom:48px
	background:#0f1419
	.main
		position: relative
		height: 100%
		width: 100%
		overflow-y: auto
		margin-bottom: -1px
		.photo-hot
			background: linear-gradient(90deg,#2b3a4a,#202630)
			padding: 10px 10px 8px
			margin-bottom: 5px
			.row
				display: flex
				.item
					overflow: hidden
					position: relative
					margin-bottom: 5px!important
					background: linear-gradient(90deg,#2b3a4a,#202630)
					img
						width: 100%
						height: 100%
						object-fit: cover
						vertical-align: middle
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
		.New
			background: #000
			.photoitem
				margin-bottom: 5px!important
				background: linear-gradient(90deg,#2b3a4a,#202630)
				padding: 10px
				position: relative
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
</style>