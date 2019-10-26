<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:17:47
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-22 13:26:55
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
      <span class="dot" v-for="(item, index) in dots" :class="{active : currentPageIndex === index}"></span>
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
    setTimeout(() => {  //设置轮播图宽度
      this._setSliderWidth()
      this._initSlider()
      this._initDots()
      if (this.autoPlay){
        this._play()
      }
    }, 20);  //设置20毫秒延迟，浏览器刷新时间为17ms

    window.addEventListener('resize', () => {  //监听页面大小，实现响应式
      if (!this.scroll) { //当轮播图未初始化时，即还未实际调用 setSliderWidth()
        return 
      }
      this._setSliderWidth(true) 
    })
  },
  methods: {
    _setSliderWidth(isResize){  //初始化宽度; 参数控制仅通过setTimeout调用时，才需要加上双倍轮播图大小
      this.children = this.$refs.sliderGroup.children //获取到传入的图片(Array)
      // console.log(this.children);
      let width = 0
      let sliderwidth = this.$refs.slider.clientWidth  //获取浏览器宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')

        child.style.width = sliderwidth + 'px'    //为图片dom对象，设置宽度
        width += sliderwidth                      // 得到总宽度
      }


      if(this.loop && !isResize){  //因为better-scroll的机制，如果循环，需要多设置两个宽度
        width += 2 * sliderwidth
      }
      this.$refs.sliderGroup.style.width = width + 'px' //为slider dom设置总宽度
      // console.log(this.$refs.sliderGroup.offsetWidth);
    },
    
    _initSlider(){  //初始化轮播图
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
      this.scroll.on('scrollEnd', () => {
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
    _initDots(){  //初始化点
      this.dots = new Array(this.children.length -2)
    },
    _play() {
        let pageIndex = this.currentPageIndex + 1
        this.timer = setTimeout(() => {
          this.scroll.next()
        }, this.interval)
      }
  },
  destroyed() {
    clearTimeout(this.timer) //手动清除计时器
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