<template>
	<div>
		<div v-for="(item,index) of list" :key="index">
			<div class="list">
				<span class="list-icon"></span>
				{{item.title}}
			</div>
			<div v-if="item.children" class="item-children">
				<detail-list :list="item.children"></detail-list>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:"DetailList",
	props:{
		list:Array
	}
}
</script>
<style scoped>
	.list{
	overflow: hidden;
    position: relative;
    z-index: 4;
    padding: 0 .6rem;
    height: 2.4rem;
    background: #fff;
    color: #333;
    font-size: 1rem;
    line-height: 2.4rem;
    text-indent: .8rem;
    border-bottom:0.06rem solid #dadada;
	}
	.list-icon{
	display: inline-block;
    position: absolute;
    width: 1.6rem;
    height: 1.4rem;
    top: .6rem;
    left: .4rem;
    background: url(//s.qunarzz.com/piao/image/touch/sight/detail.png) 0 -1rem no-repeat;
    margin-right: .1rem;
    background-size: 1rem 8rem;
	}
	.item-children{
		padding:0 .5rem;
	}
</style>