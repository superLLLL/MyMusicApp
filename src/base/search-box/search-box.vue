<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-06 14:23:33
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-06 20:01:20
 -->
<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" class="box" v-model="query" :placeholder="placeholder">
    <i v-show="query" class="icon-dismiss" @click="clearQuery" ></i>
  </div>  
</template>

<script>
export default {
  props: {
    placeholder: { // 提示符
      type: String,
      default: '搜索歌曲、歌手、歌词'
    }
  },
  data() {
    return {
      query: '' // 双向绑定，控制页面显示，并对外提供
    }
  },
  methods: {
    clearQuery() { // 清空query
      this.query = ''
    },
    setQuery(query) { // 从父组件中传值，修改query
      this.query = query.k
    }
  },
  created() {
    // 将新的query值，传出去
    this.$watch('query', (newValue) => {
      this.$emit('query', newValue)
    })
  },
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>