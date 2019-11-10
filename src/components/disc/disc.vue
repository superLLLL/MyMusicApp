<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-11-04 12:49:26
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-04 19:12:42
 -->
<!-- 推荐页的 歌单详情 复用music-list来完成 -->
<template>
  <transition name="slide">
    <music-list :title="title" :bgImg="bgImg" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() { // 计算属性，标题title
      return this.disc.dissname
    },
    bgImg() { // 计算属性，背景图
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() { // 获取推荐页歌单信息
     // 如果连dissid都没有，那你还是出去吧(原地刷新)
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          // console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) { // 格式化歌单信息
      let ret = []
      list.forEach(element => {
        // 保证数据存在
        if(element.mid && element.album.id) {
          ret.push(createSong(element))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }  
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  
  .slide-enter, .slide-leave-to
    transition: translate3d(100%, 0, 0)
</style>

