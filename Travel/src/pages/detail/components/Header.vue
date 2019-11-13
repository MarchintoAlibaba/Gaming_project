<template>
	<div>
		<router-link class="header-back" tag="div" to="/" v-show="show"><</router-link>
		<router-link class="header-header"  tag="div" to="/" v-show="!show">
			<div class="back"><</div>
			<div class="back-right">三亚海上观光巴士</div>
		</router-link>
	</div>
</template>
<script>
export default{
	name:"Header",
	data (){
		return {
			show:true
		}
	},
	methods:{ 
		scrolla:function(){
			if(document.documentElement.scrollTop>5){
				this.show=false;
				const opacity=document.documentElement.scrollTop/100;
				let header=document.getElementsByClassName("header-header")[0];
				header.style.opacity=opacity;
			}else if(document.documentElement.scrollTop<5){
				this.show=true;
			}
		}
	},
	mounted:function(){
		window.addEventListener('scroll',this.scrolla)
	},
	beforeDestroy() {    
		window.removeEventListener("scroll", this.scrolla);
  }
}
</script>
<style scoped>
	.header-back{
		position:absolute;
		top:.2rem;
		left:.2rem;
		width:2.2rem;
		height:2.2rem;
		text-align:center;
		font-size:1.6rem;
		line-height: 2.2rem;
		border-radius:50%;
		color:white;
		background:rgba(0,0,0,0.8);
	}
	.header-header{
		position:fixed;
		top:0;
		width:100%;
		overflow: hidden;
		height:0;
		padding-bottom: 10%;
		background:#00bcd4;
		color:white;
		display: flex;
		z-index:9;
	}
	.back{
		width:3rem;
		height:100%;
		text-align: center;
		line-height: 2.2rem;
		font-size:1.6rem;
		float:left;
		background-color: red;
	}
	.back-right{
		float:left;
		padding-right:1.5rem;
		flex:1;
		text-align: center;
		height:100%;
		line-height:2.2rem;
	}
</style>