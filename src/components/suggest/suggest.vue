<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-06 16:48:58
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-08 19:25:08
 -->
<template>
  <scroll class="suggest"
          :data="result" 
          :pullUp="pullUp"
          @scrollToEnd="searchMore"
          ref="scroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result"> 
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
  </scroll>
</template>

<script>
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import { mapMutations, actions, mapActions} from 'vuex'

const TYPE_SINGER = 'singer'
const PERPAGE = 20 // 每次请求页的个数

export default {
  props: {
    query: { // 依赖的外部传入的检索词
      type: String,
      default: ''
    },
    showSinger: { // 是否直达（显示歌手）
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1, // 默认页号
      result: [], // 请求回的搜索结果
      pullUp: true, // 此页面需要上拉刷新
      hasMore: true // 是否仍有未加载数据标志位
    }
  },
  methods: {
    Search() { // 请求搜索字段
    // 当我们改变了query的时候，page还是++状态，hasMore为flase，scroll的滚动距离没有重置；这是不行的
      this.page = 1 // 这是首次（query改变时）的加载
      this.hasMore = true
      this.$refs.scroll.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res);
          this.result = this._genResult(res.data) // 初步格式化
          // console.log(this.result);
          this.checkMore(res.data)
        }
      })
    },
    searchMore() { // 上拉刷新，搜索更多；即请求下一页面的数据
      if (!this.hasMore) {
        return 
      }
      this.page++ // 将要搜索的数据页数加1
      search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
        if(res.code === ERR_OK) {
          // 如果成功请求到数据，将数据连接起来
          this.result = this.result.concat(this._genResult(res.data))
          this.checkMore(res.data)
        }
      })
    },
    selectItem(item) { // 路由跳转
      if (item.type === TYPE_SINGER) { // 如果点击的是歌手图比奥
        const singer = new Singer({ // 封装歌手基本信息
          id: item.zhida_singer.singerID,
          name: item.zhida_singer.singerName,
          index: 0,
          mid: item.zhida_singer.singerMID
        })
        // console.log(singer);
        this.$router.push({
          path: `/search/${singer.id}`
        }) // 路由跳转
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
    },
    checkMore(data) { // 检测是否仍有数据
      let song = data.song
      if (!song.list.length|| (song.curnum + song.curpage * PERPAGE) >= song.totalnum) {
        this.hasMore = false
      }
    },
    getIconCls(item) {  // 以当前搜索出的类型，来决定样式
    // console.log(item);
      if (item.type === TYPE_SINGER) {
        // 为歌手时，数据初始化时，将如果是歌手的情况放在了最前面；所以一般icon-mine只会应用在最前面
        return 'icon-mine'
      } else {
        // 其他就为歌曲，加上icon-music样式
        return 'icon-music'
      }
    },
    getDisplayName(item) { // 返回搜索结果的各个名称
      if (item.type === TYPE_SINGER) { // 如果type为歌手，则显示歌手名
        return item.zhida_singer.singerName
      } else {
        // 返回歌名和 格式化后的歌手名
        return `${item.name} - ${item.singer}`
      }
      
    },
    _genResult(data) { // 格式化请求数据
      let ret = []
      if (data.zhida && data.zhida.zhida_singer) {
        // 如果zhida是1，且有zhida_singer就说明是歌手搜索，将zhida的数据全拿，设置type：type就是为了之后来区分：当前搜索是歌手还是歌曲
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) { // 反正歌曲是一定要拿的
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    _normalizeSongs(list) { // 格式化数据用于song
      let ret = []
      list.forEach(element => {
        // 保证数据完整
        if (element.album && element.ksong) {
          ret.push(createSong(element))
        }
      })
      return ret
    },
    ...mapMutations({
      // 把对mutation的修改映射成方法,此处为方法  SET_SINGER
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query(){ // 当query更新时，请求搜索
      this.Search()
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>