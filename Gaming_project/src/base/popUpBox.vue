<template>
	<transition name="slidePop">
		<div class="popUpBox" v-if="hintShow">
			<span>{{hint}}</span>
		</div>
	</transition>
</template>
<script>
export default{
	name:'popUpBox',
	data(){
		return {
			hintShow:false,
			hint:'所填信息有误!'
		}
	},
	mounted(){
		this.aa();
	},
	methods:{
		aa(){
			if(this.hintShow){
				let This = this;
				setTimeout(function(){
					This.hintShow = false;
				},1000)
			}
		}
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/variable'
.slidePop-enter-active,.slidePop-leave-active
	transition:all 0.5s
.slidePop-enter,.slidePop-leave-to
	opacity:0
.popUpBox
	position:fixed
	z-index:10
	color: #fff
	top:0
	right:0
	bottom:0
	left:0
	display: flex
	justify-content: center
	align-items: center
	font-size:$words-size-16
	span
		max-width:46vw
		background: hsla(0,0%,7%,.7)
		padding:6px 10px
		border-radius: 5px
		text-align:center
</style>