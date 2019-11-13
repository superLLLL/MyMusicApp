<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-13 13:18:11
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-13 16:01:54
 -->

 <!--跳窗提示组件-->
<template>
  <transition name="drop">
    <div class="top-tip" v-show="isShow">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props:{
    delay: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      // 显示标志位
      isShow: false,
      // 连续点击添加导致的number可变化
      number: 0
    }
  },
  methods: {
    show() {
      this.isShow = true
      if (timer !== 'underfine') {
        this.number++ 
      }
      // 如果timer是一个定时器那么就说明当前添加还在继续，添加歌曲数，可以随之变化
      this.$emit('addNumber', this.number)
      // 保险，每次将这个定时器关闭一次
      clearTimeout(timer)
      // 自动隐藏
      let timer = setTimeout(() => {
        this.number = 0
        this.hide()
      }, this.delay);
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .top-tip
    position: fixed
    top: 0
    width: 100%
    z-index: 500
    background: $color-dialog-background
    &.drop-enter-active, &.drop-leave-active
      transition: all 0.3s
    &.drop-enter, &.drop-leave-to
      transform: translate3d(0, -100%, 0)
</style>