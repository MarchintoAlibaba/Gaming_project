// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'css/reset.styl'
import 'swiper/dist/css/swiper.css'
import fastClick from 'fastclick'
// import animate from 'animate.css'
// import Velocity from 'velocity-animate'
import VueLazyload from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store'
import Axios from 'axios'

Vue.prototype.$axios=Axios;
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload)

Vue.config.productionTip = false
fastClick.attach(document.body)

Vue.use(VueLazyload, {
	loading: require('@/base/loading/loading.gif'),
	attempt: 3
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
