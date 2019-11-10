<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-09 16:16:53
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-10 20:22:49
 -->
<template>
  <transition name="confirm-fade">
    <!--外层容器-->
    <!-- @click.stop让confirm更加独立不向上冒泡 -->
    <div class="confirm" v-show="isShow" @click.stop>
      <!--中间内容的定位-->
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div class="operate-btn left" @click="cancel">{{cancelBtnText}}</div>
            <div class="operate-btn" @click="confirm">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: { // 弹窗文案
      type: String,
      default: ""
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
    
  },
  data() {
    return {
      isShow: false // 显示标志位
    }
  },
  methods: {
    show() { // 显示
      this.isShow = true
    },
    hide() { // 隐藏
      this.isShow = false
    },
    // 点击取消时
    cancel() {  
      this.hide()
      this.$emit('cancel')
    },
    // 点击确定时
    confirm() {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .confirm
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: $color-background-d
    // 总体过渡样式
    &.confirm-fade-enter-active
      animation: confirm-fadein 0.3s
      .confirm-content
        animation: confirm-zoom 0.3s
    .confirm-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      .confirm-content
        width: 270px
        border-radius: 13px
        background: $color-highlight-background
        .text
          padding: 19px 15px
          line-height: 22px
          text-align: center
          font-size: $font-size-large
        .operate
          display: flex
          align-items: center
          justify-content: center
          text-align: center
          font-size: $font-size-large
          .operate-btn
            flex: 1
            line-height: 22px
            padding: 10px 0
            border-top: 1px solid $color-background-d
            color: $color-text-d
            &.left
              border-right: 1px solid $color-background-d
@keyframes confirm-fadein
  0%
    opacity: 0
  100% 
    opacity: 1
@keyframes confirm-zoom
  0%
    transfrom: scale(0)
  50%
    transform: scale(1.1)
  100%
    transform: scale(1)
</style>
