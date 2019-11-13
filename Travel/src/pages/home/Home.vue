<template>
	<div class="wrapper" ref="aab" @scroll="scrolla">
		<div>
			<home-header></home-header>
			<home-swiper></home-swiper>
			<home-icons></home-icons>
			<home-recommend></home-recommend>
			<home-wekends></home-wekends>
		</div>
	</div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWekends from './components/Wekends'
import BScroll from 'better-scroll'
// import axios from 'axios'
export default {
 name: 'Home',
 components: {
 	HomeHeader,
 	HomeSwiper,
 	HomeIcons,
 	HomeRecommend,
 	HomeWekends
  },
  data () {
  	return {
  		goods:[],
  		listHeight:[], //所有高度的数据
  		scrollY:0,  //滚动高度的Y值
  	}
  },
  created () {
      this.probeType = 1
      this.listenScroll = true
    },
  mounted () {
  	this.$nextTick(()=>{
  		this.scroll= new BScroll(this.$refs.aab,{
  			probeType:this.probeType,
  			listenScroll:this.listenScroll
  		});
  		if(this.listenScroll){
  			// console.log(this.scroll)
  			this.scroll.on((pos)=>{
  				alert(pos)
  			})
  		}
  	});
  	// console.log(this.listenScroll)
  	// if(this.listenScroll){
  	// 	console.log(this.scroll)
  	// 	this.scroll.on('scroll',(pos)=>{
  	// 		this.scrollY=pos.y
  	// 		console.log(this.scrollY)
  	// 	})
  	// }
    this.$nextTick(()=>{ 
    // this.scroll.scrollBy(0,-500,10000) 
  })
  },
  methods:{
  		scrolla:function(pos){
  			console.log(pos.y)
  		}
  },
  watch:{
  		scrollY(res){
  			console.log(res)
  		}
  	}
//  methods: {
//  	getHomeInfo (){
//  		axios.get('/api/index.json').then(this.getHomeInfoSucc)
//  	},
//  	getHomeInfoSucc (res){
//  		console.log(res)
//  	}
//  },
// mounted () {
// 	this.getHomeInfo()
// }
}
</script>
<style scoped lang="stylus">
.wrapper
	ovflow:hidden
	height:100vh
</style>