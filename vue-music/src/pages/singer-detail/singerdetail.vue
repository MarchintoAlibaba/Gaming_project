<template>
	<transition name="slide">
		<div class='singerdetail'>
			<div class="header-all">
				<div class="singerdetail-imgall">
					<img style="width:100%;" :src="singer.imgUrl" class="singerdetail-img">
				</div>
				<div class="singerdetail-header">
					<router-link tag="span" to='/singer' class="singerdetail-back"><</router-link>
					<div class="singer-name">{{singer.singername}}{{scrollY}}</div>
				</div>
				<div class="song-random">
					<span>》 随机播放全部</span>
				</div>
			</div>
			<songlist @select="selectItem"></songlist>
		</div>
	</transition>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import songlist from 'pages/songlist/songlist'
export default {
	name:'singerDetail',
	components:{
		songlist
	},
	computed: {
		...mapGetters([
			'singer',
			'scrollY',
			'songlist'
			])
	},
	methods:{
		selectItem(item,index){
			this.selectPlay({
				list:this.songlist,
				index:index
			})
		},
		...mapActions([
			'selectPlay'
		])
	}
}
</script>
<style scoped lang="stylus">
@import '~css/variable'
	.slide-enter-active,.slide-leave-active
		transition:all .3s
	.slide-enter,.slide-leave-to
		transform:translate3d(100%,0,0)
	.singerdetail
		position:fixed
		top:0
		bottom:0
		left:0
		right:0
		z-index:10
		background:$color-background
		overflow:hidden
		.header-all
			position:relative
			width:100%
			height:0
			padding-bottom:70%
			overflow:hidden
			.singerdetail-imgall
				width:100%
			.singerdetail-header
				position:absolute
				width:100%
				height:0
				padding-bottom:.8rem
				top:0
				// overflow:hidden
				// text-align:center
				.singerdetail-back
					width:1rem
					height:0.8rem
					float:left
					line-height:.8rem
					text-align:center
					font-size:.08rem
					font-size:$font-size-large-x
					color:$color-theme
				.singer-name
					margin:0 1rem
					font-size:$font-size-medium-x
					height:.8rem
					text-align:center
					line-height:.8rem
					color:$color-text
			.song-random
				position:absolute
				width:3rem
				height:.6rem
				left:50%
				margin-left:-1.5rem
				bottom:.3rem
				border:1px solid $color-theme
				border-radius:2rem
				text-align:center
				line-height:.6rem
				color:$color-theme

</style>