// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'swiper/dist/css/swiper.css'
import '@/assets/css/variable.styl'
import '@/assets/css/reset.styl'
import router from './router'
import $ from 'jquery'
import fastClick from 'fastClick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import store from './components/store'
import '../config/interceptor'
import popUpBox from '@/assets/js/popUpBox'

Vue.prototype.$popup = popUpBox[0].install
Vue.prototype.$loading = popUpBox[1].install

Vue.use({VueAxios, Axios})
Vue.prototype.axios = Axios
Vue.prototype.loginRouter = router
Vue.prototype.http = 'http://10.10.11.53' //本地测试环境域名



Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
fastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})