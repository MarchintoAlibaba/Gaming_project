//改变vuex值
import * as types from './mutation-types'

const mutations = {
	[types.SET_USERINFO](state,userinfo){
		state.userinfo = userinfo
	},
	[types.ODDS_CHANGE](state,oddschange){
		state.oddschange = oddschange
	},
	[types.GAME_CHANGE](state,gamechange){
		state.gamechange = gamechange
	},
	[types.PLAY_CHANGE](state,playchange){
		state.playchange = playchange
	},
	[types.GAME_TITLE](state,gametitle){
		state.gametitle = gametitle
	},
	[types.BETTINGMODULEL](state,bettingModuleL){
		state.bettingModuleL = bettingModuleL;
	},
	[types.BETMODULE](state,betmodule){
		state.betmodule = betmodule;
	},
	[types.SORTLISTCOUNT](state,sortListCount){
		state.sortListCount = sortListCount;
	},
	[types.NEWSSEARCH](state,newsSearch){
		state.newsSearch = newsSearch;
	},
	[types.GAMESORTLIST](state,gameSortList){
		state.gameSortList = gameSortList;
	},
	[types.AGENTINFO](state,agentInfo){
		state.agentInfo = agentInfo;
	},
	changeGameSortList:(state,data)=>{
		state.gameSortList = data;
	},
	newsSearchWay:(state,obj)=>{//新闻搜索的数据
		state.newsSearch[obj.changeK] = obj.changeV;
	},
	changeBetModule:(state,obj)=>{
		state.betmodule[obj.changeK] = obj.changeV;
	},
	addChangeBetModule:(state,data)=>{//增加一条串关投注
		state.betmodule.evenList.push(data);
	},
	deleteChangeBetModule:(state,index)=>{//删除一条串关投注
		state.betmodule.evenList.splice(index,1);
	},
	changeCanCombine:(state,obj)=>{//投注状态的改变
		state.bettingModuleL[obj.index][obj.key] = obj.t_or_f;
	},
	addBetData:(state,data)=>{//增加一条投注
		state.bettingModuleL.push(data);
	},
	deleteBetData:(state,index)=>{//删除一条投注
		state.bettingModuleL.splice(index,1);
	},
	changeBetData:(state,obj)=>{//改变是否展开投注键盘
		state.bettingModuleL[obj.index].betListObj = obj.t_or_f;
	},
	changeBetMoney:(state,obj)=>{//改变投注金钱
		state.bettingModuleL[obj.index].betMoney = obj.money;
	},
	changeWinMoney:(state,obj)=>{//改变能赢的钱
		state.bettingModuleL[obj.index].canWinMoney = obj.winMoney;
	},
	changeOddsChange:(state,obj)=>{//赔率是否有改变
		state.bettingModuleL[obj.index].oddsChange = obj.t_or_f;
	},
	changeOdds:(state,obj)=>{//变化的赔率
		state.bettingModuleL[obj.index].odds = obj.newOdds;
	},
	oddsBetChange:(state,obj)=>{//赔率是否开盘有改变
		state.bettingModuleL[obj.index].oddsBetChange = obj.status;
	},
	playBetChange:(state,obj)=>{//玩法是否开盘有改变
		state.bettingModuleL[obj.index].playBetChange = obj.status;
	},
	gameBetChange:(state,obj)=>{//比赛是否开盘有改变
		state.bettingModuleL[obj.index].gameBetChange = obj.status;
	},
}
export default mutations