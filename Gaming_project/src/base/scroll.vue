<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
export default{
	props:{
		probeType:{
			type:Number,
			default:1
		},
		click:{
			type:Boolean,
			default:true
		},
		data:{
			type:Array,
			default:null
		},
		pullUpLoad:{
			type:Boolean,
			default:false
		},
		pullDownRefresh:{
			type:Boolean,
			default:false
		}
	},
	mounted(){ 
		setTimeout(()=>{
			this._initScroll();
		},20)
	},
	methods:{
		_initScroll(){
			if(!this.$refs.wrapper){
				return;
			}
			this.scroll = new BScroll(this.$refs.wrapper,{
				probeType:this.probeType,
				click:this.click
			})
			if(this.pullUpLoad){ //上拉加载
				this.scroll.on('scrollEnd',()=>{
					if(this.scroll.y <= (this.scroll.maxScrollY+50)){
						this.$emit('scrollUp')
					}
				})
			}
			if(this.pullDownRefresh){//下拉刷新
				this.scroll.on('scroll',(pos)=>{
					if(pos.y > 1){
						this.$emit('scrollDownT');
					}
					if(pos.y > 50){
						this.$emit('scrollDownF');
					}
				})
				this.scroll.on('touchEnd',(pos)=>{
					if(pos.y > 50){
						this.$emit('scrollDown')
					}
				})
			}
		},
		enable(){
			this.scroll && this.scroll.enable();
		},
		disable(){
			this.scroll && this.scroll.disable();
		},
		refresh(){
			this.scroll && this.scroll.refresh();
		}
	},
	watch:{
		data(){
			setTimeout(()=>{
				this.refresh()
			},20)
		}
	}
}
</script>