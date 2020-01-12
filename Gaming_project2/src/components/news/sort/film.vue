<template>
	<div class="video">
		<div class="main" @scroll="scrollTop">
			<ul>
				<li id="video_0" v-for="(item,index) in allList" @click="showVideo($event,item,index)">
					<div class="imgbox">
						<img v-lazy="item.imgPath">
					</div> 
					<div class="name">
						<img class="gameicon" v-lazy="item.sortLogo"></img>{{item.title}}
					</div> 
					<div class="info">
						<span><i class="iconfont bz-bofang1">&#xe60e;</i>{{item.clickCount}}</span> <span>{{item.videoDuration}}</span>
					</div> 
					<div class="opens">
						<span><i class="iconfont bz-bofang">&#xe60e;</i></span>
					</div>
				</li>
			</ul>
			<dataLoading v-show="loading"></dataLoading>
			<no-data :noDataShow="noData"></no-data>
		</div>
	</div>
</template>
<script>
import noData from '@/base/noData'
import dataLoading from '@/base/dataLoading'
export default{
	name:'film',
	props:['sid'],
	components:{
		dataLoading,
		noData
	},
	data(){
		return{
			allList:[],
			loading:false,
			PageI:1,
			manyLoading:true,
			noData:false,
			videoImg:true
		}
	},
	mounted(){
		this.hotNewsList(this.PageI,this.sid);
	},
	methods:{
		showVideo(e,item,index){
			let dom = e.currentTarget.firstElementChild;
			if(!dom.getElementsByTagName('img')[0].className){
				let iframeS = document.getElementsByTagName('iframe')[0];
				if(iframeS){
					iframeS.parentElement.removeChild(iframeS);
					let img_hide = document.getElementsByClassName('img-hide'),
						img_hideL = img_hide.length;
					for(let i = 0;i < img_hideL;i ++){
						img_hide[0].classList.remove('img-hide');
					}
				}
				dom.getElementsByTagName('img')[0].classList.add('img-hide');
				e.currentTarget.lastElementChild.classList.add('img-hide');
				let iframe = document.createElement('iframe');
				iframe.src = item.videoUrl;
				iframe.frameborder = "0";
				iframe.scrolling = "no";
				iframe.style.width = '100%';
				iframe.style.height = '155px';
				dom.appendChild(iframe);
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
		hotNewsList(pageIndex,sid){//视频列表
			this.manyLoading = false;
			this.axios.post(this.http + '/api/News/GetNewsContentList',{
				itid:'328f1bac-bfdf-42b5-a637-012707a8a6b8',//视频itid
				nSid:sid,
				pageIndex:pageIndex,
				pageSize:10
			}).then((response)=>{
				let data = response.data;
				this.manyLoading = true;
				this.loading = true;
				if(data.resultCode == 1){
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
.video
	position:fixed
	z-index:1
	overflow-x:hidden
	overflow-y:auto
	width:100%
	top:81px
	bottom:48px
	background: linear-gradient(0deg,#202630 0,#2b3a4a 50%,#202630)
	.main
		position: relative
		padding: 10px
		height: 100%
		width: 100%
		overflow-y: auto
		li
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
				background: transparent linear-gradient(180deg,transparent,rgba(0,0,0,.7)) repeat scroll 0 0
				bottom: 40px
				height: 40%
				position: absolute
				width: 100%
				color: #fff
				padding: 40px 10px 0;
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
			.img-hide
				display:none
</style>