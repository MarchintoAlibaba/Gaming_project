<template>
	<div>
		<div class="recity" ref='wrapper'>
			<div>
				<div class="recity-top">你的位置</div>
				<div class="recity-adress">
					<div class="adress">{{this.currentCity}}</div>
				</div>
				<div class="recity-top">热门城市</div>
				<div class="recity-bottom">
					<ul>
						<li v-for="item of city" :key="item.id" @click="handleCityClick(item.ucity)">{{item.ucity}}</li>
					</ul>
				</div>
				<div v-for="(item,key) of adress" :key="key" :ref="key">
					<div class="recity-top">{{key}}</div>
					<div class="recity-a" v-for="ab of item" @click="handleCityClick(ab.name)">{{ab.name}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script> 
import {mapState} from 'vuex'
import Bscroll from 'better-scroll'
export default{
	name:'CityRecity',
	computed: {
		...mapState({
			currentCity:'city'
		})
	},
	props:{
		letterb: String,
		city: Array
	},
	methods:{
		handleCityClick (city) {
			this.$store.commit('changeCity',city)
			this.$router.push('/')
		}
	},
	data (){
		return {
			'adress':{
				'A':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'B':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'C':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'D':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'E':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'F':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'G':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'H':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'I':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'J':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'K':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'L':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'M':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'N':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'O':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'P':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'Q':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'R':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'S':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}],
				'T':[{
					'name':'爱丽丝'
				},{
					'name':'阿第克'
				},{
					'name':'安东诺夫'
				}]
			}
		}
	},
	mounted (){
		this.scroll = new Bscroll(this.$refs.wrapper)
	},
	watch:{//监听父元素传过来的letterb的值，让其放在对应的值上
		letterb () {
			const element= this.$refs[this.letterb][0]
			this.scroll.scrollToElement(element)
		}
	}
}
</script>
<style  scoped>
	.recity{
		position: absolute;
		top:4.9rem;
		left:0;
		right:0;
		bottom:0;
		overflow: hidden;
	}
	.recity-a{
		padding:.6rem 1rem;
		border-bottom:.02rem solid #F5F5F5;
	}
	.recity-top{
		width:100%;
		height:2.4rem;
		background:#F5F5F5;
		line-height: 2.4rem;
		text-indent: 1rem;
		font-size:.7rem;
	}
	.recity-bottom{
		width:100%;
		background:white;
	}
	.recity-bottom ul{
		width:100%;
		overflow: hidden;
	}
	.recity-bottom ul li{
		width:33.26%;
		height:2.6rem;
		text-align: center;
		line-height: 2.6rem;
		border-bottom:0.02rem solid #F5F5F5;
		border-right:.02rem solid #f5f5f5;
		float:left;
	}
	.recity-bottom ul li:nth-child(3n+3){
		border-right:none;
	}
	.recity-adress{
		height:3rem;
		background:white;
		display: flex;
		align-items:center;
	}
	.adress{
		width:30%;
		border:1px solid #00bcd4;
		text-align: center;
		color:#00bcd4;
		padding:.2rem 0;
		border-radius: .2rem;
		margin-left:.6rem;
	}
</style>