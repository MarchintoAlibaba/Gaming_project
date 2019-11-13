<template>
	<div class="icons">
		<swiper autoplay: false>
			<swiper-slide v-for="page of pages">
				<div class="little-icons" v-for="item of page" :key="item.id">
					<img class="icons-img" :src="item.iconsUrl"></img>
					<p class="icons-img-words">{{item.words}}</p>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>
<script>
export default{
	name:'HomeIcons',
	data (){
		return {
			iconsList:[{
			id:'001',
			words:"一日游",
			iconsUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png'
		},{
			id:'002',
			words:"双人游",
			iconsUrl:'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png'
		},{
			id:'003',
			words:"七日游",
			iconsUrl:'http://img1.qunarzz.com/piao/fusion/1803/89/55083b0f1951f302.png'
		},{
			id:'004',
			words:"七日游",
			iconsUrl:'http://img1.qunarzz.com/piao/fusion/1803/89/55083b0f1951f302.png'
		},{
			id:'005',
			words:"七日游",
			iconsUrl:'http://img1.qunarzz.com/piao/fusion/1803/89/55083b0f1951f302.png'
		},{
			id:'006',
			words:"七日游",
			iconsUrl:'http://img1.qunarzz.com/piao/fusion/1803/89/55083b0f1951f302.png'
		},{
			id:'007',
			words:"七日游",
			iconsUrl:'http://img1.qunarzz.com/piao/fusion/1803/89/55083b0f1951f302.png'
		},{
			id:'008',
			words:"七日游",
			iconsUrl:'https://img1.qunarzz.com/piao/fusion/1803/20/831d62d2e1c7be02.png'
		},{
			id:'09',
			words:"七日游",
			iconsUrl:'http://img1.qunarzz.com/piao/fusion/1803/89/55083b0f1951f302.png'
		},{
			id:'010',
			words:"七日游",
			iconsUrl:'https://img1.qunarzz.com/piao/fusion/1803/20/831d62d2e1c7be02.png'
		}]
		}
	},
	computed: {
		pages (){
			const pages=[]
			this.iconsList.forEach((item,index) => {
				const page=Math.floor(index/8)
				if (!pages[page]){
				pages[page]= []
			}
			pages[page].push(item)
			})
			console.log(pages)
			return pages
		}
	}
}
</script>
<style scoped>
	.icons>>>.swiper-wrapper{
		width:100%;
		/*overflow: hidden;*/
		height:0;
		padding-bottom:50%;
	}
	.icons{
		width:100%;
		overflow: hidden;
		height:0;
		padding-bottom:50%;
	}
	.little-icons{
		width:25%!important;
		overflow:hidden;
		height:0;
		padding-bottom:25%;
		float:left;
	}
	.icons-img{
		width:60%;
		margin:0 auto;
		display: block;
		padding-top:.4rem;
	}
	.icons-img-words{
		font-size:.36rem;
		text-align:center;
		padding-top:0.5rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>