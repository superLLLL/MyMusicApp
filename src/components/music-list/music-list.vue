<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-26 18:57:54
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-02 22:25:25
 -->

 <!--将歌手详细页模块化-->
 <template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title" ></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper" v-show="songs.length>0" ref="playButton" @click="random">
        <div class="play">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem" ></song-list>
      </div>
      <div class="loadingcontainer" v-show="!songs.length">
          <loading></loading>
      </div>
    </scroll>
  </div>
 </template>
 
 <script>
 import Scroll from 'base/scroll/scroll'
 import SongList from 'base/song-list/song-list'
 import {prefixStyle} from 'common/js/dom'
 import Loading from 'base/loading/loading'
 import {mapActions} from 'vuex'

 const RESERVED_HEIGHT = 40 // 预留高度
 const transform = prefixStyle('transform') // 检测transform
 const backdropFilter = prefixStyle('backdrop-filter') // 检测backdrop-filter
 export default {
   props: {
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      bgImg: {
        type:String,
        default: ''
      }
   },
   data() { // 维护纵向滚动的值，保存纵向滚动的值
     return {
      scrollY: 0
     }
   },
   created() { // 在created的阶段加入滚动用的属性，用于监听scroll位置
     this.probeType = 3 // 为3时，一直会派发scroll事件
     this.listenScroll = true
   },
   computed: {
    bgStyle(){ // 设置背景图片（歌手图）
       return `background-image: url(${this.bgImg})`
     }
   },
   mounted() {
     this.imageHeight = this.$refs.bgImg.clientHeight // 记录下背景图片高度
     this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT     // 记录下负的图片高度作为layer的最大偏移量
     // 将可滚动的部分和图像部分分开，不对其设置上高度的话就会默认顶部,其上高度为图片的高度
     this.$refs.list.$el.style.top = `${this.imageHeight}px`
   },
   methods: {
    scroll(pos) { // 在滚动时，实时地从scroll子组件中拿值给scrollY赋值
        this.scrollY = pos.y 
    },
    back() { // 返回上一页面
      this.$router.back()
    },
    selectItem(item, index) { // 从song-list子组件接收到的参数
      // console.log(item+ ' ' + index);
      this.selectPlay({   // 完成actions调用，将数据上传到state中,播放歌曲由index控制
        list: this.songs,
        index
      })
    },
    random() { // 随机播放歌曲
      this.randomPlay({
        list: this.songs
      })
    },
    ...mapActions([
      // 通过mapActions语法糖包装成函数调用的方式
      'selectPlay',
      'randomPlay'
    ])
  },
  watch: { // 在scrollY获取到值后，用其新值改变bg-layer的Y轴的位置
    scrollY(newY) { 
      let translateY = Math.max(this.minTranslateY, newY) // 向上滑动时，只能最多滑动到背景图片位置处
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
      let scale = 1  
      let blur = 0 // 高斯模糊
      let zIndex = 0  
      const percent = Math.abs(newY / this.imageHeight) // 相当于加上newY作为高度

      if (newY > 0) { // 下拉时放大比例
        zIndex = 10
        scale = 1 + percent
      }else { // 上拉时高斯模糊
        blur = Math.min(20 * percent , 20) // 最大只取到20
      }
      
      // 感觉这个backdropFilter没有什么能兼容呢？
      this.$refs.filter.style[backdropFilter] = `blur(${blur}px)`
      // this.$refs.filter.style.filter = `blur(${blur}px)`

      // 防止预留高度被歌名列表遮挡
      if (newY < this.minTranslateY) { // 上拉到过了背景图时，改变样式
        this.$refs.bgImg.style.paddingTop = 0
        this.$refs.bgImg.style.height = RESERVED_HEIGHT +'px'
        this.$refs.playButton.style.display = 'none' // 滚动到顶部时，将button隐藏
        zIndex = 10
      }else{ // 没过时就恢复
        this.$refs.bgImg.style.paddingTop = '70%'
        this.$refs.bgImg.style.height = 0
        this.$refs.playButton.style.display = ''
      }
      // 统一修改
      this.$refs.bgImg.style.zIndex = zIndex
      this.$refs.bgImg.style[transform] = `scale(${scale})` // 比例缩放和放大
    }
   },
   components: {
     Scroll,
     SongList,
     Loading
   }
 }
 </script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 60
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      // 宽高比 10:7
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
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
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      // overflow: hidden
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
      
</style>
