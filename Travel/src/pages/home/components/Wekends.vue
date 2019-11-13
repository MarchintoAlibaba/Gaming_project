<template>
	<div>
		<div class="wekends">周末去哪儿</div>
		<div class="wekends-img" v-for="item of wekendsList" :key="item.id">
			<img class="wekends-pic" :src="item.imgUrl">
			<div class="wekends-words">
				<p class="wekends-title">{{item.title}}</p>
				<p class="wekends-trip">{{item.words}}</p>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'HomeWekends',
	data (){
		return {
			wekendsList:[{
				id:'0001',
				title:'温泉有水上乐园',
				words:'泡泡温泉，吹吹海风，深觉人生美好1111111111111111111111111111',
				imgUrl:'http://img1.qunarzz.com/sight/source/1505/a4/df8543b6b8506d.jpg_r_640x214_660e1e3a.jpg'
			},
			{
				id:'0002',
				title:'温泉有水上乐园',
				words:'泡泡温泉，吹吹海风，深觉人生美好',
				imgUrl:'http://img1.qunarzz.com/sight/source/1505/3d/f99f5c73b52c4d.jpg_r_640x214_4e60b24c.jpg'
			},
			{
				id:'0003', 
				title:'温泉有水上乐园',
				words:'泡泡温泉，吹吹海风，深觉人生美好',
				imgUrl:'http://img1.qunarzz.com/sight/p0/1501/a2/a2a129584cebcadb.img.jpg_r_640x214_329ee163.jpg'
			}]
		}
	}
}
</script>
<style scoped>
	.wekends{
		width:100%;
		height:0;
		overflow: hidden;
		padding-bottom:10%;
		background:#f5f5f5;
		line-height:2rem;
		font-size:.9rem;
		text-indent:1rem;
	}
	.wekends-img{
		width:100%;
	}
	.wekends-pic{
		width:100%;
	}
	.wekends-words{
		/*width:100%;*/
		padding:.5rem;
	}
	.wekends-title{
		width:100%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.wekends-trip{
		width:100%;
		color:#707575;
		font-size:.8rem;
		padding-top:0.4rem;
		padding-bottom:.4rem;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
</style>