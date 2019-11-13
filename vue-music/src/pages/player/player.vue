<template>
	<div class="player" v-show="playlist.length>0">
		<transition name="normal">
			<div class="normal-player" v-show="fullScreen">
				<div class="normal-playerpadding">
					<div class="plaer-back">
						<img class="play-down" src="@/assets/img/down.svg" @click="back">
						<div class="play-name">
							<p class="play-songname">{{currentSong.songname}}</p>
							<p class="player-name">周杰伦</p>
						</div>
					</div>
					<div class="player-img">
						<div class="player-img-round" :class="rotatex">
							<img width="100%" :src="currentSong.img">
						</div>
					</div>
					<p class="player-words">死了都要爱，爱到天荒地老也要爱</p>
					<div class="song-schedule">
						<span class="time time-l">{{currentTime}}</span>
						<div class="progress-bar-wrapper">
							<schedule v-bind:proportionz="proportion" @nowtime='nowTimeRate'></schedule>
						</div>
						<span class="time time-r">{{allTime}}</span>
					</div>
					<div class="play-play">
						<li :class="playsequence" @click="modechange" ref="mode" ><span>模式</span></li>
						<li clsss="play-prev" @click="prevsong"><span>上一曲</span></li>
						<li class="play-mode" @click="playingmusic"><span>播放</span></li>
						<li class="play-next" @click="nextsong"><span>下一曲</span></li>
						<li class="play-collection"><span>收藏</span></li>
					</div>
				</div>
				<audio ref="audio" @timeupdate="updateTime" @ended="songend">
					<source src="@/assets/music/musicb.mp3" type="audio/mpeg">
				</audio>
			</div>
		</transition>
		<transition name="mini">	
			<div class="mini-player" v-show="!fullScreen" @click="open">
				<div class="mini-all">
					<img class="mini-allimg" width="100%" :src="currentSong.img">
					<div class="mini-name">
						<p class="mini-songname">{{currentSong.songname}}</p>
						<p class="mini-singername">周杰伦</p>
					</div>
					<div class="mini-song">列表</div>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
