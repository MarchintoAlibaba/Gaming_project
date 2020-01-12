//vuex的入口文件
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' //会提示修改日志方便开发 上线关闭 

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' //调试工具，会让你知道state的修改是不是来自mutations 开启会有性能损耗 上线是关闭

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict:debug, //关闭
	plugins:debug ? [createLogger()] : [] //关闭
})