import Vue from 'vue'
import router from '@/router/index.js'
import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use((config)=>{
　　// 在发送请求之前做些什么
	Vue.prototype.$loading({//loading页面加载
		loadShow:true
	})
	config.headers.token = localStorage.getItem('accessToken');
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