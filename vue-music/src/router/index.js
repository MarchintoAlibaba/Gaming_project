import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'pages/home/HelloWorld'
import rankRank from 'pages/rank/Rank'
import recommendRecommend from 'pages/recommend/Recommend'
import singerSinger from 'pages/singer/Singer'
import searchSearch from 'pages/search/Search'
import singerDetail from 'pages/singer-detail/singerdetail' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/rank',
      name: 'rankRank',
      component: rankRank
    },{
      path: '/recommend',
      name: 'recommendRecommend',
      component: recommendRecommend
    },{
      path: '/singer',
      name: 'singerSinger',
      component: singerSinger,
      children:[
        {
          path:':id',
          component:singerDetail
        }
      ]
    },{
      path: '/search',
      name: 'searchSearch',
      component: searchSearch
    }
  ]
})
