<template>
	<div class="all">
		<div class="bg-layer" ref="layer"></div>
		<scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" class="scroll--" :data="songlistloading">
			<div class="scroll-all">
				<div class="songlist" @click="selectItem(item,index)" v-for="(item,index) of songlist" :key="item.id">
					<p class="songname">{{item.songname}}</p>
					<span class="songname-detail">{{item.songnamedetail}}</span>
				</div>
			</div>
		</scroll>
		<!-- <router-view></router-view> -->
	</div>
</template>
<script>
import Scroll from '@/base/scroll/scroll'
import {mapMutations} from 'vuex'
export default{
	name:'songlist',
	components:{
		Scroll
	},
	data () {
		return {
			songlistloading:[],
			scrollY:0,
			songlist:[{
				id:'001',
				songname:'王子公主(Live)',
				song:'/static/media/music.9fdcbc3.mp3',
				img:'http://puui.qpic.cn/vstar_pic/0/name_75979_688t1502346364.jpg/0',
				songnamedetail:'刘德华 . 金曲榜 第0周'
			},{
				id:'002',
				song:'/static/media/musicf.c07e179.mp3',
				img:'http://puui.qpic.cn/media_img/0/null1514277229/0',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第1周'
			},{
				id:'003',
				song:'/static/media/musica.6c5497e.mp3',
				img:'http://puui.qpic.cn/vstar_pic/0/name_78152_688t1506580734.jpg/0',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第1周'
			},{
				id:'004',
				song:'/static/media/musicb.31bdb45.mp3',
				img:'http://i.gtimg.cn/qqlive/images/namelib/v688/7/3/5/105735.jpg',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第1周'
			},{
				id:'005',
				song:'/static/media/music.9fdcbc3.mp3',
				img:'http://puui.qpic.cn/media_img/0/null1518935448/0',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第1周'
			},{
				id:'006',
				song:'/static/media/musicf.c07e179.mp3',
				img:'http://puui.qpic.cn/media_img/0/null1515484510/0',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第1周'
			},{
				id:'007',
				song:'/static/media/musica.6c5497e.mp3',
				img:'http://i.gtimg.cn/qqlive/images/namelib/v688/8/6/2/72862.jpg',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第1周'
			},{
				id:'008',
				song:'/static/media/musicb.31bdb45.mp3',
				img:'http://puui.qpic.cn/media_img/0/null1516009359/0',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第1周'
			},{
				id:'009',
				song:'/static/media/musica.6c5497e.mp3',
				img:'http://puui.qpic.cn/vstar_pic/0/name_74326_688t1467971263.jpg/0',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第1周'
			},{
				id:'010',
				song:'/static/media/music.9fdcbc3.mp3',
				img:'//puui.qpic.cn/media_img/0/null1518505024/0',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第1周'
			},{
				id:'011',
				song:'/static/media/musicf.c07e179.mp3',
				img:'http://puui.qpic.cn/vstar_pic/0/name_79305_688t1490609479.jpg/0',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第1周'
			},{
				id:'012',
				song:'/static/media/musica.6c5497e.mp3',
				img:'http://puui.qpic.cn/vstar_pic/0/name_108698_688t1493369769.jpg/0',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第4周'
			},{
				id:'013',
				song:'/static/media/musicb.31bdb45.mp3',
				img:'http://puui.qpic.cn/media_img/0/null1516169853/0',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第4周'
			},{
				id:'014',
				song:'/static/media/musicf.c07e179.mp3',
				img:'http://i.gtimg.cn/qqlive/images/namelib/v688/4/4/9/78449.jpg',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第4周'
			},{
				id:'015',
				song:'/static/media/music.9fdcbc3.mp3',
				img:'http://puui.qpic.cn/vstar_pic/0/name_108698_688t1493369769.jpg/0',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第1周'
			},{
				id:'016',
				song:'/static/media/musica.6c5497e.mp3',
				img:'http://puui.qpic.cn/vstar_pic/0/name_108698_688t1493369769.jpg/0',
				songname:'王子公主(Live)',
				songnamedetail:'刘德华 . 金曲榜 第1周'
			}]
		}
	},
	created (){
		this.probeType =3
		this.listenScroll = true
		this.setsonglist(this.songlist)
		// console.log(this.setsonglist)
	},
	mounted (){
	},
	methods:{
		scroll(pos){
			this.scrollY =pos.y
			// console.log(this.scrollY)
			this.setcrollY(pos.y)
		},
		...mapMutations({
			setcrollY:'SCROLLY',
			setsonglist:'SONGLIST'
		}),
		selectItem(item,index){
			this.$emit('select',item,index)
		}
	},
	watch:{
		scrollY(newY){
			if(newY<0){
				this.scrollY=newY
				this.$refs.layer.style['transform']=`translateY(this.scrollY+'px')`
				this.$refs.layer.style['webkitTransform']=`translateY(${this.scrollY}px)`
				console.log(this.scrollY)
				if(this.scrollY<-220){
					// this.$refs.layer.style.bottom=260+'px'
				}
			}
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~css/variable'
.all
	width:100%
	height:100%
	// overflow:hidden
	.scroll-all
		width:100%
		// position:absolute
		.songlist
			padding:.4rem .4rem 0 .4rem
			margin-top:.1rem
			.songname
				color:$color-text
				font-size:$font-size-medium
			.songname-detail
				color:$color-text-l
				font-size:$font-size-medium
				line-height:.6rem
	.scroll--
		width:100%
		height:60%
	.bg-layer
		position:absolute
		width:100%
		height:100%
		background:$color-background
		transform:translateY(0px)
</style>