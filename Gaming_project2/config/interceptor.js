import Vue from 'vue'
import router from '@/router/index.js'
import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use((config)=>{
　　// 在发送请求之前做些什么
	Vue.prototype.$loading({//loading页面加载
		loadShow:true
	})
	if(!config.data){
		config.data = {};
	}
	let timestamp = Math.round(new Date().getTime() / 1000),
		jsonParamsObj = JSON.stringify(Vue.prototype.$paramsObj(config.data)),
		random = parseInt(999999 * Math.random());
	config.headers.token = localStorage.getItem('accessToken');
	config.headers.application = 'wap';
	config.data['timestamp'] = timestamp;
	config.data['random'] = random;
	config.data['signature'] = Vue.prototype.$md5(jsonParamsObj + '&' + timestamp + '&' + random + '&' + 'd4rHhEcEyYiPng3o47IFiyrfjpkSI3NpuzPH84SfuAA7fNiAqny2e6B0uCqy6OASklYPAQ68J1lTqL3WTSf2gSIknbDnzGYvGeTO4ApiajY0tgnPJ3D1HIq6aAPK3v07');
　　return config
},(error)=>{
　　// 对请求错误做些什么
	return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use((response)=>{
	Vue.prototype.$loading({//loading页面加载
		loadShow:false
	})
	if(response.data.resultCode != 1){
		//对响应数据的操作
		Vue.prototype.$popup({
			hint:response.data.message,
			hintShow:true
		})
		if(response.data.resultCode == 401 && response.data.message === '您未授权,请先登录'){
			Vue.prototype.loginRouter.push('/login');
			localStorage.removeItem('accessToken');
			localStorage.removeItem('userID');
		}
	}
	return response
},(error)=>{
	//对响应错误做点什么
	console.log(Promise.reject(error))
})

Vue.prototype.$paramsObj = function(paramsObj){//把json数据的参数按ascii排序
	let arr = [];
	for(var key in paramsObj){
		arr.push(key)
	}
	arr.sort();
	let result = {};
	for(var i in arr){
		result[arr[i]] = paramsObj[arr[i]];
	}
	return result;
}