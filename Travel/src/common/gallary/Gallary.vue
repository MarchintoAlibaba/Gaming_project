<template>
	<div class="gallary" @click="backa">
		<div class="wrapper">
        <swiper :options="swiperOption">
        <swiper-slide><img class="swiper-img" src="http://img1.qunarzz.com/sight/p0/201402/21/e89c3b30a8e3788b4c1f5ae18b8a010d.jpg_350x240_a2352642.jpg"></swiper-slide>
        <swiper-slide><img class="swiper-img" src="http://img1.qunarzz.com/sight/p0/201402/21/e89c3b30a8e3788b4c1f5ae18b8a010d.jpg_350x240_a2352642.jpg"></swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
	</div>
</template>
<script>
export default{
	name:"Gallary",
	data (){
		return {
			swiperOption:{
				pagination:'.swiper-pagination',
				paginationType:'fraction',
				observeParents:true,
				observer:true
			}
		}
	},
	methods:{
		backa () {
			this.$emit('showc')

		}
	}
}
</script>
<style scoped>
	.wrapper >>> .swiper-container,.swiper-pagination{
		z-index: 99;
		overflow:visible;
		color:white;
		bottom:-3rem;
	}
	.wrapper{
		width:100%;
	}
	.gallary{
		position: fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background:black;
        -webkit-display:flex;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
        -webkit-justify-content:center;
        justify-content:center;
        z-index: 99;
	}
	.swiper-img{
		width:100%;
	}
</style>