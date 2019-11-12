import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import promotions from '@/components/promotions/promotions'
import guess from '@/components/guess/guess'
import news from '@/components/news/news'
import login from '@/components/login/login'
import reg from '@/components/login/reg'
import findPass from '@/components/login/findPass'
import personal from '@/components/personal/personal'
import setting from '@/components/personal/setting/setting'
import deposit from '@/components/personal/deposit/deposit'
import alipay from '@/components/personal/deposit/step/alipay'
import wechat from '@/components/personal/deposit/step/wechat'
import payInfo from '@/components/personal/deposit/step/payInfo'
import bankCardTransfer from '@/components/personal/deposit/step/bankCardTransfer'
import phone from '@/components/personal/setting/bank/phone'
import bank from '@/components/personal/setting/bank/bank'
import pwd from '@/components/personal/setting/bank/pwd'
import transaction from '@/components/personal/transaction/transaction'
import betRecord from '@/components/personal/betRecord/betRecord'
import msg from '@/components/personal/msg/msg'
import recommend from '@/components/personal/recommend/recommend'
import agent from '@/components/personal/agent/agent'
import betting from '@/components/bet/betting'

Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/',
		name: 'home',
		component: home
    },
    {
		path: '/promotions',
		name: 'promotions',
		component: promotions
    },
    {
		path: '/guess',
		name: 'guess',
		component: guess
    },
    {
    	path:'/news',
    	name:'news',
    	component:news
    },
    {
    	path:'/login',
    	name:'login',
    	component:login
    },
    {
    	path:'/reg',
    	name:'reg',
    	component:reg
    },
    {
    	path:'/findPass',
    	name:'findPass',
    	component:findPass
    },
    {
        path:'/bet/:id',
        name:'betting',
        component:betting
    },
    {
    	path:'/personal',
    	name:'personal',
    	component:personal,
    	children:[
    	{
    		path:'setting',
    		component:setting,
    		children:[
    		{
    			path:'phone',
	    		name:'phone',
	    		component:phone
    		},
    		{
    			path:'bank',
    			name:'bank',
    			component:bank
    		},
    		{
    			path:'pwd',
    			name:'pwd',
    			component:pwd
    		}
    		]
    	},
    	{
    		path:'deposit',
    		name:'deposit',
    		component:deposit,
            children:[
            {
                path:'alipay',
                name:'alipay',
                component:alipay,
                children:[
                    {
                    path:':id',
                    name:'payInfo',
                    component:payInfo
                    }
                ]
            },
            {
                path:'wechat',
                name:'wechat',
                component:wechat
            },
            {
                path:'bankCardTransfer',
                name:'bankCardTransfer',
                component:bankCardTransfer
            }
            ]
    	},
    	{
    		path:'transaction',
    		name:'transaction',
    		component:transaction
    	},
    	{
    		path:'betRecord',
    		name:'betRecord',
    		component:betRecord
    	},
    	{
    		path:'msg',
    		name:'msg',
    		component:msg
    	},
    	{
    		path:'recommend',
    		name:'recommend',
    		component:recommend
    	},
    	{
    		path:'agent',
    		name:'agent',
    		component:agent
    	}
    	]
    }
  ]
})


