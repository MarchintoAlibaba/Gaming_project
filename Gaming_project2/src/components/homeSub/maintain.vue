<template>
	<div class="maintain">
		<div class="title">
			<img src="static/img/404.svg">
		</div>
		<div class="content">
			<div class="content-box">
				<span>为了更好地为您服务,目前正在执行系统维护。对所造成的不方便，我们深表歉意。<br><br>
					<p>维护时间: {{maintainInfo.startDate}} 至 {{maintainInfo.endDate}}</p><br>
					<p>{{maintainInfo.memo}}</p><br>
					<p>您可以联络我们的客户服务人员</p>
				</span>
			</div>
		</div>
		<a href="">
			在线客服
		</a>
	</div>
</template>
<script>
export default{
	name:'maintain',
	data(){
		return{
			maintainInfo:{}
		}
	},
	mounted(){
		this.getInfo();
	},
	methods:{
		getInfo(){
			this.axios.post(this.http + '/api/BaseInfo/GetSiteMaintainLog',{
				sid:this.$store.state.agentInfo.sid
			}).then(response=>{
				if(response.data.resultCode == 1){
					this.maintainInfo = response.data.resultData;
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
.maintain
	position:fixed
	top:0
	right:0
	bottom:0
	left:0
	z-index:1
	background: rgb(13,21,23) url('/static/img/background-phone.jpg') no-repeat
	background-size: cover
	.title
		width: 100%
		text-align: center
		margin-top: 100px
		img
			width: 60%
			max-width: 400px
	.content
		margin: auto
		width: 90%
		border: 1px solid #0b9f72
		border-radius: 4px
		margin-top: 50px
		text-align: center
		.content-box
			background-color: rgba(11,159,114,0.15)
			padding: 20px 0
			width: 100%
			height: 100%
			span
				font-size: 14px
				color: white
				padding: 0 10px
				display: inline-block
				text-indent: 2em
	a
		margin: auto
		width: 90%
		border: 1px solid #0b9f72
		border-radius: 4px
		display: block
		line-height: 30px
		color: white
		margin-top: 20px
		text-align: center
		font-size: 12px
</style>