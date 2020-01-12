<template>
	<div class="msgDetail">
		<div class="main">
			<h2>
				<i class="iconfont bz-tags">&#xe610;</i>
				{{msgD.title}}
			</h2>
			<div class="row">
				{{msgD.content}}
				<div class="time">发布时间:{{msgD.sendDate}}</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			msgD:{}
		}
	},
	mounted(){
		this.getMsgD();
	},
	methods:{
		getMsgD(){
			this.axios.post(this.http + '/api/Member/GetMsgMessageInfo',{
				mid:this.$route.params.id,
				userID:localStorage.getItem('userID')
			}).then(response=>{
				if(response.data.resultCode == 1){
					this.msgD = response.data.resultData;
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
.msgDetail
	position:fixed
	top:45px
	bottom:0
	left:0
	right:0
	z-index:1
	background:$background-color
	.main
		font-size: 13px
		font-weight: lighter
		color: #c2c5c8
		padding: 10px 10px 0
		h2
			line-height:20px
			font-size:14px
			color: #03fcb3
			font-weight: lighter
			padding:10px 0
			i
				font-size: 18px
				margin-right: 5px
		.row
			line-height:20px
			text-indent:24px
			.time
				color:#7f858f
				margin-top:20px
				text-align:right
</style>