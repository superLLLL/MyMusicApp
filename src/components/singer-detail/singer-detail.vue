<!--
 * @Description: Vue2.0-music-app
 * @Email: 17625121225@163.com
 * @Company: root
 * @Author: Xuhua
 * @Date: 2019-10-24 14:21:19
 * @LastEditors: Xuhua
 * @LastEditTime: 2019-11-08 12:44:40
 -->
<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bgImg="bgImg"></music-list>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getSingerDetail } from "api/singer";
import { ERR_OK } from "api/config";
import { createSong } from "common/js/song";
import MusicList from "components/music-list/music-list";
import { getSongVkey } from "api/song";
export default {
  data() {
    return {
      songs: [],
      songKey: ""
    };
  },
  computed: {
    // 抽象出歌手名
    title() {
      return this.singer.name;
    },
    // 抽象出歌手的图片
    bgImg() {
      return this.singer.avatar;
    },
    // 将state中的singer取出来使用
    ...mapGetters(["singer"]),
    ...mapMutations([])
  },
  created() {
    this._getDeatil();
    // 保证数据的完整性
  },
  methods: {
    _getDeatil() {
      // 如果需要获取的歌手信息没有拿到（比如直接在singer_detail页面加载），则跳回去
      if (typeof this.singer.no !== "number") {
        this.$router.push("/singer");
        return; // router是异步路由，怕浏览器会报错，所以直接return出去
      }
      // 获取歌手详细信息
      getSingerDetail(this.singer.mid).then(res => {
        if (res.code === ERR_OK) {
          // 调用_normalizeSongs方法获取歌曲信息
          // console.log(res.singerSongList.data.songList);
          this.songs = this._normalizeSongs(res.singerSongList.data.songList);
          // this.songs = res.singerSongList.data.songList
        }
      });
    },
    // 创建Song对象，获取歌曲的信息
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(element => {
        let musicData = element;
        // 保证必须的参数歌曲名和歌曲编号都存在，才会创建对象
        if (musicData.songInfo.ksong.id && musicData.songInfo.file.media_mid) {
            // 将未处理的数据进行抽象处理
            ret.push(createSong(musicData.songInfo))
        }
      });
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>