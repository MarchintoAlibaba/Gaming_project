<template>
	<div class="promotionsDetail">
		<div class="mian">
			<img v-lazy="activityContent.imgUrl">
			<div class="title">
				<div class="title-words">
					{{activityContent.title}}
				</div>
				<div class="condition">
					{{activityContent.activityRule}}
				</div>
				<div class="time">
					<i class="iconfont">&#xe64d;</i> {{activityContent.fromDate}}起
				</div>
			</div>
			<div class="title content">
				<i class="iconfont">&#xe61f;</i> 活动内容
				<div class="condition content-words" v-html="activityContent.content">
				</div>
			</div>
			<div class="title content">
				<i class="iconfont">&#xe608;</i> 活动奖励
				<div class="condition content-words">
					{{activityContent.activityReward}}
				</div>
			</div>
			<div class="title content">
				<i class="iconfont">&#xe683;</i> 活动规则
				<div class="condition content-words">
					{{activityContent.activityRule}}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'promotionsDetail',
	data(){
		return{
			activityContent:''
		}
	},
	mounted(){
		this.getActivityD();
	},
	methods:{
		getActivityD(){
			this.axios.post(this.http + '/api/BaseInfo/GetPPromotion',{
				pid:this.$route.params.id
			}).then(response=>{
				if(response.data.resultCode == 1){
					this.activityContent = response.data.resultData.pPromotionList;
				}
			}).catch(error=>{
				console.log(error);
			})
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.promotionsDetail
	position:fixed
	top:45px
	right:0
	bottom:0
	left:0
	z-index:1
	background:$background-color
	.mian
		padding:10px
		height:100%
		color:#fff
		overflow-y:auto
		img
			width:100%
			height:150px
			object-fit:cover
		.title
			background:linear-gradient(left,#2b3a4a,#202630)
			box-shadow: 0 0 1px 0 hsla(0,0%,100%,.4)
			padding:10px
			margin: 8px 0
			border-radius: 3px
			.title-words
				font-weight: 400
				color: #03fcb3
				font-size: 15px
				width: 100%
			.condition
				margin-top: 5px
				margin-bottom: 7px
		.content
			.content-words
				color:#c2c5c8
				font-weight:lighter
</style>