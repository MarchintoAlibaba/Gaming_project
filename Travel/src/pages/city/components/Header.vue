<template>
	<div>
		<div class="header">
			<div class="header-top">
				<router-link to="/"><div class="header-icon"><</div></router-link>
				<div class="header-city">境内</div>
			</div>
			<div class="header-bottom"><input type="text" v-model='keyword' name="" placeholder="请输入城市地名"></div>
		</div>
		<div class="search" ref='search' v-show="keyword">
			<ul>
				<li class="search-content" v-for="item of list" :key="item.id" @click="handleCityClick(item.name)">{{item.name}}</li>
				<li class="search-content" v-show="hasNoData">没有找到匹配数据</li>
			</ul>
		</div>
	</div>
</template>
<script>
import Bscroll from 'better-scroll'
export default{
	name:'CityHeader',
	props:{
		city: Object
	},
	data () {
		return {
			keyword:'',
			list: [],
			timer:null
		}
	},
	computed:{
		hasNoData (){
			return !this.list.length
		}
	},
	watch: {
		keyword () {
			if (this.timer) {
				clearTimeout(this.timer)
			}
			if (!this.keyword) {
				this.list=[]
				return
			}
			this.timer =setTimeout( ()=> {
				const result =[]
				for (let i in this.city) {
					this.city[i].forEach((value) => {
						if (value.name.indexOf(this.keyword) > -1) {
							result.push(value)
						}
					})
				}
				this.list=result
			},100)
		}
	},
	mounted (){
		this.scroll=new Bscroll(this.$refs.search)
	},
	methods:{
		handleCityClick (city) {
			this.$store.commit('changeCity',city)
			this.$router.push('/')
		}
	}
}
</script>
<style scoped>
	.search{
		position: absolute;
		top:4.9rem;
		right:0;
		left:0;
		bottom:0;
		background: #f5f5f5;
		overflow: hidden;
		z-index: 11;
	}
	.search-content{
		line-height: 2rem;
		background:#fff;
		padding-left:.6rem;
		border-bottom:.02rem solid #f5f5f5;
	}
	.header{
		width:100%;
		overflow: hidden;
		height:0;
		padding-bottom:21%;
		background:#00bcd4;
		color:white;
	}
	.header-icon{
		width:3rem;
		height:3rem;
		text-align: center;
		line-height: 3rem;
		font-size:1.8rem;
		float:left;
		color:white;
	}
	.header-city{
		margin:0 3rem;
		text-align: center;
		font-size:1.2rem;
		height:3rem;
		line-height: 3rem;
	}
	.header-bottom{
		width:100%;
		background:#00bcd4;
		color:#00bcd4;
		height:2.2rem;
	}
	.header-bottom input{
		display:block;
		width:70%;
		margin:0 auto;
		height:1.4rem;
		line-height: 1.4rem;
		border-radius: 0.2rem;
		text-align: center;
		color:#666;
		padding:0 1rem;
	}
</style>