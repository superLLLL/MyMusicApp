<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-10 12:54:01
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-11 13:57:15
 -->
<template>
  <transition name="list-fade">
    <div class="playlist" v-show="isShow" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <!-- 通过mixin获得的iconMode方法 -->
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll ref="scroll" :data="sequenceList" class="list-content">
          <ul>
            <!-- vue专门用于列表的transition--transitiongroup tag将transition-group渲染成相应的标签-->
            <transition-group name="list" tag="ul">
              <!-- transition-group的子元素需要一个key：区分每个元素 -->
              <li :key="item.id" ref="listItem" class="item" @click="selectItem(item, index)" v-for="(item, index) in sequenceList">
                <i class="current" :class="currentIconCls(item)"></i>
                <span class="text">{{item.name}}</span>
                <span class="like">
                  <i class="icon-not-favorite"></i>
                </span>
                <span class="delete" @click.stop="deleteOne(item)">
                  <i class="icon-delete"></i>
                </span>
              </li>
            </transition-group>
          </ul>
        </scroll>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear"  text="是否清空列表" confirmBtnText="清空"></confirm>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
import Scroll from 'base/scroll/scroll'
import { playMode } from 'common/js/config'
import Confirm from 'base/confirm/confirm'
import { playerMixin } from 'common/js/mixin'


export default {
  mixins: [playerMixin],
  data() {
    return {
      // 显示标志位
      isShow: false
    }
  },
  computed: {
    // 添加当前播放模式的提示字符
    modeText() {
      return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
    }
  },
  methods: {
    show() {
      this.isShow = true
      // 因为scroll在没显示出来的时候就初始化了，导致无法正常滚动，需要在显示时才refresh()一次
      setTimeout(() => {
        this.$refs.scroll.refresh()
        // 在刚进入的时候先来自动跳
        this.scrollToElem(this.currentSong)
      }, 20);
    },
    hide() {
      this.isShow = false
    },
    // 为当前播放的歌曲添加样式
    currentIconCls(item) {
      if (this.currentSong.id === item.id) {
        return 'icon-play'
      } 
      return ''
    },
    // 删除单个歌曲
    deleteOne(item) {
      this.deleteSong(item)
      // 删完列表后，在播放一首歌时，会直接显示歌曲列表，所以要hide() 
      if (!this.playList.length) {
        this.hide()
      }
    },
    // 显示confirm
    showConfirm() {
      this.$refs.confirm.show()
    },
    // 通过了点击confirm中确定按钮而传上来的事件
    confirmClear() {
      this.deleteSongList()
      this.hide()
    },  
    // 自动滚动到正在播放的歌曲
    scrollToElem(item) {
      // 找到其位置
      const index = this.sequenceList.findIndex((song) => {
        return item.id === song.id
      })
      // scroll滚动到li的index个element下，，延迟3ms动画
      this.$refs.scroll.scrollToElement(this.$refs.listItem[index], 300)
    },
    // 点击歌曲名后，将该歌曲进行播放
    selectItem(item, index) {
      // 其实只有random状态下是需要改变index的
      if (this.mode === playMode.random) {
        // 通过在实际歌曲播放列表中，找出被点击歌曲的下标
        index = this.playList.findIndex((song) => {
          return song.id === item.id
        })
      }
      // console.log(index);
      this.setCurrentIndex(index) 
      // 将切换歌曲后，播放状态保持在播放
      this.setPlayState(true)
    },
    ...mapActions([
      'deleteSong',
      'deleteSongList'
    ])
  },
  watch: {
    // 监视住currentSong来判断是否应该进行自动scroll
    currentSong(newVal, oldVal) {
      if (!this.isShow || newVal.id === oldVal.id) {
        return 
      }
      this.scrollToElem(newVal)
    }
  },
  components: {
    Scroll,
    Confirm
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    // 给我铺满整个屏幕
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.5s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text 
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.2s linear
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>
