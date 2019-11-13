<template>
	<div class="progress-bar" ref="progressBar">
		<div class="bar-inner" ref=barinner>
			<div class="progress" ref="progress"></div>
			<div class="progress-btn-wrapper">
				<div class="progress-btn" ref="btn"></div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'schedule',
	props:["proportionz"],
	data(){
		return {
			proportiona:0,
			btnLeft:0,
			probar:0,
			nowTimerate:0,
			nowTimeEnd:0
		}
	},
	mounted(){
		this.touchmoveall()
	},
	methods:{
		touchmoveall(){
			var btn=this.$refs.btn
			var barinner=this.$refs.barinner
			var This=this
			var clientx,clientz,allmentwidth=document.body.offsetWidth
			console.log(allmentwidth)
			barinner.addEventListener('touchstart',touchStart,false)
			btn.addEventListener('touchmove',touchMove,false)
			btn.addEventListener('touchend',touchEnd,false)
			function touchStart(e){
				e=e||window.e
				This.probar=This.$refs.progressBar.offsetWidth
				clientx=e.touches[0].clientX
				clientz=(allmentwidth-This.probar)/2
				btn.style.left=(clientx-clientz-btn.offsetWidth/2)+'px'
				This.$refs.progress.style.width=btn.style.left
				This.nowTimerate=This.$refs.progress.offsetWidth/(barinner.offsetWidth-btn.offsetWidth)
				This.nowTimeEnd=This.nowTimerate
				This.$emit('nowtime',This.nowTimeEnd)
			}
			function touchMove(e){ 
				e=e||window.e
				clientz=(allmentwidth-This.probar)/2
				This.btnLeft=e.touches[0].clientX
				btn.style.left=(This.btnLeft-(btn.offsetWidth/2)-clientz)+'px'
				if(btn.offsetLeft<0){
					btn.style.left=0+"px"
				}else if(btn.offsetLeft>(This.probar-btn.offsetWidth)){
					btn.style.left=(This.probar-btn.offsetWidth)+'px'
				}
				This.$refs.progress.style.width=btn.style.left
				This.nowTimerate=This.$refs.progress.offsetWidth/(barinner.offsetWidth-btn.offsetWidth)
			}
			function touchEnd(e){
				e=e||window.e
				This.nowTimeEnd=This.nowTimerate
				
				This.$emit('nowtime',This.nowTimeEnd)
			}
		}
	},
	watch:{
		proportionz(proportiondata){
			// if(proportiondata>=0 && (this.probar==0)){
				const barwidth=this.$refs.progressBar.offsetWidth
				const btnwidth=this.$refs.btn.offsetWidth
				const allwidth=barwidth-btnwidth
				const progresswidth=parseInt(allwidth*proportiondata)
				this.$refs.progress.style.width=progresswidth+'px'
				this.$refs.btn.style.left=progresswidth+'px'
			// }
		}
	}
}
</script>
<style scoped lang="stylus">
@import "~css/variable"
	.progress-bar
		height:.6rem
		.bar-inner
			position:relative
			top:.28rem
			height:.08rem
			background:rgba(0,0,0,0.3)
			.progress
				position:absolute
				height:100%
				// width:100%
				background:$color-theme
			.progress-btn-wrapper
				position:absolute
				left:0rem
				top:-.09rem
				width:.6rem
				height:.6rem
				.progress-btn
					position:relative
					top:0rem 
					left:0rem
					box-sizing:border-box
					width:14px
					height:14px
					border:.04rem solid $color-text
					border-radius:50%
					background:$color-theme
		
</style>

<!-- .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme -->