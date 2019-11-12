//异步修改数据或对mutations的封装
import * as types from './mutation-types'
import Vue from 'vue'

export const gameTitle=function({commit},{gametitle}){//投注头部信息
	commit(types.GAME_TITLE,gametitle)
}
export const bettingModuleL=function({commit},{bettingModuleL}){//投注信息
	commit(types.BETTINGMODULEL,bettingModuleL)
}
export const userInfo = function({commit}){
	Vue.prototype.axios.post(Vue.prototype.http + '/api/Member/GetUserBaseInfo',{
		userID:localStorage.getItem('userID')
	}).then((response)=>{
		if(response.data.resultCode == 1){
			commit(types.SET_USERINFO,response.data.resultData);
		}
	}).catch((error)=>{
		console.log(error)
	})
}

export const oddshub = function({commit}){
	let connection;
	connection = new window.signalR.HubConnectionBuilder().withUrl(Vue.prototype.http + '/matchhub').build();
		connection.on('GetOddsChangedList', (response) => { //赔率变化接口 //GetMatchChangedList 比赛变化接口
			// console.log(response)
			let data = JSON.parse(response)
			commit(types.ODDS_CHANGE,data);
		});
		connection.start();
}
// oddshub();