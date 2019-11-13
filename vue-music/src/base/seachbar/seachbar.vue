<template>
	<div>
		<div class="searchbar">
			<div class="searchbarall">
				<span class="searchbarleft">搜索</span>
				<input class="searchbarright" type="text" :placeholder="searchwords" v-model="text">
				<div class="searchdislodge" @click="clearall" v-show='text'>*</div>
			</div>
		</div>
		<sousuoindex :text="text" v-if="text"></sousuoindex>
	</div>
</template>
<script>
import sousuoindex from 'pages/sousuoindex/sousuoindex'
export default{
	name:'searchbar',
	props:{
		searchwords:{
			type:String,
			default:'搜索歌曲、歌手'
		}
	},
	components:{
		sousuoindex
	},
	data(){
		return {
			deletesearch:false,
			text:''
		}
	},
	methods:{
		clearall(){
			this.text=''
		},
		settext(item){
			this.text=item
		}
	},
	created(){
		this.$watch('text',(newText)=>{
			this.$emit('text',newText)
		})
	},
	watch:{
		text(newtext){
			// console.log(1)
			// window.location.reload()
		}
	}
}
</script>
<style scoped lang='stylus'>
@import '~css/variable'
	.searchbar
		width:100%
		height:0
		padding-bottom:22%
		overflow:hidden
		.searchbarall
			width:100%
			height:.76rem
			background:$color-highlight-background
			margin-top:.3rem
			border-radius:.1rem
			display:flex
			align-items:center
			.searchbarleft
				width:.8rem
				text-align:center
				height:100%
				line-height:.76rem
				color:$color-theme
			.searchbarright
				flex:1
				height:.42rem
				line-height:.42rem
				color:$color-text
				border-radius:.04rem
				background:none
			.searchdislodge
				width:.3rem
				background:$color-background-d
				height:.3rem
				border-radius:50%
				overflow:hidden
				color:$color-text-l
				text-align:center
				line-height:.38rem
				font-size:.4rem
				margin:0 .1rem
</style>