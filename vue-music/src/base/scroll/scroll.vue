<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:17:47
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-10-20 19:53:18
 -->

 <!--抽象Scroll组件-->
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
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
    setTimeout(() => {
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
    },
    enable() {  //调用enable()方法
      this.scroll && this.scroll.enable()   //如果this.scroll是有的，那么就调用scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
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
  
</style>