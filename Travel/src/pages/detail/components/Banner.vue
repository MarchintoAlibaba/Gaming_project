<template>
	<div>
		<div class="banner" @click="showa">
			<img class="banner-img" src="http://img1.qunarzz.com/sight/p0/1603/97/97a91e052b51aa9890.water.jpg_600x330_6c2afdc5.jpg">
			<div class="banner-words">
				<div class="banner-lefta">
					<p>大连圣亚海洋世界(AAAA景区)</p>
				</div>
				<div class="banner-right">
					39
				</div>
			</div>
		</div>
		<fade-animation>
			<common-gallary v-show="show" @showc='showd'>
			</common-gallary>
		</fade-animation>
	</div>
</template>
<script>
import CommonGallary from '@/common/gallary/Gallary'
import FadeAnimation from '@/common/gallary/fade/FadeAnimation'
export default{
	name:"Banner",
	components:{
		CommonGallary,
		FadeAnimation
	},
	data (){
		return {
			show:false
		}
	},
	methods:{
		showa:function(){
			this.show=true
		},
		showd:function(){
			this.show=false
		}
	}
}
</script>
<style scoped>
	.banner{
		position: relative;
		width:100%;
		overflow: hidden;
		height:0;
		padding-bottom:55%;
	}
	.banner-img{
		width:100%;
	}
	.banner-words{
		position: absolute;
		width:100%;
		overflow: hidden;
		height: 0;
		bottom:0rem;
		padding:0 .7rem;
		padding-bottom: 7%;
		display: flex;
		color:white;
		font-size:1rem;
		background:linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.8));
	}
	.banner-lefta{
		flex:1;
	}
	.banner-right{
		width:4rem;
		background:black;
		height:100%;
		text-align: center;
		color:white;
	}
</style>