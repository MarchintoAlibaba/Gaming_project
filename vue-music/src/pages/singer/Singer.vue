<template>
	<div class="">
		<div class="singer-all" ref="aaa">
			<scroll class="scroll--">
				<div class="singer">
					<div class="sing-top">热门</div>
					<div class="singer-list" v-for="item of singerlist" :key="item.id"> 
						<div class="singer-person" @click="selectItem(item)">
							<img class="singerimg" :src="item.imgUrl">
							<span class="singerintroduce">{{item.singername}}</span>
						</div>
					</div>
				</div>
			</scroll>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
// import Loading from '@/base/loading/loading'
import scroll from '@/base/scroll/scroll'
import {mapMutations} from 'vuex'
export default{
	name:'singerSinger',
	components: {
		// Loading,
		scroll
	},
	data () {
		return {
			singerlist:[{
				id:'001',
				imgUrl:'https://i.gtimg.cn/qqlive/images/namelib/v688/6/1/1/74611.jpg',
				singername:'成龙'
			},{
				id:'002',
				imgUrl:'https://i.gtimg.cn/qqlive/images/namelib/v688/0/0/7/75007.jpg',
				singername:'曾志伟'
			},{
				id:'003',
				imgUrl:'https://puui.qpic.cn/media_img/0/null1518421236/0',
				singername:'刘德华'
			},{
				id:'004',
				imgUrl:'https://puui.qpic.cn/media_img/0/727681530075382/0',
				singername:'吴君如'
			},{
				id:'005',
				imgUrl:'https://puui.qpic.cn/vstar_pic/0/name_72538_688t1506411859.jpg/0',
				singername:'古天乐'
			},{
				id:'006',
				imgUrl:'https://i.gtimg.cn/qqlive/images/namelib/v688/8/3/6/72836.jpg',
				singername:'吴镇宇'
			},{
				id:'007',
				imgUrl:'https://puui.qpic.cn/media_img/0/null1515134722/0',
				singername:'周润发'
			},{
				id:'008',
				imgUrl:'https://i.gtimg.cn/qqlive/images/namelib/v688/2/7/9/72279.jpg',
				singername:'刘青云'
			},{
				id:'009',
				imgUrl:'https://puui.qpic.cn/media_img/0/716201524815896/0',
				singername:'何炅'
			},{
				id:'010',
				imgUrl:'https://puui.qpic.cn/media_img/0/null1518492928/0',
				singername:'郭德纲'
			},{
				id:'011',
				imgUrl:'https://puui.qpic.cn/media_img/0/null1517451862/0',
				singername:'谢娜'
			},{
				id:'012',
				imgUrl:'https://puui.qpic.cn/media_img/0/null1517451862/0',
				singername:'谢娜'
			},{
				id:'013',
				imgUrl:'https://puui.qpic.cn/media_img/0/null1517451862/0',
				singername:'谢娜'
			},{
				id:'014',
				imgUrl:'https://puui.qpic.cn/media_img/0/null1517451862/0',
				singername:'谢娜'
			},{
				id:'015',
				imgUrl:'https://puui.qpic.cn/media_img/0/null1517451862/0',
				singername:'谢娜'
			}]
		}
	},
	methods:{
		selectItem(item) {
			this.$router.push({				
				path:`/singer/${item.id}`
			})
			this.setSinger(item)
		},
		...mapMutations({
			setSinger:'SET_SINGER'
		})
	}
}
</script>
<style scoped lang="stylus">
@import '~css/variable'
.singer-all
	overflow:hidden
	position:fixed
	right:0
	left:0
	top:1.8rem
	bottom:0
	background:$color-background
	.scroll--
		width:100%
		height:100%	
		.singer
			width:100%
			min-height:5rem
			.sing-top
				padding:.2rem .3rem
				color:$color-text-l
				font-size:$font-size-medium
				background:$color-highlight-background
			.singer-list
				padding:.3rem .5rem 0 .5rem
				.singer-person
					width:100%
					display:flex
					.singerimg
						width:1rem
						height:1rem
						border-radius:50%
						overflow:hidden
					.singerintroduce
						flex:1
						color:$color-text-l
						padding-left:.4rem
						line-height:1rem
</style>