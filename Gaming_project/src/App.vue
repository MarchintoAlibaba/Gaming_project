<template>
  <div id="app" class="page">
    <span v-if="false">{{gametitle}}</span>
    <nav-header :title="title" :titleSet="titleSet" :back_i="back_i" :home="home" :guess="guess" :seting="seting" :gameDetails="gameDetails" :imgSrc="imgSrc" :test="gametitle"></nav-header>
    <router-view/>
    <footer-pages></footer-pages>
  </div>
</template>
<script>
import navHeader from '@/base/navTitle'
import footerPages from "@/base/footerPages"
import {mapActions} from 'vuex'
export default {
  name: 'App',
  computed:{
    gametitle(){
      this.gameDetails = false;
      if(this.$store.state.gametitle.matchName){
        this.gameDetails = true;
        this.title = this.$store.state.gametitle.matchName + '/BO' + this.$store.state.gametitle.bo;
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
      imgSrc:''
    }
  },
  mounted(){
    this.pathWay();
    this.oddshub();
  },
  methods:{
    ...mapActions(['oddshub']),
    pathWay(){
      switch(this.$route.path){
        case '/':
        this.back_i = false;
        this.title = '个人中心';
        this.titleSet = true;
        this.home = true;
        this.guess = false;
        this.seting = false;
        break;
        case '/guess':
        this.back_i = true;
        this.title = '游戏竞猜';
        this.titleSet = true;
        this.home = false;
        this.guess = true;
        this.seting = false;
        break;
        case '/personal':
        this.title = '个人中心';
        this.titleSet = true;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = true;
        break;
        case '/personal/setting':
        this.title = '设置';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        break;
        case '/personal/setting/phone':
        this.title = '修改手机号码';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        break;
        case '/personal/setting/bank':
        this.title = '修改密码';
        this.titleSet = false;
        this.back_i = true;
        this.home = true;
        this.guess = false;
        this.seting = false;
        break;
        case '/personal/setting/pwd':
        this.title = '修改密码';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        break;
        case '/personal/transaction':
        this.title = '交易记录';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        break;
        case '/personal/betRecord':
        this.title = '投注记录';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        break;
        case '/personal/msg':
        this.title = '消息';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        break;
        case '/personal/recommend':
        this.title = '我的推荐';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        break;
        case '/personal/agent':
        this.title = '亚洲电竞合作加盟方案';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        break;
        case '/personal/deposit':
        this.title = '存款/充值';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        break;
        case '/personal/deposit/alipay' || 'personal/deposit/wechat' || '/personal/deposit/bankCardTransfer':
        this.title = '选择支付通道';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        break;
        case '/personal/deposit/alipay/001':
        this.title = '支付宝-王成龙';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
        break;
        case `/bet/${this.$route.params.id}`:
        this.title = '游戏竞猜';
        this.titleSet = false;
        this.back_i = true;
        this.home = false;
        this.guess = false;
        this.seting = false;
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
// @import '~@/assets/css/iconfont.css'
.page
  font-family:apple-system,BlinkMacSystemFont,PingFang SC,Helvetica Neue,STHeiti,Microsoft Yahei,Tahoma,Simsun,sans-serif
  font-weight:lighter
  width:100vw
  height:100vh
  color:#c2c5c8
  background:$background-color
</style>