import schedule from '@/base/schedule/schedule'
import {playMode} from '@/assets/js/config'
import {changelist} from '@/assets/js/util'
export default{
	name:'player',
	components:{
		schedule
	},
	data(){
		return {
			song_list:[],
			currentTime:0,
			allTime:0,
			proportion:0,
			nowTime:0,
			datasong:true
		}
	},
	computed:{
		...mapGetters([
			'fullScreen',
			'playlist',
			'currentSong',
			'playingb',
			'currentIndex',
			'mode',
			'sequenceList',
			'finallsong'
		]),
		rotatex(){
			return this.playingb? 'play':'play pause'
		},
		playsequence(){
			return this.mode===playMode.sequence? 'icon-sequence':this.mode===playMode.loop? 'icon-loop':'icon-radom'
		}
	},
	mounted (){
		// if(this.datasong===true){
		// 	alert(1)
		// 	this.finallsong=this.sequenceList
		// 	this.datasong=false
		// }
	},
	methods:{
		back(){
			this.setFullscreen(false)
		},
		...mapMutations({
			setFullscreen:'SET_FULL_SCREEN',
			setPlayingb:'SET_PLAYINGB',
			setcurrentIndex:'SET_CURRENT_INDEX',
			setmode:'SET_PLAY_MODE',
			setplaylist:'SET_PLAYLIST'
		}),
		open(){
			this.setFullscreen(true)
		},
		playingmusic(){
			this.setPlayingb(!this.playingb)
		},
		prevsong(){
			let index=this.currentIndex-1
			if(index===-1){
				index=this.playlist.length-1
			}
			this.setcurrentIndex(index)
		},
		nextsong(){
			let indexnext=this.currentIndex+1
			if(indexnext===this.playlist.length){
				indexnext=0
			}
			this.setcurrentIndex(indexnext)
		},
		updateTime(e){
			let Time=parseInt(e.target.currentTime)
			let allTime=parseInt(e.target.duration)
			let alltime=parseInt(allTime/60)
			let alltimeyu=parseInt(allTime%60)
			if(alltimeyu<10){
				alltimeyu='0'+alltimeyu
			}
			this.allTime=alltime+':'+alltimeyu
			let fen=parseInt(Time/60)
			let yu=Time%60
			if(yu<10){
				yu='0'+yu
			}
			this.currentTime=fen+':'+yu
			this.proportion=Time/allTime
		},
		nowTimeRate(nowtime){
			this.nowTime=nowtime.toFixed(2) 
			this.$refs.audio.currentTime=this.$refs.audio.duration*this.nowTime
			if(nowtime===1){
				this.nextsong()
			}
			if(this.playingb===false){
			this.playingmusic()	
			}
		},
		modechange(){
			const mode=(this.mode+1)%3
			this.setmode(mode)
			let list=null
			if(mode===playMode.random){
				console.log(changelist)
				list=changelist(this.sequenceList)
			}else{
				list=this.finallsong
				console.log(this.finallsong)
			}
			this.resetCurrentIndex(list)
			this.setplaylist(list)
		},
		resetCurrentIndex(list){
			let index=list.findIndex((item)=>{
				return item.id===this.currentSong.id
			})
			this.setcurrentIndex(index)
		},
		songend(){
			if(this.mode===0||this.mode===2){
				this.nextsong()
			}else if(this.mode===1){
				this.$refs.audio.currentTime=0
				this.$refs.audio.play()
			}
		}
	},
	watch:{
		currentSong(newsong,oldsong){
			if(newsong.id===oldsong.id){
				return
			}
			clearTimeout(this.timer)
	        this.timer = setTimeout(() => {
	          this.$refs.audio.play()
	        }, 1000)
	        this.setPlayingb(true)
		},
		playingb(aa){
			const audio=this.$refs.audio
	        clearTimeout(this.timer)
	        this.timer = setTimeout(() => {
	          this.$nextTick(() => {
		      	aa? audio.play():audio.pause()
		        })
	        }, 1000)
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~css/variable'
.player
	.mini-player
		position:fixed
		left:0
		right:0
		bottom:0
		height:1.4rem
		background:$color-highlight-background
		z-index:10
		.mini-all
			padding:.2rem
			display:flex
			.mini-allimg
				display:inline-block
				width:1rem
				height:1rem
				border-radius:50%
				overflow:hidden
				background:red
				margin-left:.2rem
			.mini-name
				flex:1
				margin-left:.3rem
				.mini-songname
					color:$color-text
					font-size:$font-size-medium 
				.mini-singername
					margin-top:.16rem
					color:$color-text-l
					font-size:$font-size-small
			.mini-song
				width:1rem
				height:1rem
				text-align:center
				line-height:1rem
				color:$color-text
				font-size:$font-size-medium-x
		&.mini-enter-active,&.mini-leave-active
			transition:all 0.4s cubic-bezier(.86,.18,.82,1.32)
		&.mini-enter,&.mini-leave-to
			opacity:0
			transform:translate3d(0,2rem,0)
	.normal-player
		position:fixed
		width:100%
		top:0
		bottom:0
		z-index:10
		background:$color-background
		.normal-playerpadding
			padding:.3rem
			.plaer-back
				width:100%
				height:1rem
				.play-down
					// display:inline-block
					width:.5rem
					float:left
				.play-name
					width:100%
					text-align:center
					color:$color-text
					// float:left
					.play-songname
						font-size:$font-size-medium-x
					.player-name
						margin-top:.2rem 	
						font-size:$font-size-medium
		.player-img
			width:100%
			height:0
			padding-bottom:100%
			// background:yellow
			margin-top:3vh
			text-align:center
			position:relative
			.player-img-round
				width:90%
				border-radius:50%
				overflow:hidden
				margin:0 auto
				&.play
					margin-top:0
				    // animation:rotate 30s linear infinite
				    -webkit-animation:rotate 10s linear infinite
				&.pause
					margin-top:0
					// animation-play-state:paused
					-webkit-animation-play-state:paused
		.player-words
			// margin-top:6vh
			width:100%
			height:2rem
			text-align:center
			line-height:2rem
			color:$color-theme
			font-size:$font-size-medium-x
		.song-schedule
			display:flex
			align-items:center
			width:80%
			margin:0 auto
			padding:.1rem 0
			color:$color-text
			.time
				font-size:$font-size-small
				flex:0 0 .6rem
				line-height:.6rem
				width:.6rem
				&.time-l
					text-align:left
				&.time-r
					text-align:right
			.progress-bar-wrapper
				flex:1
		.play-play
			padding:0 5%
			height:1rem
			// background:red
		.play-play li
			width:20%
			height:1rem
			float:left
			text-align:center
			line-height:1rem
			color:$color-theme
			&.icon-sequence
				color:$color-theme
			&.icon-loop
				color:white
			&.icon-radom
				color:red
		.play-play li span
			padding:.05rem .05rem
			border:.01rem solid $color-theme
		&.normal-enter-active,&.normal-leave-active
			transition:all .3s
			.plaer-back,.play-play
				transition:all .3s cubic-bezier(.86,.18,.82,1.32)
		&.normal-enter,&.normal-leave-to
			opacity:0
			.plaer-back
				transform:translate3d(0,-3rem,0)
			.play-play
				transform:translate3d(0,3rem,0)
@keyframes rotate
	0%
		transform:rotate(0)
	100%
		transform:rotate(360deg)
</style>