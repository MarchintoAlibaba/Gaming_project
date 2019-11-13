<template>
	<div class="recommend" ref="recom">
		<scroll :data="songList" class="scroll--">
			<div>
				<swiper :options="swiperOption" ref="swiperOption" class="swiper-height">
				    <swiper-slide v-for="item of recommend" :key="item.id">
				    	<a :href="item.linkUrl">
					    	<div class="recommend-sweiper">
					    		<img class="recommend-img needsclick" v-lazy="item.picUrl">
					    	</div>
				    	</a>
				    </swiper-slide>
				    <div class="swiper-pagination"  slot="pagination"></div>
			  	</swiper>
			  	<div class="hotsong">
			  		<div class="hotsong-top">热门歌单推荐</div>
			  		<div class="songlist">
			  			<div class="songlist-list" v-for="item of songList" :key="item.id">
			  				<div class="songlist-img">
			  					<img width="100%" :src="item.imgUrl">
			  				</div>
			  				<div class="songlist-words">
			  					<p class="songlist-words-top">{{item.songTitle}}</p>
			  					<p class="sontlist-words-down">{{item.songWords}}</p>
			  				</div>
			  			</div>	  			  			
			  		</div>
			  	</div>
		  	</div>
		  	<div class="loading-container" v-show="!songList.length">
		  		<loading :title="titlea"></loading>
		  	</div>
	  	</scroll>
  	</div>
</template>
<script>
import Loading from '@/base/loading/loading'
import scroll from '@/base/scroll/scroll'
import {getRecommend} from '@/api/recommend'
import {ERR_OK} from '@/api/config'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default{
	name:"recommendRecommend",
	components: {
		scroll,
		Loading
	},
	data () {
		return {
			titlea:'正在拼命加载中...',
			swiperOption:{
				autoplay:{
					disableOnInteraction: false,
					delay:3000
				},
				pagination:{
					el: '.swiper-pagination',
				}
			},
			recommend:[],
			songList:[]
		}
	},
	created() {
		// var script = document.createElement("script");
  //       script.src = "https://api.douban.com/v2/book/search?q=javascript&count=1&callback=handleResponse";
  //       document.template.insertBefore(script, document.template.firstChild);
  //       function handleResponse(response){
  //           console.log(response);
  //   }
		this.$axios.get("http://www.wwtliu.com/sxtstu/blueberrypai/getChengpinDetails.php").then((response) => {
		  console.log(response.data)
		})
		setTimeout(() => {
		this._getRecommend()
		this._getDiscList()
	},1000)
	},
	methods: {
		_getRecommend() {
			getRecommend().then((res) => {
				if (res.code === ERR_OK){
					this.recommend=res.data.slider
					console.log(this.recommend)
				}
			})
		},
		 _getDiscList() {
        	this.songList=this.song_list
      }
	}
}
</script>
<style scoped lang="stylus">
@import '~css/variable.styl'
	.recommend
		overflow:hidden
		position:fixed
		width:100%
		top:1.8rem
		bottom:0
		background:$color-background
		.swiper-height
			width:100%
			height:0
			padding-bottom:40%
			.swiper-pagination >>> .swiper-pagination-bullet
				background:#fff
			.swiper-pagination >>> .swiper-pagination-bullet-active
				width:.4rem
				border-radius:.14rem
			.recommend-sweiper
				width:100%
				height:0
				padding-bottom:40%
				.recommend-img
					width:100%
	.hotsong
		width:100%
		min-height:10rem
		.hotsong-top
			width:100%
			height:1.4rem
			color:$color-theme
			text-align:center
			line-height:1.4rem
			font-size:$font-size-medium-x
		.songlist
			width:100%
			min-height:10rem
			.songlist-list
				display:flex
				padding:0 .3rem .3rem .3rem
				.songlist-img
					width:1.4rem
					padding-right:0.3rem
				.songlist-words
					flex:1
					.songlist-words-top
						color:$color-text
						font-size:$font-size-medium
					.sontlist-words-down
						color:$color-text-l
						font-size:$font-size-small
						padding-top:.3rem
						line-height:.3rem
	.scroll--
		width:100%
		height:100%	
		.loading-container
			position:absolute
			width:100%
			top:50%
			transfrom:translateY(-50%)			
</style>