import * as types from './mutation-type'

const mutations = {
	[types.SET_SINGER](state,singer){
		state.singer =singer
	},
	[types.SCROLLY](state,scrollY){
		state.scrollY=scrollY
	},
	[types.SONGLIST](state,songlist){
		state.songlist=songlist
	},
	[types.SET_PLAYINGB](state,flag){
		state.playingb=flag
	},
	[types.SET_FULL_SCREEN](state,flag){
		state.fullScreen=flag
	},
	[types.SET_PLAYLIST](state,list){
		state.playlist=list
	},
	[types.SET_SEQUENCE_LIST](state,list){
		state.sequenceList=list
	},
	[types.SET_PLAY_MODE](state,mode){
		state.mode=mode
	},
	[types.SET_CURRENT_INDEX](state,index){
		state.currentIndex=index
	},
	[types.SET_FINALLSONG](state,list){
		state.finallsong=list
	}
}

export default mutations