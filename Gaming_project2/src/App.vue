<template>
  <div id="app" class="page">
    <nav-header :title="title" :titleSet="titleSet" :back_i="back_i" :home="home" :guess="guess" :seting="seting" :gameDetails="gameDetails" :imgSrc="imgSrc" :test="gametitle" :none="none" :agentLogo='agentLogo'></nav-header>
    <router-view :agentLogo='agentLogo' :people='people'/>
    <footer-pages></footer-pages>
  </div>
</template>
<script>
import navHeader from '@/base/navTitle'
import footerPages from "@/base/footerPages"
import {mapActions,mapMutations} from 'vuex'
export default {
  name: 'App',
  computed:{
    gametitle(){
      this.gameDetails = false;
      if(this.$store.state.gametitle.matchName){
        this.gameDetails = true;
        this.title = this.$store.state.gametitle.matchName + '/' + this.$store.state.gametitle.bo;
        this.imgSrc = this.$store.state.gametitle.egameLogo;
      }
      return this.$store.state.gametitle || false;
    }
  },
  components:{
    navHeader,
    footerPages,
  },
  data(){
    return{
      titleSet:false,
      back_i:true,
      title:null,
      home:true,
      guess:false,
      seting:false,
      gameDetails:false,
      none:false,
      imgSrc:'',
      agentLogo:'',
      people:''
    }
  },
  mounted(){
    this.getSocketUrl();//获取socket的链接地址
    this.newsSearch();
    this.pathWay();
    this.betModuleState({//投注模块的初始状态 将vuex的代码块写在这只在刷新的时候执行一遍
      betmodule:{
        betclose:'折叠',
        confirmBet:'确认下注',
        popup_dialog:true,
        oddsHint:false,
        initial:'initial',
        oddOrEven:true,//单串关的显示 true表示显示单关 false表示显示串关
        evenList:[],//串关列表
        evenBetMoney:'0.00',//串投填写的钱
        evenAllOdds:1,//串投总的赔率
        evenWinMoney:'0.00',//串投能最大赢的钱
        minMoney:0,//串投最小投注的钱
        maxMoney:0,//串投最大投注的钱
        canCombine:''//设置是否可以串投
      }
    })
  },
  methods:{
    ...mapActions(['oddshub','gamehub','playhub','socketInitial','changeBetModule','betModuleState','otherUser','newsSearch','userInfo']),
    ...mapMutations({setAgentInfo:'AGENTINFO'}),
    getSocketUrl(){
      this.axios.post(this.http + '/api/BaseInfo/GetSiteOperator').then((response)=>{
        if(response.data.resultCode == 1){//请求socket地址成功后发情socket链接请求
          this.agentLogo = response.data.resultData.logo;
          this.setAgentInfo(response.data.resultData);
          window.connection = new window.signalR.HubConnectionBuilder().withUrl(response.data.resultData.signalUrl).build("onDisconnect",function(){//signalR断开链接会触发‘onDisconnect’事件
            this.getSocketUrl()//signalR重连
          });
          this.socketInitial().then((resData)=>{//如果signalR连接成功
            if(resData == '成功'){//如果signalR连接成功
                if(localStorage.getItem('userID')){//只有在登录状态时
                    this.userInfo()//每次刷新页面会拉取个人信息
                }
            }else{//如果signalR连接失败
                this.getSocketUrl()//signalR重连
            }
            this.oddshub();
            this.gamehub();
            this.playhub();
            window.connection.on('GetOnlineCount', (response) => { //在线人数
                let data = JSON.parse(response);
                this.people = data.count;
            });
            this.otherUser();
          })
        }else if(response.data.resultCode == 2){//如果状态值为2则该网站正在维护中
            this.$router.push('/maintain');
        }
      }).catch(error=>{
        console.log(error)
      })
    },
    // launchFullScreen(){//全屏显示
    //     let element = document.getElementById('app');
    //     if(element.requestFullscreen){
    //         this.launchFullScreen = (()=>{//利用懒函数 提高性能
    //             element.requestFullscreen();
    //         });
    //     }else if(element.mozRequestFullScreen){
    //         this.launchFullScreen = (()=>{
    //             element.mozRequestFullScreen();
    //         });
    //     }else if(element.webkitRequestFullscreen){
    //         this.launchFullScreen = (()=>{
    //             element.webkitRequestFullscreen();
    //         });
    //     }else if(element.msRequestFullscreen){
    //         this.launchFullScreen = (()=>{
    //             element.msRequestFullscreen();
    //         });
    //     }
    // },
    pathWay(){
    // this.launchFullScreen();
      switch(this.$route.path){
        case '/':
        this.back_i = false;
        this.title = '个人中心';
        this.titleSet = false;
        this.home = true;
        this.guess = false;
        this.seting = false;
        this.none = false
        break;
        case '/guess':
        this.back_i = true;
        this.title = '电竞竞猜';
        this.titleSet = false;
        this.home = false;
        this.guess = true;
        this.seting = false;
        this.none = false
        break;
        case '/personal':
        this.title = '个人中心';
        this.titleSet = true;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = true;
        this.none = false;
        this.userInfo();
        break;
        case '/personal/setting':
        this.title = '设置';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/withdrawal':
        this.title = '提款/提现';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/changeInfo':
        this.title = '修改个人信息';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/setting/phone':
        this.title = '修改手机号码';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/setting/setBank/bank':
        this.title = '绑定提款卡';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/setting/setBank':
        this.title = '设置提款卡';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/setting/pwd':
        this.title = '修改密码';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/transaction':
        this.title = '交易记录';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/betRecord':
        this.title = '投注记录';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/agentCenter':
        this.title = '代理商中心';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/msg':
        this.title = '消息';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case `/personal/msg/${this.$route.params.id}`:
        this.title = '消息详情';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/recommend':
        this.title = '我的推荐';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/agent':
        this.title = '开心电竞合作加盟方案';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/deposit':
        this.title = '存款/充值';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/deposit/alipay' || 'personal/deposit/wechat' || '/personal/deposit/bankCardTransfer':
        this.title = '选择支付通道';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/personal/deposit/alipay/001':
        this.title = '支付宝-王成龙';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case `/guess/bet/${this.$route.params.id}`:
        this.title = '游戏竞猜';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case `/promotions/${this.$route.params.id}`:
        this.title = '优惠详情';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case `/newsCenter/${this.$route.params.id}`:
        this.title = '开心电竞资讯';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/announcement':
        this.title = '公告';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/customerService':
        this.title = '联系客服';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/reg/rules':
        this.title = '用户规则协议';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        case '/reg':
        this.title = '';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/login':
        this.title = '';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
        case '/findPass':
        this.title = '找回密码';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        this.none = true;
        break;
      }
    }
  },
  watch:{
    $route(to, from) { //根据路径的不同来改变相应的值
      this.pathWay();
    }
  },
}
</script>
<style lang="stylus">
@import '~@/assets/css/variable.styl'
.page
  font-family:apple-system,BlinkMacSystemFont,PingFang SC,Helvetica Neue,STHeiti,Microsoft Yahei,Tahoma,Simsun,sans-serif
  font-weight:lighter
  width:100vw
  height:100%
  color:#c2c5c8
  background:$background-color
  overflow-x:hidden
  overflow-y:auto
.slide-enter-active,.slide-leave-active,.name1-enter-active,.name1-leave-active,.name2-enter-active,.name2-leave-active
  transition:all 0.2s
.slide-enter,.slide-leave-to
  transform:translateX(100%)
  will-change:transform//规范的启动3d引擎加速
.name1-enter
  transform:translateX(-100%)
  will-change:transform
.name1-leave-to
  transform:translateX(100%)
  will-change:transform//规范的启动3d引擎加速
.name2-leave-to
  transform:translateX(-100%)
  will-change:transform//规范的启动3d引擎加速
.name2-enter
  transform:translateX(100%)
  will-change:transform//规范的启动3d引擎加速
</style>
