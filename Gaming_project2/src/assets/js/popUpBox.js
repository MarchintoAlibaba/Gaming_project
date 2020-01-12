import Vue from 'vue'
import popupBox from '../../base/popUpBox' //提示语页面
import loading from '../../base/loading' //loading页面

const popUp = Vue.extend(popupBox)

popupBox.install = function(data){ //hint弹窗控制器
	let instance = new popUp({
		data
	}).$mount()

	document.body.appendChild(instance.$el)

	Vue.nextTick(() => {
		instance.show = true
		//show和弹窗组件里面的show对应，用于控制显隐
	})
}

const load = Vue.extend(loading)

loading.install = function(data){ //loading弹窗控制器
	const loadShow = data.loadShow || false
	if(loadShow){
		let instance = new load({
			data
		}).$mount()
		document.body.appendChild(instance.$el)
		Vue.nextTick(() => {
			instance.show = true
			//show和弹窗组件里面的show对应，用于控制显隐
		})
	}else{
		const el_loading = document.getElementById('loading') || false
		if(el_loading)	document.body.removeChild(el_loading)
	}
}


export default [popupBox,loading]
