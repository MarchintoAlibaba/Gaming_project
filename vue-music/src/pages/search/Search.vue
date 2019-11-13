<template>
	<transition>
	<div class='allsearchbar'>
		<seachbar ref='settext'></seachbar>	
		<div class="recommend">
			<div class="hotrecommend">热门搜索</div>
			<div class="recommendlistall">
				<li @click='setsong(item.name)' class="recommendlist" v-for='item of data'>{{item.name}}</li>
			</div>
		</div>
		<history></history>	
	</div>
	</transition>
</template>
<script>
import seachbar from '@/base/seachbar/seachbar'
import history from '@/base/history/history'
export default{
	name:'searchSearch',
	components:{
		seachbar,
		history
	},
	methods:{
		setsong(item){
			this.$refs.settext.settext(item)
			console.log(this.$refs.settext)
		}
	},
	data(){
		return {
			data:[{
				name:'鹿晗'
			},{
				name:'林俊杰'
			},{
				name:'择天记'
			},{
				name:'爱河'
			},{
				name:'离骚'
			},{
				name:'IU'
			},{
				name:'易烊千玺'
			},{
				name:'汪苏泷'
			},{
				name:'儿歌'
			},{
				name:'张学友'
			}]
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~css/variable'
	@keyframes ccmove
		from
			transform:translateX(100vw)
		to
			transform:translateX(0)
	.allsearchbar
		padding:0 .3rem
		animation:ccmove 2s ease
		.recommend
			width:100%
			min-height:1.4rem
			color:$color-text-l
			font-size:$font-size-medium
			margin-bottom:1rem
		.recommendlistall
			width:100%
			margin-top:.2rem
			.recommendlist
				padding:.1rem .16rem 
				background:$color-background-d
				float:left
				margin-right:.3rem
				border-radius:.1rem
				margin-top:.2rem
</style>