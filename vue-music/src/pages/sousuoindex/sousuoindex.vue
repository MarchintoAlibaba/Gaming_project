<template>
	<div class="sousuoindex">
		<scroll class="scroll--" ref="scroll" :pull-up-load='pullUpLoad' @scrollToEnd="searchmore">
			<div class="allindex">
				<li class="indexlist" v-for="item of indexlist">
					<span class="indexmusic">?</span>
					<p class="indexname">{{item.name}}</p>
				</li>
				<loading :title="title"></loading>
			</div>
		</scroll>
	</div>
</template>
<script>
import scroll from '@/base/scroll/scroll'
import loading from '@/base/loading/loading'
export default{
	name:'sousuoindex',
	props:["text"],
	components:{
		scroll,
		loading
	},
	mounted(){
		// if(this.text!==''){
		// 	alert(1)
		// }
		// this.$refs.scroll.refresh()
		// alert(this.text)
	},
	methods:{
		refresh() {
	        this.$refs.scroll.refresh()
	    },
	    searchmore(){
	    	// 这里执行请求数据的方法传入不同的参数列入page++
	    	console.log("page++")
	    }
	},
	wacth:{
	},
	data(){
		return{
			pullUpLoad:true,
			title:'正在拼命加载中,大侠请等等...',
			indexlist:[{
				name:'周杰伦',
			},{
				name:'告白气球-周杰伦',
			},{
				name:'龙卷风-周杰伦',
			},{
				name:'给我一首歌的时间-周杰伦',
			},{
				name:'算什么男人-周杰伦',
			},{
				name:'红城客栈-周杰伦',
			},{
				name:'说好的幸福呢-周杰伦',
			},{
				name:'明明就-周杰伦',
			},{
				name:'手写的从前周杰伦',
			},{
				name:'烟花易冷-周杰伦',
			},{
				name:'黑色毛衣-周杰伦',
			},{
				name:'鞋子特大号-周杰伦',
			},{
				name:'安静-周杰伦',
			},{
				name:'晴天-周杰伦',
			},{
				name:'晴天-周杰伦',
			},{
				name:'晴天-周杰伦',
			},{
				name:'晴天-周杰伦',
			},{
				name:'晴天-周杰伦',
			}]
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~css/variable'
.sousuoindex
	overflow:hidden
	position:fixed
	right:0
	left:0
	bottom:0
	top:2.9rem
	background:$color-background
	.allindex
		padding:0.2rem .4rem 0 .4rem
		.indexlist
			width:100%
			height:.8rem
			line-height:.8rem
			display:flex
			font-size:$font-size-medium
			color:$color-text-l
			.indexmusic
				width:.6rem
				height:.8rem
				text-align:center
			.indexname
				flex:1
.scroll--
	width:100%
	height:100%
</style>