<template>
	<div class="nav">
	<div class="head">
		<div class="l" @click="back">
			<span>
				<i class="iconfont" v-show="back_i">&#xe682;</i>
				<i class="iconfont tixing" v-show="!back_i">&#xe619;</i>
			</span>
		</div>

		<div class="m" v-show="back_i">
			<img class="gameDetails" v-show="gameDetails" :src="imgSrc" alt="title">
			{{title}}
		</div>
		<div class="m logo" v-show="!back_i"><img src="@/assets/images/logo.svg" alt=""></div>

		<div class="r" v-show="!titleSet"></div>
		<router-link class="r" tag="a" to="/personal/setting" v-show="titleSet">
			<i class="iconfont" v-show="seting">&#xe65a;</i>
			<i class="iconfont" v-show="home">&#xe611;</i>
			<i class="iconfont guess" v-show="guess">&#xe61f;</i>
		</router-link>
	</div>
	</div>
</template>
<script>
import {mapMutations} from 'vuex'
export default{
	name:'navTitle',
	props: {
		title: {
			type: String,
			default:'个人中心'
		},
		titleSet:{
			type:Boolean,
			default:false
		},
		back_i:{
			type:Boolean,
			default:true
		},
		home:{
			type:Boolean,
			default:true
		},
		guess:{
			type:Boolean,
			default:true
		},
		seting:{
			type:Boolean,
			default:true
		},
		imgSrc:{
			type: String,
			default:''
		},
		gameDetails:{
			type:Boolean,
			default:false
		}
	},
	methods:{
		back(){
			this.setGametitle('');
			switch(this.$route.path){
				case '/login': //在登录页面返回上一页是首页
				this.$router.push('/');
				break;
				case '/': //首页点击是到公告页
				this.$router.push('/');
				break;
				default: //其他地方是返回历史的上一步
				this.$router.go(-1);
			}
		},
		...mapMutations({setGametitle:'GAME_TITLE'}),
	}
}
</script>
<style scoped lang="stylus">
@import '~@/assets/css/iconfont/iconfont'
@import '~@/assets/css/variable'
.head
	line-height:45px
	display:flex
	justify-content:space-between
	justify-content:space-between
	height:45px
	box-shadow: 0 0 13px rgba(0,0,0,.22)
.head .l,.head .r
	width:45px
	height:45px
	line-height:45px
	text-align:center
	color:#fff
	-webkit-flex:0 0 50px
	flex:0 0 50px		    
.head .m
	width:100%
	text-align:center
	font-size:$words-size-16
	color:#fff
	overflow:hidden
	text-overflow:ellipsis
	white-space:nowrap
.head .logo img
	height:24px
	margin-top:8px
.head span
	text-decoration:none
	color:#7f858f
	cursor:pointer
.head .l span i
	color:#fff
	font-size:$words-size-16
.r i,.head .l span i.tixing
	background:linear-gradient(top left,#2a91d4,#00fdb3)
	-webkit-background-clip: text
	-webkit-text-fill-color: transparent
	font-size:$words-size-20
.head .r i.guess
	-webkit-text-fill-color:#fff
.head .m img.gameDetails
	width:20px
	height:20px
	margin-right:3px
	vertical-align:-5px
</style>