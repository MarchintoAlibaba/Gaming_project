//异步修改数据或对mutations的封装
import * as types from './mutation-types'
import Vue from 'vue'

export const betModuleState = function({commit},{betmodule}){//投注模块的各个显示隐藏的状态
	commit(types.BETMODULE,betmodule)
}
export const gameTitle=function({commit},{gametitle}){//投注头部信息
	commit(types.GAME_TITLE,gametitle)
}
export const bettingModuleL=function({commit},{bettingModuleL}){//投注信息
	commit(types.BETTINGMODULEL,bettingModuleL)
}
export const newsSearch=function({commit}){//新闻搜索
	commit(types.NEWSSEARCH,{'sort':'新闻','keywords':'','searchList':[]})
}
export const sortList = function({commit}){//比赛条数查询
	Vue.prototype.axios.post(Vue.prototype.http + '/api/Bet/GetEgEgameMatchSortList',{
		egid:Vue.prototype.$store.state.gameSortList
	}).then(response=>{
		if(response.data.resultCode == 1){
			commit(types.SORTLISTCOUNT,response.data.resultData.egEgameMatchSortList);
		}
	}).catch(error=>{
		console.log(error)
	})
}

export const userInfo = function({commit}){//个人信息
	Vue.prototype.axios.post(Vue.prototype.http + '/api/Member/GetUserBaseInfo',{
		userID:localStorage.getItem('userID'),
		connectionID:localStorage.getItem('ConnectionID'),
	}).then((response)=>{
		if(response.data.resultCode == 1){
			commit(types.SET_USERINFO,response.data.resultData);
		}
	}).catch((error)=>{
		console.log(error)
	})
}

export const socketInitial = function(){
	let timer;
	return new Promise(reslove => {
		let Timestamp = Math.round(new Date().getTime() / 1000),Random = parseInt(999999 * Math.random()) + '',Signature = Vue.prototype.$md5('{}&' + Timestamp + '&' + Random + '&' + 'd4rHhEcEyYiPng3o47IFiyrfjpkSI3NpuzPH84SfuAA7fNiAqny2e6B0uCqy6OASklYPAQ68J1lTqL3WTSf2gSIknbDnzGYvGeTO4ApiajY0tgnPJ3D1HIq6aAPK3v07');
		window.connection.start().then(function(){
	        connection.invoke('VerifyConnection',Timestamp,Random,Signature).then(response=>{//获取singlar该字段是为登录使用
	        	localStorage.setItem('ConnectionID',response.resultData);
	        });
	        reslove('成功');
	    }).catch(error => {
	        console.log(error.message);
	    })
	})
}

export const oddshub = function({commit}){//赔率变化接口
	window.connection.on('GetOddsChangedList', (response) => { //赔率变化接口 //GetOddsChangedList 比赛变化接口
		console.log('赔率'+response)
		let data = JSON.parse(response);
		commit(types.ODDS_CHANGE,data);
	});
}

export const gamehub = function({commit}){//比赛变化接口
	window.connection.on('GetMatchChangedList', (response) => { //赔率变化接口 //GetMatchChangedList 比赛变化接口
		console.log('比赛'+response)
		let data = JSON.parse(response);
		commit(types.GAME_CHANGE,data);
	});
}

export const playhub = function({commit}){//玩法变化接口
	window.connection.on('GetPlayChangedList', (response) => { //玩法变化接口 //GetPlayChangedList 玩法变化接口
		console.log('玩法'+response)
		let data = JSON.parse(response);
		commit(types.PLAY_CHANGE,data);
	});
}

export const otherUser = function({commit}){//被踢出用户接口
	window.connection.on('GetKickedUserList', (response) => {//如果另外一个用户登录，就会走该函数并且弹出提示
		console.log(response)
		let data = JSON.parse(response),
			dataL = data.length;
		if(localStorage.getItem('userID')){//如果在线才被踢下去
			for(let i =0;i < dataL;i ++){//循环推送过来的每条数据 如果与自己的信息向匹配则注销自己的账号
				if(data[i].accessToken == localStorage.getItem('accessToken')){//只用判断唯一的token值就行
					localStorage.removeItem('accessToken');
					localStorage.removeItem('userID');
					Vue.prototype.$popup({
						hint:'您的账号在另外一个地方登录',
						hintShow:true
					})
				}
			}
		}
	});
}