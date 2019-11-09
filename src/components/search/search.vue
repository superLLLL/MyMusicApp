<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 15:56:00
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-09 11:17:33
 -->
<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li @click="setQuery(item.k)" class="item" v-for="item in hotkey">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <search-list @selectItem="setQuery" :searches="searchHistory"></search-list>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
    </div> 
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import Suggest from 'components/suggest/suggest'
import { mapActions, mapGetters } from 'vuex'
import SearchList from 'base/search-list/search-list'


export default {
  data() {
    return {
      hotkey: [], // 存放热门搜索
      query: '' // 传入的搜索字段
    }
  },
  created() {
    this._getHotKey()
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    setQuery(query) { // 点击搜索热门后，将值输入到input
      this.$refs.searchBox.setQuery(query) // 将点击的热门搜索作为搜索字段传送到search-box
    },
    _getHotKey() { // 请求搜索热门的数据
      getHotKey().then((res) => {
        if(res.code === ERR_OK) {
          this.hotkey = res.data.hotkey.slice(0,10) // 只取前10个热门
        }
      })
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    onQueryChange(query) { // search-box传上来的值
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    ...mapActions([
      'saveSearchHistory'
    ])
  },
 components: {
   SearchBox,
   Suggest,
   SearchList
 }

}
</script>

<style lang="stylus" scoped rel="stylusheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0

            
            
        

</style>