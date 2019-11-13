import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home' //以前的方式
// import Detail from '@/pages/detail/Detail' 异步加载的方式
// import City from '@/pages/city/City'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component:Home
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: () => import('@/pages/detail/Detail') //这样可以使页面按需加载（异步加载）提高首页加载速率
    },
    {
      path: '/city',
      name: 'City',
      component: () => import('@/pages/city/City')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
})
