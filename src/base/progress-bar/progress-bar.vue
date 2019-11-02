<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-01 10:58:48
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-02 13:10:32
 -->
<template>
  <div class="progress-bar" ref="progressBar" @click="progressChange">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper">
        <div class="progress-btn" ref="progressBtn"
          @touchstart.prevent="progressTouchStart"
          @touchmove.prevent="progressTouchMove"
          @touchend="progressTouchEnd"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from 'common/js/dom'

const progressBtnWidth = 16 // 进度条提示性小球的宽度
const transform = prefixStyle('transform') // 检测

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {} // 需要一个值来实现在不同回调函数中共享数据
  },
  methods: {
    // 有个小问题，移动位置问题？
    
    progressTouchStart(e) { // 开始移动
      this.touch.initiated = true // 设置初始化标志
      this.touch.startX = e.touches[0].pageX // 获得起始X轴位置, 用于之后计算移动后的width
      this.touch.left = this.$refs.progress.clientWidth // 获得当前进度条的长度
    },
    progressTouchMove(e) { // 移动阶段
      if (!this.touch.initiated) { // 未被初始化时，返回
        return 
      }
      const resultX = e.touches[0].pageX - this.touch.startX // 获得有效的touchX轴偏移距离
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + resultX)) // 获得总的偏移位置
      this._setWidth(offsetWidth) // 修改进度条的位置
    },
    progressTouchEnd() { // 移动结束
      this.touch.initiated = false // 改变初始化状态
      this._triggerPercent()
    },
    progressChange(e) { // 点击修改播放位置
      const rect = this.$refs.progressBar.getBoundingClientRect() // btn到进度条初始位置的偏移量
      const offsetWidth = e.pageX - rect.left 
      this._setWidth(offsetWidth)
    // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
      // this._setWidth(e.offsetX) // 修改进度条位置
      this._triggerPercent()    // 修改歌曲播放位置
    },
    _triggerPercent() { // 将移动后的进度条的比值 发送到player
      let percent = this.$refs.progress.clientWidth / this.$refs.progressBar.clientWidth // 获得进度条比值
      this.$emit('percentChange', percent)
    },
    _setWidth(offsetWidth) { // 函数封装 随着播放的时间的增加，进度条进度也增加
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    }
  },
  watch: {
    percent(newPrecent) { // 监听当前播放事件的比例
      if (newPrecent >= 0 && !this.touch.initiated) { // 只在未进行touch的时候才会使用自动改变进度条
        let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth  // 播放进度条的固定总长度 - 小球的宽度
        let offsetWidth = newPrecent * barWidth // 当前比值 / 进度条的总长度 = 当前播放的位置
        this._setWidth(offsetWidth)
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      // 播放时长修改width
      .progress
        position: absolute 
        height: 100%
        background: $color-theme
        // 固定小球位置
      .progress-btn-wrapper
        position: absolute 
        left: -8px
        top: -13px
        width: 30px
        // 进度条上的小球
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>