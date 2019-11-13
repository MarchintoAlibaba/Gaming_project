<template>
	<div>
		<div style="width:100%;height:50px;background:red;" @click="scrolldistance"></div>
		<scroll class="scroll" @scroll="scroll" ref="scroll" :probe-type="probeType">
			<div ref="scrollaa">
				<detail-banner></detail-banner>
				<detail-header></detail-header>
				<div style="height:800px;background:yellow">
					<detail-list :list='list'>
				</detail-list>
				</div>
			</div>
		</scroll>
	</div>
</template>
<script>
import DetailBanner from './components/Banner'
import DetailHeader from './components/Header'
import DetailList from './components/List'
import scroll from '@/common/scroll/scroll'
export default{
	name:'Detail',
	components:{
		DetailBanner,
		DetailHeader,
		DetailList,
		scroll
	},
	created() {
      this.probeType = 1
      // this.listenScroll = true
    },
    mounted(){
    	this.$nextTick(()=>{
    			// this.$refs.scroll.refresh()
    		this.$refs.scroll.scrollTo(0,200)
    	})
    	// this.$refs.scroll.scrollTo(0,200)
    	// this.scrolla()
    	setTimeout(()=>{
    		this.$refs.scroll.refresh()
    	},200)
    },
    methods:{
    	scrolldistance(){
    		this.$nextTick(()=>{
    			// this.$refs.scroll.refresh()
    		this.$refs.scroll.scrollTo(0,200)
    	})
    	},
    	scroll(pos) {
    		// alert(1) 
	        this.scrollY = pos.y
	        console.log(this.scrollY)
      	}
    },
    watch:{
    	scrollY(newY){
			// alert(1)
		}
    },
	data (){
		 return {
		 	goods:[],
	  		listHeight:[], //所有高度的数据
	  		scrollY:0,  //滚动高度的Y值
		 	list:[{
		 		title:'成人票',
		 		children:[{
		 			title:'成人三管联票',
		 			children:[{
		 				title:'成人三管联票-某一商场'
		 			}]
		 		},{
		 			title:'成人五人联票',
		 			children:[{
		 				title:'成人五人联票-某一商场'
		 			}]
		 		}]
		 	},{
		 		title:'儿童票'
		 	},{
		 		title:'学生票'
		 	},{
		 		title:'特价票'
		 	}]
		 }
	}
}
</script>
<style scoped>
	.scroll{
		position:absolute;
		top:50px;
		bottom:0;
		left:0;
		right:0;
		overflow: hidden;
	}
</style>