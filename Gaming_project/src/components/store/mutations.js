//改变vuex值
import * as types from './mutation-types'

const mutations = {
	[types.SET_USERINFO](state,userinfo){
		state.userinfo = userinfo
	},
	[types.ODDS_CHANGE](state,oddschange){
		state.oddschange = oddschange
	},
	[types.GAME_TITLE](state,gametitle){
		state.gametitle = gametitle
	},
	[types.BETTINGMODULEL](state,bettingModuleL){
		state.bettingModuleL = bettingModuleL;
	},
	addBetData:(state,data)=>{
		state.bettingModuleL.push(data);
	},
	deleteBetData:(state,index)=>{
		state.bettingModuleL.splice(index,1);
	}
}
export default mutations