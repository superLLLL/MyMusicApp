<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 15:56:00
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-10 09:51:29
 -->
<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll class="shortcut" :data="shortcut" ref="scroll">
        <div>
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
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @selectItem="setQuery"  @deleteItem="deleteOne" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div ref="searchResult" class="search-result" v-show="query">
      <suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
    </div>
    <confirm ref="confirm" text="是否删除所有记录?" confirmBtnText="删除" @confirm="deleteAll"></confirm>
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
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import { playListMixin } from 'common/js/mixin'


export default {
  mixins: [playListMixin],
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
    // 每当hotkey或者searchHistory发生变化时，都会改变该返回值
    shortcut() {
      return this.hotkey.concat(this.searchHistory)
    },
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    // 点击搜索热门后，将值输入到input
    setQuery(query) {
     // 将点击的热门搜索作为搜索字段传送到search-box
      this.$refs.searchBox.setQuery(query)
    },
     // 请求搜索热门的数据
    _getHotKey() {
      getHotKey().then((res) => {
        if(res.code === ERR_OK) {
          this.hotkey = res.data.hotkey.slice(0,10) // 只取前10个热门
        }
      })
    },
    // 当mini播放器导致滚动底部不可见时
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? "60px" : ''

      this.$refs.shortWrapper.style.bottom = bottom
      this.$refs.scroll.refresh()

      this.$refs.searchResult.style.bottom = bottom
      // 通过代理来调用suggest中的scroll的refresh
      this.$refs.suggest.refresh()

    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
     // 可以直接在@click="deleteSearchHistory"
    deleteOne(item) {
      this.deleteSearchHistory(item)
    },
    // 被@click="clearSearchHistory"替换
    deleteAll() {
      this.clearSearchHistory()
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    // search-box传上来的值
    onQueryChange(query) { 
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  },
  watch:{
    // 监听query，当其变化时，需要搜索的scroll进行refresh
    query(newVal) {
      if (!newVal) {
        setTimeout(() => {
            this.$refs.scroll.refresh()
        }, 20);
      }
    }
  },
 components: {
   SearchBox,
   Suggest,
   SearchList,
   Confirm,
   Scroll
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