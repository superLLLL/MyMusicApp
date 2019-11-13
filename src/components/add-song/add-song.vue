<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-11 14:07:36
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-13 13:00:29
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
  <!-- 添加ref的原因是因为引入的mixin中的方法需要searchBox的ref，为了避免出错，所以加上。 -->
        <search-box ref="searchBox" @query="onQueryChange" placeholder="搜索歌曲"></search-box>
      </div>
      <!-- 没有搜索字符串时,显示最近播放和历史搜索 -->
      <div class="shortcut" v-show="!query">
        <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
        <div class="list-wrapper">
          <!-- 最近播放 -->
          <scroll ref="playScroll" class="list-scroll" v-if="currentIndex === 0" :data="playHistory">
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong"></song-list>
            </div>
          </scroll>
          <!-- 搜索记录 以下为复用mixin中的searchHistory、deleteSearchHistory、 setQuery -->
          <scroll ref="searchScroll" class="list-scroll" v-if="currentIndex === 1" :data="searchHistory">
            <div class="list-inner">
              <search-list :searches="searchHistory" @deleteItem="deleteSearchHistory" @selectItem="setQuery"></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <!-- 有搜索字符串时，显示搜索结果 -->
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
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/scroll'
import { mapGetters, mapActions} from 'vuex'
import SearchList from 'base/search-list/search-list'
import SongList from 'base/song-list/song-list'
import { createSongAddSong } from 'common/js/song'

export default {
  mixins: [searchMixin],
  data() {
    return {
      // 显示标志位：初始化不显示
      isShow: false,
      // 不要歌手,用于search-box
      showSinger: false,
      switches: [
        {name: '最近播放'},
        {name: '历史搜索'}
      ],
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'playHistory'
    ])
  },
  methods: {
    // 本身组件display：none的，所以它的scroll初始化无法获取滚动长度；我们需要在显示的时候，调用其refresh() 方法
    show() {
      this.isShow = true
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.playScroll.refresh()
        } else {
          this.$refs.searchScroll.refresh()
        }
      }, 20);
    },
    hide() {
      this.isShow = false
    },
    // 将传上来的搜索记录进行保存在localStorage中
    selectSuggest() {
      this.saveSearch()
    },
    switchItem(index) {
      this.currentIndex = index
    },
    // 从song-list中通过点击事件，派发上来的事件，携带着song和index
    selectSong(song, index) {
      // console.log(song);
      // console.log(createSongAddSong(song));
      if (index !== 0) {
        // 因为song不是单纯的数组了，是通过playHistory返回的，其中的每个值都是对象，所以在运行时，会出现错误（无法正常解析），所以通过在song.js中添加方法用于将其格式化
        this.insertSong(createSongAddSong(song))
      }
    },
    ...mapActions([
      'insertSong'
    ])
  },
  components: {
    SearchBox,
    Suggest,
    Switches,
    Scroll,
    SongList,
    SearchList
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