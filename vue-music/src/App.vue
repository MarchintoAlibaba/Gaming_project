<template>
  <div id="app">
    <header-header></header-header>
    <header-list></header-list>
    <keep-alive><router-view/></keep-alive> 
    <player></player>
  </div>
</template>

<script>
import headerList from 'pages/home/header/List'
import headerHeader from 'pages/home/header/Header'
import player from 'pages/player/player'
export default {
  name: 'App',
  components:{
    headerList,
    headerHeader,
    player
  }
}
</script>

<style lang="stylus">
@import '~css/variable.styl'
  #app
    font-size:.14rem
    background-color:$color-background
</style>
