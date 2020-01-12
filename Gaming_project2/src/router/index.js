import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import newsDetail from '@/components/homeSub/newsDetail'
import announcement from '@/components/homeSub/announcement'
import maintain from '@/components/homeSub/maintain'
import customerService from '@/components/homeSub/customerService'
import promotions from '@/components/promotions/promotions'
import promotionsDetail from '@/components/promotions/promotionsDetail'
import guess from '@/components/guess/guess'
import news from '@/components/news/news'
import tidings from '@/components/news/sort/tidings'
import special from '@/components/news/sort/special'
import atlas from '@/components/news/sort/atlas'
import film from '@/components/news/sort/film'
import search from '@/components/news/sort/search'
import specialD from '@/components/news/sort/specialD'
import login from '@/components/login/login'
import reg from '@/components/login/reg'
import rules from '@/components/login/rules'
import findPass from '@/components/login/findPass'
import personal from '@/components/personal/personal'
import setting from '@/components/personal/setting/setting'
import withdrawal from '@/components/personal/withdrawal/withdrawal'
import deposit from '@/components/personal/deposit/deposit'
import changeInfo from '@/components/personal/changeInfo/changeInfo'
import alipay from '@/components/personal/deposit/step/alipay'
import wechat from '@/components/personal/deposit/step/wechat'
import payInfo from '@/components/personal/deposit/step/payInfo'
import bankCardTransfer from '@/components/personal/deposit/step/bankCardTransfer'
import phone from '@/components/personal/setting/bank/phone'
import bank from '@/components/personal/setting/bank/bank'
import pwd from '@/components/personal/setting/bank/pwd'
import setBank from '@/components/personal/setting/bank/setBank'
import transaction from '@/components/personal/transaction/transaction'
import betRecord from '@/components/personal/betRecord/betRecord'
import msg from '@/components/personal/msg/msg'
import msgDetail from '@/components/personal/msg/msgDetail'
import agentCenter from '@/components/personal/agentCenter/agentCenter'
import recommend from '@/components/personal/recommend/recommend'
import agent from '@/components/personal/agent/agent'
import betting from '@/components/bet/betting'

Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/',
		name: 'home',
		component: home,
        children:[
            {
                path:'newsCenter/:id',
                name:'newsDetail',
                component:newsDetail
            },
            {
                path:'announcement',
                name:'announcement',
                component:announcement 
            },
            {
                path:'customerService',
                name:'customerService',
                component:customerService 
            },
            {
                path:'maintain',
                name:'maintain',
                component:maintain
            }
        ]
    },
    {
		path: '/promotions',
		name: 'promotions',
		component: promotions,
        children:[
            {
                path:':id',
                name:'promotionsDetail',
                component:promotionsDetail
            }
        ]
    },
    {
		path: '/guess',
		name: 'guess',
		component: guess,
        children:[
            {
                path:'bet/:id',
                name:'betting',
                component:betting
            }
        ]
    },
    {
    	path:'/news',
    	name:'news',
    	component:news,
        children:[
            {
                path:'tidings',
                component:tidings,
            },
            {
                path:'special',
                component:special,
                children:[
                    {
                        path:':id',
                        component:specialD
                    }
                ]
            },
            {
                path:'atlas',
                component:atlas,
            },
            {
                path:'film',
                component:film,
            },
            {
                path:'search',
                component:search,
            },
        ]
    },
    {
    	path:'/login',
    	name:'login',
    	component:login
    },
    {
    	path:'/reg',
    	name:'reg',
    	component:reg,
        children:[
           {
                path:'rules',
                name:'rules',
                component:rules
            },
        ]
    },
    {
    	path:'/findPass',
    	name:'findPass',
    	component:findPass
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
    			path:'pwd',
    			name:'pwd',
    			component:pwd
    		},
            {
                path:'setBank',
                name:'setBank',
                component:setBank,
                children:[
                    {
                        path:'bank',
                        name:'bank',
                        meta:{index:2},
                        component:bank
                    },
                ]
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
            path:'changeInfo',
            name:'changeInfo',
            component:changeInfo,
        },
        {
            path:'withdrawal',
            name:'withdrawal',
            meta:{index:1},
            component:withdrawal,
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
    		component:msg,
            children:[
                {
                    path:':id',
                    name:'msgDetail',
                    component:msgDetail,  
                }
            ]
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
    	},
        {
            path:'agentCenter',
            name:'agentCenter',
            component:agentCenter,
        }
    	]
    }
  ]
})


