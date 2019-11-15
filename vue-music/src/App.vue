<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:47:32
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-20 13:43:18
 -->
<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!--将DOM 缓存到内存中，在切换页面时就不会重新发起连接的请求-->
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'
  export default {
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  // @import "~common/stylus/variable"
  // #app
  //   color: $color-theme
</style>
