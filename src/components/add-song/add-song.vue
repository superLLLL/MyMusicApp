<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-11 14:07:36
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-11 19:17:53
 -->
 <!-- 歌曲添加到列表的组件 -->
<template>
  <transition name="slide">
    <!-- 阻止该组件冒泡到父组件 -->
    <div class="add-song" v-show="isShow" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      
      <div class="search-box-wrapper">
        <search-box @query="onQueryChange" placeholder="搜索歌曲"></search-box>
      </div>
      <!-- 没有请求字段时,什么都不显示 -->
      <div class="shortcut" v-show="!query"></div>
      <div class="search-result" v-show="query">
        <suggest :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></suggest>
      </div>
    </div>
  </transition>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import { searchMixin } from 'common/js/mixin'

export default {
  mixins: [searchMixin],
  data() {
    return {
      // 显示标志位：初始化不显示
      isShow: false,
      // 不要歌手,用于search-box
      showSinger: false
    }
  },
  methods: {
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    },
    // 将传上来的搜索记录进行保存在localStorage中
    selectSuggest() {
      this.saveSearch()
    }
    
  },
  components: {
    SearchBox,
    Suggest
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>