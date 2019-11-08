<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-08 19:34:21
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-08 19:41:13
 -->
<template>
  <div class="no-result" >
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .no-result
    text-align: center
    .no-result-icon
      width: 86px
      height: 90px
      margin: 0 auto 
      bg-image('no-result')
      background-size: 86px 90px
    .no-result-text
      margin-top: 30px
      font-size: $font-size-medium
      color: $color-text-d
</style>
