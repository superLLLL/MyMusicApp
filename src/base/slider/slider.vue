<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:17:47
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-19 18:37:06
 -->

<template>
  <div class="slider" ref="slider"> 
    <div class="slider-group" ref="sliderGroup">
      <slot>
        <!--即将放入父组件的内容-->
      </slot>
    </div>
    <div class="dots"></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this.initSlider()
    }, 20);  //设置20毫秒延迟，浏览器刷新时间为17ms
  },
  methods: {
    _setSliderWidth(){
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderwidth = this.$refs.slider.clientWidth  //开源获得的slider的宽度
      for (let i = 0; i < this.children.length; i++) {
        console.log(this.children[i]);
        let child = this.children[i]
        addClass(child, 'slider-item')

        child.style.width = sliderwidth + 'px'
        width += sliderwidth
      }


      if(this.loop){  //loop 会左右clone两个DOM 以便轮播；所以要加上两倍的width
        width += 2 * sliderwidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
      // console.log(this.$refs.sliderGroup.offsetWidth);
    },
    initSlider(){
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
    }
  },
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