<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-22 08:07:55
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-03 20:39:45
 -->
<template>
  <div class="singerlist">
    <scroll class="listview" :data="data" ref="listview">
      <div ref="listHeigth">
        <ul class="list-group" >
          <h2 class="list-group-title">热门推荐</h2>
          <li @click='selectItem(group)' v-for='group in data' class="list-group-item">
              <img v-lazy="group.avatar" class="avatar" alt="">
              <span class="name">{{group.items}}</span>
          </li>
        </ul>
      </div>
      <div class="loadingcontainer" v-show="!data.length">
          <loading></loading>
      </div>
    </scroll>
  </div>

</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    methods: {
      selectItem(group) {   
        this.$emit('select', group)// 上传被点击的歌手信息
      },
      refresh() { // 将refresh方法暴露出去
        return this.$refs.listview.refresh()
      }
    },
    components: {
      Scroll,
      Loading
    },
}
</script>

<style lang="stylus" scoped  rel="stylusheet/stylus">
    @import "~common/stylus/variable"

.singerlist   // 重点
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
</style>