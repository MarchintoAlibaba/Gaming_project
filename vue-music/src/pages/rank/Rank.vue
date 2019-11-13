<template>
	<transition @enter='handleEnter'>
		<div class="rank">
			<scroll ref="scroll" class="scroll" :pullUpLoad="pullUpLoad" :listenScroll="true" @scroll="scrolldistance">
				<div class="aabb" @click="scrolltoa" ref="aabb">
					<div class="all" ref='all'>{{testdata}}</div>
					<div class="alldone" ref='aa'>{{testdatabb}}</div>1111111111
				</div>
			</scroll>
		</div>
	</transition>
</template>
<script>
import scroll from '@/base/scroll/scroll'
export default{
	name:'rankRank',
	components:{
		scroll
	},
	created(){
		// this.beforeEnter();
	},
	mounted(){
		
		setTimeout(()=>{
			this.testdatabb="hello hello"
			this.$refs.aa.stylusle.height='2rem'
		},10)	
	},
	methods:{
		handleEnter(e){
			console.log(e)
			
		},
		beforeLeave(e){
			console.log(e)
			// this.$refs.all.classList.add('slide');
		},
		scrolldistance:function(pos){
			console.log(pos.y)
		},	
		scrolltoa(){
			console.log(this.$refs.aabb)
			this.$refs.scroll.scrollTo(0,0,400)
			console.log(1)
		}
	},
	watch:{
		testdatabb(data){
			console.log(data)
			// this.$refs.scroll.listenScroll=true
			// console.log(this.$refs.scroll.listenScroll)
			setTimeout(()=>{
			this.$refs.scroll.refresh()
			// console.log(this.$refs.scroll)
			},100)
		}
	},
	data(){
		return {
			pullUpLoad:true,
			testdata:"hello world",
			testdatabb:''
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~css/variable'
.all
	width:100%
	height:15rem
	background:gray
	animation:aamove 2s ease
.slide
	animation:bbmove 2s ease
@keyframes aamove
	from
		transform:translateX(100vw)
	to
		transform:translateX(0)
@keyframes bbmove
	from
		transform:translateX(0)
	to
		transform:translateX(-100vw)
.rank
	position:fixed
	width:100%
	top:1.8rem
	bottom:0
	overflow:hidden
	background:$color-background
	.scroll
		width:100%
		height:100%
		.aabb
			width:100%
			height:20rem
			.alldone
				width:100%
				// height:2rem
				background:red
	
</style>