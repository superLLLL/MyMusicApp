<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-13 18:04:55
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-15 09:20:47
 -->
<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches @switch="switchItem" :currentIndex="currentIndex" :switches="switches"></switches>
      </div>
      <div class="play-btn" ref="playBtn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <!-- 我的喜欢 -->
        <scroll ref="favoriteScroll" class="list-scroll" v-if="currentIndex === 0" :data="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <!-- 历史播放 -->
        <scroll ref="playScroll" class="list-scroll" v-if="currentIndex === 1" :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDes"></no-result>
      </div>
    </div>
  </transition>
</template>

<script>
import Switches from "base/switches/switches"
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import NoResult from 'base/no-result/no-result' 
import { mapGetters, mapActions} from 'vuex'
import { createSongAddSong } from 'common/js/song'
import { playListMixin } from 'common/js/mixin'
 
export default {
  mixins: [playListMixin],
  data() {
    return {
      // 用于传入switches组件中
      currentIndex: 0,
      switches: [
        {name: '我喜欢的'},
        {name: '最近播放'}
      ]
    }
  },
  computed: {
    // 在不同列表下的显示/隐藏
    noResult() {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length
      } else {
        return !this.playHistory.length
      }
    },
    noResultDes() {
      if (this.currentIndex === 0) {
        return '您还未添加收藏歌曲'
      } else {
        return '您最近还未曾听歌曲'
      }
    },
    ...mapGetters([
      'playHistory',
      'favoriteList'
    ])
  },
  methods: {
    // 处理scroll被遮挡问题
    handlePlayList(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.listWrapper.style.bottom = bottom
      // 使用逻辑判断的短路来使其正确的scroll调用到refresh()
      this.$refs.favoriteScroll && this.$refs.favoriteScroll.refresh()
      this.$refs.playScroll && this.$refs.playScroll.refresh()
    },
    // 回退
    back() {
      this.$router.back()
    },
    switchItem(index) {
      this.currentIndex = index
    },
    // 添加到播放列表
    selectSong(song) {
      this.insertSong(createSongAddSong(song))
    },
    // 随机播放功能
    random() {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
      // 如果localstorage中没歌曲，就返回，以免添加空列表到playList中
      if (!list.length) {
        return
      }
      // 需要对其进行封装，才能使其，具有getLyric() 的能力
      list = list.map((song) => {
        return createSongAddSong(song)
      })
      this.randomPlay({list})
    },
    ...mapActions([
      'insertSong',
      'randomPlay',
    ])
  },
  components:{
    Switches,
    Scroll,
    SongList,
    NoResult
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-avtice, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position: absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto 
      text-align: center
      border: 1px solid $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text 
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute 
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute 
      width: 100%
      top: 50%
      transform: translateY(-50%)
  
</style>
