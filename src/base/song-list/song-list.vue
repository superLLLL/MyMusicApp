<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-26 21:49:54
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-13 10:39:24
 -->
<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)">{{getRankText(index)}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs:{
      type: Array,
      default: []
    },
    rank: { // 默认排行样式
      type: Boolean,
      default: false
    }
  },
  methods: {
    getDesc(song) { // 抽象出方法获得歌手名和专辑名
    // console.log(this.songs); 
      return `${song.singer}: ${song.album}`
    },
    selectItem(item, index) { // 向上（music-list）派送事件select，内容包含被点击歌曲和下标
      this.$emit('select', item, index)
    },
    getRankCls(index) { // 动态绑定css样式
      if (index <= 2) { // 前三名为图片
        return `icon icon${index}`
      } else { // 后面是文字
        return 'text'
      }
    },
    getRankText(index) { // 动态绑定文案
      if (index > 2) {
        return index + 1
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>