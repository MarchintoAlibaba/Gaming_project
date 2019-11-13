<template>
	<div>
		<div class="recommend">热门推荐</div>
		<router-link tag="div" :to="/detail/+item.id" class="recommed-travel" v-for="item of recommedList" :key="item.id">
			<div class="recommed-left"><img class="recommed-img" :src="item.imgUrl"></div>
			<div class="recommed-right">
				<p class="recommed-title">{{item.title}}</p>
				<p class="recommed-synopsis">{{item.words}}</p>
				<button class="recommed-look" type="button" name="查看详情">查看详情</button>
			</div>
		</router-link>
	</div>
</template>
<script>
export default{
	name:'Recommend',
	data () {
		return{
			recommedList:[{
				id:'001',
				title:'三亚海上观光巴士1111111111111111111111111111111111111111',
				words:'来三亚海上观光巴士体验不一样的美',
				imgUrl:'http://img1.qunarzz.com/sight/p0/1412/e9/d5c72454d47eda983bd4e857c9c361d8.water.jpg_200x200_5870d2ca.jpg'
			},
			{
				id:'002',
				title:'三亚海上观光巴士',
				words:'来三亚海上观光巴士体验不一样的美',
				imgUrl:'http://img1.qunarzz.com/sight/p0/1412/e9/d5c72454d47eda983bd4e857c9c361d8.water.jpg_200x200_5870d2ca.jpg'
			},
			{
				id:'003',
				title:'三亚海上观光巴士',
				words:'来三亚海上观光巴士体验不一样的美',
				imgUrl:'http://img1.qunarzz.com/sight/p0/1412/e9/d5c72454d47eda983bd4e857c9c361d8.water.jpg_200x200_5870d2ca.jpg'
			},
			{
				id:'004',
				title:'三亚海上观光巴士',
				words:'来三亚海上观光巴士体验不一样的美',
				imgUrl:'http://img1.qunarzz.com/sight/p0/1412/e9/d5c72454d47eda983bd4e857c9c361d8.water.jpg_200x200_5870d2ca.jpg'
			}]
		}
	}
}
</script>
<style scoped>
	.recommend{
		width:100%;
		padding-bottom:10%;
		overflow: hidden;
		height:0;
		background:#F5F5F5;
		line-height: 2.2rem;
		font-size:.9rem;
		text-indent:1rem;
	}
	.recommed-travel{
		padding:.5rem;
		border-bottom:.1rem solid 	#F5F5F5;
	}
	.recommed-travel::after{
		content:".";        
	    display:block;        
	    height:0;        
	    clear:both;        
	    visibility:hidden;  
	}
	.recommed-img{
		display:block;
		width:4.6rem;
	}
	.recommed-left{
		float:left;
	}
	.recommed-right{
		padding:.1rem .6rem;
		float:left;
		color:#707575;
		font-size:.6rem;
	}

	.recommed-title{
		width:14rem;
		color:black;
		font-size:.8rem;
		padding-bottom:.8rem;
		overflow: hidden;
		text-overflow:ellipsis; 
		white-space: nowrap;
	}
	.recommed-synopsis{
		width:16rem;
		overflow: hidden;
		text-overflow:ellipsis; 
		white-space: nowrap;
	}
	.recommed-look{
		padding:0 .6rem;
		margin-top:.6rem;
		color:white;
		background:#FFA500;
		font-size:0.5rem;
		border:.01rem solid #FFA500;
		border-radius: 0.2rem;
	}
</style>