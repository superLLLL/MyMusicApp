<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:17:47
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-15 20:52:15
 -->

<!--推荐图片左右轮播图-->

<template>
  <div class="slider" ref="slider"> 
    <div class="slider-group" ref="sliderGroup">
      <slot >
        
        <!--即将放入父组件的内容-->
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active : currentPageIndex === index}" :key="index"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// import Slide from '@better-scroll/slide'
import {addClass} from 'common/js/dom'

export default {
  name: 'slider',
  data(){
    return {
      dots: [],  //轮播图下面的点
      currentPageIndex: 0 //当前对应的点
    }
  },
  props: {
    loop: {       //是否循环
      type: Boolean,
      default: true
    },
    autoPlay: {   //是否自动播放
      type: Boolean,
      default: true
    },
    interval: {  //轮播间隔
      type: Number,
      default: 4000
    }
  },
  mounted() {
    //设置20毫秒延迟，浏览器刷新时间为17ms
    setTimeout(() => {
      //设置轮播图宽度
      this._setSliderWidth()
      this._initSlider()
      this._initDots()
      if (this.autoPlay){
        this._play()
      }
    }, 20);
    //窗口改变事件
    window.addEventListener('resize', () => {
      //当轮播图未初始化时，即还未实际调用 setSliderWidth()
      if (!this.scroll) {
        return 
      }
      this._setSliderWidth(true)
    })
  },
  methods: {
    //初始化宽度; 参数控制仅通过setTimeout调用时，才需要加上双倍轮播图大小
    _setSliderWidth(isResize){ // 如果是通过resize事件来的，则不再将width += 2*sliderwidth
      this.children = this.$refs.sliderGroup.children
      let width = 0
      //获取浏览器宽度
      let sliderwidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        // 为每个child添加类名
        addClass(child, 'slider-item')

        child.style.width = sliderwidth + 'px'    //为图片dom对象，设置宽度
        width += sliderwidth                      // 得到总宽度
      }

      //因为better-scroll的机制，如果循环，需要多设置两个宽度
      if(this.loop && !isResize){
        width += 2 * sliderwidth
      }
      //为slider dom设置总宽度
      this.$refs.sliderGroup.style.width = width + 'px'
      // console.log(this.$refs.sliderGroup.offsetWidth);
    },
    //初始化轮播图
    _initSlider(){
      let vm = this;
      // 实例化scroll
      this.scroll = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,   //关闭或者打开惯性运动的执行
          snap: {              //高级选项snap
              loop: this.loop, // 循环
              threshold: 0.3,   //表示可滚动到下一个的阈值
              speed: 400 // 轮播间隔
          }
      })
      // scrollEnd是当前滚动结束，就调用
      this.scroll.on('scrollEnd', () => {
          // 获得当前滚动到的个数，赋给currentPageIndex以实现样式变化
          let pageIndex = this.scroll.getCurrentPage().pageX;
          this.currentPageIndex = pageIndex;
          if(this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }

      })
      // this.scroll.on('beforeScrollStart', () => {
      //     if(vm.autoPlay){
      //         clearTimeout(vm.timer);
      //     }
      // })

    },
    //初始化点
    _initDots(){
      this.dots = new Array(this.children.length -2)
    },
    // 修改到下一张幻灯片
    _play() {
        let pageIndex = this.currentPageIndex + 1
        this.timer = setTimeout(() => {
          this.scroll.next()
        }, this.interval)
      }
  },
  //手动清除计时器
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
       
        
      
</style>