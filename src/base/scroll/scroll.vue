<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:17:47
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-24 14:54:27
 -->

 <!--抽象Scroll组件： 其重点在于 wrapper一定要小于scroll-->
<template>
  <div ref="wrapper" class="wrapper">
    <slot>
      
    </slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  // 是否接收外部参数
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {    // 页面初始化渲染
      this._initScroll()
    }, 20);
  },

  methods: {
    _initScroll(){
      if (!this.$refs.wrapper){  //未初始化wrapper时，停止Scroll的初始化
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      // console.log(this.scroll);
    },
    enable() {  //调用enable()方法
      this.scroll && this.scroll.enable()   //如果this.scroll存在并且enable()方法也有，那么就调用scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data(){   //当data发生改变时，就调用refresh() 刷新组件内容
      setTimeout(() => {
        this.refresh()
      }, 20);
    }
  },
}
</script>

<style lang="stylus" scoped>
  .wrapper
    // overflow: hidden
    // height: 100%
</style>