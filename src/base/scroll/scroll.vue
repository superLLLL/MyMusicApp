<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 10:17:47
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-07 14:24:36
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
    data: { // 以data创建滚动
      type: Array,
      default: null
    },
    listenScroll: { // 是否监听滚动的
      type: Boolean,
      default: false
    },
    pullUp: { // 是否实现上拉刷新
      type: Boolean,
      default: false
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
      this.scroll = new BScroll(this.$refs.wrapper, { //初始化better-scroll
        probeType: this.probeType,
        click: this.click
      })
      
      if (this.listenScroll) {  // 如果父组件正在实时监听当前scroll元素的值（即listenScroll为true时）,将
        let me = this
        this.scroll.on('scroll', (pos) => { // 绑定scroll事件，并准备将pos(滚动的实时坐标)传会父组件的scroll事件
          me.$emit('scroll', pos)
        })
      }

      if(this.pullUp) { // 上拉刷新，调用scroll的scrollEnd事件
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) { // 表示将要滚到底部
            this.$emit('scrollToEnd')
          }
        })
      }
    },
    enable() {  // 启用 better-scroll, 默认 开启。
      this.scroll && this.scroll.enable()   //如果this.scroll存在并且enable()方法也有，那么就调用scroll.enable()
    },
    disable() { // 禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。
      this.scroll && this.scroll.disable()
    },
    refresh() { // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
      this.scroll && this.scroll.refresh()
    },
    scrollTo() { // 滚动到指定的位置
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() { // 滚动到指定的目标元素。
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