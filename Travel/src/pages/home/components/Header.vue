<template>
	<div class="header">
		<div class="header-left"><img class="back" src="@/assets/image/back.svg"></div>
		<div class="header-center">
			<div class="sousuolan">
				<img class="sousuo" src="@/assets/image/sousuo.svg">
				<input type="text" name="" class="input" placeholder="请输入城市名或地址">
			</div>
		</div>
          <router-link to="/city">
		   <div class="header-right city">{{this.city}}<img src="@/assets/image/shixiangxiajiantou-.svg" class="adress"></div>
          </router-link>
	</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
 name: 'HomeHeader',
 computed:{
     ...mapState(['city'])
 }
}
</script>
<style scoped>
	.header{
	 height:2.58rem;
	 display:flex;
	 color:white;
	 background-color:#00bcd4;
	 width:100%;
	 }
	.header-left{
	 width:3rem;
	 height:100%;
	 float:left;
	 padding-top:0.4rem;
	 padding-left:.3rem;
	 }
    .back{
   	 display:block;
     width:60%;
     }
     .header-center{
     	flex:1;
     	float:left;
     }
     .input{
     	width:90%;
     	height:100%; 	
	   	color:#707575;   	
     	font-size:0.8rem;
     	float:right;
          border-radius: .2rem;
     }
     .header-right{
     	/*width:4rem;*/
     	height:100%;
          color:white;
     }
     .sousuo{
     	float:left;
     	width:1.3rem;
     	margin:0 auto;
     }
     .sousuolan{
     	width:100%;
     	height:60%;
     	background-color:white;
     	margin-top:0.5rem;
     	border-radius:.2rem;
     }
     .city{
     	/*display:block;*/
     	float:right;
          text-align: center;
          /*width: 1rem;*/
          min-width:4rem;
          /*max-width: 1.4rem;*/
     	/*padding-top:.8rem;*/
     	padding:0 .2rem;
          /*font-size:.8rem;*/
     }
     .adress{
     	width:1rem;
     	/*display: block;*/
     	/*float:right;*/
     	padding-top:.7rem;
          padding-right:.4rem;
     }
</style>