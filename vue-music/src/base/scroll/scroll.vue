<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'

	export default {
		name:'scroll',
		props: {
			probeType: {
				type: Number,
				default: 1	
			},
			click: {
				type: Boolean,
				default: true
			},
			listenScroll:{
				type:Boolean,
				default:true
			},
			data: {
				type: Array,
				default: null
			},
			pullUpLoad:{
				type:Boolean,
				default:false
			}
		},
		mounted() {
			setTimeout(() => {
				this._initScroll()
				console.log(this.pullUpLoad)
			},20)
		},
		methods: {
			_initScroll() {
				if (!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper,{
					probeType:this.probeType,
					click: this.click
				})
				if(this.listenScroll){
					let This=this
					this.scroll.on('scroll',(pos)=>{
						This.$emit('scroll',pos)
					})
				}
				if(this.pullUpLoad){
					this.scroll.on('scrollEnd',()=>{
						if(this.scroll.y <= (this.scroll.maxScrollY+50)){
							this.$emit('scrollToEnd')
						}
					})
				}
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			disable() {
				this.scroll && this.scroll.disable()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			}
		},
		watch:{
			data() {
				setTimeout(() => {
					this.refresh()
					// alert(2)
				},20)
			}
		}
	}
</script>
<style scoped lang='stylus'>
	
</style>