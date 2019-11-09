<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-09 10:39:21
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-09 11:16:03
 -->
<template>
  <div class="search-list" v-show="searches.length">
    <ul>
      <li @click="selectItem(item)" class="search-item" v-for="item in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteItem(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // 接收localStorage内容
    searches: {
      type: Array,
      default: []
    }
  },
  methods: {
    // 只向上派发事件，不进行逻辑处理
    selectItem(item) {
      this.$emit('selectItem', item)
    },
    deleteItem(item) {
      this.$emit('deleteItem', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .search-list
    .search-item
      display: flex
      align-items: center
      height: 40px
      overflow: hidden
      &.list-enter-active, &.list-leave-active
        transition: all 0.1s
      &.list-enter, &.list-leave-to
        height: 0
      .text
        flex: 1
        color: $color-text-l
      .icon
       extend-click()
       .icon-delete
        font-size: $font-size-small
        color: $color-text-d
</style>