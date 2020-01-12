<template>
	<div class="promotions" ref="promotions">
		<nav class="menu" ref="menu">
			<div class="tabbox two" @click="activity">
				<span class="active">进行中</span> 
				<span>已结束</span>
			</div>
		</nav>
		<div class="main">
			<div class="promotionsbox" v-show="doing">
				<div class="item" v-for="item in activityL">
					<router-link :to="'/promotions/'+item.pid">
						<div class="imgbox">
							<img v-lazy='item.imgUrl'> 
							<h2>{{item.title}}</h2>
						</div> 
						<div class="ct">
							<span><i class="iconfont bz-shijian"></i>{{item.fromDate}}起</span> 
							<span><i class="iconfont bz-search1"></i>查看详情</span>
						</div>
					</router-link>
				</div>
				<no-data :noDataShow='noData'></no-data>
			</div>
			<div class="promotionsbox" v-show="!doing">
				<div class="item" v-for="item in activityA">
					<router-link :to="'/promotions/'+item.pid">
						<div class="imgbox">
							<img v-lazy='item.imgUrl'> 
							<h2>{{item.title}}</h2>
						</div> 
						<div class="ct">
							<span><i class="iconfont bz-shijian"></i>{{item.fromDate}}起</span> 
							<span><i class="iconfont bz-search1"></i>查看详情</span>
						</div>
					</router-link>
				</div>
				<no-data :noDataShow='noData'></no-data>
			</div>
		</div>
		<transition name="slide">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
import noData from '@/base/noData'
export default{
	name:'promotions',
	components:{
		noData
	},
	data(){
		return{
			activityL:[],
			activityA:[],
			doing:true,
			noData:false,
		}
	},
	mounted(){
		this.activityList();
		this.toDetail();
		this.activityAlready();
	},
	methods:{
		toDetail(){
			switch(this.$route.path){
				case `/promotions/${this.$route.params.id}`:
				this.$refs.menu.style.display = 'none';
				this.$refs.promotions.style.top = '45px';
				break;
				case "/promotions":
				this.$refs.menu.style.display = 'block';
				this.$refs.promotions.style.top = '0';
				break;
			}
		},
		activity(e){
			this.noData = false;
			let dom = e.target;
			document.getElementsByClassName('active')[0].className = '';
			dom.className = 'active';
			if(dom.innerText == '进行中'){
				this.doing = true;
				if(this.activityL.length == 0){
					this.noData = true;
				}
			}else{
				this.doing = false;
				if(this.activityA.length == 0){
					this.noData = true;
				}
			}	
		},
		activityList(){
			this.axios.post(this.http + '/api/BaseInfo/GetPPromotionList',{
				state:0
			}).then((response)=>{
				if(response.data.resultCode == 1){
					this.activityL = response.data.resultData.pPromotionList;
				}
			})
		},
		activityAlready(){
			this.axios.post(this.http + '/api/BaseInfo/GetPPromotionList',{
				state:1
			}).then((response)=>{
				if(response.data.resultCode == 1){
					this.activityA = response.data.resultData.pPromotionList;
				}
			})
		}
	},
	watch:{
		$route(to, from) { //根据路径的不同来改变相应的值
	      this.toDetail();
	    }
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.promotions
	position:fixed
	top:0
	right:0
	bottom:48px
	left:0
	z-index:1
	background:$background-color
	.menu
		height: 45px
		line-height: 45px
		padding-top: 8px
		position: relative
		.tabbox
			display: flex
			flex-wrap: nowrap
			justify-content: space-between
			padding: 0 10px
			justify-content: center
			span
				display: inline-block
				width: 100px
				height: 30px
				line-height: 30px
				background: #202630
				font-size: 1.4rem
				text-align: center
				&:first-child
					border-radius: 2px 0 0 2px
				&.active
					color: #03fcb3
					background: #2b3a4a
					border: none
	.main
		position:fixed
		top:45px
		left:0
		right:0
		bottom:48px
		.promotionsbox
			overflow-y: auto
			width:100%
			height:100%
			font-weight: lighter
			background: linear-gradient(0deg,#202630 0,#2b3a4a 50%,#202630)
			.item
				background: linear-gradient(90deg,#2b3a4a,#202630)
				margin: 8px
				border-radius: 3px
				box-shadow: 0 6px 12px rgba(0,0,0,.2)
				a
					color: #7f858f
					cursor: pointer
					.imgbox
						width: 100%
						max-height: 150px
						overflow: hidden
						position: relative
						img
							height: auto
							vertical-align: middle
							border-radius: 3px 3px 0 
							width: 100%
							height: 150px
							object-fit:cover
						h2
							background: transparent linear-gradient(180deg,transparent,rgba(0,0,0,.9))
							bottom: 0
							height: 50px
							line-height: 50px
							position: absolute
							width: 100%
							color: #fff
							font-size: 1.4rem
							font-weight: 400
							padding: 5px 10px 0
					.ct
						display:flex
						justify-content: space-between
						padding: 10px
						font-size: 1.2rem
						color: #fff
						background: #161b22
						border-radius: 0 0 3px 3px
						span:last-child
							color: #03fcb3
							font-size: 1.4rem
						i
							margin-right: 5px
							position: relative
							top: 1px
</style>