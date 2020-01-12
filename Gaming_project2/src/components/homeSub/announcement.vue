<template>
	<div class="announcement">
		<div class="all" v-for="item in list">
			<div class="title">
				{{item.title}}
			</div>
			<div class="content">
				{{item.content}}
			</div>
		</div>
		<no-data :noDataShow='noData'></no-data>
	</div>
</template>
<script>
import noData from '@/base/noData'
export default{
	name:'announcement',
	components:{
		noData
	},
	data(){
		return{
			list:[],
			pageI:1,
			noData:false,
		}
	},
	mounted(){
		this.getAnnouncement();
	},
	methods:{
		getAnnouncement(pageI){
			this.axios.post(this.http + '/api/BaseInfo/GetMsgNoticeList',{
				pageIndex:pageI
			})
			.then(response=>{
				if(response.data.resultCode == 1){
					this.list = response.data.resultData.msgNoticeList;
					if(pageI == 1 && this.list.length == 0){
						this.noData = true;
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
.announcement
	position:fixed
	top:45px
	right:0
	bottom:0
	left:0
	z-index:1
	background:#000
	overflow-y:auto
	padding-bottom:8px
	.all
		background:#202630
		margin:8px 8px 0 8px
		padding:8px
		border-radius:3px
		.title
			color:#dbe5f1
			font-size:$words-size-16
			padding-bottom:6px
		.content
			text-indent:24px
			color:#c2c5c8
</style>