<template>
	<div class="newsDetail">
		<div class="title">
			<h2>{{newsDList.title}}</h2> 
			<div class="time">
				<span><i class="iconfont bz-liulan">&#xe68b;</i>5</span> 
				<span><i class="iconfont bz-shijian">&#xe64d;</i>15小时前</span>
			</div> 
		</div>
		<div class="article-content" v-html="newsDList.content"></div>
	</div>
</template>
<script>
export default{
	name:'newsDetail',
	data(){
		return{
			newsDList:{}
		}
	},
	mounted(){
		this.newsDetail();
	},
	methods:{
		newsDetail(){
			this.axios.post(this.http + '/api/News/GetNewsContent',{
				cid:this.$route.params.id
			}).then(response=>{
				if(response.data.resultCode == 1){
					this.newsDList = response.data.resultData;
				}
			}).catch(error=>{
				console.log(error)
			})
		}
	}
}
</script>
<style lang="stylus">
.upload-img
	width:100%
</style>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.newsDetail
	position:fixed
	top:45px
	right:0
	bottom:0
	left:0
	z-index:1
	background:linear-gradient(0deg,#202630 0,#2b3a4a 50%,#202630)
	overflow-y:auto
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
	.article-content
		padding:15px
</style>