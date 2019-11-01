<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-28 13:55:16
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-01 20:17:21
 -->
<!--播放器组件，可以在所有组件中显示，不影响其他组件-->
<template>
  <div class="player" v-show="playList.length>0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"             
                @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <!-- 底部一个高斯模糊 -->
        <div class="background">
          <img width="100%" height="100%" :src='currentSong.image'>
        </div>
        <div class="top">
          <div class="back" @click="Shrink">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.singer"></h1>
          <h2 class="subtitle" v-html='currentSong.name'></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src='currentSong.image'>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{(format(currentTime))}}</span>
            <div class="progress-bar-wrapper">
                <progress-bar :percent="getPercent()" @percentChange="OnProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i class="icon-prev" @click.prevent="prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i  @click="togglePlay" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i class="icon-next" @click.prevent="next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="main">
      <div class="mini-player" v-show="!fullScreen"  @click="Open">
        <div class="icon" >
          <img  :class="cdCls" width="40" height="40" :src='currentSong.image'>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.singer"></h2>
          <p class="desc" v-html='currentSong.album'></p>
        </div>
        <div class="control">
          <i :class="miniIcon" @click.stop="togglePlay"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div> 
    </transition>
    <audio :src="currentSong.url" @canplay="canplay" @error="error" ref="audio" @timeupdate="getCurrentTime"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'
import { prefixStyle } from 'common/js/dom'
import ProgressBar from 'base/progress-bar/progress-bar'

const transform = prefixStyle('transform')
export default {
  data() {
    return {
      isCanPlay: false, // 是否可以播放标志位
      currentTime : 0  // 当前播放时间
    }
  },
  computed: {
    cdCls() {
      return this.playing ? 'play' : 'pause'
    },
    playIcon() { // 通过playing的值来动态改变类名，从而改变样式
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    ...mapGetters([
      'playList', // 播放列表
      'fullScreen', // 播放的形式 全屏 or 缩小
      'currentSong', // 歌曲的信息
      'playing', // 播放状态
      'currentIndex' // 歌曲的下标
    ]),
  },
  methods: {
    Shrink() { // 收起播放器
      this.setFullScreen(false)
    },
    Open() {  // 展开播放器
      this.setFullScreen(true)
    },
    togglePlay() { // 更改播放状态
      if (!this.isCanPlay) {
        return
      }
      this.setPlaying(!this.playing) 
    },
    prev() { // 切换上一首歌
      if (!this.isCanPlay) { // 播放标志位是否为可播放状态
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) { // 如果超出下标
        index = this.playList.length - 1 // 则为最后一首
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlay()
      }
      this.isCanPlay = false // 当前歌曲加载完毕后，重新设为不可播放状态
    },
    next() {  // 切换下一首歌
      if (!this.isCanPlay) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playList.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playing) { // 让切换的下一首歌，无论如何都是在播放的
        this.togglePlay()
      }
      this.isCanPlay = false
    },
    canplay() { // 当前歌曲可以正常播放时 相关标志位设为true
      this.isCanPlay = true
    },
    error(err) { // 歌曲获取失败
    // 如果没网，歌曲出现错误，都会产生这样的情况，所以我们需要为其设置true
      this.isCanPlay = true // 既保证了我们的正常使用，又可以避免我们快速点击
    },
    disableCls() { // 当不能播放时，添加disable
      return this.isCanPlay ? '' : 'disable'
    }, 
    getCurrentTime(e) { // 获取当前歌曲的播放时间
      this.currentTime = e.target.currentTime
    },
    format(interval) { // 将数字转换成分秒的形式
      interval = interval | 0 // 向下取整 == Math.floor()
      let minute = interval / 60 | 0
      // let second = this._pad(interval % 60 | 0)
      let second = (interval % 60 | 0).toString().padStart(2, '0') // es6的padStart方法
      return `${minute}:${second}`
    },
    getPercent() { // 将当前播放的比例时长传给progress-bar
      if(this.currentTime && this.currentSong.duration)
        return this.currentTime / this.currentSong.duration
    },
    OnProgressBarChange(percent) { // 改变当前播放位置 
      this.$refs.audio.currentTime = this.currentSong.duration * percent // audio的currentTime是一个可读可写的属性
      if (!this.playing) { // 如果通过移动得到的位置且处于暂停状态，则播放
        this.togglePlay()
      }
    },
    // _pad(time, n =2){ // 为秒处补0 默认补足两位 ，默认补0
    //   let t = time.toString().length 
    //   while (t < n){
    //     time = '0'+ time
    //     t++
    //   }
    //   return time
    // },
    
    // 以下为transition的各时间段事件
    enter(el, done) { // done 当执行到done时跳转到下一个事件
      const {x, y, scale} = this._getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          // 放大一点，在缩成正常
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }

      animations.registerAnimation({ // 注册动画
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })

      animations.runAnimation(this.$refs.cdWrapper, 'move', done) // 运行动画，并执行回调函数
    },
    afterEnter() {
        animations.unregisterAnimation('move') // 注销动画
        this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) { // leave时的动画
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      const {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave() { // 一定要清空动画
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    _getPosAndScale() {
      // 图标的一些数据
      const targetWidth = 40
      const paddingLeft = 40 
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8 // 大图标的宽度=视口宽度 * 0.8 因为其宽度为80%
      const scale = targetWidth / width // 获得比例
      const x = -(window.innerWidth / 2 - paddingLeft)  // 大图标x
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom // 大图标y
      return {x,y,scale}
    },
    ...mapMutations({ // 映射出方法
      setFullScreen : 'SET_FULL_SCREEN', // 播放器状态
      setPlaying: 'SET_PLAYING', // 播放器播放/暂停
      setCurrentIndex : 'SET_CURRENT_INDEX' // 当前播放歌曲的index
    })
  },
  watch: {
    currentSong() {
      this.$nextTick(() => { // 将回调函数延迟到下一次DOM更新时调用
        this.$refs.audio.play()
      })
    },
    playing(newPlaying) { // 监视playing数据
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause() // 三元设置audio的播放状态
      })
    }
  },
  components:{
    ProgressBar
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0 
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          // 撑出高度
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              // 大边框
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              // 唱片旋转
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
              // flex布局grow：1  左右两侧用文字自动撑开，中间自适应
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
//  大播放器，切入缓慢0.4s
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      // 小播放器切入缓慢0.4s
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
       小播放器切除透明
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
      // grow， shrink ， basis
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          // mini的唱片旋转
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>