<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-06 16:48:58
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-06 20:21:04
 -->
<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result"> 
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { filterSinger } from 'common/js/song'

const TYPE_SINGER = 'singer'

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
      result: [] // 请求回的搜索结果
    }
  },
  methods: {
    Search() { // 请求搜索字段
      search(this.query, this.page, this.showSinger).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res);
          this.result = this._genResult(res.data)
          console.log(this.result);
        }
      })
    },
    getIconCls(item) {  // 以当前搜索出的类型，来决定样式
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-muusic'
      }
    },
    getDisplayName(item) { // 返回搜索结果的各个名称
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        // 返回歌名和 格式化后的歌手名
        return `${item.name} - ${filterSinger(item.singer)}`
      }
      
    },
    _genResult(data) { // 格式化请求数据
      let ret = []
      if (data.zhida && data.zhida.zhida_singer.singerID) {
        // 将zhida的数据全拿，type就是为了之后来区分：当前搜索是歌手还是歌曲
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) { // 反正歌曲是一定要拿的
        ret = ret.concat(data.song.list)
      }
      return ret
    }
  },
  watch: {
    query(){ // 当query更新时，请求搜索
      this.Search()
    }
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