<template>
	<div class="alphabet">
		<div class="alphabet-a" v-for="item of abc" @click="clickletter">{{item.letter}}</div>
	</div>
</template>
<script>
export default{
	name:'CityAlphabet',
	data (){
		return {
			abc:[{
				letter:'A'
			},{
				letter:'B'
			},{
				letter:'C'
			},{
				letter:'D'
			},{
				letter:'E'
			},{
				letter:'F'
			},{
				letter:'G'
			},{
				letter:'H'
			},{
				letter:'I'
			},{
				letter:'J'
			},{
				letter:'K'
			},{
				letter:'L'
			},{
				letter:'M'
			},{
				letter:'N'
			},{
				letter:'O'
			},{
				letter:'P'
			},{
				letter:'Q'
			},{
				letter:'R'
			},{
				letter:'S'
			},{
				letter:'T'
			},{
				letter:'U'
			},{
				letter:'V'
			},{
				letter:'W'
			},{
				letter:'X'
			},{
				letter:'Y'
			},{
				letter:'Z'
			}]
		}
	},
	methods:{
		clickletter(e){
			this.$emit('change',e.target.innerText)
		}
	}
}
</script>
<style scoped>
	.alphabet{
		position:absolute;
		top:10rem;
		right:0;
		bottom:0;
		z-index: 10;
		width:2rem;
		display: flex;
		align-items:center;
		flex-direction: column;
	}
	.alphabet-a{
		width:100%;
		text-align: center;
		color:#00bcd4;
		padding:.1rem 0;
		font-size:.9rem;
	}
</style>