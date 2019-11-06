<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-18 15:56:00
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-06 10:52:30
 -->
<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="toplist" ref="scroll">
      <ul>
        <li class="item" v-for="item in toplist" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.headPicUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(value, index) in item.song">
              <span>{{index + 1}}</span>
              <span>{{value.singerName}} - {{value.title}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!toplist.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getTopList } from 'api/rank'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { playListMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'


export default {
  // 改变播放状态下的scroll的bottom
  mixins: [playListMixin],
  data() {
    return {
      toplist: [] // 热歌榜
    }
  },
  created() {
    this._getTopList()
  },
  methods: {
    _getTopList() { // 热歌榜请求
      getTopList().then((res) => {
        if(res.code === ERR_OK) {
          this.toplist  = this._normalizeTopList(res.topList.data.group)
          // console.log(this.toplist);
        }
      })
    },
    _normalizeTopList(list) { // 格式化请求来的数据,取出各榜单的歌曲内容
      let ret = []
      list.forEach(element => {
        const toplist = element.toplist
        toplist.forEach(value => {
          ret.push(value)
        })
      })
      return ret
    },
    handlePlayList(playlist) { // 改变播放状态下的bottom
      const bottom = playlist.length > 0 ? '60px' : '0'
      this.$refs.rank.style.bottom = bottom
      this.$refs.scroll.refresh() // 刷新scroll
    },
    selectItem(item) { // 跳转子路由
      this.$router.push({
        path: `/rank/${item.topId}`
      })
      this.setTopList(item)
    },
    ...mapMutations({
      setTopList : 'SET_TOPLIST'
    })
  },
  components: {
    Scroll,
    Loading
  }
};
</script>

<style lang="stylus" scoped rel="stylusheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex 
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translate3d(-50%)
</style>