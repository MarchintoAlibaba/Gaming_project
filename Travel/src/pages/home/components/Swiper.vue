<template>	
    <div class="wrapper">
        <swiper :options="swiperOption">
        <swiper-slide v-for="item of swiperList" :key="item.id"><img class="swiper-img" :src="item.imgUrl"></swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
</template>
<script>
export default { 
	name:'HomeSwiper',
	data () {
		return {
			swiperOption:{
                pagination:'.swiper-pagination',
                autoplay:2000,
                loop:true
            },
            swiperList: [{
                id:'0001',
                imgUrl:'http://img1.qunarzz.com/sight/p0/1810/85/854f761fef9b284fa3.img.jpg_600x330_fde5ad48.jpg'
            },
            {
                id:'0002',
                imgUrl:'http://img1.qunarzz.com/sight/p0/1412/43/1217ccf8106bca9a077b58bf56bb2598.water.jpg_600x330_e71586ed.jpg'
            }]
		}
	}
}
</script>
<style scoped>
    .wrapper>>>.swiper-pagination-bullet-active{
        background:white;
    }
	.swiper-img{
        width:100%;
    }
    .wrapper{ /*这样的话就使得图片加载时下面的部分不会跳上去 有自己的高*/
        overflow: hidden;
        width:100%;
        height:0;
        padding-bottom:55%;
        background:#707575;
    }
    
</style>