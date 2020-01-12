<template>
	<div class="msg" ref="zIndex">
		<div class="main">
			<scroll class="allcontent" :data="megList" :pullUpLoad="true" @scrollUp="scrollUp">
				<div class="padding-bottom">
					<router-link class="msg-item" v-for='item in megList' :to="'/personal/msg/'+item.mid" :key="item.mid">
						<div class="title">
							<span>{{item.title}}</span>
							<span>{{item.sendDate}}</span>
						</div>
						<div class="content">
							{{item.content}}
						</div>
					</router-link>
					<data-loading v-show="dataLoad" :loadingWords='loadingWords'></data-loading>
					<no-data :noDataShow="noData" :noDataWords="noDataWords"></no-data>
				</div>
			</scroll>
		</div>
		<transition name="slide">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
import noData from '@/base/noData'
import dataLoading from '@/base/dataLoading'
import scroll from '@/base/scroll'
export default{
	name:'msg',
	components:{
		noData,
		scroll,
		dataLoading
	},
	data(){
		return{
			pageI:1,
			megList:[],
			noDataWords:'暂无消息',
			noData:false,
			dataLoad:false,
			loadingWords:'上拉加载'
		}
	},
	mounted(){
		this.getMsgList(this.pageI)
	},
	methods:{
		scrollUp(){
			this.$refs.zIndex.style.zIndex = '11';
			this.loadingWords = '<img height="100%" src="static/img/loading.svg" alt="loading">';
			this.pageI ++;
			this.getMsgList(this.pageI)
		},
		getMsgList(pageI){
			this.axios.post(this.http + '/api/Member/GetMsgMessageList',{
				pageIndex:pageI,
				pageSize:10,
				userID:localStorage.getItem('userID')
			}).then(response=>{
				this.loadingWords = '上拉加载';
				if(response.data.resultCode == 1){
					this.megList = this.megList.concat(response.data.resultData.msgMessageList);
					let allCount = response.data.resultData.page.pageRecord;
					if(pageI == 1 && this.megList.length == 0){
						this.noData = true;
					}
					if(pageI * 10 >= allCount){
						this.dataLoad = false;
					}else{
						this.dataLoad = true; 
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
@import '~@/assets/css/variable'
@import '~@/assets/css/iconfont/iconfont'
.msg
	position:fixed
	top:45px
	bottom:0
	left:0
	right:0
	z-index:1
	background:$background-color
	.main
		width: 100%;
		height: 100%;
		overflow-y: auto;
		padding-bottom:8px
		.allcontent
			width:100%
			height:100%
			overflow-y:auto
			.padding-bottom
				padding-top:8px
				.msg-item
					display:block
					background: #202630
					margin: 8px 8px 0 8px
					padding: 8px
					border-radius: 3px
					&:first-child
						margin-top:0
					.title
						color: #dbe5f1
						font-size: 16px
						padding-bottom:20px
						display:flex
						justify-content:space-between
						span:first-child
							width:70%
							overflow:hidden
							white-space: nowrap
							text-overflow:ellipsis
						span:last-child
							color: #c2c5c8
							font-size: 14px
					.content
						color: #c2c5c8
						overflow:hidden
						white-space: nowrap
						text-overflow:ellipsis
</style>